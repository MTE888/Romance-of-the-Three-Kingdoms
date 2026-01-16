#!/bin/bash

# Source Verification Script for Three Kingdoms Digital Platform
# Verifies downloaded sources for completeness, encoding, and integrity

set -e

echo "========================================="
echo "Three Kingdoms Source Verification"
echo "========================================="
echo ""

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$PROJECT_ROOT"

PASSED=0
FAILED=0
WARNINGS=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
}

fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

info() {
    echo "  $1"
}

# Check file exists and has content
check_file() {
    local file=$1
    local name=$2
    local min_size=$3  # Minimum expected size in KB

    if [ ! -f "$file" ]; then
        fail "$name - File not found: $file"
        return 1
    fi

    if [ ! -s "$file" ]; then
        fail "$name - File is empty: $file"
        return 1
    fi

    local size_kb=$(du -k "$file" | cut -f1)
    if [ "$size_kb" -lt "$min_size" ]; then
        warn "$name - File smaller than expected: ${size_kb}KB (expected >$min_size KB)"
    else
        pass "$name - File exists (${size_kb}KB)"
    fi

    return 0
}

# Check file encoding
check_encoding() {
    local file=$1
    local name=$2

    if [ ! -f "$file" ]; then
        return 1
    fi

    local encoding=$(file -b --mime-encoding "$file")

    if [[ "$encoding" == "utf-8" || "$encoding" == "us-ascii" ]]; then
        pass "$name - Encoding: $encoding"
    else
        warn "$name - Unexpected encoding: $encoding (expected UTF-8)"
    fi
}

# Check for Chinese characters
check_chinese() {
    local file=$1
    local name=$2

    if [ ! -f "$file" ]; then
        return 1
    fi

    # Count lines with Chinese characters
    local chinese_lines=$(grep -P '[\p{Han}]' "$file" 2>/dev/null | wc -l)

    if [ "$chinese_lines" -gt 100 ]; then
        pass "$name - Contains Chinese text ($chinese_lines lines)"
    else
        warn "$name - Few Chinese characters found (only $chinese_lines lines)"
    fi
}

echo "Checking Primary Sources..."
echo "-------------------------------------------"

# 1. Records of Three Kingdoms (三国志)
echo ""
echo "1. 三国志 (Records of Three Kingdoms)"
SANGUOZHI="data/sources/historical/sanguozhi/sanguozhi-full.txt"

if check_file "$SANGUOZHI" "Records" 500; then
    check_encoding "$SANGUOZHI" "Records"
    check_chinese "$SANGUOZHI" "Records"

    # Check for expected content
    if grep -q "陈寿\|Chen Shou\|魏书\|蜀书\|吴书" "$SANGUOZHI" 2>/dev/null; then
        pass "Records - Contains expected content markers"
    else
        warn "Records - Expected content markers not found"
    fi
else
    info "Download with: ./data/scripts/download-sources.sh"
fi

# 2. Romance of Three Kingdoms (三国演义)
echo ""
echo "2. 三国演义 (Romance of Three Kingdoms)"

CHAPTER_DIR="src"
if [ -d "$CHAPTER_DIR" ]; then
    CHAPTER_COUNT=$(find "$CHAPTER_DIR" -name "*.txt" 2>/dev/null | wc -l)

    if [ "$CHAPTER_COUNT" -eq 120 ]; then
        pass "Romance - Complete (120 chapters)"
    elif [ "$CHAPTER_COUNT" -gt 0 ]; then
        warn "Romance - Incomplete ($CHAPTER_COUNT/120 chapters)"
    else
        fail "Romance - No chapter files found"
    fi

    # Check first chapter
    FIRST_CHAPTER=$(find "$CHAPTER_DIR" -name "*.txt" 2>/dev/null | head -1)
    if [ -n "$FIRST_CHAPTER" ]; then
        check_encoding "$FIRST_CHAPTER" "Romance (sample)"
        check_chinese "$FIRST_CHAPTER" "Romance (sample)"

        # Check for expected content
        if grep -q "三国\|刘备\|关羽\|张飞" "$FIRST_CHAPTER" 2>/dev/null; then
            pass "Romance - Contains expected character names"
        fi
    fi
else
    fail "Romance - Directory not found: $CHAPTER_DIR"
fi

# 3. English Translation - Brewitt-Taylor
echo ""
echo "3. English Translation (Brewitt-Taylor)"
BREWITT="data/sources/translations/english/novel/brewitt-taylor/rotk-english-vol1.txt"

if check_file "$BREWITT" "Translation" 500; then
    check_encoding "$BREWITT" "Translation"

    # Should be primarily ASCII/English
    if grep -q "Liu Bei\|Cao Cao\|Three Kingdoms" "$BREWITT" 2>/dev/null; then
        pass "Translation - Contains expected English text"
    else
        warn "Translation - Expected content not found"
    fi
else
    info "Optional - Download with: ./data/scripts/download-sources.sh"
fi

echo ""
echo "-------------------------------------------"
echo "Checking Directory Structure..."
echo "-------------------------------------------"
echo ""

# Check directory structure
REQUIRED_DIRS=(
    "data/sources/historical"
    "data/sources/translations"
    "data/sources/media"
    "data/sources/reference"
    "data/structured/characters"
    "data/structured/events"
    "data/structured/locations"
    "data/scripts/extraction"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        pass "Directory exists: $dir"
    else
        fail "Directory missing: $dir"
    fi
done

echo ""
echo "-------------------------------------------"
echo "Checking Documentation..."
echo "-------------------------------------------"
echo ""

# Check documentation files
REQUIRED_DOCS=(
    "data/README.md"
    "data/sources/reference/SOURCES.md"
    "data/sources/historical/sanguozhi/README.md"
    "docs/SOURCE_MATERIALS.md"
)

for doc in "${REQUIRED_DOCS[@]}"; do
    if [ -f "$doc" ]; then
        pass "Documentation exists: $doc"
    else
        fail "Documentation missing: $doc"
    fi
done

echo ""
echo "========================================="
echo "Verification Summary"
echo "========================================="
echo ""
echo -e "${GREEN}Passed:${NC}   $PASSED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo -e "${RED}Failed:${NC}   $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    if [ $WARNINGS -eq 0 ]; then
        echo -e "${GREEN}✓ All checks passed!${NC}"
        echo ""
        echo "Next steps:"
        echo "  1. Run extraction: cd data/scripts/extraction && python extract_characters.py --source romance --output ../../structured/characters/from-romance.json"
        echo "  2. Review extracted data: cat data/structured/characters/from-romance.json"
        echo "  3. Import to database: npm run db:seed"
        exit 0
    else
        echo -e "${YELLOW}⚠ Verification complete with warnings${NC}"
        echo ""
        echo "You can proceed, but review warnings above."
        exit 0
    fi
else
    echo -e "${RED}✗ Verification failed${NC}"
    echo ""
    echo "Please resolve failed checks before proceeding."
    echo "See data/README.md for download instructions."
    exit 1
fi

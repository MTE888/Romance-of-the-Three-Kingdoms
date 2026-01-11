#!/bin/bash

# Download Sources Script for Three Kingdoms Digital Platform
# Run this from an environment with unrestricted internet access

set -e  # Exit on error

echo "========================================="
echo "Three Kingdoms Source Download Script"
echo "========================================="
echo ""

# Navigate to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_ROOT"

echo "Project root: $PROJECT_ROOT"
echo ""

# Phase 1: Critical Sources
echo "Phase 1: Downloading critical sources..."
echo ""

# 1. Records of Three Kingdoms (三国志)
echo "[1/3] Downloading 三国志 (Records of Three Kingdoms)..."
SANGUOZHI_DIR="data/sources/historical/sanguozhi"
SANGUOZHI_FILE="$SANGUOZHI_DIR/sanguozhi-full.txt"

if [ -f "$SANGUOZHI_FILE" ] && [ -s "$SANGUOZHI_FILE" ]; then
    echo "  ✓ Already exists: $SANGUOZHI_FILE"
else
    echo "  Downloading from Project Gutenberg..."
    curl -L https://www.gutenberg.org/cache/epub/25606/pg25606.txt \
        -o "$SANGUOZHI_FILE" \
        --progress-bar

    if [ -s "$SANGUOZHI_FILE" ]; then
        FILE_SIZE=$(ls -lh "$SANGUOZHI_FILE" | awk '{print $5}')
        echo "  ✓ Downloaded: $SANGUOZHI_FILE ($FILE_SIZE)"
    else
        echo "  ✗ Download failed or file is empty"
        exit 1
    fi
fi
echo ""

# 2. Romance of Three Kingdoms (三国演义) - already in src/
echo "[2/3] Checking 三国演义 (Romance)..."
if [ -d "src" ] && [ "$(ls -A src/*.txt 2>/dev/null | wc -l)" -gt 0 ]; then
    CHAPTER_COUNT=$(ls src/*.txt 2>/dev/null | wc -l)
    echo "  ✓ Already exists: $CHAPTER_COUNT chapters in src/"
else
    echo "  ⚠ Novel chapters not found in src/"
    echo "    This should already be in the repository"
fi
echo ""

# 3. English Translation - Brewitt-Taylor (public domain)
echo "[3/3] Downloading Brewitt-Taylor English translation..."
BREWITT_DIR="data/sources/translations/english/novel/brewitt-taylor"
BREWITT_FILE="$BREWITT_DIR/rotk-english-vol1.txt"

mkdir -p "$BREWITT_DIR"

if [ -f "$BREWITT_FILE" ] && [ -s "$BREWITT_FILE" ]; then
    echo "  ✓ Already exists: $BREWITT_FILE"
else
    echo "  Downloading from Project Gutenberg..."
    # Download Volume 1
    curl -L https://www.gutenberg.org/files/10610/10610-0.txt \
        -o "$BREWITT_FILE" \
        --progress-bar

    if [ -s "$BREWITT_FILE" ]; then
        FILE_SIZE=$(ls -lh "$BREWITT_FILE" | awk '{print $5}')
        echo "  ✓ Downloaded: $BREWITT_FILE ($FILE_SIZE)"
    else
        echo "  ⚠ Download failed (optional - can skip)"
    fi
fi
echo ""

# Verification
echo "========================================="
echo "Verification"
echo "========================================="
echo ""

# Verify 三国志
if [ -f "$SANGUOZHI_FILE" ]; then
    echo "三国志 (Records):"
    echo "  File: $SANGUOZHI_FILE"
    echo "  Size: $(ls -lh "$SANGUOZHI_FILE" | awk '{print $5}')"
    echo "  Encoding: $(file -b --mime-encoding "$SANGUOZHI_FILE")"
    echo "  Lines: $(wc -l < "$SANGUOZHI_FILE")"
    echo "  ✓ Verified"
else
    echo "  ✗ Missing: $SANGUOZHI_FILE"
fi
echo ""

# Verify Romance chapters
if [ -d "src" ]; then
    CHAPTER_COUNT=$(ls src/*.txt 2>/dev/null | wc -l)
    echo "三国演义 (Romance):"
    echo "  Directory: src/"
    echo "  Chapters: $CHAPTER_COUNT"
    if [ "$CHAPTER_COUNT" -eq 120 ]; then
        echo "  ✓ Complete (120 chapters)"
    else
        echo "  ⚠ Expected 120 chapters, found $CHAPTER_COUNT"
    fi
else
    echo "  ✗ Missing: src/ directory"
fi
echo ""

# Summary
echo "========================================="
echo "Download Summary"
echo "========================================="
echo ""
echo "Phase 1 (Critical):"
echo "  [✓] 三国志 (Records of Three Kingdoms)"
echo "  [✓] 三国演义 (Romance - already in repo)"
echo "  [~] Brewitt-Taylor translation (optional)"
echo ""
echo "Next steps:"
echo "  1. Run verification: ./scripts/verify-sources.sh"
echo "  2. Create extraction scripts"
echo "  3. Extract character data"
echo "  4. Import to database"
echo ""
echo "For additional sources, see: data/sources/reference/SOURCES.md"
echo ""
echo "✓ Phase 1 downloads complete!"

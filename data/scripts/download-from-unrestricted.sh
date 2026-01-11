#!/bin/bash

# Download Historical Sources from Unrestricted Network
# Run this script from a computer/network with unrestricted internet access
#
# Usage:
#   bash download-from-unrestricted.sh [target-directory]
#
# Example:
#   bash download-from-unrestricted.sh ~/three-kingdoms-downloads

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default download directory
DOWNLOAD_DIR="${1:-$HOME/three-kingdoms-downloads}"

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Three Kingdoms Source Downloader${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "Target directory: $DOWNLOAD_DIR"
echo ""

# Create download directory
mkdir -p "$DOWNLOAD_DIR"
cd "$DOWNLOAD_DIR"

echo -e "${YELLOW}[1/3] Downloading 三国志 (Records of Three Kingdoms)...${NC}"
if curl -L https://www.gutenberg.org/cache/epub/25606/pg25606.txt \
     -o sanguozhi-full.txt \
     --progress-bar \
     --max-time 120; then
    echo -e "${GREEN}✅ Downloaded sanguozhi-full.txt${NC}"
    ls -lh sanguozhi-full.txt
else
    echo -e "${RED}❌ Failed to download 三国志${NC}"
    echo "Try downloading manually from: https://www.gutenberg.org/cache/epub/25606/pg25606.txt"
fi

echo ""
echo -e "${YELLOW}[2/3] Downloading English Translation (Brewitt-Taylor)...${NC}"
if curl -L https://www.gutenberg.org/files/10610/10610-0.txt \
     -o romance-english.txt \
     --progress-bar \
     --max-time 120; then
    echo -e "${GREEN}✅ Downloaded romance-english.txt${NC}"
    ls -lh romance-english.txt
else
    echo -e "${RED}❌ Failed to download English translation${NC}"
    echo "Try downloading manually from: https://www.gutenberg.org/files/10610/10610-0.txt"
fi

echo ""
echo -e "${YELLOW}[3/3] Verifying downloads...${NC}"

verify_file() {
    local filename=$1
    local min_size=$2

    if [ ! -f "$filename" ]; then
        echo -e "${RED}❌ $filename not found${NC}"
        return 1
    fi

    local size=$(stat -f%z "$filename" 2>/dev/null || stat -c%s "$filename" 2>/dev/null)

    if [ "$size" -lt "$min_size" ]; then
        echo -e "${RED}❌ $filename too small ($size bytes, expected >$min_size)${NC}"
        return 1
    fi

    if ! file "$filename" | grep -q "text"; then
        echo -e "${RED}❌ $filename is not a text file${NC}"
        return 1
    fi

    echo -e "${GREEN}✅ $filename verified ($size bytes)${NC}"
    return 0
}

verify_file "sanguozhi-full.txt" 1000000  # Min 1MB
verify_file "romance-english.txt" 500000   # Min 500KB

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Download Summary${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "Downloaded files are in: $DOWNLOAD_DIR"
echo ""
ls -lh "$DOWNLOAD_DIR"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1. Copy files to your Romance-of-the-Three-Kingdoms repository:"
echo "   ${GREEN}cp $DOWNLOAD_DIR/*.txt /path/to/Romance-of-the-Three-Kingdoms/data/sources/historical/sanguozhi/${NC}"
echo ""
echo "2. Or commit to git if on different machine:"
echo "   ${GREEN}cd /path/to/Romance-of-the-Three-Kingdoms${NC}"
echo "   ${GREEN}cp $DOWNLOAD_DIR/sanguozhi-full.txt data/sources/historical/sanguozhi/${NC}"
echo "   ${GREEN}cp $DOWNLOAD_DIR/romance-english.txt data/sources/translations/english/novel/brewitt-taylor/${NC}"
echo "   ${GREEN}git add data/sources/${NC}"
echo "   ${GREEN}git commit -m 'Add historical sources'${NC}"
echo "   ${GREEN}git push${NC}"
echo ""
echo "3. Extract character data:"
echo "   ${GREEN}cd data/scripts/extraction${NC}"
echo "   ${GREEN}python extract_characters.py --source sanguozhi --output ../../structured/characters/from-records.json${NC}"
echo ""
echo -e "${GREEN}Done!${NC}"

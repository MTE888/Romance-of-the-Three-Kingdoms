#!/usr/bin/env python3
"""
Download Historical Sources using Python
Alternative to bash script - may work better with some proxy configurations

Usage:
    python download_with_python.py [download_directory]

Example:
    python download_with_python.py ~/three-kingdoms-downloads
"""

import os
import sys
import urllib.request
from pathlib import Path


# Color codes for terminal output
class Colors:
    RED = '\033[0;31m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    NC = '\033[0m'  # No Color


# Sources to download
SOURCES = [
    {
        "name": "三国志 (Records of Three Kingdoms)",
        "url": "https://www.gutenberg.org/cache/epub/25606/pg25606.txt",
        "filename": "sanguozhi-full.txt",
        "min_size": 1_000_000,  # 1 MB
        "priority": "CRITICAL"
    },
    {
        "name": "English Translation (Brewitt-Taylor)",
        "url": "https://www.gutenberg.org/files/10610/10610-0.txt",
        "filename": "romance-english.txt",
        "min_size": 500_000,  # 500 KB
        "priority": "IMPORTANT"
    }
]


def print_color(message, color=Colors.NC):
    """Print colored message to terminal"""
    print(f"{color}{message}{Colors.NC}")


def download_file(url, filename, min_size):
    """Download file from URL with progress indication"""
    try:
        print_color(f"Downloading {filename}...", Colors.YELLOW)
        print(f"  URL: {url}")

        # Set user agent to avoid blocking
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        req = urllib.request.Request(url, headers=headers)

        # Download file
        with urllib.request.urlopen(req, timeout=120) as response:
            content = response.read()

            # Write to file
            with open(filename, 'wb') as f:
                f.write(content)

        # Verify size
        file_size = os.path.getsize(filename)

        if file_size < min_size:
            print_color(f"❌ File too small: {file_size:,} bytes (expected >{min_size:,})", Colors.RED)
            return False

        print_color(f"✅ Downloaded successfully: {file_size:,} bytes", Colors.GREEN)
        return True

    except urllib.error.HTTPError as e:
        print_color(f"❌ HTTP Error {e.code}: {e.reason}", Colors.RED)
        return False
    except urllib.error.URLError as e:
        print_color(f"❌ Network Error: {e.reason}", Colors.RED)
        return False
    except Exception as e:
        print_color(f"❌ Error: {e}", Colors.RED)
        return False


def verify_file(filename, min_size):
    """Verify downloaded file"""
    if not os.path.exists(filename):
        print_color(f"❌ {filename} not found", Colors.RED)
        return False

    file_size = os.path.getsize(filename)

    if file_size < min_size:
        print_color(f"❌ {filename} too small: {file_size:,} bytes", Colors.RED)
        return False

    print_color(f"✅ {filename} verified: {file_size:,} bytes", Colors.GREEN)
    return True


def main():
    """Main download function"""
    # Get download directory from args or use default
    download_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/three-kingdoms-downloads")
    download_path = Path(download_dir)

    print_color("=" * 50, Colors.GREEN)
    print_color("Three Kingdoms Source Downloader (Python)", Colors.GREEN)
    print_color("=" * 50, Colors.GREEN)
    print()
    print(f"Target directory: {download_path}")
    print()

    # Create download directory
    download_path.mkdir(parents=True, exist_ok=True)
    os.chdir(download_path)

    # Download each source
    results = []
    for i, source in enumerate(SOURCES, 1):
        print_color(f"[{i}/{len(SOURCES)}] {source['name']} ({source['priority']})", Colors.YELLOW)
        success = download_file(source['url'], source['filename'], source['min_size'])
        results.append((source['name'], success))
        print()

    # Verify all downloads
    print_color("Verifying downloads...", Colors.YELLOW)
    print()

    for source in SOURCES:
        verify_file(source['filename'], source['min_size'])

    # Summary
    print()
    print_color("=" * 50, Colors.GREEN)
    print_color("Download Summary", Colors.GREEN)
    print_color("=" * 50, Colors.GREEN)
    print()

    success_count = sum(1 for _, success in results if success)
    print(f"Successfully downloaded: {success_count}/{len(SOURCES)}")
    print()

    for name, success in results:
        status = "✅" if success else "❌"
        print(f"  {status} {name}")

    print()
    print(f"Files are in: {download_path}")
    print()

    # List files
    for f in download_path.glob("*.txt"):
        size = f.stat().st_size
        print(f"  {f.name}: {size:,} bytes")

    # Next steps
    print()
    print_color("Next Steps:", Colors.YELLOW)
    print()
    print("1. Copy files to your Romance-of-the-Three-Kingdoms repository:")
    print_color(f"   cp {download_path}/*.txt /path/to/Romance-of-the-Three-Kingdoms/data/sources/historical/sanguozhi/", Colors.GREEN)
    print()
    print("2. Or commit to git if on different machine:")
    print_color("   cd /path/to/Romance-of-the-Three-Kingdoms", Colors.GREEN)
    print_color(f"   cp {download_path}/sanguozhi-full.txt data/sources/historical/sanguozhi/", Colors.GREEN)
    print_color(f"   cp {download_path}/romance-english.txt data/sources/translations/english/novel/brewitt-taylor/", Colors.GREEN)
    print_color("   git add data/sources/", Colors.GREEN)
    print_color("   git commit -m 'Add historical sources'", Colors.GREEN)
    print_color("   git push", Colors.GREEN)
    print()
    print("3. Extract character data:")
    print_color("   cd data/scripts/extraction", Colors.GREEN)
    print_color("   python extract_characters.py --source sanguozhi --output ../../structured/characters/from-records.json", Colors.GREEN)
    print()
    print_color("Done!", Colors.GREEN)

    # Exit with success/failure code
    sys.exit(0 if success_count == len(SOURCES) else 1)


if __name__ == "__main__":
    main()

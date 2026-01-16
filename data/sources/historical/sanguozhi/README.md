# 三国志 (Records of the Three Kingdoms)

**Author**: Chen Shou (陈寿)
**Dynasty**: Western Jin (3rd century CE)
**Size**: ~360,000 characters, 65 fascicles

## About This Source

The *Records of the Three Kingdoms* (Sanguozhi, 三国志) is one of the official Twenty-Four Histories of China. Written by Chen Shou (233-297 CE), it covers the history of the Three Kingdoms period from 184 to 280 CE.

### Structure

- **Book of Wei (魏书)**: 30 fascicles
- **Book of Shu (蜀书)**: 15 fascicles
- **Book of Wu (吴书)**: 20 fascicles

## Download Instructions

### Option 1: Project Gutenberg (Recommended)

**URL**: https://www.gutenberg.org/ebooks/25606

**Download Steps**:
1. Visit the URL above
2. Click "Plain Text UTF-8" format
3. Save as `sanguozhi-full.txt` in this directory

**Direct download** (if you have unrestricted internet):
```bash
cd data/sources/historical/sanguozhi
wget https://www.gutenberg.org/cache/epub/25606/pg25606.txt -O sanguozhi-full.txt
```

Or using curl:
```bash
curl -L https://www.gutenberg.org/cache/epub/25606/pg25606.txt -o sanguozhi-full.txt
```

### Option 2: Chinese Text Project

**URL**: https://ctext.org/wiki.pl?if=en&res=339496

**Access**:
- Online reading with search functionality
- Can export sections or full text
- Includes both original and Pei Songzhi's commentary

### Option 3: Internet Archive

**URL**: https://archive.org/details/recordsofthreeki0000chen

**Formats**: PDF, EPUB, Kindle, Full Text

## File Checklist

Expected files in this directory:

- [ ] `sanguozhi-full.txt` - Complete Chinese text (~1-2 MB)
- [x] `README.md` - This file
- [ ] `metadata.json` - Source metadata (auto-generated)

## Verification

After downloading, verify the file:

```bash
# Check file size (should be ~1-2 MB)
ls -lh sanguozhi-full.txt

# Check encoding (should be UTF-8)
file sanguozhi-full.txt

# Count characters (should be ~360,000+)
wc -m sanguozhi-full.txt

# View first few lines
head -20 sanguozhi-full.txt
```

## Source Attribution

**Citation**:
```
Chen Shou (陈寿). Sanguozhi (三国志) [Records of the Three Kingdoms].
Western Jin Dynasty, c. 289 CE. Digital edition from Project Gutenberg.
```

**License**: Public Domain (ancient text, pre-1900)

**Reliability Tier**: Primary historical source

## Next Steps

Once downloaded:
1. Verify the file with the commands above
2. Run extraction scripts to parse character names and events
3. Import structured data into the database
4. Cross-reference with the novel (三国演义)

## Notes

- This is the **core historical source** for the project
- Priority 1 for MVP (Phase 1)
- Required for dual-profile system (historical vs literary)
- Should be downloaded before beginning data extraction

---

**Status**: ⏳ Awaiting download
**Last Updated**: 2026-01-10
**Maintained By**: Project Team

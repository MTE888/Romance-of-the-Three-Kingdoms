# Manual Download Guide for Historical Sources

**Status**: Network restrictions prevent automated downloads from this environment.
**Solution**: Download manually from an environment with unrestricted internet access.

---

## 🚀 Quick Start (One Command)

**From a system with unrestricted internet access:**

```bash
cd /path/to/Romance-of-the-Three-Kingdoms

# Download 三国志 (Records of the Three Kingdoms)
curl -L https://www.gutenberg.org/cache/epub/25606/pg25606.txt \
  -o data/sources/historical/sanguozhi/sanguozhi-full.txt

# Verify the download
ls -lh data/sources/historical/sanguozhi/sanguozhi-full.txt
file data/sources/historical/sanguozhi/sanguozhi-full.txt
```

Expected result: File should be ~1-2 MB, UTF-8 encoded text.

---

## 📥 Priority Downloads

### 1. 三国志 (Records of the Three Kingdoms) - **CRITICAL**

**Why**: Primary historical source for dual-profile character system

**Download**:
```bash
curl -L https://www.gutenberg.org/cache/epub/25606/pg25606.txt \
  -o data/sources/historical/sanguozhi/sanguozhi-full.txt
```

**Alternative Sources**:
- Chinese Text Project: https://ctext.org/text.pl?node=2573&if=en
- Internet Archive: https://archive.org/details/sanguozhi
- Wikipedia Chinese: https://zh.wikisource.org/wiki/三國志

**What to do after download**:
```bash
# Extract historical character data
cd data/scripts/extraction
python extract_characters.py \
  --source sanguozhi \
  --output ../../structured/characters/from-records.json
```

---

### 2. English Translation (Optional but Recommended)

**Brewitt-Taylor Translation of Romance**:
```bash
curl -L https://www.gutenberg.org/files/10610/10610-0.txt \
  -o data/sources/translations/english/novel/brewitt-taylor/romance-english.txt
```

**Roberts Translation** (more modern):
```bash
# Available for purchase or from libraries
# Check: https://www.goodreads.com/book/show/149786.Three_Kingdoms
```

---

## 🔍 Verification Steps

After downloading, verify file integrity:

```bash
# Run verification script
cd data/scripts/validation
bash verify_sources.sh

# Or manually check
ls -lh data/sources/historical/sanguozhi/
file data/sources/historical/sanguozhi/sanguozhi-full.txt
head -n 20 data/sources/historical/sanguozhi/sanguozhi-full.txt
```

**Expected output**:
- File size: 1-2 MB
- Encoding: UTF-8 text
- Content: Chinese characters (should see 三国志 or similar)

---

## 🛠 Alternative: Download via Browser

If `curl` is not available:

1. **Visit URL in browser**: https://www.gutenberg.org/cache/epub/25606/pg25606.txt
2. **Save as**: `sanguozhi-full.txt`
3. **Move to**: `data/sources/historical/sanguozhi/sanguozhi-full.txt`

---

## 📋 Download Checklist

- [ ] Download 三国志 from Project Gutenberg
- [ ] Verify file size (1-2 MB)
- [ ] Verify UTF-8 encoding
- [ ] Run extraction script on historical source
- [ ] Generate `from-records.json`
- [ ] Compare with existing `from-romance.json`

---

## 🔧 Troubleshooting

### Issue: "403 Forbidden"
**Solution**: Network is blocking external requests. Download from:
- Personal laptop with unrestricted internet
- University/library network
- Public WiFi
- VPN connection

### Issue: "File not UTF-8"
**Solution**: Convert encoding:
```bash
iconv -f GB18030 -t UTF-8 input.txt > output.txt
```

### Issue: "Chinese characters display as ???"
**Solution**: Ensure terminal supports UTF-8:
```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

---

## 📊 What You Get

After downloading and extracting:

1. **from-records.json** - Historical character profiles from 三国志
2. **from-romance.json** - Literary character profiles from 三国演义 (already have this)
3. **Dual profiles** - Combine both to create complete character records

---

## 🎯 Next Steps After Download

```bash
# 1. Extract from historical source
python data/scripts/extraction/extract_characters.py \
  --source sanguozhi \
  --output data/structured/characters/from-records.json

# 2. Extract from all 120 Romance chapters (not just chapter 1)
python data/scripts/extraction/extract_characters.py \
  --source romance \
  --all-chapters \
  --output data/structured/characters/from-romance-complete.json

# 3. Build merge script to create dual profiles
# (To be implemented in Phase 1)
```

---

## 💡 Why Downloads Failed in Current Environment

**Error**: `ProxyError: 403 Forbidden`

**Cause**: Network proxy is blocking:
- External HTTPS connections
- Connections to Project Gutenberg
- Connections to archive.org
- Most external HTTP/HTTPS traffic

**Cannot be fixed** in this restricted environment.

**Solution**: Download from unrestricted environment, then:
- Copy files to `data/sources/` directory
- Commit to git
- Push to remote
- Pull from this environment

---

**Last Updated**: 2026-01-10
**Status**: Manual download required due to network restrictions

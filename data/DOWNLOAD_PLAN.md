# Download Plan - Historical Sources

**Created**: 2026-01-10
**Status**: Network blocked - requires manual download
**Priority**: High (needed for dual-profile character system)

---

## 🎯 Strategy Overview

Since the current environment blocks external downloads (403 proxy errors), we have **three options**:

### Option A: Manual Download (Recommended - Most Reliable)
Download from personal computer/unrestricted network → commit to git → pull here

### Option B: Alternative APIs (To Try)
Use different data sources with APIs that might not be blocked

### Option C: Use Existing Data First
Work with Romance chapters we already have while arranging downloads

---

## 📋 Files Needed (Priority Order)

### Priority 1: CRITICAL - Needed for MVP

#### 1.1 三国志 (Records of the Three Kingdoms) - Chen Shou
**Why**: Primary historical source, required for dual-profile system
**Size**: ~1-2 MB
**Format**: Plain text (UTF-8)

**Download Sources** (try in order):
```bash
# Option 1: Project Gutenberg (simplest)
curl -L https://www.gutenberg.org/cache/epub/25606/pg25606.txt \
  -o data/sources/historical/sanguozhi/sanguozhi-full.txt

# Option 2: Chinese Text Project (structured)
# Visit: https://ctext.org/text.pl?node=2573&if=en
# Manual download required - no direct URL

# Option 3: Wikisource Chinese
# Visit: https://zh.wikisource.org/wiki/三國志
# Manual download required
```

**Verification**:
```bash
ls -lh data/sources/historical/sanguozhi/sanguozhi-full.txt
file data/sources/historical/sanguozhi/sanguozhi-full.txt
grep -c "三国" data/sources/historical/sanguozhi/sanguozhi-full.txt
```

---

#### 1.2 后汉书 (Book of the Later Han) - Fan Ye
**Why**: Background context for Three Kingdoms period
**Size**: ~2-3 MB
**Format**: Plain text (UTF-8)

**Download Sources**:
```bash
# Option 1: Chinese Text Project
# Visit: https://ctext.org/hou-han-shu

# Option 2: Wikisource
# Visit: https://zh.wikisource.org/wiki/後漢書
```

---

### Priority 2: IMPORTANT - Enhances Content Quality

#### 2.1 English Translation - Brewitt-Taylor (Romance)
**Why**: Bilingual support, helps English-speaking users
**Size**: ~1 MB
**Format**: Plain text

**Download**:
```bash
curl -L https://www.gutenberg.org/files/10610/10610-0.txt \
  -o data/sources/translations/english/novel/brewitt-taylor/romance-english.txt
```

---

#### 2.2 资治通鉴 (Comprehensive Mirror in Aid of Governance)
**Why**: Alternative historical perspective
**Size**: ~10-15 MB (large!)
**Format**: Plain text (UTF-8)

**Download Sources**:
```bash
# Chinese Text Project
# Visit: https://ctext.org/zizhi-tongjian
# Download relevant sections (years 169-280 AD)
```

**Note**: Only download sections covering Three Kingdoms period (184-280 AD) to reduce size.

---

### Priority 3: NICE TO HAVE - Future Enhancements

#### 3.1 晋书 (Book of Jin)
**Why**: Continuation of Three Kingdoms period
**When**: Post-MVP

#### 3.2 三国演义注释 (Annotated Romance)
**Why**: Scholarly annotations
**When**: Post-MVP

#### 3.3 Modern Scholarly Translations
**Why**: Better English translations (Roberts, Moss)
**When**: Post-MVP (requires purchase)

---

## 🚀 Recommended Execution Plan

### Step 1: Download from Unrestricted Network

**From your personal computer or unrestricted network:**

```bash
# Create temporary download directory
mkdir -p ~/three-kingdoms-downloads

# Download Priority 1 files
cd ~/three-kingdoms-downloads

# 1. Download 三国志
curl -L https://www.gutenberg.org/cache/epub/25606/pg25606.txt \
  -o sanguozhi-full.txt

# 2. Download English translation
curl -L https://www.gutenberg.org/files/10610/10610-0.txt \
  -o romance-english.txt

# Verify downloads
ls -lh *.txt
file *.txt
```

---

### Step 2: Transfer to Repository

**Option A: Direct copy (if on same machine)**
```bash
cp ~/three-kingdoms-downloads/sanguozhi-full.txt \
   /path/to/Romance-of-the-Three-Kingdoms/data/sources/historical/sanguozhi/

cp ~/three-kingdoms-downloads/romance-english.txt \
   /path/to/Romance-of-the-Three-Kingdoms/data/sources/translations/english/novel/brewitt-taylor/
```

**Option B: Git commit and push (if different machine)**
```bash
cd /path/to/Romance-of-the-Three-Kingdoms

# Copy files to data/ directory
cp ~/three-kingdoms-downloads/*.txt data/sources/historical/sanguozhi/

# Commit
git add data/sources/
git commit -m "Add historical sources: 三国志 and English translation"
git push

# Then pull from restricted environment
git pull
```

---

### Step 3: Verify Downloads

```bash
cd /path/to/Romance-of-the-Three-Kingdoms

# Run verification script (after fixing path bug)
bash data/scripts/validation/verify_sources.sh

# Or manual verification
ls -lh data/sources/historical/sanguozhi/
file data/sources/historical/sanguozhi/sanguozhi-full.txt
head -20 data/sources/historical/sanguozhi/sanguozhi-full.txt
```

**Expected results**:
- ✅ File exists
- ✅ Size 1-2 MB
- ✅ UTF-8 encoding
- ✅ Contains Chinese characters (三国志, 陈寿, etc.)

---

### Step 4: Extract Data

```bash
# Extract characters from historical source
cd data/scripts/extraction
python extract_characters.py \
  --source sanguozhi \
  --output ../../structured/characters/from-records.json

# Verify extraction
cat ../../structured/characters/from-records.json | head -50
```

---

### Step 5: Build Dual Profiles

```bash
# Merge historical + literary profiles
# (Script to be created in Phase 1)
python merge_profiles.py \
  --historical from-records.json \
  --literary from-romance.json \
  --output dual-profiles.json
```

---

## 🔄 Alternative: API-Based Approaches

If direct downloads continue to fail, try these API sources:

### Chinese Text Project API
```python
import requests

# Example: Fetch 三国志 via API
url = "https://ctext.org/api.php"
params = {
    "urn": "ctp:sanguo-zhi",
    "format": "json"
}

response = requests.get(url, params=params)
# Process JSON response
```

### Wikimedia API
```python
import requests

# Fetch from Wikisource
url = "https://zh.wikisource.org/w/api.php"
params = {
    "action": "query",
    "titles": "三國志",
    "prop": "revisions",
    "rvprop": "content",
    "format": "json"
}

response = requests.get(url, params=params)
# Process response
```

---

## 📊 Download Checklist

### Before Starting
- [ ] Identify computer/network with unrestricted internet access
- [ ] Ensure sufficient disk space (~20 MB)
- [ ] Verify git is installed and configured

### Priority 1 Downloads
- [ ] Download 三国志 (sanguozhi-full.txt)
- [ ] Verify file size and encoding
- [ ] Place in `data/sources/historical/sanguozhi/`
- [ ] Test extraction script on file

### Priority 2 Downloads
- [ ] Download English translation (romance-english.txt)
- [ ] Download 后汉书 sections (hou-han-shu.txt)
- [ ] Verify all files
- [ ] Commit to git repository

### Post-Download
- [ ] Run verification script
- [ ] Extract character data from historical sources
- [ ] Generate from-records.json
- [ ] Compare with from-romance.json
- [ ] Update STATUS.md

---

## 🐛 Troubleshooting

### Issue: "curl: command not found"
```bash
# Use wget instead
wget https://www.gutenberg.org/cache/epub/25606/pg25606.txt \
  -O sanguozhi-full.txt

# Or use browser to download and save manually
```

### Issue: "File is not UTF-8"
```bash
# Check encoding
file -i sanguozhi-full.txt

# Convert if needed
iconv -f GB18030 -t UTF-8 sanguozhi-full.txt > sanguozhi-utf8.txt
```

### Issue: "Network still blocks downloads"
**Try**:
1. Use mobile hotspot instead of corporate/university network
2. Use VPN to bypass proxy
3. Download at public library or cafe
4. Ask colleague with unrestricted access

### Issue: "File too large to commit to git"
```bash
# Check if exceeding GitHub's 100MB limit
ls -lh sanguozhi-full.txt

# If > 50MB, use Git LFS
git lfs track "*.txt"
git add .gitattributes
git add sanguozhi-full.txt
git commit -m "Add large historical source"
```

---

## ⏱ Time Estimate

**If doing manually from unrestricted network:**
- Download files: 10-15 minutes
- Transfer/commit: 5 minutes
- Verify: 5 minutes
- Extract data: 10 minutes
- **Total: ~30-35 minutes**

**If using APIs:**
- Setup: 30 minutes
- Download: 20-30 minutes
- Parse/format: 1-2 hours
- **Total: ~2-3 hours**

---

## 📈 Success Criteria

You'll know downloads are successful when:

✅ `data/sources/historical/sanguozhi/sanguozhi-full.txt` exists (1-2 MB)
✅ File contains Chinese text (三国志, 陈寿, etc.)
✅ UTF-8 encoding verified
✅ Extraction script runs successfully
✅ `from-records.json` generated with character data
✅ Can see differences between historical and literary profiles

---

## 🎯 What Happens After Downloads

Once historical sources are downloaded:

1. **Extract all characters** from 三国志
2. **Extract all characters** from all 120 Romance chapters (not just chapter 1)
3. **Build merge script** to create dual profiles
4. **Generate complete character database** (100+ characters)
5. **Import to PostgreSQL** (Phase 1)
6. **Build UI** to display dual profiles (Phase 2)

---

**Next Action**: Choose Option A (manual download) and execute Step 1 from an unrestricted network.

**Estimated Time to Complete**: 30-35 minutes

**Blockers**: None (can be done independently)

---

**Last Updated**: 2026-01-10
**Status**: Ready to execute
**Owner**: User (requires unrestricted internet access)

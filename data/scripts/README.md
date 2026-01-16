# Download Scripts

Scripts for downloading and processing Three Kingdoms historical sources.

---

## 🚀 Quick Start

**If you have unrestricted internet access**, run ONE of these:

### Option 1: Bash Script (Recommended for Mac/Linux)
```bash
bash download-from-unrestricted.sh ~/three-kingdoms-downloads
```

### Option 2: Python Script (Works anywhere with Python)
```bash
python3 download_with_python.py ~/three-kingdoms-downloads
```

### Option 3: Manual Download
Follow instructions in `../DOWNLOAD_PLAN.md`

---

## 📁 Available Scripts

### Download Scripts

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `download-from-unrestricted.sh` | Download sources via bash/curl | Mac/Linux with unrestricted internet |
| `download_with_python.py` | Download sources via Python | Any OS, may bypass some proxies |
| `download-sources.sh` | Original download script | Currently blocked by network proxy |

### Extraction Scripts

| Script | Purpose | Status |
|--------|---------|--------|
| `extraction/extract_characters.py` | Extract characters from texts | ✅ Working - tested on Romance |

### Validation Scripts

| Script | Purpose | Status |
|--------|---------|--------|
| `validation/verify_sources.sh` | Verify source file integrity | ⚠️ Has path bug - see STATUS.md |

---

## 📋 Download Plan

**See `../DOWNLOAD_PLAN.md` for complete strategy including:**
- Priority order for sources
- Alternative download methods
- Verification steps
- Troubleshooting
- What to do after downloads complete

---

## 🔍 After Downloading

Once you have the historical sources downloaded:

```bash
# 1. Extract characters from 三国志 (Records)
cd extraction
python extract_characters.py \
  --source sanguozhi \
  --output ../../structured/characters/from-records.json

# 2. Extract from all 120 Romance chapters
python extract_characters.py \
  --source romance \
  --all-chapters \
  --output ../../structured/characters/from-romance-complete.json

# 3. Verify extractions
cat ../../structured/characters/from-records.json | head -50
cat ../../structured/characters/from-romance-complete.json | head -50
```

---

## ⚠️ Known Issues

### Network Proxy Blocking Downloads
**Issue**: Downloads fail with "403 Forbidden" in restricted environment

**Solution**: Run download scripts from:
- Personal laptop with unrestricted internet
- Public WiFi
- Mobile hotspot
- University/library network (not corporate)

### Verification Script Path Bug
**Issue**: `verify_sources.sh` calculates wrong project root

**Fix**: Change line 13 from `../..` to `../../..`

---

## 📊 What Gets Downloaded

### Priority 1: CRITICAL (Required for MVP)
- **三国志** (Records of Three Kingdoms) - 1-2 MB
  - Primary historical source
  - Needed for dual-profile character system

### Priority 2: IMPORTANT (Enhances quality)
- **English Translation** (Brewitt-Taylor) - 1 MB
  - Bilingual support
  - Helps English-speaking users

### Priority 3: NICE TO HAVE (Future)
- 后汉书 (Book of Later Han) - 2-3 MB
- 资治通鉴 sections - varies
- Scholarly annotations - varies

---

## 🎯 Success Criteria

Downloads are successful when:

✅ `../sources/historical/sanguozhi/sanguozhi-full.txt` exists (1-2 MB)
✅ File contains Chinese characters (三国志)
✅ UTF-8 encoding verified
✅ Extraction script runs without errors
✅ `from-records.json` generated with character data

---

## 💡 Tips

1. **Start with Priority 1** (三国志) - it's all you need for MVP
2. **Test extraction immediately** after downloading to verify file quality
3. **Commit to git** so other environments can pull the files
4. **Check file sizes** - if too small, download may have failed
5. **Verify encoding** - must be UTF-8 for Chinese text processing

---

## 📞 Help

- **Download issues**: See `../DOWNLOAD_PLAN.md`
- **Extraction issues**: See `extraction/extract_characters.py --help`
- **General workflow**: See `../README.md`

---

**Last Updated**: 2026-01-10

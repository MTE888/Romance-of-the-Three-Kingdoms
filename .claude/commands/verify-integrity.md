# Verify Integrity Command

Verify the integrity and completeness of the Romance of the Three Kingdoms text collection.

## Usage
Run this command to ensure all chapters are present and properly formatted.

## Instructions

Perform the following checks:

### 1. Chapter Count
```bash
# Should be exactly 120 chapters
CHAPTER_COUNT=$(ls src/*.txt | wc -l)
echo "Total chapters: $CHAPTER_COUNT (expected: 120)"
```

### 2. Encoding Verification
```bash
# All files should be UTF-8
file -bi src/*.txt | grep -v "utf-8"
```

### 3. File Size Check
```bash
# List any suspiciously small files (< 5KB)
find src -name "*.txt" -size -5k
```

### 4. Sequential Numbering
```bash
# Verify chapters 1-120 exist
for i in {1..120}; do
  if ! ls src/$i.*.txt &> /dev/null; then
    echo "Missing chapter: $i"
  fi
done
```

### 5. Naming Convention
```bash
# Check for files not matching pattern
ls src/*.txt | grep -Ev "^src/[0-9]+\..+\.txt$"
```

## Output

Provide a summary report:
- ✅ All checks passed
- ⚠️ Warnings (if any)
- ❌ Errors (if any)

Include recommendations for fixing any issues found.

# Romance of the Three Kingdoms Project

## What: Project Overview

This repository contains the complete text of **Romance of the Three Kingdoms** (三国演义), one of China's Four Great Classical Novels. The project includes all 120 chapters as individual text files in Chinese.

### Tech Stack
- Plain text files (.txt)
- UTF-8 encoding
- Chinese language content
- Git version control

### Repository Structure
```
.
├── src/                    # All 120 chapters as individual .txt files
├── CLAUDE.md              # This file - project guidelines
├── CLAUDE.local.md        # Developer-specific preferences (gitignored)
├── .claude/               # Claude Code configuration
│   └── commands/          # Custom slash commands
└── README.md              # Project introduction
```

## Why: Project Purpose

This project serves as:
1. A digital archive of the classic Chinese novel
2. A foundation for text analysis, translation, or educational tools
3. A reference corpus for natural language processing tasks
4. A structured dataset for cultural preservation

## How: Development Guidelines

### File Naming Convention
All chapter files follow this pattern:
- Format: `{number}.{chapter_title}.txt`
- Example: `1.宴桃园豪杰三结义 斩黄巾英雄首立功.txt`
- Numbers: 1-120 (sequential)

### Character Encoding
- **ALWAYS** use UTF-8 encoding for all text files
- Preserve original Chinese characters
- Do not alter punctuation or formatting unless explicitly requested

### Text Integrity
- Do not modify chapter content without explicit permission
- Maintain original structure and line breaks
- Preserve whitespace and formatting as in source material
- Any edits must be tracked and documented

### Git Workflow
- Branch naming: `claude/{descriptive-name}-{session-id}`
- Commit messages: Clear, concise descriptions in English
- Always verify changes before committing with `git diff`
- Do not commit unnecessary files (see .gitignore)

### Common Operations

#### Searching Text
```bash
# Search for a character name across all chapters
grep -r "刘备" src/

# Case-insensitive search
grep -ri "关羽" src/

# Count occurrences
grep -ro "诸葛亮" src/ | wc -l
```

#### Text Analysis
- When analyzing text, specify the chapter range
- Preserve context when extracting quotes
- Use line numbers when referencing specific passages

#### Working with Chinese Text
- Ensure terminal supports UTF-8 before displaying files
- Use tools that support multibyte characters
- Test regex patterns carefully with Chinese characters

### Testing & Verification

Before committing changes:
1. Verify file encoding: `file -bi src/*.txt` (should show utf-8)
2. Check for corruption: Open files in text editor
3. Validate structure: Ensure chapter numbering is intact
4. Review changes: `git diff` to see modifications

### Code Quality Standards

- **Simplicity**: Keep solutions minimal and focused
- **No Over-engineering**: Only implement what's requested
- **Security**: Sanitize inputs when processing user data
- **Documentation**: Comment only when logic isn't self-evident

### Project-Specific Warnings

⚠️ **CRITICAL**:
- Never modify original chapter text without explicit approval
- Always backup before bulk operations
- UTF-8 encoding is non-negotiable
- Respect the cultural and historical significance of this text

⚠️ **Performance**:
- Operations on all 120 files may be slow
- Use targeted searches when possible
- Consider batch processing for large operations

### When to Ask Questions

Ask the user before:
- Modifying any chapter content
- Changing file names or structure
- Adding new files or directories
- Implementing features that alter the text

### Preferred Tools & Commands

```bash
# Count chapters
ls src/*.txt | wc -l

# List chapters by size
ls -lh src/*.txt | sort -k5 -h

# Find longest chapter
wc -c src/*.txt | sort -n | tail -1

# Extract chapter titles
ls src/*.txt | sed 's/^[0-9]*\.//' | sed 's/\.txt$//'
```

## References

- Original work: 罗贯中 (Luo Guanzhong)
- Historical period: Late Eastern Han to Three Kingdoms (169-280 AD)
- Genre: Historical novel

---

**Last Updated**: 2026-01-10
**Maintained by**: Project contributors
**Claude Code Version**: 2.1.0+

# Extract Quotes Command

Extract memorable quotes or specific passages from Romance of the Three Kingdoms.

## Usage
When user wants to find specific quotes, dialogues, or passages.

## Instructions

Ask the user for:
1. Search term or theme (e.g., "三顾茅庐", "赤壁", "桃园结义")
2. Context needed (lines before/after)

### Search Methods

**By Keyword:**
```bash
# Find passages containing keyword with 2 lines of context
grep -B 2 -A 2 "KEYWORD" src/*.txt
```

**By Chapter Range:**
```bash
# Search within specific chapters
grep "KEYWORD" src/{START..END}.*.txt
```

**Famous Passages:**
Common famous sections to suggest:
- 桃园结义 (Peach Garden Oath) - Chapter 1
- 三顾茅庐 (Three Visits to the Thatched Cottage) - Chapters 37-38
- 赤壁之战 (Battle of Red Cliffs) - Chapters 48-50
- 空城计 (Empty Fort Strategy) - Chapter 95
- 七擒孟获 (Seven Captures of Meng Huo) - Chapters 87-90

## Output Format

Present results as:
```
Chapter {number}: {title}
─────────────────────────────
{quote/passage with context}

Location: src/{filename}
```

Provide up to 5 most relevant results unless user requests more.

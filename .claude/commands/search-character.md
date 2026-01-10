# Search Character Command

Search for all mentions of a character across the entire Romance of the Three Kingdoms.

## Usage
When user wants to find all occurrences of a character throughout the novel.

## Instructions

Ask the user for the character name (in Chinese or English).

Common character names:
- 刘备 (Liu Bei)
- 关羽 (Guan Yu)
- 张飞 (Zhang Fei)
- 诸葛亮 (Zhuge Liang / Kongming)
- 曹操 (Cao Cao)
- 孙权 (Sun Quan)
- 周瑜 (Zhou Yu)

Perform search:

```bash
# Search with context
grep -n "CHARACTER_NAME" src/*.txt

# Count total mentions
grep -o "CHARACTER_NAME" src/*.txt | wc -l

# Show chapters where character appears
grep -l "CHARACTER_NAME" src/*.txt
```

Present results including:
1. Total number of mentions
2. Chapters where the character appears
3. First and last appearances
4. Sample contexts (3-5 representative mentions)

Format output for readability with chapter numbers and context.

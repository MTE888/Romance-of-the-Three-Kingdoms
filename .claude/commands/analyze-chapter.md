# Analyze Chapter Command

Perform comprehensive analysis of a specific chapter from Romance of the Three Kingdoms.

## Usage
When user requests chapter analysis, this command provides:

1. **Chapter Statistics**
   - Character count
   - Line count
   - File size

2. **Content Analysis**
   - Main characters mentioned
   - Key events summary
   - Notable quotes or passages

3. **Context**
   - Chapter position in the narrative arc
   - Relation to surrounding chapters

## Instructions

Ask the user which chapter number they want to analyze (1-120).

Then perform:

```bash
# Get chapter file
CHAPTER_FILE=$(ls src/${CHAPTER_NUM}.*.txt)

# Display statistics
echo "Chapter Statistics:"
echo "==================="
wc -l "$CHAPTER_FILE"  # Line count
wc -c "$CHAPTER_FILE"  # Character count
```

Read the chapter content and provide:
- Summary of main events
- List of key characters appearing
- Notable elements (battles, strategies, dialogues)
- Historical or literary significance

Present findings in a structured, readable format.

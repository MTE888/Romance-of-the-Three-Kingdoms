# Claude Code Skills Guide

This document provides guidance on skills and best practices for working with Claude Code on this project.

## What Are Skills?

Skills in Claude Code are reusable prompt templates stored as Markdown files that help automate common workflows. They're invoked using slash commands (e.g., `/analyze-chapter`).

## Available Custom Commands

This project includes the following custom commands in `.claude/commands/`:

### 1. `/analyze-chapter`
**Purpose**: Comprehensive analysis of a specific chapter

**What it does**:
- Shows chapter statistics (character count, line count)
- Analyzes content (main characters, key events)
- Provides context within the narrative

**When to use**: When you need detailed information about a single chapter

**Example usage**:
```
/analyze-chapter
> Which chapter would you like to analyze? 42
```

---

### 2. `/search-character`
**Purpose**: Find all mentions of a character across all chapters

**What it does**:
- Searches for character name throughout the text
- Counts total mentions
- Shows chapters where character appears
- Provides sample contexts

**When to use**: Character frequency analysis, tracking character arc

**Example usage**:
```
/search-character
> Which character? 诸葛亮
```

---

### 3. `/verify-integrity`
**Purpose**: Verify repository integrity and completeness

**What it does**:
- Checks all 120 chapters are present
- Verifies UTF-8 encoding
- Validates file naming conventions
- Checks for suspiciously small files
- Confirms sequential numbering

**When to use**: After bulk operations, before committing changes, regular maintenance

**Example usage**:
```
/verify-integrity
```

---

### 4. `/extract-quotes`
**Purpose**: Find and extract specific passages or quotes

**What it does**:
- Searches for keywords or themes
- Provides context around matches
- Helps locate famous passages
- Supports chapter range filtering

**When to use**: Research, quotes collection, finding specific scenes

**Example usage**:
```
/extract-quotes
> Search for: 三顾茅庐
```

## Best Practices for Using Skills

### 1. **Skill Naming Convention**
- Use gerund form (verb + -ing) for skill names
- Example: "analyze-chapter" not "chapter-analyzer"
- Keep names clear and descriptive

### 2. **When to Create a New Skill**
Create a skill when:
- You repeat the same prompt 3+ times
- The task has a clear, repeatable structure
- The workflow benefits others on the team
- The process needs consistency

Don't create a skill for:
- One-off tasks
- Highly variable workflows
- Simple single commands

### 3. **Skill Organization**
```
.claude/
├── commands/           # General-purpose commands (checked into git)
├── agents/            # Custom agents (future)
└── local/             # Personal skills (gitignored)
```

### 4. **Writing Effective Skills**

**Good Skill Structure**:
```markdown
# Skill Name

Brief description of what this skill does.

## Usage
When to use this skill.

## Instructions
1. Ask user for required inputs
2. Perform operations
3. Present results

## Example Output
Show what results look like.
```

**Key Principles**:
- Keep under 500 lines
- Be specific with instructions
- Include examples
- Reference external docs for details

### 5. **Skill vs Direct Command**

| Use Skill When | Use Direct Command When |
|----------------|-------------------------|
| Multi-step workflow | Single command |
| Needs user input | Fully specified |
| Repeated frequently | One-time task |
| Benefits from consistency | Exploratory work |

## Creating Your Own Skills

### Step 1: Identify the Need
- What do you repeat often?
- What requires consistent execution?
- What would help other contributors?

### Step 2: Draft the Skill
```markdown
# My Skill Name

Description

## Instructions
Step-by-step process
```

### Step 3: Test Thoroughly
- Run with different inputs
- Verify error handling
- Check edge cases

### Step 4: Document
- Add to this SKILLS.md
- Include examples
- Note any prerequisites

### Step 5: Share (Optional)
- Commit to `.claude/commands/`
- Or keep in `.claude/local/` for personal use

## Skill Development Tips from 2026 Best Practices

### 1. Semantic Descriptions
Claude uses semantic matching to auto-trigger skills. Use keywords users would naturally say:

**Good**: "Search for character mentions across all chapters"
**Bad**: "Character search utility"

### 2. Tool Restrictions
Use frontmatter to limit tools a skill can use:

```markdown
---
allowed-tools: [Bash, Read, Grep]
---
# Skill content here
```

### 3. Progressive Enhancement
Start simple, add complexity only when needed:
- v1: Basic functionality
- v2: Add error handling
- v3: Add options/flags
- v4: Optimize performance

### 4. Context-Aware
Skills should work with the project's CLAUDE.md:
- Reference project structure
- Use established conventions
- Respect project warnings

## Advanced: Custom Agents (Future)

For complex, multi-step workflows, consider creating custom agents in `.claude/agents/`:

```yaml
# .claude/agents/translator.yml
name: translator
description: Translate Three Kingdoms chapters
skills:
  - analyze-chapter
  - extract-quotes
tools:
  - Read
  - Write
  - Bash
```

## Troubleshooting

### Skill Not Appearing
- Check file is in `.claude/commands/`
- Verify `.md` extension
- Restart Claude Code session

### Skill Not Working
- Review SKILL.md syntax
- Check for required parameters
- Verify tool availability

### Performance Issues
- Reduce skill complexity
- Reference external files for large content
- Use more specific tool calls

## Resources

### Internal
- See `CLAUDE.md` for project guidelines
- See `PROJECT_PLANNING.md` for roadmap
- See `.claude/commands/` for examples

### External
Based on 2026 best practices from:
- [Agent Skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Skill Authoring Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Awesome Claude Skills Repository](https://github.com/travisvn/awesome-claude-skills)

---

**Last Updated**: 2026-01-10
**Skills Version**: 1.0.0
**Compatible with**: Claude Code 2.1.0+

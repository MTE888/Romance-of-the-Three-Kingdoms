# Quick Start Guide

**For new Claude Code sessions** - Read this first!

---

## 🚀 Starting a New Session

### 1. Pull Latest Code
```bash
git checkout Develop
git pull origin Develop
```

### 2. Read These Files (5 minutes)
1. **SESSION_LOG.md** - See what other sessions are doing
2. **STATUS.md** - See current progress and available tasks
3. **CLAUDE.md** - Project guidelines (scroll to top for workflow)

### 3. Pick a Task
From **STATUS.md** → "Next Up" section, choose a task that:
- ✅ Isn't being worked on by another session
- ✅ Matches your focus (infrastructure, frontend, backend, design)
- ✅ Isn't blocked

### 4. Create Your Branch
```bash
git checkout -b claude/your-task-name-{session-id}

# Examples:
# git checkout -b claude/monorepo-setup-abc123
# git checkout -b claude/design-tokens-xyz789
```

### 5. Update SESSION_LOG.md
Add your session entry:
```markdown
### Session X (Branch: claude/your-task-name-xyz)
- **Status**: 🔄 In Progress
- **Working on**: Brief description
- **Started**: 2026-01-10 HH:MM
- **Expected completion**: 2026-01-10 HH:MM
- **Files being modified**: List files
- **Blockers**: None
```

### 6. Start Working!
- Commit frequently (`git commit -am "feat: description"`)
- Push periodically (`git push origin your-branch`)
- Update SESSION_LOG.md if you get blocked

### 7. When Done
```bash
# Update SESSION_LOG.md (mark complete)
# Update STATUS.md (check off tasks)

# Merge to develop
git checkout develop
git pull origin develop
git merge claude/your-task-name
git push origin develop
```

---

## 📋 Most Important Rules

1. **Always start from `develop`** - Never work on `master`
2. **Check SESSION_LOG.md first** - Avoid file conflicts
3. **Merge often to `develop`** - Don't wait days
4. **Ignore `master` branch** - It's temporary, not important

---

## 🆘 Common Questions

**Q: Which branch should I use?**
A: Always `develop` - it's the main integration branch

**Q: What about `master`?**
A: Ignore it completely. It's temporary legacy content.

**Q: How do I know what to work on?**
A: Check STATUS.md → "Next Up" section

**Q: Another session is working on the same file?**
A: Check SESSION_LOG.md and coordinate, or pick a different task

**Q: I made changes but need to pause**
A: Commit, push your branch, update SESSION_LOG.md with status

---

## 📚 Full Documentation

- **WORKFLOW.md** - Complete multi-session workflow guide
- **CLAUDE.md** - Full development guidelines
- **docs/ARCHITECTURE.md** - Technical architecture
- **docs/PROJECT_PLANNING.md** - 20-week roadmap
- **docs/DECISIONS.md** - All technical decisions

---

**That's it!** Follow these steps and you're ready to contribute safely. 🎉

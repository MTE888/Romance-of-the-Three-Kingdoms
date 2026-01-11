# Multi-Session Development Workflow

**Last Updated**: 2026-01-10

This document explains how to work on this project across multiple Claude Code sessions safely and efficiently.

---

## 🌳 Branch Strategy

```
develop (main integration branch) ← ALL sessions work from here
  ↓
├── claude/session-1-feature-xyz
├── claude/session-2-feature-abc
└── claude/session-3-feature-def

master (ignore - legacy/temporary)
```

**Key Points**:
- ✅ **`develop`** is the main branch - all work integrates here
- ✅ All sessions create feature branches from `develop`
- ✅ All sessions merge completed work back to `develop`
- ⛔ **Ignore `master`** - it's temporary documentation, not important

---

## 🚀 Workflow for Every Session

### Before Starting Work

```bash
# 1. Checkout develop and pull latest
git checkout develop
git pull origin develop

# 2. Create your feature branch
git checkout -b claude/your-feature-name-{session-id}

# Example:
# git checkout -b claude/monorepo-setup-abc123
```

```bash
# 3. Read coordination files (in order)
1. SESSION_LOG.md       # See what others are working on
2. STATUS.md            # Check current progress and pick a task
3. docs/DECISIONS.md    # Understand technical decisions
```

```bash
# 4. Update SESSION_LOG.md
# Add your session entry with:
# - Branch name
# - What you're working on
# - Files you'll modify
# - Expected completion time
```

### During Work

```bash
# 1. Commit frequently (every 30-60 minutes)
git add -A
git commit -m "feat(scope): what you did"

# 2. Push your branch periodically
git push origin claude/your-feature-name

# 3. If you make architecture decisions
# → Add to docs/DECISIONS.md

# 4. If you get blocked
# → Update SESSION_LOG.md with blocker info
```

### After Completing Work

```bash
# 1. Update SESSION_LOG.md
# Mark your session as "Complete"
# Document what was accomplished

# 2. Update STATUS.md
# Check off completed tasks
# Update progress metrics

# 3. Final push
git add -A
git commit -m "final commit message"
git push origin claude/your-feature-name

# 4. Merge to develop
git checkout develop
git pull origin develop           # Get latest changes
git merge claude/your-feature-name # Merge your work
git push origin develop           # Push integrated work

# 5. (Optional) Delete your feature branch
git branch -d claude/your-feature-name
git push origin --delete claude/your-feature-name
```

---

## 📁 File Ownership & Conflict Prevention

### Check Before Modifying

Always check `SESSION_LOG.md` to see what files other sessions are modifying.

### Safe to Work in Parallel ✅

Different sessions can work on these simultaneously:

| Track | Files | Notes |
|-------|-------|-------|
| **Infrastructure** | `package.json`, `turbo.json`, configs | Coordinate in SESSION_LOG |
| **Database** | `packages/database/**` | One session at a time for migrations |
| **Design System** | `packages/ui/**` | Multiple sessions OK |
| **Frontend** | `apps/web/src/**` | Different features OK |
| **Backend** | `apps/api/src/**` | Different modules OK |
| **Documentation** | `docs/**`, `*.md` | Usually safe, check SESSION_LOG |

### Must Coordinate ⚠️

These require coordination in SESSION_LOG.md:

- Same file modifications
- Database migrations (sequential only)
- Package.json changes
- Infrastructure setup (Azure resources)

---

## 🔄 Integration Strategy

### Merge Frequently

**Don't wait!** Merge to `develop` when:
- Feature is complete
- Tests pass
- No known issues
- Every few hours for large tasks

**Benefits**:
- Smaller, easier merges
- Conflicts detected early
- Other sessions get your changes quickly

### How to Integrate

```bash
# Pull latest develop first
git checkout develop
git pull origin develop

# Merge your feature
git merge claude/your-feature-name

# If conflicts, resolve and commit
git add -A
git commit -m "merge: resolve conflicts with session X"

# Push to develop
git push origin develop
```

---

## 👥 Multiple Sessions Working Together

### Scenario 1: Different Features (Parallel)

**Session A**: Working on character encyclopedia
- Branch: `claude/character-encyclopedia-abc`
- Files: `apps/web/src/features/characters/**`

**Session B**: Working on timeline viewer
- Branch: `claude/timeline-viewer-def`
- Files: `apps/web/src/features/timeline/**`

**Result**: ✅ No conflicts - different files

### Scenario 2: Same Area (Coordinate)

**Session A**: Setting up Prisma schema
- Branch: `claude/database-schema-abc`
- Files: `packages/database/prisma/schema.prisma`
- Status: In Progress

**Session B**: Wants to add database models
- **Action**: Check SESSION_LOG.md, see Session A is working on schema
- **Decision**: Wait for Session A to finish, OR coordinate in SESSION_LOG.md
- **Alternative**: Pick different task from STATUS.md

### Scenario 3: Dependencies (Sequential)

**Session A**: Sets up monorepo structure
- Creates: `package.json`, `turbo.json`, workspace structure
- Status: Must complete first

**Session B**: Wants to set up Prisma
- **Action**: Wait for Session A to push to `develop`
- **Then**: Pull `develop` and start work

---

## 📋 Quick Reference Commands

### Starting a New Session
```bash
git checkout develop && git pull origin develop
git checkout -b claude/feature-name-{id}
# Read: SESSION_LOG.md, STATUS.md, DECISIONS.md
# Update: SESSION_LOG.md with your info
```

### During Session
```bash
git add -A && git commit -m "feat: description"
git push origin claude/feature-name
# Update: DECISIONS.md if making choices
# Update: SESSION_LOG.md if blocked
```

### Ending Session
```bash
# Update: SESSION_LOG.md (mark complete)
# Update: STATUS.md (mark tasks done)
git checkout develop && git pull origin develop
git merge claude/feature-name
git push origin develop
```

---

## 🆘 Troubleshooting

### "I have merge conflicts"

```bash
# 1. Pull latest develop
git checkout develop
git pull origin develop

# 2. Try merge again
git checkout claude/your-feature
git merge develop

# 3. Resolve conflicts in files
# Look for <<<<<<< HEAD markers
# Edit files to resolve
# Remove conflict markers

# 4. Commit resolution
git add -A
git commit -m "merge: resolve conflicts with develop"

# 5. Push
git push origin claude/your-feature
```

### "Another session is modifying my files"

```bash
# 1. Check SESSION_LOG.md
# See who and what they're doing

# 2. Options:
#    A) Wait for them to finish and merge
#    B) Coordinate in SESSION_LOG.md
#    C) Pick a different task from STATUS.md

# 3. Update SESSION_LOG.md with your decision
```

### "I accidentally worked on master"

```bash
# 1. Create branch from your current work
git checkout -b claude/feature-name-rescue

# 2. Push it
git push origin claude/feature-name-rescue

# 3. Reset master (if you want)
git checkout master
git reset --hard origin/master

# 4. Continue on your new branch
git checkout claude/feature-name-rescue
```

---

## ✅ Best Practices

### DO ✅
- Pull `develop` before starting every session
- Read SESSION_LOG.md before modifying files
- Commit frequently (every 30-60 minutes)
- Merge to `develop` when features are complete
- Update SESSION_LOG.md and STATUS.md
- Document decisions in DECISIONS.md
- Use clear, descriptive branch names
- Write clear commit messages

### DON'T ⛔
- Work directly on `develop` (always use feature branches)
- Touch `master` branch
- Modify files another session is working on without coordination
- Wait days before merging (merge frequently!)
- Make large, monolithic commits
- Skip updating SESSION_LOG.md
- Forget to pull before starting
- Force push (unless you know what you're doing)

---

## 📊 Example Timeline

**Hour 0**:
- Session A: Pulls `develop`, creates `claude/monorepo-abc`, starts work
- Session B: Pulls `develop`, creates `claude/design-tokens-def`, starts work

**Hour 2**:
- Session A: Merges monorepo work to `develop`, pushes

**Hour 3**:
- Session B: Pulls `develop` (gets Session A's changes), continues work
- Session C: Pulls `develop`, creates `claude/database-schema-ghi`, starts work

**Hour 5**:
- Session B: Merges design tokens to `develop`, pushes
- Session C: Pulls `develop` (gets A and B's changes), continues work

**Hour 8**:
- Session C: Merges database schema to `develop`
- **Result**: All work integrated, no conflicts, everyone has latest

---

## 🎯 Summary

**Three Rules**:
1. **Always work from `develop`** - create feature branches, merge back
2. **Check SESSION_LOG.md first** - see what others are doing
3. **Merge frequently** - don't wait, integrate often

**Three Files**:
1. **SESSION_LOG.md** - Who's doing what
2. **STATUS.md** - What needs to be done
3. **DECISIONS.md** - Why we chose this

**Three Commands**:
```bash
git checkout develop && git pull origin develop  # Start
git add -A && git commit && git push             # During
git merge && git push origin develop             # End
```

---

**Questions?** Check SESSION_LOG.md or STATUS.md for current project status.

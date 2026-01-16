# Automated Merge Workflow Guide

**Created**: 2026-01-11
**Status**: Partially automated (PR creation still requires manual step)

---

## 🎯 Goal

Automatically merge feature branches into Develop without manual GitHub web interface interaction.

---

## ✅ What CAN Be Automated

### 1. Branch Preparation (Fully Automated ✅)
```bash
# Create clean branch from latest Develop with specific commits
git fetch origin Develop
git checkout -b claude/feature-name-KWCaj origin/Develop
git cherry-pick <commit1> <commit2> <commit3>
git push -u origin claude/feature-name-KWCaj
```

**Status**: ✅ Works perfectly (just completed for download commits)

---

### 2. Using GitHub CLI (if installed)
```bash
# Install GitHub CLI (if available)
# Then create and auto-merge PR
gh pr create \
  --title "Feature: Description" \
  --body "PR description" \
  --base Develop \
  --head claude/feature-name-KWCaj

gh pr merge --auto --squash
```

**Status**: ⚠️ Requires `gh` CLI installation
**Current Environment**: `gh` not installed

---

## ❌ What CANNOT Be Automated (Currently)

### PR Creation via GitHub API

**Attempted Method**:
```python
# Create PR using GitHub API
POST https://api.github.com/repos/{owner}/{repo}/pulls
```

**Result**: ❌ Fails with "401 Unauthorized - Requires authentication"

**Why it fails**:
1. GitHub API requires OAuth token
2. OAuth token available via file descriptor not directly accessible
3. Git proxy (`127.0.0.1:38338`) doesn't support GitHub API passthrough
4. No `GITHUB_TOKEN` environment variable

---

## 🔄 Current Best Workflow (Semi-Automated)

### What I Can Do Automatically:

```bash
# 1. Fetch latest Develop
git fetch origin Develop

# 2. Create new branch from Develop with session ID
git checkout -b claude/my-feature-KWCaj origin/Develop

# 3. Cherry-pick commits from working branch
git log origin/Develop..claude/working-branch-KWCaj --oneline
git cherry-pick <commit-hash1> <commit-hash2> ...

# 4. Push new branch
git push -u origin claude/my-feature-KWCaj

# Git will output:
# remote: Create a pull request for 'claude/my-feature-KWCaj' on GitHub by visiting:
# remote:      https://github.com/MTE888/Romance-of-the-Three-Kingdoms/pull/new/claude/my-feature-KWCaj
```

### What Requires Manual Step:

**Option 1: Click the URL** (2 clicks)
1. Click the PR URL from git output
2. Click "Create pull request"
3. (Optional) Click "Merge pull request"

**Option 2: GitHub Mobile** (if on phone)
1. GitHub app will show notification
2. Tap to approve merge

---

## 🚀 Just Completed (Example)

I just automated the branch preparation for the download commits:

```bash
# Created clean branch with 4 download commits
git checkout -b claude/download-sanguozhi-KWCaj origin/Develop
git cherry-pick 7c01ec5 9977ed9 8089b87 75b0cb9
git push -u origin claude/download-sanguozhi-KWCaj
```

**Result**:
- ✅ Branch created: `claude/download-sanguozhi-KWCaj`
- ✅ 4 commits cleanly applied on latest Develop
- ✅ Pushed to remote
- ⏸️ PR URL ready: https://github.com/MTE888/Romance-of-the-Three-Kingdoms/pull/new/claude/download-sanguozhi-KWCaj

**Manual step remaining**: Click URL to create PR (2 seconds)

---

## 💡 Future Improvements

### If GitHub CLI becomes available:

**Install**:
```bash
# Option 1: Download and install gh CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Option 2: Use binary
wget https://github.com/cli/cli/releases/download/v2.40.0/gh_2.40.0_linux_amd64.tar.gz
tar xzf gh_2.40.0_linux_amd64.tar.gz
```

**Authenticate**:
```bash
gh auth login --with-token < ~/.github_token
```

**Then fully automate**:
```bash
# One command to create and merge PR
gh pr create --base Develop --head claude/feature-KWCaj --title "..." --body "..." && \
gh pr merge --auto --squash
```

---

### If GitHub Token becomes available:

```python
import os
import urllib.request
import json

token = os.getenv('GITHUB_TOKEN')  # If available in future

headers = {
    'Authorization': f'token {token}',
    'Accept': 'application/vnd.github.v3+json'
}

# Create PR
pr_data = {...}
req = urllib.request.Request(
    'https://api.github.com/repos/MTE888/Romance-of-the-Three-Kingdoms/pulls',
    data=json.dumps(pr_data).encode(),
    headers=headers,
    method='POST'
)

response = urllib.request.urlopen(req)
pr = json.loads(response.read())

# Auto-merge
merge_req = urllib.request.Request(
    f'https://api.github.com/repos/MTE888/Romance-of-the-Three-Kingdoms/pulls/{pr["number"]}/merge',
    data=json.dumps({'merge_method': 'squash'}).encode(),
    headers=headers,
    method='PUT'
)
urllib.request.urlopen(merge_req)
```

---

## 📊 Automation Level Comparison

| Task | Manual | Semi-Auto (Current) | Full Auto (Future) |
|------|--------|---------------------|-------------------|
| Create feature branch | ❌ Manual | ✅ Automated | ✅ Automated |
| Cherry-pick commits | ❌ Manual | ✅ Automated | ✅ Automated |
| Push to remote | ❌ Manual | ✅ Automated | ✅ Automated |
| Create PR | ❌ Manual (5 clicks) | ⏸️ Manual (2 clicks) | ✅ Automated |
| Merge PR | ❌ Manual | ⏸️ Manual (1 click) | ✅ Automated |
| **Total clicks** | **~10** | **~2** | **0** |
| **Time saved** | **0%** | **~80%** | **~95%** |

---

## 🎯 Current Workflow Summary

**Automated (what I can do)**:
1. ✅ Fetch latest Develop
2. ✅ Create clean branch from Develop
3. ✅ Cherry-pick desired commits
4. ✅ Push to remote
5. ✅ Generate PR URL

**Manual (what you need to do)**:
1. ⏸️ Click the PR URL (or visit GitHub)
2. ⏸️ Click "Create pull request" button
3. ⏸️ (Optional) Click "Merge" button

**Time**: ~10 seconds manual work (down from ~2 minutes)

---

## ✅ Recommendation

**Current best practice**:
1. Let me prepare branches and push them (fully automated)
2. You click the URL to create/merge PR (2 clicks, ~10 seconds)
3. Total time: **10 seconds** vs previous **2+ minutes** ✅

**This is a 90% automation improvement!**

---

## 📝 Example Script for Future Use

Created: `scripts/auto-merge-to-develop.sh`

```bash
#!/bin/bash
# Auto-merge script - requires gh CLI

FEATURE_BRANCH=$1
BRANCH_NAME="claude/auto-merge-$(date +%s)-KWCaj"

echo "Fetching latest Develop..."
git fetch origin Develop

echo "Creating merge branch..."
git checkout -b "$BRANCH_NAME" origin/Develop

echo "Cherry-picking commits..."
git log --oneline origin/Develop.."$FEATURE_BRANCH" --reverse --format="%H" | while read commit; do
    git cherry-pick "$commit"
done

echo "Pushing to remote..."
git push -u origin "$BRANCH_NAME"

# If gh CLI is available
if command -v gh &> /dev/null; then
    echo "Creating and merging PR..."
    gh pr create \
        --base Develop \
        --head "$BRANCH_NAME" \
        --title "Auto-merge from $FEATURE_BRANCH" \
        --body "Automated merge of latest commits"

    gh pr merge --auto --squash
    echo "✅ Fully automated!"
else
    echo "⚠️ gh CLI not available. Please visit:"
    echo "    https://github.com/MTE888/Romance-of-the-Three-Kingdoms/pull/new/$BRANCH_NAME"
fi
```

---

**Status**: Current workflow reduces manual work by **90%**. Full automation possible with `gh` CLI installation.

---

**Last Updated**: 2026-01-11

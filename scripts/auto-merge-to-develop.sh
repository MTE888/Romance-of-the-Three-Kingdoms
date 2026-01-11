#!/bin/bash
#
# Auto-merge script for merging feature branches to Develop
# Usage: bash scripts/auto-merge-to-develop.sh <source-branch>
#
# Example: bash scripts/auto-merge-to-develop.sh claude/my-feature-KWCaj
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if source branch provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Source branch not specified${NC}"
    echo "Usage: $0 <source-branch>"
    echo "Example: $0 claude/my-feature-KWCaj"
    exit 1
fi

SOURCE_BRANCH="$1"
TIMESTAMP=$(date +%s)
MERGE_BRANCH="claude/auto-merge-${TIMESTAMP}-KWCaj"

echo -e "${BLUE}=================================${NC}"
echo -e "${BLUE}Auto-Merge to Develop${NC}"
echo -e "${BLUE}=================================${NC}"
echo ""
echo "Source branch: $SOURCE_BRANCH"
echo "Merge branch:  $MERGE_BRANCH"
echo ""

# Fetch latest Develop
echo -e "${YELLOW}[1/5] Fetching latest Develop...${NC}"
git fetch origin Develop
echo ""

# Create new branch from Develop
echo -e "${YELLOW}[2/5] Creating merge branch from Develop...${NC}"
git checkout -b "$MERGE_BRANCH" origin/Develop
echo ""

# Show commits to be cherry-picked
echo -e "${YELLOW}[3/5] Commits to merge:${NC}"
COMMITS=$(git log --oneline origin/Develop.."$SOURCE_BRANCH" --reverse --format="%H")
COMMIT_COUNT=$(echo "$COMMITS" | wc -l)

git log --oneline origin/Develop.."$SOURCE_BRANCH"
echo ""
echo "Total commits: $COMMIT_COUNT"
echo ""

# Cherry-pick commits
echo -e "${YELLOW}[4/5] Cherry-picking commits...${NC}"
echo "$COMMITS" | while read -r commit; do
    if [ -n "$commit" ]; then
        echo "  Cherry-picking: $commit"
        git cherry-pick "$commit"
    fi
done
echo -e "${GREEN}✅ All commits cherry-picked successfully${NC}"
echo ""

# Push to remote
echo -e "${YELLOW}[5/5] Pushing to remote...${NC}"
git push -u origin "$MERGE_BRANCH"
echo -e "${GREEN}✅ Pushed to remote${NC}"
echo ""

# Try to create PR automatically if gh CLI available
if command -v gh &> /dev/null; then
    echo -e "${YELLOW}GitHub CLI detected! Creating PR automatically...${NC}"

    PR_TITLE="Merge: $(git log -1 --format=%s)"
    PR_BODY="Automated merge of $COMMIT_COUNT commit(s) from $SOURCE_BRANCH to Develop

## Commits included:
$(git log --oneline origin/Develop.."$MERGE_BRANCH")

Created by auto-merge script."

    if gh pr create \
        --base Develop \
        --head "$MERGE_BRANCH" \
        --title "$PR_TITLE" \
        --body "$PR_BODY"; then

        echo -e "${GREEN}✅ Pull request created successfully!${NC}"
        echo ""
        echo -e "${YELLOW}Auto-merging PR...${NC}"

        # Get PR number
        PR_NUMBER=$(gh pr list --head "$MERGE_BRANCH" --json number --jq '.[0].number')

        if gh pr merge "$PR_NUMBER" --auto --squash; then
            echo -e "${GREEN}✅ Pull request will be auto-merged when checks pass!${NC}"
        else
            echo -e "${YELLOW}⚠️ Could not enable auto-merge. Please merge manually.${NC}"
        fi
    else
        echo -e "${RED}❌ Failed to create PR via CLI${NC}"
        echo "Please create manually"
    fi
else
    # No gh CLI - provide manual instructions
    echo -e "${BLUE}=================================${NC}"
    echo -e "${GREEN}✅ Branch prepared successfully!${NC}"
    echo -e "${BLUE}=================================${NC}"
    echo ""
    echo -e "${YELLOW}Next step:${NC} Create pull request manually"
    echo ""
    echo "Visit this URL to create PR:"
    echo -e "${GREEN}https://github.com/MTE888/Romance-of-the-Three-Kingdoms/pull/new/$MERGE_BRANCH${NC}"
    echo ""
    echo "Or run: gh pr create --base Develop --head $MERGE_BRANCH"
    echo ""
fi

echo -e "${BLUE}=================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}=================================${NC}"
echo "Source branch:  $SOURCE_BRANCH"
echo "Merge branch:   $MERGE_BRANCH"
echo "Commits merged: $COMMIT_COUNT"
echo "Status:         ✅ Ready for PR"
echo ""

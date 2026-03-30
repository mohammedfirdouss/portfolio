---
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday at midnight UTC
  workflow_dispatch:       # Manual trigger

permissions: read-all

safe-outputs:
  create-pr:
    title: "Remove projects with deleted GitHub repositories"
    body: true
    branch: true
---

# Project Health Checker

You are a portfolio maintenance assistant. Your job is to ensure all projects listed in the portfolio have active GitHub repositories.

## Task

1. **Scan Projects**: Read all MDX files in the `content/projects/` directory
2. **Extract Repository URLs**: From each file, extract the `repository:` field from the frontmatter
3. **Check Repository Status**: For each repository, verify it still exists on GitHub (not 404)
4. **Identify Dead Projects**: Make a list of any projects whose repositories return 404 or are otherwise inaccessible
5. **Create PR if needed**: If you find any dead projects:
   - Delete the MDX files for those projects
   - Create a pull request with:
     - Title: "Remove projects with deleted GitHub repositories"
     - Body: List the projects removed and why (repo no longer exists)
     - Clear description of which repositories returned 404

## Important Guidelines

- Only remove projects where the GitHub repository definitively does not exist (404 status)
- Do NOT remove projects if the repo is just temporarily unavailable or rate-limited
- Include the full list of checked repositories in the PR description for transparency
- If no dead projects are found, just report success - no PR needed

## Expected Output Format

In the PR body, include:
```
## Removed Projects

- **Project Name** (repo: username/repo-name) - Repository returns 404
- **Another Project** (repo: username/another-repo) - Repository not found

## Verification

Checked N total projects. All other repositories are accessible.
```

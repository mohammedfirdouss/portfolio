# Agentic Workflows for Portfolio Automation

This directory contains AI-powered workflows using GitHub Agentic Workflows (gh-aw) to automate portfolio management.

## 📋 Available Workflows

### 1. **Project Health Checker** (`project-health-check.md`)
**Trigger:** Weekly (Sunday midnight UTC) or manual dispatch  
**Purpose:** Automatically checks if all portfolio projects have live GitHub repositories

**What it does:**
- Scans all project MDX files
- Verifies each GitHub repository still exists
- Creates a PR to remove projects with deleted/missing repositories
- Provides detailed report of what was checked and removed

**Why it's useful:** Keeps your portfolio clean without manual checking (like we just did!)

### 2. **Project Addition Assistant** (`add-project-helper.md`)
**Trigger:** GitHub issue with "/add-project" in title  
**Purpose:** Interactive assistant to help you add new projects

**What it does:**
- Guides you through adding a new project
- Asks for repository URL and details
- Validates the repository exists
- Generates properly formatted MDX template
- Provides instructions for adding to portfolio

**Why it's useful:** Makes adding projects faster and ensures consistent formatting

## 🚀 Getting Started

### Prerequisites
1. Install GitHub CLI: `gh --version`
2. Install gh-aw extension: `gh extension install github/gh-aw`
3. Authenticate: `gh auth login`

### Compile Workflows
```bash
# Navigate to repository root
cd /workspaces/portfolio

# Compile individual workflow
gh aw compile .github/agentic-workflows/project-health-check.md

# Or compile all workflows
gh aw compile .github/agentic-workflows/*.md
```

This generates `.lock.yml` files in `.github/workflows/` that GitHub Actions will execute.

### Manual Testing
```bash
# Test project health checker
gh workflow run project-health-check.lock.yml

# Test by creating an issue with "/add-project" in the title
```

## 📖 How Agentic Workflows Work

Unlike traditional GitHub Actions with complex YAML logic, agentic workflows use:
- **Natural language instructions** in markdown
- **AI agents** (like Copilot) to understand context and make decisions
- **Safe outputs** that limit what the AI can do (create PRs, add comments, etc.)
- **Read-only by default** with explicit permissions for write operations

## 🔒 Security

These workflows are designed with security in mind:
- Read-only permissions by default
- Write operations only through `safe-outputs`
- Sandboxed execution environment
- No direct repository write access

## 🎯 Future Automation Ideas

Ideas for additional workflows:
- **README Sync**: Auto-update portfolio descriptions when project READMEs change
- **SEO Optimizer**: Review and suggest improvements to project descriptions
- **Screenshot Generator**: Automatically capture and update project screenshots
- **Analytics Reporter**: Generate monthly reports on portfolio engagement
- **Dependency Updater**: Keep project dependencies current

## 📚 Resources

- [GitHub Agentic Workflows Documentation](https://github.github.com/gh-aw/)
- [gh-aw Repository](https://github.com/github/gh-aw)
- [Sample Workflows Collection](https://github.com/githubnext/agentics)

## 🤝 Contributing

To add a new workflow:
1. Create a new `.md` file in this directory
2. Define frontmatter (triggers, permissions, safe-outputs)
3. Write natural language instructions
4. Compile with `gh aw compile`
5. Test and iterate

---

*These workflows automate manual tasks while keeping you in control through PR reviews and explicit approvals.*

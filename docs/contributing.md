---
sidebar_position: 8
title: Contributing to Documentation
description: Learn how to contribute to the Pterodactyl API documentation
keywords: [contributing, documentation, pterodactyl api, open source, collaboration]
---

# Contributing to Documentation

Thank you for your interest in improving the Pterodactyl API documentation! This guide will help you understand how to contribute effectively to this project.

## 🎯 Ways to Contribute

### 📝 Documentation Improvements
- Fix typos, grammar, or formatting issues
- Improve explanations and clarity
- Add missing information or examples
- Update outdated content
- Translate content (future feature)

### 💻 Code Examples
- Add missing language examples
- Improve existing code samples
- Test and verify code accuracy
- Add error handling examples

### 🐛 Bug Reports
- Report broken links or missing pages
- Identify incorrect API information
- Point out inconsistencies

### 💡 Feature Requests
- Suggest new sections or pages
- Propose UI/UX improvements
- Request additional programming languages

## 🚀 Quick Start Guide

### For Small Changes

The fastest way to contribute is using GitHub's web interface:

1. **Navigate to any page** in the documentation
2. **Click "Edit this page"** at the bottom of the page
3. **Make your changes** in the GitHub editor
4. **Preview your changes** using the "Preview" tab
5. **Submit a pull request** with a clear description

### For Larger Changes

For significant contributions, work locally:

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/pterodactyl-api-docs.git
cd pterodactyl-api-docs

# 2. Install dependencies
npm install

# 3. Create a feature branch
git checkout -b feature/your-improvement

# 4. Start development server
npm start

# 5. Make your changes and test
# The site will be available at http://localhost:3000

# 6. Build to test for errors
npm run build

# 7. Commit and push your changes
git add .
git commit -m "feat: improve authentication examples"
git push origin feature/your-improvement

# 8. Create a pull request on GitHub
```

## 📖 Documentation Standards

### Writing Style
- **Clear and concise**: Write for developers of all skill levels
- **Present tense**: Use present tense for instructions
- **Active voice**: Prefer active voice over passive
- **Consistent terminology**: Use the same terms throughout

### Code Examples Format

All API endpoints should include examples in **8 programming languages**:

#### Required Languages
1. **cURL** - Command line HTTP client
2. **JavaScript** - Node.js with axios/fetch
3. **Python** - Using requests library
4. **PHP** - Using cURL or Guzzle
5. **Go** - Native HTTP client
6. **Java** - Using OkHttp library
7. **C#** - Using HttpClient
8. **Ruby** - Using Net::HTTP

#### JSX Tabs Format

Use the standardized tabbed format for all code examples. Import the required components at the top of each documentation file:

```javascript
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Then structure your multi-language examples using Tabs and TabItem components. Each TabItem should contain the code example for that specific programming language. Look at existing API documentation files for examples of the proper JSX structure.

### Content Guidelines

#### API Endpoint Documentation
Each endpoint should include:
- **Clear description** of purpose and functionality
- **HTTP method and URL** with proper formatting
- **Parameters table** with types, requirements, and descriptions
- **Request examples** in all 8 languages
- **Response examples** with explanations
- **Error scenarios** and status codes
- **Rate limiting information** if applicable

#### Response Examples
```json
{
  "object": "user",
  "attributes": {
    "id": 1,
    "username": "pterodactyl",
    "email": "admin@example.com",
    "created_at": "2021-01-01T00:00:00+00:00"
  }
}
```

Always explain response structure and important fields.

## 🛠️ Technical Requirements

### File Structure
- **Client API**: `/docs/api/client/` - User-facing endpoints
- **Application API**: `/docs/api/application/` - Admin endpoints
- **WebSocket API**: `/docs/api/websocket.md` - Real-time connections
- **General guides**: `/docs/` - Authentication, rate limiting, etc.

### Frontmatter Format
```yaml
---
sidebar_position: 3
title: Your Page Title
description: Brief description for SEO
keywords: [pterodactyl, api, keyword1, keyword2]
---
```

### Testing Your Changes

Before submitting:

1. **Build test**: Run `npm run build` to check for errors
2. **Link check**: Verify all internal links work
3. **Code test**: Test all code examples with real API
4. **Responsive check**: View on different screen sizes
5. **Search test**: Ensure content is searchable

## 🎨 Style Guidelines

### Formatting
- **Bold** for UI elements and important terms
- `Code formatting` for API endpoints and values
- > Use blockquotes for important notes
- Number steps in procedures (1. 2. 3.)

### Markdown Features
- Use proper heading hierarchy (H1 > H2 > H3)
- Include alt text for images
- Use descriptive link text
- Add horizontal rules for section breaks

### Code Blocks
```bash
# Use proper syntax highlighting
curl -X GET "https://example.com/api/endpoint"
```

## 🤝 Community Guidelines

### Pull Request Process
1. **Link to issue**: Reference related GitHub issues
2. **Clear description**: Explain what and why you changed
3. **Test checklist**: Complete the PR template checklist
4. **Respond to feedback**: Address review comments promptly

### Code of Conduct
- Be respectful and constructive
- Help others learn and grow
- Focus on improving the documentation
- Match the existing documentation style and structure

## 🔧 Development Tools

### Recommended Extensions
- **MDX**: For editing .mdx files
- **Prettier**: For code formatting
- **ESLint**: For code linting
- **Thunder Client**: For testing API endpoints

### Local Search
The documentation includes local search functionality. New content is automatically indexed when you build the site.

## 📋 Contribution Checklist

Before submitting your contribution:

- [ ] Content is accurate and tested
- [ ] All 8 programming language examples included
- [ ] JSX Tabs format used correctly
- [ ] Documentation builds without errors (`npm run build`)
- [ ] Links work correctly
- [ ] Spelling and grammar checked
- [ ] Consistent with existing style
- [ ] Follows project structure
- [ ] Includes proper frontmatter
- [ ] References GitHub issue (if applicable)

## 🏆 Recognition

Contributors are recognized in several ways:
- Listed in GitHub contributors
- Mentioned in release notes for significant contributions
- Invited to join documentation maintainers for ongoing contributors
- Featured in community discussions

## 📞 Getting Help

Need assistance with your contribution?

- **GitHub Discussions**: Ask questions and get help
- **Documentation Issues**: Report bugs or unclear instructions

## 🎉 Thank You!

Every contribution, no matter how small, helps make the Pterodactyl API documentation better for developers worldwide. Thank you for being part of our community!

---

*For detailed technical contribution guidelines, see our [CONTRIBUTING.md](https://github.com/AjdinDev/pterodactyl-api-docs/blob/main/CONTRIBUTING.md) file.* 

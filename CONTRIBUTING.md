# Contributing to Pterodactyl API Documentation

Thank you for your interest in contributing to the Pterodactyl API documentation. This project is shared freely with the community to help developers succeed with their Pterodactyl implementations.

## 🎯 How to Contribute

### 1. Reporting Issues

- **Bug Reports**: Found an error in the documentation? Please [create an issue](https://github.com/AjdinDev/pterodactyl-api-docs/issues/new) with:
  - Clear description of the problem
  - Steps to reproduce (if applicable)
  - Expected vs actual behavior
  - Screenshots if relevant

- **Documentation Improvements**: Suggest improvements to:
  - Unclear explanations
  - Missing examples
  - Outdated information
  - New endpoint coverage

### 2. Submitting Changes

#### How to make contributions Contributions
For changes or new content:

1. **Fork the repository**
   ```bash
   git clone https://github.com/AjdinDev/pterodactyl-api-docs.git
   cd pterodactyl-api-docs
   npm install
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-improvement
   ```

3. **Make your changes**
   ```bash
   npm start  # Start development server
   # Edit files and test your changes at http://localhost:3000
   ```

4. **Test your changes**
   ```bash
   npm run build  # Ensure the build works
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: improve authentication examples"
   git push origin feature/your-improvement
   ```

6. **Create a Pull Request**

## 📝 Content Guidelines

### Documentation Standards

- **Accuracy**: At least some examples must be tested and working
- **Clarity**: Write for developers of all skill levels
- **Consistency**: Follow existing patterns and formatting
- **Completeness**: Include all necessary context and explanations

### Code Examples

When adding or updating code examples:

- **Multi-language Support**: Include examples in all 8 supported languages:
  - cURL (command line)
  - JavaScript (Node.js)
  - Python (requests library)
  - PHP (cURL/Guzzle)
  - Go (native HTTP)
  - Java (OkHttp)
  - C# (HttpClient)
  - Ruby (Net::HTTP)

- **CodeTabs Component**: Use the custom CodeTabs component for consistency:
  ```jsx
  import CodeTabs from '@site/src/components/CodeTabs';
  
  <CodeTabs
    examples={{
      curl: `curl -X GET "https://panel.example.com/api/client" \
        -H "Authorization: Bearer YOUR_TOKEN" \
        -H "Content-Type: application/json"`,
      javascript: `const response = await fetch('https://panel.example.com/api/client', {
        headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
      });`,
      // ... other languages
    }}
    endpoint="/api/client"
    method="GET"
  />
  ```

- **Real Examples**: Use realistic data that developers can easily adapt
- **Error Handling**: Show proper error handling where relevant
- **Security**: Emphasize security best practices

## 🔧 Development Setup

### Prerequisites
- Node.js 20.0+
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve

# Validate CodeTabs component usage
npm run validate:codetabs
```

### Testing
- Verify some code examples before submitting
- Check that internal links work correctly

## 🎨 Style Guide

### Writing Style
- Use clear, concise language
- Write in present tense
- Use active voice when possible
- Include context for why something is important

### Formatting
- Use **bold** for UI elements and important terms
- Use `code formatting` for API endpoints, parameters, and values
- Use > blockquotes for important notes or warnings
- Number steps in procedures

### API Reference Format
Each endpoint should include:
- Clear description of purpose
- Request method and URL
- Required/optional parameters
- Request examples in all supported languages
- Response examples with explanations
- Error scenarios and codes
- Rate limiting information (if applicable)

## 🤝 Community

### Getting Help
- **Questions**: Use [GitHub Discussions](https://github.com/AjdinDev/pterodactyl-api-docs/discussions)
- **Documentation Issues**: Use [GitHub Issues](https://github.com/AjdinDev/pterodactyl-api-docs/issues) for bugs, unclear pages, and missing examples.

## 🚀 Release Process

Documentation updates are deployed automatically when merged to the main branch. Everything is hosted on Cloudflare pages.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License that covers this project.

---

**Thank you for helping make Pterodactyl API documentation better for everyone! 🎉**

*This project is shared freely with the Pterodactyl community.* 

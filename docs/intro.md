---
title: API Documentation - Getting started
sidebar_position: 1
description: Complete API documentation for Pterodactyl Panel v1. Learn how to integrate with Client API, Application API, and WebSocket connections for server management automation.
keywords: [pterodactyl, api, documentation, server management, rest api, websocket, automation]
---

# Pterodactyl Panel API Documentation

Welcome to the **Pterodactyl v1 API documentation**. This documentation provides comprehensive information about the Pterodactyl Panel API, allowing you to programmatically manage servers, users, files, and more.

## About Pterodactyl

Pterodactyl is a free, open-source server management panel built with PHP, React, and Go. Designed with security in mind, Pterodactyl runs everything in Docker containers while exposing a beautiful and intuitive UI to administrators and users.

## About This Documentation

This documentation is maintained as an independent community resource for Pterodactyl API users. We believe in contributing to open-source projects and helping developers succeed with their implementations.

You won't find ads, tracking, hosting pitches, or aggressive marketing throughout these docs. Just clean, comprehensive documentation focused on helping you build applications with the Pterodactyl API.


## Usage of AI

This documentation was partly written by AI. It has been done in such a way where it is safe and robust. This includes a testing framework against a live environment. On each update of the documentation, most API calls are tested against a live, updated Pterodactyl environment. This is done in Github Actions which is publicly accessible by everyone.

## API Overview

The Pterodactyl API consists of two main components:

### Client API
The **Client API** allows users to perform actions on their own servers, such as:
- Managing server power states
- Accessing file management
- Creating and managing databases
- Setting up scheduled tasks
- Managing server users and permissions

### Application API  
The **Application API** is designed for administrative tasks and integration with external systems, allowing:
- Server creation and management
- User management
- Node management
- Advanced administrative functions

### WebSocket API
The **WebSocket API** provides real-time communication capabilities, enabling:
- Live server console access
- Real-time server statistics and monitoring
- Server power state management
- Live log streaming

## Getting Started

1. **[Authentication](./authentication)** - Learn how to authenticate with the API
2. **[Rate Limiting](./rate-limiting)** - Understand API rate limits
3. **[Error Handling](./error-handling)** - Handle API errors gracefully
4. **[Client API Reference](./api/client)** - Complete Client API documentation
5. **[Application API Reference](./api/application)** - Complete Application API documentation
6. **[WebSocket API Reference](./api/websocket)** - Real-time server communication

## Base URLs

- **Client API**: `https://your-panel.com/api/client`
- **Application API**: `https://your-panel.com/api/application`
- **WebSocket API**: `wss://your-node.com:8080/api/servers/{server}/ws`

## Contributing & Feedback

### 🔧 Contributing to Documentation
We welcome contributions from the community! Help improve this documentation for all developers:

- **Quick Edits**: Click "Edit this page" on any documentation page
- **Major Improvements**: Fork the repository and submit pull requests
- **Report Issues**: Found an error? [Create a GitHub Issue](https://github.com/AjdinDev/pterodactyl-api-docs/issues/new)
- **Code Examples**: Help add or improve multi-language examples

👉 **[Read our Contributing Guide](/docs/contributing)** for detailed instructions on how to contribute.

### Getting Help
- **GitHub Discussions**: Ask questions and get community support
- **GitHub Issues**: Report bugs, documentation errors, or request features
- **Ask Questions**: If something is unclear, open an issue and we'll improve the documentation

Your feedback helps us make this documentation better for everyone in the community.

## Support

If you encounter any issues with this documentation or the Pterodactyl API, here are some helpful resources:

- Check the [Pterodactyl GitHub](https://github.com/pterodactyl/panel)
- Open a [documentation issue](https://github.com/AjdinDev/pterodactyl-api-docs/issues) for problems with these docs

---

**Pterodactyl Links:** [Website](https://pterodactyl.io/) | [GitHub](https://github.com/pterodactyl)

---
sidebar_position: 1
---

# Pterodactyl v0.7 API Documentation

Welcome to the **Pterodactyl v0.7** API documentation. This is a minimalistic version of the API reference for legacy installations.

:::warning[Legacy Version]
Pterodactyl v0.7 is **deprecated**. Please upgrade to the latest version as soon as possible. This documentation is provided for legacy installations only.
:::

## Base URL

All API requests should be made to:
```
https://your-panel-domain.com/api
```

## Authentication

API requests require authentication using Bearer tokens:

```bash
curl -X GET "https://your-panel.com/api/client" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

### Getting API Keys

- **Client API Key**: Generate from your account settings (`/account/api`)
- **Application API Key**: Generate from admin panel (`/admin/api`)

## Rate Limiting

API requests are limited to **240 requests per minute**.

## API Categories

### Client API (`/api/client`)
Manage your servers, files, databases, and account settings.

- [Account Management](./client/account)
- [Server Management](./client/servers)
- [File Management](./client/files)
- [Database Management](./client/databases)
- [Schedule Management](./client/schedules)
- [Network Management](./client/network)
- [User Management](./client/users)
- [Backup Management](./client/backups)

### Application API (`/api/application`)
Administrative functions for managing the panel.

- [User Management](./application/users)
- [Server Management](./application/servers)
- [Node Management](./application/nodes)
- [Location Management](./application/locations)
- [Nest Management](./application/nests)

## Response Format

All responses follow this format:

```json
{
  "object": "list",
  "data": [...],
  "meta": {
    "pagination": {...}
  }
}
```

## Error Handling

Errors return HTTP status codes with details:

```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The given data was invalid."
    }
  ]
}
``` 
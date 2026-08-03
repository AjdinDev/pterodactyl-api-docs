---
title: Authentication - Bearer Token Guide
description: Learn how to authenticate with Pterodactyl Panel API using Bearer tokens. Complete guide to Client API keys and Application API keys for secure server management.
keywords:
  - pterodactyl authentication
  - api bearer token
  - client api key
  - application api key
  - pterodactyl api security
  - rest api authentication
  - server management api auth
  - pterodactyl panel api keys
  - api token generation
  - secure api access
image: /img/pteroapi-social-card.jpg
---

# Authentication

The Pterodactyl API uses **Bearer Token** authentication for all requests. There are two types of API keys depending on which API you're accessing.

## API Key Types

### Client API Keys
Client API keys are created by users for accessing the **Client API**. These keys have access only to resources that the user creating them has access to.

**Where to generate:**
- Navigate to `https://your-panel.com/account/api`
- Click "Create API Key"
- Optionally restrict by IP addresses

### Application API Keys  
Application API keys are created by administrators for accessing the **Application API**. These keys have full administrative access to the panel.

**Where to generate:**
- Navigate to `https://your-panel.com/admin/api` (admin only)
- Click "Create API Key"
- Optionally restrict by IP addresses

## Making Authenticated Requests

Include your API key in the `Authorization` header using the Bearer token format:

```bash
curl "https://your-panel.com/api/client" \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

## Required Headers

### Authorization Header
```
Authorization: Bearer YOUR_API_KEY_HERE
```

### Content-Type Header  
```
Content-Type: application/json
```

### Accept Header
```
Accept: Application/vnd.pterodactyl.v1+json
```

## Example Requests

### Client API Example
```bash
# Get list of servers for the authenticated user
curl "https://your-panel.com/api/client" \
  -H "Authorization: Bearer ptlc_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

### Application API Example  
```bash
# Get list of all users (admin only)
curl "https://your-panel.com/api/application/users" \
  -H "Authorization: Bearer ptla_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

## API Key Security

:::warning Security Best Practices
- **Never expose your API keys** in client-side code or public repositories
- **Use IP restrictions** when possible to limit key usage
- **Rotate keys regularly** for enhanced security
- **Use the principle of least privilege** - only grant necessary permissions
:::

## Key Naming Convention

Pterodactyl API keys follow this naming pattern:
- **Client API keys**: `ptlc_` followed by the key
- **Application API keys**: `ptla_` followed by the key

## Common Authentication Errors

### 401 Unauthorized
```json
{
  "errors": [
    {
      "code": "InvalidCredentialsException",
      "status": "401", 
      "detail": "The credentials provided were invalid."
    }
  ]
}
```

### 403 Forbidden
```json
{
  "errors": [
    {
      "code": "InsufficientPermissionsException",
      "status": "403",
      "detail": "This action requires additional permissions."
    }
  ]
}
```

## Next Steps

- Review [Rate Limiting](./rate-limiting) information
- Explore the [Client API](./api/client) documentation  
- Check out the [Application API](./api/application) documentation (Coming Soon) 

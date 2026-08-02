---
title: Client API - Pterodactyl Panel Server Management API
description: Complete Client API reference for Pterodactyl Panel. Manage servers, files, databases, backups, users, and networks programmatically with REST API endpoints.
keywords:
  - pterodactyl client api
  - server management api
  - pterodactyl rest api
  - game server api
  - file management api
  - database management api
  - backup api
  - user management api
  - network management api
  - pterodactyl panel client
  - server control endpoints
  - hosting api
image: /img/pteroapi-social-card.jpg
---

# Client API

The **Client API** allows users to perform actions on servers they have access to. This includes server management, file operations, database management, and more.

## Base URL
```
https://your-panel.com/api/client
```

## Authentication
All Client API requests require a Client API key passed in the Authorization header:

```bash
curl "https://your-panel.com/api/client" \
  -H "Authorization: Bearer ptlc_YOUR_CLIENT_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

## API Sections

### Account Management
Manage your account details, API keys, and authentication settings.

- [Account Details](/docs/api/client/account) - View and update account information
- [Two-Factor Authentication](/docs/api/client/account#two-factor-authentication) - Enable/disable 2FA
- [API Key Management](/docs/api/client/account#api-keys) - Create and manage API keys
- [Password Management](/docs/api/client/account#password-management) - Update account password

### Server Management
Core server operations and information.

- [List Servers](/docs/api/client/servers) - Get all servers you have access to
- [Server Details](/docs/api/client/servers#get-server-details) - Get detailed server information
- [Server Resources](/docs/api/client/servers#server-resource-usage) - View server resource usage
- [Power Management](/docs/api/client/servers#power-management) - Start, stop, restart servers
- [Console Access](/docs/api/client/servers#console-access) - WebSocket console connection
- [Send Commands](/docs/api/client/servers#send-console-command) - Execute server commands

### File Management
Complete file system operations for your servers.

- [List Files](/docs/api/client/files) - Browse server files and directories
- [File Contents](/docs/api/client/files#read-file-contents) - Read file contents
- [Upload Files](/docs/api/client/files#upload-files) - Upload files to server
- [Download Files](/docs/api/client/files#download-file) - Download files from server
- [Create Directory](/docs/api/client/files#create-directory) - Create folders
- [Delete Files](/docs/api/client/files#delete-files) - Delete files
- [Copy Files](/docs/api/client/files#copy-files) - Copy files and directories
- [Rename Files](/docs/api/client/files#rename-files) - Rename files and directories
- [Compress Files](/docs/api/client/files#compress-files) - Create archives

### Database Management
Manage server databases and users.

- [List Databases](/docs/api/client/databases) - View all server databases
- [Create Database](/docs/api/client/databases#create-database) - Create new databases
- [Rotate Password](/docs/api/client/databases#rotate-database-password) - Change database passwords
- [Delete Database](/docs/api/client/databases#delete-database) - Remove databases

### Scheduled Tasks
Automate server operations with schedules.

- [List Schedules](/docs/api/client/schedules) - View all scheduled tasks
- [Create Schedule](/docs/api/client/schedules#create-schedule) - Set up new schedules
- [Manage Tasks](/docs/api/client/schedules#schedule-tasks-management) - Add/edit/delete schedule tasks
- [Update Schedule](/docs/api/client/schedules#update-schedule) - Modify existing schedules
- [Delete Schedule](/docs/api/client/schedules#delete-schedule) - Remove schedules
- [Execute Schedule](/docs/api/client/schedules#execute-schedule) - Manually trigger schedules

### Network & Allocations
Manage server network allocations and ports.

- [List Allocations](/docs/api/client/network) - View server allocations
- [Assign Allocations](/docs/api/client/network#assign-new-allocation) - Get new allocations
- [Primary Allocation](/docs/api/client/network#set-primary-allocation) - Set primary allocation
- [Allocation Notes](/docs/api/client/network#update-allocation-notes) - Add notes to allocations

### User Management
Manage subusers and permissions on servers.

- [List Users](/docs/api/client/users) - View server subusers
- [User Permissions](/docs/api/client/users#available-permissions) - Manage user permissions
- [Create Subuser](/docs/api/client/users#create-subuser) - Invite new subusers
- [Remove Subuser](/docs/api/client/users#remove-subuser) - Remove subusers

### Backups
*(Available in some Pterodactyl installations)*

- [List Backups](/docs/api/client/backups) - View server backups
- [Create Backup](/docs/api/client/backups#create-backup) - Generate new backups
- [Download Backup](/docs/api/client/backups#download-backup) - Download backup files
- [Delete Backup](/docs/api/client/backups#delete-backup) - Remove old backups

## Common Parameters

Many endpoints support these optional parameters:

### Include Parameters
Expand related resources in the response:
```
?include=egg,subusers,allocations
```

### Pagination
For list endpoints:
```
?page=2&per_page=50
```

### Filtering
Filter results by specific criteria:
```
?filter[name]=minecraft&filter[uuid]=1a7ce997
```

### Sorting
Sort results by specific fields:
```
?sort=-created_at&sort=name
```

## Response Format

All API responses follow this structure:

### Single Resource
```json
{
  "object": "server",
  "attributes": {
    // Resource data
  },
  "meta": {
    // Optional metadata
  }
}
```

### Resource Collection
```json
{
  "object": "list", 
  "data": [
    {
      "object": "server",
      "attributes": {
        // Resource data
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "count": 1,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {}
    }
  }
}
```

## Getting Started

1. **Generate a Client API Key**
   - Go to `https://your-panel.com/account/api`
   - Click "Create API Key"
   - Copy the generated key

2. **Make Your First Request**
   ```bash
   curl "https://your-panel.com/api/client" \
     -H "Authorization: Bearer YOUR_CLIENT_API_KEY" \
     -H "Accept: Application/vnd.pterodactyl.v1+json"
   ```

3. **Explore Available Servers**
   - Use the response to see servers you have access to
   - Note the server identifiers for subsequent requests

## Rate Limits

The Client API is limited to **240 requests per minute** per API key. Monitor the rate limit headers in responses:

```http
X-RateLimit-Limit: 240
X-RateLimit-Remaining: 235
X-RateLimit-Reset: 1640995200
```

## Source Code References

All Client API endpoints are implemented in the Pterodactyl Panel source code:

- **Controllers**: [`app/Http/Controllers/Api/Client/`](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Http/Controllers/Api/Client)
- **Routes**: [`routes/api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php)
- **Models**: [`app/Models/`](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Models)
- **Services**: [`app/Services/`](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Services)

For detailed source code references, see our [Source References Guide](/docs/source-references).

## Next Steps

- Start with [Account Management](/docs/api/client/account) to test your API key
- Explore [Server Management](/docs/api/client/servers) for basic server operations
- Review [Authentication](/docs/authentication) for security best practices 

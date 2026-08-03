---
title: Administrative Panel Management
description: Complete Application API reference for administrative Pterodactyl Panel management. Manage users, servers, nodes, locations, and panel configuration.
keywords:
  - pterodactyl application api
  - admin api
  - panel management
  - server administration
  - user management
  - node management
  - location management
  - administrative endpoints
image: /img/pteroapi-social-card.jpg
---

# Application API

The **Application API** provides administrative access to manage the entire Pterodactyl Panel. These endpoints require administrative privileges and are designed for panel automation, integration with external systems, and comprehensive server management.

## Base URL
```
https://your-panel.com/api/application
```

## Authentication
All Application API requests require an Application API key with administrative privileges:

```bash
curl "https://your-panel.com/api/application/users" \
  -H "Authorization: Bearer ptla_YOUR_APPLICATION_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

:::warning Administrative Access Required
These endpoints require administrative privileges and should only be used by trusted applications with proper authentication. Application API keys provide full panel access.
:::

## API Sections

### User Management
Complete user lifecycle management for the panel.

- [List All Users](/docs/api/application/users) - Retrieve all panel users with filtering and pagination
- [Get User Details](/docs/api/application/users#get-user-details) - View detailed user information
- [Create User](/docs/api/application/users#create-new-user) - Add new users to the panel
- [Update User](/docs/api/application/users#update-user) - Modify user information and permissions
- [Delete User](/docs/api/application/users#delete-user) - Remove users from the panel


### Server Management  
Administrative server operations and lifecycle management.

- [List All Servers](/docs/api/application/servers) - View all servers in the panel
- [Get Server Details](/docs/api/application/servers#get-server-details) - Detailed server information
- [Create Server](/docs/api/application/servers#create-new-server) - Deploy new servers programmatically
- [Update Server Details](/docs/api/application/servers#update-server-details) - Modify server information
- [Update Build Configuration](/docs/api/application/servers#update-server-build-configuration) - Change resource limits
- [Update Startup Settings](/docs/api/application/servers#update-server-startup) - Modify startup commands and variables
- [Suspend/Unsuspend Server](/docs/api/application/servers#suspend-server) - Manage server suspension status
- [Reinstall Server](/docs/api/application/servers#reinstall-server) - Trigger server reinstallation
- [Delete Server](/docs/api/application/servers#delete-server) - Remove servers from the panel

### Node Management
Wings daemon node administration and configuration.

- [List All Nodes](/docs/api/application/nodes) - View all Wings nodes
- [Get Node Details](/docs/api/application/nodes#get-node-details) - Detailed node information
- [Create Node](/docs/api/application/nodes#create-new-node) - Add new Wings nodes
- [Update Node](/docs/api/application/nodes#update-node-configuration) - Modify node configuration
- [Get Node Configuration](/docs/api/application/nodes#get-node-configuration) - Wings configuration file
- [List Node Allocations](/docs/api/application/nodes#list-node-allocations) - View port allocations
- [Create Allocations](/docs/api/application/nodes#create-node-allocations) - Add new port allocations
- [Delete Allocation](/docs/api/application/nodes#delete-node-allocation) - Remove specific allocations
- [Delete Node](/docs/api/application/nodes#delete-node) - Remove nodes from the panel

### Location Management
Geographic organization and data center management.

- [List All Locations](/docs/api/application/locations) - View all configured locations
- [Get Location Details](/docs/api/application/locations#get-location-details) - Detailed location information
- [Create Location](/docs/api/application/locations#create-new-location) - Add new locations
- [Update Location](/docs/api/application/locations#update-location) - Modify location information
- [Delete Location](/docs/api/application/locations#delete-location) - Remove locations from the panel

### Nests & Eggs Management
Server type and configuration management for game servers and applications.

- [List All Nests](/docs/api/application/nests-eggs) - View all server type categories
- [Get Nest Details](/docs/api/application/nests-eggs#get-nest-details) - Detailed nest information
- [List Nest Eggs](/docs/api/application/nests-eggs#list-nest-eggs) - View server configurations within a nest
- [Get Egg Details](/docs/api/application/nests-eggs#get-egg-details) - Detailed egg configuration

## Common Features

### Filtering and Pagination
Most list endpoints support advanced filtering and pagination:

```bash
# Filter users by email domain
GET /api/application/users?filter[email]=@example.com

# Paginate results
GET /api/application/servers?page=2&per_page=25

# Sort by creation date
GET /api/application/nodes?sort=-created_at
```

### Relationship Inclusion
Include related data in responses:

```bash
# Include servers with user data
GET /api/application/users/1?include=servers

# Include allocations and location with node
GET /api/application/nodes/1?include=allocations,location
```

### Response Format
All responses follow consistent formatting:

```json
{
  "object": "list|resource_type",
  "data": [ /* resource data */ ],
  "meta": {
    "pagination": {
      "total": 50,
      "count": 25,
      "per_page": 25,
      "current_page": 1,
      "total_pages": 2,
      "links": {}
    }
  }
}
```

## Rate Limiting

The Application API implements rate limiting to prevent abuse:

- **Default Limit**: 240 requests per minute per API key
- **Burst Limit**: Up to 10 requests per second
- **Headers**: Response includes rate limit headers

```http
X-RateLimit-Limit: 240
X-RateLimit-Remaining: 235
X-RateLimit-Reset: 1642686400
```

## Getting Started

1. **Generate an Application API Key**
   - Log in as an administrator
   - Go to `https://your-panel.com/admin/api`
   - Click "Create API Key"
   - Optionally restrict by IP addresses

2. **Make Your First Request**
   ```bash
   curl "https://your-panel.com/api/application/users" \
     -H "Authorization: Bearer ptla_YOUR_APPLICATION_API_KEY" \
     -H "Accept: Application/vnd.pterodactyl.v1+json"
   ```

3. **Explore Available Resources**
   - Start with user management to test your API key
   - Use server management for automated deployments
   - Configure nodes and locations for infrastructure management

## Source Code References

All Application API endpoints are implemented in the Pterodactyl Panel source code:

- **Controllers**: [`app/Http/Controllers/Api/Application/`](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Http/Controllers/Api/Application)
- **Routes**: [`routes/api-application.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-application.php)
- **Services**: [`app/Services/`](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Services)
- **Models**: [`app/Models/`](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Models)

For detailed source code references, see our [Source References Guide](/docs/source-references).

## Security Considerations

- **Never expose Application API keys** in client-side code
- **Use IP restrictions** when possible for additional security
- **Regularly rotate API keys** for production environments
- **Monitor API usage** through the panel's audit logs
- **Implement proper error handling** to avoid exposing sensitive information

## Next Steps

- Start with [User Management](/docs/api/application/users) for basic administrative operations
- Explore [Server Management](/docs/api/application/servers) for automated deployments
- Configure [Node Management](/docs/api/application/nodes) for infrastructure scaling
- Review [Authentication](/docs/authentication) for security best practices 

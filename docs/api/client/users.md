import CodeTabs from '@site/src/components/CodeTabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# User Management

Manage server subusers including invitations, permissions, and access control.

## List Server Subusers

Retrieve all users with access to the server.

**`GET /api/client/servers/{server}/users`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |

### Example Request



<CodeTabs
  endpoint="/api/client/servers/{server}/users"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/users" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/users\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Server users:', response.data.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/users', headers=headers)
print('Server users:', response.json()['data'])`,
    php: `<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\\Client();

$response = $client->get("https://your-panel.com/api/client/servers/{$serverId}/users", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ]
]);

$data = json_decode($response->getBody(), true);
print_r($data['data']);
?>`,
    go: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/users", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("Server users:", result["data"])
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String url = String.format("https://your-panel.com/api/client/servers/%s/users", serverId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("Server users: " + response.body());`,
    csharp: `using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
var response = await client.GetAsync($"https://your-panel.com/api/client/servers/{serverId}/users");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine("Server users: " + content);`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/users")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)
puts "Server users: #{data['data']}"`
  }}
/>




### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "subuser",
      "attributes": {
        "uuid": "c4022c6c-9bf1-4a23-bff9-519cceb38335",
        "username": "john_admin",
        "email": "john@example.com",
        "image": "https://www.gravatar.com/avatar/2fd4d83d4672e8fc7ddda3bd6e01c64e.jpg",
        "2fa_enabled": true,
        "created_at": "2023-08-15T10:30:00+00:00",
        "permissions": [
          "control.console",
          "control.start",
          "control.stop",
          "control.restart",
          "user.create",
          "user.read",
          "user.update",
          "user.delete",
          "file.create",
          "file.read",
          "file.update",
          "file.delete",
          "file.archive",
          "backup.create",
          "backup.read",
          "backup.delete",
          "allocation.read",
          "allocation.create",
          "allocation.update",
          "allocation.delete",
          "startup.read",
          "startup.update",
          "database.create",
          "database.read",
          "database.update",
          "database.delete",
          "schedule.create",
          "schedule.read",
          "schedule.update",
          "schedule.delete"
        ]
      }
    },
    {
      "object": "subuser",
      "attributes": {
        "uuid": "a8b2c3d4-e5f6-7890-1234-567890abcdef",
        "username": "sarah_mod",
        "email": "sarah@example.com",
        "image": "https://www.gravatar.com/avatar/8fd9d842a732e3fc9bb1f9f0e8f7e6d5.jpg",
        "2fa_enabled": false,
        "created_at": "2023-09-20T14:45:00+00:00",
        "permissions": [
          "control.console",
          "control.start",
          "control.stop",
          "control.restart",
          "file.read",
          "backup.read"
        ]
      }
    }
  ]
}
```

### Subuser Object Attributes

| Field | Description |
|-------|-------------|
| `uuid` | Unique user identifier |
| `username` | User's username |
| `email` | User's email address |
| `image` | User's avatar image URL (usually Gravatar) |
| `2fa_enabled` | Whether two-factor authentication is enabled |
| `created_at` | When user was added to server |
| `permissions` | Array of granted permissions |



---

## Get Subuser Details

Retrieve detailed information about a specific subuser.

**`GET /api/client/servers/{server}/users/{user}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `user` | string | User UUID |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/users/{user}"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/users/c4022c6c-9bf1-4a23-bff9-519cceb38335" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const userId = 'c4022c6c-9bf1-4a23-bff9-519cceb38335';

const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/users/\${userId}\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('User details:', response.data.attributes);`,
    python: `import requests

server_id = 'd3aac109'
user_id = 'c4022c6c-9bf1-4a23-bff9-519cceb38335'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/users/{user_id}', headers=headers)
print('User details:', response.json()['attributes'])`,
    php: `<?php
$serverId = 'd3aac109';
$userId = 'c4022c6c-9bf1-4a23-bff9-519cceb38335';
$client = new GuzzleHttp\\Client();

$response = $client->get("https://your-panel.com/api/client/servers/{$serverId}/users/{$userId}", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ]
]);

$data = json_decode($response->getBody(), true);
print_r($data['attributes']);
?>`,
    go: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    userId := "c4022c6c-9bf1-4a23-bff9-519cceb38335"
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/users/%s", serverId, userId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("User details:", result["attributes"])
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String userId = "c4022c6c-9bf1-4a23-bff9-519cceb38335";
String url = String.format("https://your-panel.com/api/client/servers/%s/users/%s", serverId, userId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("User details: " + response.body());`,
    csharp: `using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
string userId = "c4022c6c-9bf1-4a23-bff9-519cceb38335";

var response = await client.GetAsync($"https://your-panel.com/api/client/servers/{serverId}/users/{userId}");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine("User details: " + content);`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
user_id = 'c4022c6c-9bf1-4a23-bff9-519cceb38335'
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/users/#{user_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)
puts "User details: #{data['attributes']}"`
  }}
/>




### Example Response

```json
{
  "object": "subuser",
  "attributes": {
    "uuid": "c4022c6c-9bf1-4a23-bff9-519cceb38335",
    "username": "john_admin",
    "email": "john@example.com",
    "image": "https://www.gravatar.com/avatar/2fd4d83d4672e8fc7ddda3bd6e01c64e.jpg",
    "2fa_enabled": true,
    "created_at": "2023-08-15T10:30:00+00:00",
    "permissions": [
      "control.console",
      "control.start",
      "control.stop",
      "control.restart",
      "user.create",
      "user.read",
      "user.update",
      "user.delete",
      "file.create",
      "file.read",
      "file.update",
      "file.delete",
      "file.archive",
      "backup.create",
      "backup.read",
      "backup.delete",
      "allocation.read",
      "allocation.create",
      "allocation.update",
      "allocation.delete",
      "startup.read",
      "startup.update",
      "database.create",
      "database.read",
      "database.update",
      "database.delete",
      "schedule.create",
      "schedule.read",
      "schedule.update",
      "schedule.delete"
    ]
  }
}
```




---

## Create Subuser

Invite a new user to access the server with specific permissions.

**`POST /api/client/servers/{server}/users`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Email address of user to invite |
| `permissions` | array | Yes | Array of permission keys to grant |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/users" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mike@example.com",
    "permissions": [
      "control.console",
      "control.start",
      "control.stop",
      "control.restart",
      "file.read",
      "file.create",
      "file.update",
      "backup.read"
    ]
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const userData = {
  email: 'mike@example.com',
  permissions: [
    'control.console',
    'control.start',
    'control.stop',
    'control.restart',
    'file.read',
    'file.create',
    'file.update',
    'backup.read'
  ]
};

const response = await axios.post(`https://your-panel.com/api/client/servers/${serverId}/users`, userData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('User created:', response.data.attributes);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests
import json

server_id = 'd3aac109'
user_data = {
    'email': 'mike@example.com',
    'permissions': [
        'control.console',
        'control.start',
        'control.stop',
        'control.restart',
        'file.read',
        'file.create',
        'file.update',
        'backup.read'
    ]
}

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/users', 
                        headers=headers, json=user_data)
print('User created:', response.json()['attributes'])
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$userData = [
    'email' => 'mike@example.com',
    'permissions' => [
        'control.console',
        'control.start',
        'control.stop',
        'control.restart',
        'file.read',
        'file.create',
        'file.update',
        'backup.read'
    ]
];

$client = new GuzzleHttp\Client();

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/users", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $userData
]);

$data = json_decode($response->getBody(), true);
print_r($data['attributes']);
?>
```
</TabItem>

<TabItem value="go" label="Go">
```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    userData := map[string]interface{}{
        "email": "mike@example.com",
        "permissions": []string{
            "control.console",
            "control.start",
            "control.stop",
            "control.restart",
            "file.read",
            "file.create",
            "file.update",
            "backup.read",
        },
    }
    
    jsonData, _ := json.Marshal(userData)
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/users", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("User created:", result["attributes"])
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String jsonData = """
{
  "email": "mike@example.com",
  "permissions": [
    "control.console",
    "control.start",
    "control.stop",
    "control.restart",
    "file.read",
    "file.create",
    "file.update",
    "backup.read"
  ]
}
""";

String url = String.format("https://your-panel.com/api/client/servers/%s/users", serverId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("User created: " + response.body());
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
var userData = new {
    email = "mike@example.com",
    permissions = new[] {
        "control.console",
        "control.start",
        "control.stop",
        "control.restart",
        "file.read",
        "file.create",
        "file.update",
        "backup.read"
    }
};

var json = JsonSerializer.Serialize(userData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/users", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine("User created: " + responseContent);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

server_id = 'd3aac109'
user_data = {
  email: 'mike@example.com',
  permissions: [
    'control.console',
    'control.start',
    'control.stop',
    'control.restart',
    'file.read',
    'file.create',
    'file.update',
    'backup.read'
  ]
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/users")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = user_data.to_json

response = http.request(request)
data = JSON.parse(response.body)
puts "User created: #{data['attributes']}"
```
</TabItem>

</Tabs>




### Success Response

```json
{
  "object": "subuser",
  "attributes": {
    "uuid": "f1e2d3c4-b5a6-9897-8765-432109fedcba",
    "username": "mike_helper",
    "email": "mike@example.com",
    "image": "https://www.gravatar.com/avatar/default.jpg",
    "2fa_enabled": false,
    "created_at": "2023-10-21T16:20:00+00:00",
    "permissions": [
      "control.console",
      "control.start",
      "control.stop",
      "control.restart",
      "file.read",
      "file.create",
      "file.update",
      "backup.read"
    ]
  }
}
```


### Error Responses

**User Limit Reached (400)**
```json
{
  "errors": [
    {
      "code": "TooManySubusersException",
      "status": "400",
      "detail": "This server has reached its subuser limit."
    }
  ]
}
```


**User Already Has Access (409)**
```json
{
  "errors": [
    {
      "code": "UserAlreadyHasAccessException",
      "status": "409",
      "detail": "The specified user already has access to this server."
    }
  ]
}
```


**Invalid Email (422)**
```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The email field must be a valid email address.",
      "meta": {
        "rule": "email",
        "source_field": "email"
      }
    }
  ]
}
```


**User Not Found (404)**
```json
{
  "errors": [
    {
      "code": "UserNotFoundException",
      "status": "404",
      "detail": "No user with that email address was found."
    }
  ]
}
```




---

## Update Subuser Permissions

Modify the permissions granted to an existing subuser.

**`POST /api/client/servers/{server}/users/{user}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `user` | string | User UUID |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `permissions` | array | Yes | Array of permission keys to grant |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/users/a8b2c3d4-e5f6-7890-1234-567890abcdef" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "permissions": [
      "control.console",
      "control.start",
      "control.stop",
      "control.restart",
      "file.read",
      "file.update",
      "backup.read",
      "backup.create",
      "database.read"
    ]
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const userId = 'a8b2c3d4-e5f6-7890-1234-567890abcdef';
const permissionsData = {
  permissions: [
    'control.console',
    'control.start',
    'control.stop',
    'control.restart',
    'file.read',
    'file.update',
    'backup.read',
    'backup.create',
    'database.read'
  ]
};

const response = await axios.post(`https://your-panel.com/api/client/servers/${serverId}/users/${userId}`, permissionsData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('User permissions updated:', response.data.attributes);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests
import json

server_id = 'd3aac109'
user_id = 'a8b2c3d4-e5f6-7890-1234-567890abcdef'
permissions_data = {
    'permissions': [
        'control.console',
        'control.start',
        'control.stop',
        'control.restart',
        'file.read',
        'file.update',
        'backup.read',
        'backup.create',
        'database.read'
    ]
}

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/users/{user_id}', 
                         headers=headers, json=permissions_data)
print('User permissions updated:', response.json()['attributes'])
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$userId = 'a8b2c3d4-e5f6-7890-1234-567890abcdef';
$permissionsData = [
    'permissions' => [
        'control.console',
        'control.start',
        'control.stop',
        'control.restart',
        'file.read',
        'file.update',
        'backup.read',
        'backup.create',
        'database.read'
    ]
];

$client = new GuzzleHttp\Client();

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/users/{$userId}", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $permissionsData
]);

$data = json_decode($response->getBody(), true);
print_r($data['attributes']);
?>
```
</TabItem>

<TabItem value="go" label="Go">
```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    userId := "a8b2c3d4-e5f6-7890-1234-567890abcdef"
    permissionsData := map[string]interface{}{
        "permissions": []string{
            "control.console",
            "control.start",
            "control.stop",
            "control.restart",
            "file.read",
            "file.update",
            "backup.read",
            "backup.create",
            "database.read",
        },
    }
    
    jsonData, _ := json.Marshal(permissionsData)
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/users/%s", serverId, userId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("PATCH", url, bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("User permissions updated:", result["attributes"])
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String userId = "a8b2c3d4-e5f6-7890-1234-567890abcdef";
String jsonData = """
{
  "permissions": [
    "control.console",
    "control.start",
    "control.stop",
    "control.restart",
    "file.read",
    "file.update",
    "backup.read",
    "backup.create",
    "database.read"
  ]
}
""";

String url = String.format("https://your-panel.com/api/client/servers/%s/users/%s", serverId, userId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .method("PATCH", HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("User permissions updated: " + response.body());
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
string userId = "a8b2c3d4-e5f6-7890-1234-567890abcdef";
var permissionsData = new {
    permissions = new[] {
        "control.console",
        "control.start",
        "control.stop",
        "control.restart",
        "file.read",
        "file.update",
        "backup.read",
        "backup.create",
        "database.read"
    }
};

var json = JsonSerializer.Serialize(permissionsData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PatchAsync($"https://your-panel.com/api/client/servers/{serverId}/users/{userId}", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine("User permissions updated: " + responseContent);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

server_id = 'd3aac109'
user_id = 'a8b2c3d4-e5f6-7890-1234-567890abcdef'
permissions_data = {
  permissions: [
    'control.console',
    'control.start',
    'control.stop',
    'control.restart',
    'file.read',
    'file.update',
    'backup.read',
    'backup.create',
    'database.read'
  ]
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/users/#{user_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = permissions_data.to_json

response = http.request(request)
data = JSON.parse(response.body)
puts "User permissions updated: #{data['attributes']}"
```
</TabItem>

</Tabs>




### Success Response

```json
{
  "object": "subuser",
  "attributes": {
    "uuid": "a8b2c3d4-e5f6-7890-1234-567890abcdef",
    "username": "sarah_mod",
    "email": "sarah@example.com",
    "image": "https://www.gravatar.com/avatar/8fd9d842a732e3fc9bb1f9f0e8f7e6d5.jpg",
    "2fa_enabled": false,
    "created_at": "2023-09-20T14:45:00+00:00",
    "permissions": [
      "control.console",
      "control.start",
      "control.stop",
      "control.restart",
      "file.read",
      "file.update",
      "backup.read",
      "backup.create",
      "database.read"
    ]
  }
}
```


:::info[Permission Updates]
Permission updates completely replace the user's existing permissions. Include all permissions you want the user to have, not just the ones you're adding.
:::



---

## Remove Subuser

Remove a user's access to the server.

**`DELETE /api/client/servers/{server}/users/{user}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `user` | string | User UUID |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X DELETE "https://your-panel.com/api/client/servers/d3aac109/users/f1e2d3c4-b5a6-9897-8765-432109fedcba" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const userId = 'f1e2d3c4-b5a6-9897-8765-432109fedcba';

const response = await axios.delete(`https://your-panel.com/api/client/servers/${serverId}/users/${userId}`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

if (response.status === 204) {
  console.log('User access removed successfully');
}
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
user_id = 'f1e2d3c4-b5a6-9897-8765-432109fedcba'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.delete(f'https://your-panel.com/api/client/servers/{server_id}/users/{user_id}', headers=headers)

if response.status_code == 204:
    print('User access removed successfully')
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$userId = 'f1e2d3c4-b5a6-9897-8765-432109fedcba';
$client = new GuzzleHttp\Client();

$response = $client->delete("https://your-panel.com/api/client/servers/{$serverId}/users/{$userId}", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ]
]);

if ($response->getStatusCode() === 204) {
    echo "User access removed successfully\n";
}
?>
```
</TabItem>

<TabItem value="go" label="Go">
```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    userId := "f1e2d3c4-b5a6-9897-8765-432109fedcba"
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/users/%s", serverId, userId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("DELETE", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    if resp.StatusCode == 204 {
        fmt.Println("User access removed successfully")
    }
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String userId = "f1e2d3c4-b5a6-9897-8765-432109fedcba";
String url = String.format("https://your-panel.com/api/client/servers/%s/users/%s", serverId, userId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .DELETE()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

if (response.statusCode() == 204) {
    System.out.println("User access removed successfully");
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
string userId = "f1e2d3c4-b5a6-9897-8765-432109fedcba";

var response = await client.DeleteAsync($"https://your-panel.com/api/client/servers/{serverId}/users/{userId}");

if (response.StatusCode == System.Net.HttpStatusCode.NoContent) 
{
    Console.WriteLine("User access removed successfully");
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

server_id = 'd3aac109'
user_id = 'f1e2d3c4-b5a6-9897-8765-432109fedcba'
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/users/#{user_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)

if response.code == '204'
  puts 'User access removed successfully'
end
```
</TabItem>

</Tabs>




### Success Response (204)

Returns empty response body with status code 204.

:::warning[Access Removal]
Removing a subuser immediately revokes all their access to the server. They will be logged out and unable to perform any actions.
:::

### Error Responses

**Cannot Remove Server Owner (400)**
```json
{
  "errors": [
    {
      "code": "CannotRemoveServerOwnerException",
      "status": "400",
      "detail": "Cannot remove the server owner."
    }
  ]
}
```




---

## Available Permissions

### Server Control Permissions

| Permission | Description |
|------------|-------------|
| `control.console` | View console output and send commands |
| `control.start` | Start the server |
| `control.stop` | Stop the server |
| `control.restart` | Restart the server |
| `control.kill` | Force kill the server process |

### File Management Permissions

| Permission | Description |
|------------|-------------|
| `file.create` | Create new files and directories |
| `file.read` | View file contents and directory listings |
| `file.update` | Modify existing files |
| `file.delete` | Delete files and directories |
| `file.archive` | Create and extract archives |
| `file.sftp` | Access files via SFTP |

### Backup Permissions

| Permission | Description |
|------------|-------------|
| `backup.create` | Create new backups |
| `backup.read` | View backup list and details |
| `backup.delete` | Delete backups |
| `backup.download` | Download backup files |
| `backup.restore` | Restore from backups |

### Network Allocation Permissions

| Permission | Description |
|------------|-------------|
| `allocation.read` | View server allocations |
| `allocation.create` | Assign new allocations |
| `allocation.update` | Modify allocation settings |
| `allocation.delete` | Remove allocations |

### Database Permissions

| Permission | Description |
|------------|-------------|
| `database.create` | Create new databases |
| `database.read` | View database list and details |
| `database.update` | Rotate database passwords |
| `database.delete` | Delete databases |

### Schedule Permissions

| Permission | Description |
|------------|-------------|
| `schedule.create` | Create new schedules |
| `schedule.read` | View schedules and tasks |
| `schedule.update` | Modify existing schedules |
| `schedule.delete` | Delete schedules |

### User Management Permissions

| Permission | Description |
|------------|-------------|
| `user.create` | Invite new subusers |
| `user.read` | View subuser list and details |
| `user.update` | Modify subuser permissions |
| `user.delete` | Remove subusers |

### Startup Permissions

| Permission | Description |
|------------|-------------|
| `startup.read` | View startup configuration |
| `startup.update` | Modify startup variables |

---

## Permission Templates

### Read-Only Access

Suitable for monitoring and viewing server status:

```json
{
  "permissions": [
    "control.console",
    "file.read",
    "backup.read",
    "allocation.read",
    "database.read",
    "schedule.read",
    "user.read",
    "startup.read"
  ]
}
```


### Moderator Access

Basic server management without administrative functions:

```json
{
  "permissions": [
    "control.console",
    "control.start",
    "control.stop",
    "control.restart",
    "file.read",
    "file.update",
    "backup.read",
    "backup.create"
  ]
}
```


### Administrator Access

Full server management capabilities:

```json
{
  "permissions": [
    "control.console",
    "control.start",
    "control.stop",
    "control.restart",
    "control.kill",
    "file.create",
    "file.read",
    "file.update",
    "file.delete",
    "file.archive",
    "backup.create",
    "backup.read",
    "backup.delete",
    "backup.download",
    "backup.restore",
    "allocation.read",
    "allocation.create",
    "allocation.update",
    "allocation.delete",
    "database.create",
    "database.read",
    "database.update",
    "database.delete",
    "schedule.create",
    "schedule.read",
    "schedule.update",
    "schedule.delete",
    "startup.read",
    "startup.update"
  ]
}
```


### Developer Access

File management and deployment focused:

```json
{
  "permissions": [
    "control.console",
    "control.start",
    "control.stop",
    "control.restart",
    "file.create",
    "file.read",
    "file.update",
    "file.delete",
    "file.archive",
    "file.sftp",
    "backup.create",
    "backup.read",
    "backup.download",
    "database.read",
    "startup.read"
  ]
}
```




---

## User Management Best Practices

### Security Principles

- **Principle of Least Privilege**: Grant only the minimum permissions needed
- **Regular Audits**: Periodically review user access and permissions
- **Time-Limited Access**: Remove access when no longer needed
- **Role-Based Access**: Use consistent permission sets for similar roles

### Permission Guidelines

- **Start Small**: Begin with minimal permissions and add as needed
- **Group Related Permissions**: Grant logical permission groups together
- **Document Roles**: Maintain documentation of what each role can do
- **Test Permissions**: Verify permissions work as expected

### Access Management

- **Regular Cleanup**: Remove inactive users periodically
- **Monitor Activity**: Track user actions and access patterns
- **Emergency Procedures**: Have a plan for revoking access quickly
- **Backup Access**: Ensure multiple users can manage critical functions

### Communication

- **Clear Expectations**: Communicate what users can and cannot do
- **Training**: Provide guidance on using granted permissions
- **Support Channels**: Establish channels for permission requests
- **Change Notifications**: Notify users of permission changes

---

## User Invitation Process

### How Invitations Work

1. **User Creation**: Server owner creates subuser with email and permissions
2. **Account Linking**: If user exists, they're linked to server immediately
3. **New User Registration**: If user doesn't exist, they must register first
4. **Access Activation**: User gains access once account is confirmed

### Email Requirements

- **Valid Email**: Email must be properly formatted and deliverable
- **Existing Account**: User must have a Pterodactyl panel account
- **Unique Access**: Each user can only have one access level per server

### Registration Flow

For new users who don't have accounts:

1. **Email Invitation**: Invited user receives email notification
2. **Account Creation**: User creates account using same email address
3. **Automatic Linking**: System automatically grants server access
4. **Permission Activation**: All assigned permissions become active

---

## Troubleshooting User Issues

### Common Problems

| Issue | Cause | Solution |
|-------|--------|---------|
| **User can't access server** | Permissions not granted | Check and update permissions |
| **Invitation failed** | Invalid email address | Verify email format and deliverability |
| **User limit reached** | Too many subusers | Remove inactive users or upgrade plan |
| **Permission denied errors** | Missing specific permission | Grant required permission |

### Diagnostic Steps

```bash
# Check current subusers
curl "https://your-panel.com/api/client/servers/{server}/users" \
  -H "Authorization: Bearer YOUR_API_KEY"

# View specific user permissions
curl "https://your-panel.com/api/client/servers/{server}/users/{user}" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Test user access
# Have user attempt the action and check error messages
```


### Permission Debugging

- **Test with minimal permissions**: Start with basic permissions and add incrementally
- **Check error messages**: API errors often specify which permission is missing
- **Compare working users**: Look at permissions of users who can perform the action
- **Verify permission names**: Ensure permission keys are spelled correctly



---

## User Limits and Quotas

### Default Limits

| Resource | Default Limit | Description |
|----------|---------------|-------------|
| Subusers per server | 5-50 | Varies by hosting plan |
| Permission combinations | Unlimited | Any combination of available permissions |
| Invitation attempts | Rate limited | Limited to prevent abuse |
| Access duration | Permanent | Until manually removed |

### Account Requirements

- **Panel Account**: User must have Pterodactyl panel account
- **Email Verification**: Account email must be verified
- **Active Status**: Account must not be suspended or banned
- **Unique Email**: One account per email address

---

## Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | `TooManySubusersException` | Subuser limit reached |
| 400 | `CannotRemoveServerOwnerException` | Cannot remove server owner |
| 401 | `InvalidCredentialsException` | Invalid API key |
| 403 | `InsufficientPermissionsException` | Missing required permissions |
| 404 | `UserNotFoundException` | User not found |
| 404 | `NotFoundHttpException` | Subuser not found |
| 409 | `UserAlreadyHasAccessException` | User already has server access |
| 422 | `ValidationException` | Invalid request data |

## Required Permissions

User management operations require specific permissions:

| Permission | Description |
|------------|-------------|
| `user.create` | Invite new subusers |
| `user.read` | View subuser list and details |
| `user.update` | Modify subuser permissions |
| `user.delete` | Remove subusers |

:::info[Server Owner Privileges]
Server owners automatically have all permissions and can perform all user management operations regardless of explicit permission grants.
:::

## Security Considerations

### Access Control

- **Multi-factor Authentication**: Encourage users to enable 2FA
- **Strong Passwords**: Require strong passwords for all accounts
- **Regular Reviews**: Periodically audit user access and permissions
- **Session Management**: Monitor and manage active user sessions

### Permission Security

- **Sensitive Permissions**: Be careful with delete and administrative permissions
- **Cross-Permission Impact**: Consider how permissions interact with each other
- **Escalation Prevention**: Avoid granting users ability to elevate their own permissions
- **Audit Trails**: Monitor permission changes and user actions

## Source References

**Controller**: [`SubuserController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/SubuserController.php)  
**Routes**: [`api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php) - Subuser endpoints  
**Subuser Model**: [`Subuser.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Subuser.php)  
**Permission Model**: [`Permission.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Permission.php)  
**Subuser Service**: [`SubuserCreationService`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Subusers/SubuserCreationService.php)

## Next Steps

- Explore [Server Management](./servers) for server control operations
- Check [File Management](./files) for file permission details
- Review [Database Management](./databases) for database access control 

---
sidebar_position: 1
title: User Management
description: Complete Application API documentation for managing users, including creation, permissions, and account administration
keywords: [pterodactyl, application api, user management, account administration, permissions]
---

import CodeTabs from '@site/src/components/CodeTabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# User Management

The Application API User Management endpoints allow administrators to manage all users in the panel. These endpoints provide full CRUD (Create, Read, Update, Delete) operations for user accounts.

:::warning[Administrative Access Required]
These endpoints require administrative privileges and should only be used by trusted applications with proper authentication.
:::

## Authentication

All Application API requests require authentication using an API key with appropriate permissions:

<Tabs>
<TabItem value="curl" label="cURL">
```bash
Authorization: Bearer YOUR_APPLICATION_API_KEY
Accept: Application/vnd.pterodactyl.v1+json
Content-Type: application/json
```

## List All Users

Retrieve a paginated list of all users in the panel.

```http
GET /api/application/users
```

### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number for pagination | 1 |
| `per_page` | integer | Results per page (1-100) | 50 |
| `filter[email]` | string | Filter by email address | - |
| `filter[uuid]` | string | Filter by user UUID | - |
| `filter[username]` | string | Filter by username | - |
| `filter[external_id]` | string | Filter by external ID | - |
| `sort` | string | Sort field (id, uuid, username, email, created_at, updated_at) | id |
| `include` | string | Include relationships (servers) | - |

### Example Request



```bash
curl "https://your-panel.com/api/application/users?include=servers&per_page=25" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const response = await axios.get('https://your-panel.com/api/application/users', {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'servers',
    per_page: 25,
    'filter[email]': 'admin@example.com'
  }
});

console.log(response.data);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {
    'include': 'servers',
    'per_page': 25,
    'filter[email]': 'admin@example.com'
}

response = requests.get('https://your-panel.com/api/application/users', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();

$response = $client->get('https://your-panel.com/api/application/users', [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => [
        'include' => 'servers',
        'per_page' => 25,
        'filter' => ['email' => 'admin@example.com']
    ]
]);

$data = json_decode($response->getBody(), true);
print_r($data);
?>
```
</TabItem>

<TabItem value="go" label="Go">
```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://your-panel.com/api/application/users?include=servers&per_page=25", nil)
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println(result)
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/application/users?include=servers&per_page=25"))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var response = await client.GetAsync("https://your-panel.com/api/application/users?include=servers&per_page=25");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/application/users')
uri.query = URI.encode_www_form({
  include: 'servers',
  per_page: 25
})

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts JSON.parse(response.body)
```
</TabItem>

</Tabs>




### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "user",
      "attributes": {
        "id": 1,
        "external_id": null,
        "uuid": "c4022c6c-9bf1-4a23-bff9-519cceb38335",
        "username": "system",
        "email": "admin@example.com",
        "first_name": "System",
        "last_name": "Administrator",
        "language": "en",
        "root_admin": true,
        "2fa": false,
        "created_at": "2023-01-15T10:26:32+00:00",
        "updated_at": "2023-01-15T10:26:32+00:00"
      },
      "relationships": {
        "servers": {
          "object": "list",
          "data": []
        }
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

## Get User Details

Retrieve detailed information about a specific user.

```http
GET /api/application/users/{user}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `user` | integer | User ID |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include` | string | Include relationships (servers) |

### Example Request



<CodeTabs
  endpoint="/api/application/users/{user}"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/application/users/1?include=servers" \\
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`,
    javascript: `const axios = require('axios');

const userId = 1;
const response = await axios.get(\`https://your-panel.com/api/application/users/\${userId}\`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'servers'
  }
});

console.log(response.data);`,
    python: `import requests

user_id = 1
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {'include': 'servers'}

response = requests.get(f'https://your-panel.com/api/application/users/{user_id}', 
                       headers=headers, params=params)
print(response.json())`,
    php: `<?php
$client = new GuzzleHttp\\Client();
$userId = 1;

$response = $client->get("https://your-panel.com/api/application/users/{$userId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => ['include' => 'servers']
]);

$data = json_decode($response->getBody(), true);
print_r($data);
?>`,
    go: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    userId := 1
    url := fmt.Sprintf("https://your-panel.com/api/application/users/%d?include=servers", userId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println(result)
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

int userId = 1;
String url = String.format("https://your-panel.com/api/application/users/%d?include=servers", userId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    csharp: `using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

int userId = 1;
var response = await client.GetAsync($"https://your-panel.com/api/application/users/{userId}?include=servers");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`,
    ruby: `require 'net/http'
require 'json'

user_id = 1
uri = URI("https://your-panel.com/api/application/users/#{user_id}")
uri.query = URI.encode_www_form({include: 'servers'})

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts JSON.parse(response.body)`
  }}
/>




### Example Response

```json
{
  "object": "user",
  "attributes": {
    "id": 1,
    "external_id": null,
    "uuid": "c4022c6c-9bf1-4a23-bff9-519cceb38335",
    "username": "system",
    "email": "admin@example.com",
    "first_name": "System",
    "last_name": "Administrator",
    "language": "en",
    "root_admin": true,
    "2fa": false,
    "created_at": "2023-01-15T10:26:32+00:00",
    "updated_at": "2023-01-15T10:26:32+00:00"
  },
  "relationships": {
    "servers": {
      "object": "list",
      "data": []
    }
  }
}
```

## Get User by External ID

Retrieve user details using an external ID.

```http
GET /api/application/users/external/{external_id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `external_id` | string | External ID of the user |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include` | string | Include relationships (servers) |

<CodeTabs
  endpoint="/api/application/users/external/{external_id}"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/application/users/external/ext-123456" \\
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`,
    javascript: `const axios = require('axios');

const externalId = 'ext-123456';
const response = await axios.get(\`https://your-panel.com/api/application/users/external/\${externalId}\`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  }
});

console.log(response.data);`,
    python: `import requests

external_id = 'ext-123456'
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

response = requests.get(f'https://your-panel.com/api/application/users/external/{external_id}', 
                       headers=headers)
print(response.json())`,
    php: `<?php
$client = new GuzzleHttp\\Client();
$externalId = 'ext-123456';

$response = $client->get("https://your-panel.com/api/application/users/external/{$externalId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ]
]);

$data = json_decode($response->getBody(), true);
print_r($data);
?>`,
    go: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    externalId := "ext-123456"
    url := fmt.Sprintf("https://your-panel.com/api/application/users/external/%s", externalId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println(result)
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String externalId = "ext-123456";
String url = String.format("https://your-panel.com/api/application/users/external/%s", externalId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    csharp: `using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string externalId = "ext-123456";
var response = await client.GetAsync($"https://your-panel.com/api/application/users/external/{externalId}");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`,
    ruby: `require 'net/http'
require 'json'

external_id = 'ext-123456'
uri = URI("https://your-panel.com/api/application/users/external/#{external_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts JSON.parse(response.body)`
  }}
/>

### Response

```json
{
  "object": "user",
  "attributes": {
    "id": 1,
    "external_id": "ext-123456",
    "uuid": "3f7a8b4c-2e9d-4b6f-8c5e-1a2b3c4d5e6f",
    "username": "admin",
    "email": "admin@example.com",
    "first_name": "System",
    "last_name": "Administrator",
    "language": "en",
    "root_admin": true,
    "2fa": false,
    "created_at": "2023-01-15T10:26:32+00:00",
    "updated_at": "2023-01-15T10:26:32+00:00"
  }
}
```

## Create New User

Create a new user account in the panel.

```http
POST /api/application/users
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address (must be unique) |
| `username` | string | Yes | Username (must be unique) |
| `first_name` | string | Yes | User's first name |
| `last_name` | string | Yes | User's last name |
| `password` | string | No | User's password (if not provided, user must reset) |
| `language` | string | No | User's preferred language (default: en) |
| `root_admin` | boolean | No | Whether user has administrative privileges |
| `external_id` | string | No | External ID for integration purposes |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/application/users" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "username": "newuser",
    "first_name": "New",
    "last_name": "User",
    "password": "secure_password_123",
    "language": "en",
    "root_admin": false
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const userData = {
  email: 'newuser@example.com',
  username: 'newuser',
  first_name: 'New',
  last_name: 'User',
  password: 'secure_password_123',
  language: 'en',
  root_admin: false
};

const response = await axios.post('https://your-panel.com/api/application/users', userData, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests
import json

headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

user_data = {
    'email': 'newuser@example.com',
    'username': 'newuser',
    'first_name': 'New',
    'last_name': 'User',
    'password': 'secure_password_123',
    'language': 'en',
    'root_admin': False
}

response = requests.post('https://your-panel.com/api/application/users', 
                        headers=headers, json=user_data)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();

$userData = [
    'email' => 'newuser@example.com',
    'username' => 'newuser',
    'first_name' => 'New',
    'last_name' => 'User',
    'password' => 'secure_password_123',
    'language' => 'en',
    'root_admin' => false
];

$response = $client->post('https://your-panel.com/api/application/users', [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $userData
]);

$data = json_decode($response->getBody(), true);
print_r($data);
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
    userData := map[string]interface{}{
        "email":      "newuser@example.com",
        "username":   "newuser",
        "first_name": "New",
        "last_name":  "User",
        "password":   "secure_password_123",
        "language":   "en",
        "root_admin": false,
    }
    
    jsonData, _ := json.Marshal(userData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "https://your-panel.com/api/application/users", bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println(result)
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String jsonBody = """
{
  "email": "newuser@example.com",
  "username": "newuser",
  "first_name": "New",
  "last_name": "User",
  "password": "secure_password_123",
  "language": "en",
  "root_admin": false
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/application/users"))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var userData = new {
    email = "newuser@example.com",
    username = "newuser",
    first_name = "New",
    last_name = "User",
    password = "secure_password_123",
    language = "en",
    root_admin = false
};

var json = JsonSerializer.Serialize(userData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync("https://your-panel.com/api/application/users", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseContent);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/application/users')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

user_data = {
  email: 'newuser@example.com',
  username: 'newuser',
  first_name: 'New',
  last_name: 'User',
  password: 'secure_password_123',
  language: 'en',
  root_admin: false
}

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = user_data.to_json

response = http.request(request)
puts JSON.parse(response.body)
```
</TabItem>

</Tabs>




### Example Response

```json
{
  "object": "user",
  "attributes": {
    "id": 2,
    "external_id": null,
    "uuid": "f3b21b3e-4c5d-4f8e-9a1b-2c3d4e5f6789",
    "username": "newuser",
    "email": "newuser@example.com",
    "first_name": "New",
    "last_name": "User",
    "language": "en",
    "root_admin": false,
    "2fa": false,
    "created_at": "2024-01-20T14:30:45+00:00",
    "updated_at": "2024-01-20T14:30:45+00:00"
  }
}
```


## Update User

Update an existing user's information.

```http
PATCH /api/application/users/{user}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `user` | integer | User ID |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address |
| `username` | string | Yes | Username |
| `first_name` | string | Yes | User's first name |
| `last_name` | string | Yes | User's last name |
| `password` | string | No | New password |
| `language` | string | No | User's preferred language |
| `root_admin` | boolean | No | Administrative privileges |
| `external_id` | string | No | External ID for integration |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X PATCH "https://your-panel.com/api/application/users/2" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Updated",
    "last_name": "Name",
    "language": "fr"
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const userId = 2;
const updateData = {
  first_name: 'Updated',
  last_name: 'Name',
  language: 'fr'
};

const response = await axios.patch(`https://your-panel.com/api/application/users/${userId}`, updateData, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests
import json

user_id = 2
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

update_data = {
    'first_name': 'Updated',
    'last_name': 'Name',
    'language': 'fr'
}

response = requests.patch(f'https://your-panel.com/api/application/users/{user_id}', 
                         headers=headers, json=update_data)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$userId = 2;

$updateData = [
    'first_name' => 'Updated',
    'last_name' => 'Name',
    'language' => 'fr'
];

$response = $client->patch("https://your-panel.com/api/application/users/{$userId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $updateData
]);

$data = json_decode($response->getBody(), true);
print_r($data);
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
    userId := 2
    updateData := map[string]interface{}{
        "first_name": "Updated",
        "last_name":  "Name",
        "language":   "fr",
    }
    
    jsonData, _ := json.Marshal(updateData)
    url := fmt.Sprintf("https://your-panel.com/api/application/users/%d", userId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("PATCH", url, bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println(result)
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

int userId = 2;
String jsonBody = """
{
  "first_name": "Updated",
  "last_name": "Name",
  "language": "fr"
}
""";

String url = String.format("https://your-panel.com/api/application/users/%d", userId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .method("PATCH", HttpRequest.BodyPublishers.ofString(jsonBody))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

int userId = 2;
var updateData = new {
    first_name = "Updated",
    last_name = "Name",
    language = "fr"
};

var json = JsonSerializer.Serialize(updateData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PatchAsync($"https://your-panel.com/api/application/users/{userId}", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseContent);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

user_id = 2
uri = URI("https://your-panel.com/api/application/users/#{user_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

update_data = {
  first_name: 'Updated',
  last_name: 'Name',
  language: 'fr'
}

request = Net::HTTP::Patch.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = update_data.to_json

response = http.request(request)
puts JSON.parse(response.body)
```
</TabItem>

</Tabs>




### Example Response

```json
{
  "object": "user",
  "attributes": {
    "id": 2,
    "external_id": null,
    "uuid": "f3b21b3e-4c5d-4f8e-9a1b-2c3d4e5f6789",
    "username": "newuser",
    "email": "newuser@example.com",
    "first_name": "Updated",
    "last_name": "Name",
    "language": "fr",
    "root_admin": false,
    "2fa": false,
    "created_at": "2024-01-20T14:30:45+00:00",
    "updated_at": "2024-01-20T15:45:30+00:00"
  }
}
```


## Delete User

Delete a user account from the panel. This action is irreversible.

```http
DELETE /api/application/users/{user}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `user` | integer | User ID |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X DELETE "https://your-panel.com/api/application/users/2" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const userId = 2;
const response = await axios.delete(`https://your-panel.com/api/application/users/${userId}`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  }
});

console.log('User deleted successfully');
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

user_id = 2
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

response = requests.delete(f'https://your-panel.com/api/application/users/{user_id}', 
                          headers=headers)
print('User deleted successfully' if response.status_code == 204 else 'Error deleting user')
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$userId = 2;

$response = $client->delete("https://your-panel.com/api/application/users/{$userId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ]
]);

echo 'User deleted successfully';
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
    userId := 2
    url := fmt.Sprintf("https://your-panel.com/api/application/users/%d", userId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("DELETE", url, nil)
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    if resp.StatusCode == 204 {
        fmt.Println("User deleted successfully")
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

int userId = 2;
String url = String.format("https://your-panel.com/api/application/users/%d", userId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .DELETE()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
if (response.statusCode() == 204) {
    System.out.println("User deleted successfully");
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

int userId = 2;
var response = await client.DeleteAsync($"https://your-panel.com/api/application/users/{userId}");

if (response.StatusCode == System.Net.HttpStatusCode.NoContent) {
    Console.WriteLine("User deleted successfully");
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'

user_id = 2
uri = URI("https://your-panel.com/api/application/users/#{user_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts 'User deleted successfully' if response.code == '204'
```
</TabItem>

</Tabs>


### Response

Returns HTTP 204 No Content on successful deletion.




## Error Responses

### Common Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - User does not exist |
| 422 | Validation Error - Invalid field values |
| 429 | Too Many Requests - Rate limit exceeded |

### Example Error Response

```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The email field is required.",
      "source": {
        "field": "email"
      }
    }
  ]
}
```


## Best Practices

### Security Considerations

1. **API Key Protection**: Store API keys securely and never expose them in client-side code
2. **HTTPS Only**: Always use HTTPS for API requests
3. **Rate Limiting**: Implement proper rate limiting to avoid hitting API limits
4. **Input Validation**: Validate all input data before sending API requests
5. **Error Handling**: Implement comprehensive error handling for all API calls

### Performance Tips

1. **Pagination**: Use pagination for large datasets
2. **Filtering**: Apply filters to reduce response size
3. **Selective Fields**: Use `include` parameter only when needed
4. **Caching**: Implement caching strategies for frequently accessed data
5. **Bulk Operations**: Use bulk operations when available

### Integration Examples

```javascript
// User management service example
class UserService {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'application/json'
    };
  }

  async getAllUsers(options = {}) {
    const params = new URLSearchParams(options);
    const response = await fetch(`${this.baseUrl}/api/application/users?${params}`, {
      headers: this.headers
    });
    return response.json();
  }

  async createUser(userData) {
    const response = await fetch(`${this.baseUrl}/api/application/users`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  async updateUser(userId, updateData) {
    const response = await fetch(`${this.baseUrl}/api/application/users/${userId}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(updateData)
    });
    return response.json();
  }

  async deleteUser(userId) {
    const response = await fetch(`${this.baseUrl}/api/application/users/${userId}`, {
      method: 'DELETE',
      headers: this.headers
    });
    return response.status === 204;
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



## Source Code References

### Controllers and Routes

**Method**: `UserController@index` (List Users)  
**Route**: `GET /api/application/users`  
**Source**: [UserController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Users/UserController.php)

**Method**: `UserController@view` (Get User)  
**Route**: `GET /api/application/users/{user}`  
**Source**: [UserController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Users/UserController.php)

**Method**: `UserController@store` (Create User)  
**Route**: `POST /api/application/users`  
**Source**: [UserController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Users/UserController.php)

**Method**: `UserController@update` (Update User)  
**Route**: `PATCH /api/application/users/{user}`  
**Source**: [UserController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Users/UserController.php)

**Method**: `UserController@delete` (Delete User)  
**Route**: `DELETE /api/application/users/{user}`  
**Source**: [UserController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Users/UserController.php)



### Services

**User Creation Service**: [UserCreationService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Users/UserCreationService.php)  
**User Update Service**: [UserUpdateService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Users/UserUpdateService.php)  
**User Deletion Service**: [UserDeletionService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Users/UserDeletionService.php)

### Models and Validation

**User Model**: [User.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/User.php)  
**User Store Request**: [StoreUserRequest.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Requests/Api/Application/Users/StoreUserRequest.php)  
**User Update Request**: [UpdateUserRequest.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Requests/Api/Application/Users/UpdateUserRequest.php)

### Route Definitions

**Application Routes**: [api-application.php](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-application.php) - Lines 45-55

For detailed implementation and the latest updates, refer to the [Pterodactyl Panel repository](https://github.com/pterodactyl/panel). 

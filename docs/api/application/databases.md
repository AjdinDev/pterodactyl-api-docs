---
sidebar_position: 7
title: Database Management
description: Application API documentation for managing server databases
keywords: [pterodactyl, application api, database management, mysql, server databases]
---

import CodeTabs from '@site/src/components/CodeTabs';

# Database Management

The Application API Database Management endpoints allow administrators to manage databases for servers. These endpoints provide operations for creating, viewing, and managing MySQL databases associated with servers.

:::warning[Administrative Access Required]
These endpoints require administrative privileges and an Application API key with appropriate permissions.
:::

## List Server Databases

Retrieve a list of all databases for a specific server.

```http
GET /api/application/servers/{server}/databases
```

### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `server` | string | path | Yes | The server's UUID or ID |

### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number for pagination | 1 |
| `per_page` | integer | Results per page (1-100) | 50 |
| `include` | string | Include related resources (host, password) | - |

<CodeTabs
  endpoint="/api/application/servers/{server}/databases"
  method="GET"
  examples={{
    curl: `curl -X GET "https://panel.example.com/api/application/servers/{server}/databases" \\
  -H "Authorization: Bearer YOUR_APPLICATION_API_KEY" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json"`,
    javascript: `const response = await fetch('https://panel.example.com/api/application/servers/{server}/databases', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_APPLICATION_API_KEY',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const databases = await response.json();`,
    python: `import requests

response = requests.get(
    'https://panel.example.com/api/application/servers/{server}/databases',
    headers={
        'Authorization': 'Bearer YOUR_APPLICATION_API_KEY',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
)

databases = response.json()`,
    php: `<?php
$ch = curl_init('https://panel.example.com/api/application/servers/{server}/databases');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_APPLICATION_API_KEY',
    'Accept: application/json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$databases = json_decode($response, true);
curl_close($ch);`,
    go: `package main

import (
    "net/http"
    "io/ioutil"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://panel.example.com/api/application/servers/{server}/databases", nil)
    req.Header.Add("Authorization", "Bearer YOUR_APPLICATION_API_KEY")
    req.Header.Add("Accept", "application/json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    body, _ := ioutil.ReadAll(resp.Body)
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://panel.example.com/api/application/servers/{server}/databases"))
    .header("Authorization", "Bearer YOUR_APPLICATION_API_KEY")
    .header("Accept", "application/json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    csharp: `using System.Net.Http;
using System.Net.Http.Headers;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_APPLICATION_API_KEY");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var response = await client.GetAsync("https://panel.example.com/api/application/servers/{server}/databases");
var content = await response.Content.ReadAsStringAsync();`,
    ruby: `require 'net/http'
require 'json'

uri = URI('https://panel.example.com/api/application/servers/{server}/databases')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer YOUR_APPLICATION_API_KEY'
request['Accept'] = 'application/json'
request['Content-Type'] = 'application/json'

response = http.request(request)
databases = JSON.parse(response.body)`
  }}
/>

### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "server_database",
      "attributes": {
        "id": 1,
        "server": 1,
        "host": 1,
        "database": "s1_example",
        "username": "u1_example",
        "remote": "%",
        "max_connections": 0,
        "created_at": "2024-01-01T00:00:00+00:00",
        "updated_at": "2024-01-01T00:00:00+00:00"
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "count": 1,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1
    }
  }
}
```

---

## Get Server Database

Retrieve details for a specific database.

```http
GET /api/application/servers/{server}/databases/{database}
```

### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `server` | string | path | Yes | The server's UUID or ID |
| `database` | integer | path | Yes | The database ID |

<CodeTabs
  endpoint="/api/application/servers/{server}/databases/{database}"
  method="GET"
  examples={{
    curl: `curl -X GET "https://panel.example.com/api/application/servers/{server}/databases/{database}" \\
  -H "Authorization: Bearer YOUR_APPLICATION_API_KEY" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json"`,
    javascript: `const response = await fetch('https://panel.example.com/api/application/servers/{server}/databases/{database}', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_APPLICATION_API_KEY',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const database = await response.json();`,
    python: `import requests

response = requests.get(
    'https://panel.example.com/api/application/servers/{server}/databases/{database}',
    headers={
        'Authorization': 'Bearer YOUR_APPLICATION_API_KEY',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
)

database = response.json()`,
    php: `<?php
$ch = curl_init('https://panel.example.com/api/application/servers/{server}/databases/{database}');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_APPLICATION_API_KEY',
    'Accept: application/json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$database = json_decode($response, true);
curl_close($ch);`,
    go: `package main

import (
    "net/http"
    "io/ioutil"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://panel.example.com/api/application/servers/{server}/databases/{database}", nil)
    req.Header.Add("Authorization", "Bearer YOUR_APPLICATION_API_KEY")
    req.Header.Add("Accept", "application/json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    body, _ := ioutil.ReadAll(resp.Body)
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://panel.example.com/api/application/servers/{server}/databases/{database}"))
    .header("Authorization", "Bearer YOUR_APPLICATION_API_KEY")
    .header("Accept", "application/json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    csharp: `using System.Net.Http;
using System.Net.Http.Headers;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_APPLICATION_API_KEY");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var response = await client.GetAsync("https://panel.example.com/api/application/servers/{server}/databases/{database}");
var content = await response.Content.ReadAsStringAsync();`,
    ruby: `require 'net/http'
require 'json'

uri = URI('https://panel.example.com/api/application/servers/{server}/databases/{database}')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer YOUR_APPLICATION_API_KEY'
request['Accept'] = 'application/json'
request['Content-Type'] = 'application/json'

response = http.request(request)
database = JSON.parse(response.body)`
  }}
/>

### Response

```json
{
  "object": "server_database",
  "attributes": {
    "id": 1,
    "server": 1,
    "host": 1,
    "database": "s1_example",
    "username": "u1_example",
    "remote": "%",
    "max_connections": 0,
    "created_at": "2024-01-01T00:00:00+00:00",
    "updated_at": "2024-01-01T00:00:00+00:00",
    "relationships": {
      "password": {
        "object": "database_password",
        "attributes": {
          "password": "example_password"
        }
      },
      "host": {
        "object": "database_host",
        "attributes": {
          "id": 1,
          "name": "localhost",
          "host": "127.0.0.1",
          "port": 3306,
          "username": "root",
          "node": 1,
          "created_at": "2024-01-01T00:00:00+00:00",
          "updated_at": "2024-01-01T00:00:00+00:00"
        }
      }
    }
  }
}
```

---

## Create Server Database

Create a new database for a server.

```http
POST /api/application/servers/{server}/databases
```

### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `server` | string | path | Yes | The server's UUID or ID |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `database` | string | Yes | Database name (will be prefixed with server ID) |
| `remote` | string | Yes | Remote connection address (use % for any) |
| `host` | integer | Yes | Database host ID |

<CodeTabs
  endpoint="/api/application/servers/{server}/databases"
  method="POST"
  examples={{
    curl: `curl -X POST "https://panel.example.com/api/application/servers/{server}/databases" \\
  -H "Authorization: Bearer YOUR_APPLICATION_API_KEY" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "database": "my_database",
    "remote": "%",
    "host": 1
  }'`,
    javascript: `const response = await fetch('https://panel.example.com/api/application/servers/{server}/databases', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_APPLICATION_API_KEY',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    database: 'my_database',
    remote: '%',
    host: 1
  })
});

const database = await response.json();`,
    python: `import requests

response = requests.post(
    'https://panel.example.com/api/application/servers/{server}/databases',
    headers={
        'Authorization': 'Bearer YOUR_APPLICATION_API_KEY',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    json={
        'database': 'my_database',
        'remote': '%',
        'host': 1
    }
)

database = response.json()`,
    php: `<?php
$data = [
    'database' => 'my_database',
    'remote' => '%',
    'host' => 1
];

$ch = curl_init('https://panel.example.com/api/application/servers/{server}/databases');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_APPLICATION_API_KEY',
    'Accept: application/json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$database = json_decode($response, true);
curl_close($ch);`,
    go: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    data := map[string]interface{}{
        "database": "my_database",
        "remote": "%",
        "host": 1,
    }
    
    jsonData, _ := json.Marshal(data)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "https://panel.example.com/api/application/servers/{server}/databases", bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer YOUR_APPLICATION_API_KEY")
    req.Header.Add("Accept", "application/json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String requestBody = """
{
    "database": "my_database",
    "remote": "%",
    "host": 1
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://panel.example.com/api/application/servers/{server}/databases"))
    .header("Authorization", "Bearer YOUR_APPLICATION_API_KEY")
    .header("Accept", "application/json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    csharp: `using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_APPLICATION_API_KEY");

var data = new
{
    database = "my_database",
    remote = "%",
    host = 1
};

var json = JsonSerializer.Serialize(data);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync("https://panel.example.com/api/application/servers/{server}/databases", content);`,
    ruby: `require 'net/http'
require 'json'

uri = URI('https://panel.example.com/api/application/servers/{server}/databases')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer YOUR_APPLICATION_API_KEY'
request['Accept'] = 'application/json'
request['Content-Type'] = 'application/json'
request.body = {
  database: 'my_database',
  remote: '%',
  host: 1
}.to_json

response = http.request(request)
database = JSON.parse(response.body)`
  }}
/>

### Response

```json
{
  "object": "server_database",
  "attributes": {
    "id": 2,
    "server": 1,
    "host": 1,
    "database": "s1_my_database",
    "username": "u1_randomuser",
    "remote": "%",
    "max_connections": 0,
    "created_at": "2024-01-01T00:00:00+00:00",
    "updated_at": "2024-01-01T00:00:00+00:00",
    "relationships": {
      "password": {
        "object": "database_password",
        "attributes": {
          "password": "generated_password"
        }
      }
    }
  }
}
```

---

## Reset Database Password

Reset the password for a server database.

```http
POST /api/application/servers/{server}/databases/{database}/reset-password
```

### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `server` | string | path | Yes | The server's UUID or ID |
| `database` | integer | path | Yes | The database ID |

<CodeTabs
  endpoint="/api/application/servers/{server}/databases/{database}/reset-password"
  method="POST"
  examples={{
    curl: `curl -X POST "https://panel.example.com/api/application/servers/{server}/databases/{database}/reset-password" \\
  -H "Authorization: Bearer YOUR_APPLICATION_API_KEY" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json"`,
    javascript: `const response = await fetch('https://panel.example.com/api/application/servers/{server}/databases/{database}/reset-password', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_APPLICATION_API_KEY',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const result = await response.json();`,
    python: `import requests

response = requests.post(
    'https://panel.example.com/api/application/servers/{server}/databases/{database}/reset-password',
    headers={
        'Authorization': 'Bearer YOUR_APPLICATION_API_KEY',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
)

result = response.json()`,
    php: `<?php
$ch = curl_init('https://panel.example.com/api/application/servers/{server}/databases/{database}/reset-password');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_APPLICATION_API_KEY',
    'Accept: application/json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$result = json_decode($response, true);
curl_close($ch);`,
    go: `package main

import (
    "net/http"
    "io/ioutil"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "https://panel.example.com/api/application/servers/{server}/databases/{database}/reset-password", nil)
    req.Header.Add("Authorization", "Bearer YOUR_APPLICATION_API_KEY")
    req.Header.Add("Accept", "application/json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    body, _ := ioutil.ReadAll(resp.Body)
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://panel.example.com/api/application/servers/{server}/databases/{database}/reset-password"))
    .header("Authorization", "Bearer YOUR_APPLICATION_API_KEY")
    .header("Accept", "application/json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.noBody())
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    csharp: `using System.Net.Http;
using System.Net.Http.Headers;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_APPLICATION_API_KEY");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var response = await client.PostAsync("https://panel.example.com/api/application/servers/{server}/databases/{database}/reset-password", null);
var content = await response.Content.ReadAsStringAsync();`,
    ruby: `require 'net/http'
require 'json'

uri = URI('https://panel.example.com/api/application/servers/{server}/databases/{database}/reset-password')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer YOUR_APPLICATION_API_KEY'
request['Accept'] = 'application/json'
request['Content-Type'] = 'application/json'

response = http.request(request)
result = JSON.parse(response.body)`
  }}
/>

### Response

```json
{
  "object": "server_database",
  "attributes": {
    "id": 1,
    "server": 1,
    "host": 1,
    "database": "s1_example",
    "username": "u1_example",
    "remote": "%",
    "max_connections": 0,
    "created_at": "2024-01-01T00:00:00+00:00",
    "updated_at": "2024-01-01T00:00:00+00:00",
    "relationships": {
      "password": {
        "object": "database_password",
        "attributes": {
          "password": "new_generated_password"
        }
      }
    }
  }
}
```

---

## Delete Server Database

Delete a database from a server.

```http
DELETE /api/application/servers/{server}/databases/{database}
```

### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `server` | string | path | Yes | The server's UUID or ID |
| `database` | integer | path | Yes | The database ID |

<CodeTabs
  endpoint="/api/application/servers/{server}/databases/{database}"
  method="DELETE"
  examples={{
    curl: `curl -X DELETE "https://panel.example.com/api/application/servers/{server}/databases/{database}" \\
  -H "Authorization: Bearer YOUR_APPLICATION_API_KEY" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json"`,
    javascript: `const response = await fetch('https://panel.example.com/api/application/servers/{server}/databases/{database}', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_APPLICATION_API_KEY',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

if (response.status === 204) {
  console.log('Database deleted successfully');
}`,
    python: `import requests

response = requests.delete(
    'https://panel.example.com/api/application/servers/{server}/databases/{database}',
    headers={
        'Authorization': 'Bearer YOUR_APPLICATION_API_KEY',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
)

if response.status_code == 204:
    print('Database deleted successfully')`,
    php: `<?php
$ch = curl_init('https://panel.example.com/api/application/servers/{server}/databases/{database}');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_APPLICATION_API_KEY',
    'Accept: application/json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 204) {
    echo 'Database deleted successfully';
}`,
    go: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("DELETE", "https://panel.example.com/api/application/servers/{server}/databases/{database}", nil)
    req.Header.Add("Authorization", "Bearer YOUR_APPLICATION_API_KEY")
    req.Header.Add("Accept", "application/json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    if resp.StatusCode == 204 {
        fmt.Println("Database deleted successfully")
    }
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://panel.example.com/api/application/servers/{server}/databases/{database}"))
    .header("Authorization", "Bearer YOUR_APPLICATION_API_KEY")
    .header("Accept", "application/json")
    .header("Content-Type", "application/json")
    .DELETE()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

if (response.statusCode() == 204) {
    System.out.println("Database deleted successfully");
}`,
    csharp: `using System.Net.Http;
using System.Net.Http.Headers;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_APPLICATION_API_KEY");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var response = await client.DeleteAsync("https://panel.example.com/api/application/servers/{server}/databases/{database}");

if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
{
    Console.WriteLine("Database deleted successfully");
}`,
    ruby: `require 'net/http'

uri = URI('https://panel.example.com/api/application/servers/{server}/databases/{database}')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(uri)
request['Authorization'] = 'Bearer YOUR_APPLICATION_API_KEY'
request['Accept'] = 'application/json'
request['Content-Type'] = 'application/json'

response = http.request(request)

if response.code == '204'
  puts 'Database deleted successfully'
end`
  }}
/>

### Response

Returns `204 No Content` on successful deletion.

## Error Responses

All database management endpoints may return the following errors:

| Status Code | Error | Description |
|-------------|-------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Invalid or missing API key |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Server or database not found |
| 409 | Conflict | Database name already exists |
| 422 | Unprocessable Entity | Validation errors |
| 500 | Internal Server Error | Server error |

### Error Response Format

```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The database name has already been taken."
    }
  ]
}
```
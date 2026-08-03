---
sidebar_position: 6
title: Server Management
description: Complete Application API documentation for managing servers, including creation, configuration, and administration
keywords: [pterodactyl, application api, server management, server creation, server configuration]
---

import CodeTabs from '@site/src/components/CodeTabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Server Management

The Application API Server Management endpoints allow administrators to manage all servers in the panel. These endpoints provide comprehensive server lifecycle management including creation, configuration, suspension, and deletion.

:::warning Administrative Access Required
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

## List All Servers

Retrieve a paginated list of all servers in the panel.

```http
GET /api/application/servers
```

### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number for pagination | 1 |
| `per_page` | integer | Results per page (1-100) | 50 |
| `filter[name]` | string | Filter by server name | - |
| `filter[uuid]` | string | Filter by server UUID | - |
| `filter[external_id]` | string | Filter by external ID | - |
| `filter[image]` | string | Filter by Docker image | - |
| `sort` | string | Sort field (id, uuid, name, created_at, updated_at) | id |
| `include` | string | Include relationships (allocations, user, subusers, pack, nest, egg, variables, location, node, databases, backups) | - |

### Example Request



```bash
curl "https://your-panel.com/api/application/servers?include=user,node&per_page=25" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const response = await axios.get('https://your-panel.com/api/application/servers', {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'user,node',
    per_page: 25,
    'filter[name]': 'minecraft'
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
    'include': 'user,node',
    'per_page': 25,
    'filter[name]': 'minecraft'
}

response = requests.get('https://your-panel.com/api/application/servers', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();

$response = $client->get('https://your-panel.com/api/application/servers', [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => [
        'include' => 'user,node',
        'per_page' => 25,
        'filter' => ['name' => 'minecraft']
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
    req, _ := http.NewRequest("GET", "https://your-panel.com/api/application/servers?include=user,node&per_page=25", nil)
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
    .uri(URI.create("https://your-panel.com/api/application/servers?include=user,node&per_page=25"))
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

var response = await client.GetAsync("https://your-panel.com/api/application/servers?include=user,node&per_page=25");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/application/servers')
uri.query = URI.encode_www_form({
  include: 'user,node',
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
      "object": "server",
      "attributes": {
        "id": 1,
        "external_id": null,
        "uuid": "d3aac109-e5e0-4331-b03e-3454f7e02bbe",
        "identifier": "d3aac109",
        "name": "Minecraft Server",
        "description": "A fun Minecraft server for friends",
        "status": null,
        "suspended": false,
        "limits": {
          "memory": 512,
          "swap": 0,
          "disk": 1024,
          "io": 500,
          "cpu": 100,
          "threads": null,
          "oom_disabled": false
        },
        "feature_limits": {
          "databases": 1,
          "allocations": 1,
          "backups": 1
        },
        "user": 1,
        "node": 1,
        "allocation": 1,
        "nest": 1,
        "egg": 1,
        "container": {
          "startup_command": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
          "image": "quay.io/pterodactyl/core:java",
          "installed": true,
          "environment": {
            "MINECRAFT_VERSION": "latest",
            "SERVER_JARFILE": "server.jar",
            "BUILD_TYPE": "recommended"
          }
        },
        "created_at": "2024-01-15T10:26:32+00:00",
        "updated_at": "2024-01-15T10:26:32+00:00"
      },
      "relationships": {
        "user": {
          "object": "user",
          "attributes": {
            "id": 1,
            "username": "admin",
            "email": "admin@example.com"
          }
        },
        "node": {
          "object": "node",
          "attributes": {
            "id": 1,
            "public": true,
            "name": "Node 1",
            "fqdn": "node1.example.com"
          }
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

## Get Server Details

Retrieve detailed information about a specific server.

```http
GET /api/application/servers/{server}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | integer | Server ID |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include` | string | Include relationships (allocations, user, subusers, pack, nest, egg, variables, location, node, databases, backups) |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/application/servers/1?include=allocations,user,node" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 1;
const response = await axios.get(`https://your-panel.com/api/application/servers/${serverId}`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'allocations,user,node'
  }
});

console.log(response.data);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 1
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {'include': 'allocations,user,node'}

response = requests.get(f'https://your-panel.com/api/application/servers/{server_id}', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$serverId = 1;

$response = $client->get("https://your-panel.com/api/application/servers/{$serverId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => ['include' => 'allocations,user,node']
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
    serverId := 1
    url := fmt.Sprintf("https://your-panel.com/api/application/servers/%d?include=allocations,user,node", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
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

int serverId = 1;
String url = String.format("https://your-panel.com/api/application/servers/%d?include=allocations,user,node", serverId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
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

int serverId = 1;
var response = await client.GetAsync($"https://your-panel.com/api/application/servers/{serverId}?include=allocations,user,node");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

server_id = 1
uri = URI("https://your-panel.com/api/application/servers/#{server_id}")
uri.query = URI.encode_www_form({include: 'allocations,user,node'})

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

## Get Server by External ID

Retrieve server details using an external ID.

```http
GET /api/application/servers/external/{external_id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `external_id` | string | External ID of the server |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include` | string | Include relationships (allocations, user, subusers, pack, nest, egg, variables, location, node, databases, backups) |

<CodeTabs
  endpoint="/api/application/servers/external/{external_id}"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/application/servers/external/srv-ext-123" \\
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`,
    javascript: `const axios = require('axios');

const externalId = 'srv-ext-123';
const response = await axios.get(\`https://your-panel.com/api/application/servers/external/\${externalId}\`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  }
});

console.log(response.data);`,
    python: `import requests

external_id = 'srv-ext-123'
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

response = requests.get(f'https://your-panel.com/api/application/servers/external/{external_id}', 
                       headers=headers)
print(response.json())`,
    php: `<?php
$client = new GuzzleHttp\\Client();
$externalId = 'srv-ext-123';

$response = $client->get("https://your-panel.com/api/application/servers/external/{$externalId}", [
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
    externalId := "srv-ext-123"
    url := fmt.Sprintf("https://your-panel.com/api/application/servers/external/%s", externalId)
    
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

String externalId = "srv-ext-123";
String url = String.format("https://your-panel.com/api/application/servers/external/%s", externalId);

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

string externalId = "srv-ext-123";
var response = await client.GetAsync($"https://your-panel.com/api/application/servers/external/{externalId}");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`,
    ruby: `require 'net/http'
require 'json'

external_id = 'srv-ext-123'
uri = URI("https://your-panel.com/api/application/servers/external/#{external_id}")
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
  "object": "server",
  "attributes": {
    "id": 1,
    "external_id": "srv-ext-123",
    "uuid": "4fcb9e86-cef2-4aab-998e-3ad529761fa5",
    "identifier": "4fcb9e86",
    "name": "My Server",
    "description": "A Minecraft Server",
    "suspended": false,
    "limits": {
      "memory": 1024,
      "swap": 0,
      "disk": 2048,
      "io": 500,
      "cpu": 100,
      "threads": null,
      "oom_disabled": false
    },
    "feature_limits": {
      "databases": 2,
      "allocations": 1,
      "backups": 5
    },
    "user": 1,
    "node": 1,
    "allocation": 1,
    "nest": 1,
    "egg": 5,
    "container": {
      "startup_command": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
      "image": "quay.io/pterodactyl/core:java",
      "installed": true,
      "environment": {
        "MINECRAFT_VERSION": "latest",
        "SERVER_JARFILE": "server.jar"
      }
    },
    "updated_at": "2024-01-20T12:00:00+00:00",
    "created_at": "2024-01-20T12:00:00+00:00"
  }
}
```

## Create New Server

Create a new server in the panel.

```http
POST /api/application/servers
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Server name |
| `user` | integer | Yes | User ID who owns the server |
| `egg` | integer | Yes | Egg ID to use for the server |
| `docker_image` | string | No | Override default Docker image |
| `startup` | string | No | Override default startup command |
| `environment` | object | No | Environment variables |
| `limits` | object | Yes | Resource limits |
| `feature_limits` | object | Yes | Feature limits |
| `allocation` | object | Yes | Primary allocation configuration |
| `deploy` | object | No | Deployment configuration |

#### Limits Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `memory` | integer | Yes | Memory limit in MB |
| `swap` | integer | Yes | Swap limit in MB (0 to disable) |
| `disk` | integer | Yes | Disk space limit in MB |
| `io` | integer | Yes | Block IO weight (10-1000) |
| `cpu` | integer | Yes | CPU limit percentage |
| `threads` | string | No | CPU thread pinning |
| `oom_disabled` | boolean | No | Disable OOM killer |

#### Feature Limits Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `databases` | integer | Yes | Maximum databases allowed |
| `allocations` | integer | Yes | Maximum allocations allowed |
| `backups` | integer | Yes | Maximum backups allowed |

#### Allocation Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `default` | integer | Yes | Primary allocation ID |
| `additional` | array | No | Additional allocation IDs |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/application/servers" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New Server",
    "user": 1,
    "egg": 5,
    "docker_image": "quay.io/pterodactyl/core:java",
    "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
    "environment": {
      "MINECRAFT_VERSION": "latest",
      "SERVER_JARFILE": "server.jar"
    },
    "limits": {
      "memory": 1024,
      "swap": 0,
      "disk": 2048,
      "io": 500,
      "cpu": 100,
      "oom_disabled": false
    },
    "feature_limits": {
      "databases": 2,
      "allocations": 1,
      "backups": 5
    },
    "allocation": {
      "default": 1
    }
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverData = {
  name: 'My New Server',
  user: 1,
  egg: 5,
  docker_image: 'quay.io/pterodactyl/core:java',
  startup: 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}',
  environment: {
    MINECRAFT_VERSION: 'latest',
    SERVER_JARFILE: 'server.jar'
  },
  limits: {
    memory: 1024,
    swap: 0,
    disk: 2048,
    io: 500,
    cpu: 100,
    oom_disabled: false
  },
  feature_limits: {
    databases: 2,
    allocations: 1,
    backups: 5
  },
  allocation: {
    default: 1
  }
};

const response = await axios.post('https://your-panel.com/api/application/servers', serverData, {
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

server_data = {
    'name': 'My New Server',
    'user': 1,
    'egg': 5,
    'docker_image': 'quay.io/pterodactyl/core:java',
    'startup': 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}',
    'environment': {
        'MINECRAFT_VERSION': 'latest',
        'SERVER_JARFILE': 'server.jar'
    },
    'limits': {
        'memory': 1024,
        'swap': 0,
        'disk': 2048,
        'io': 500,
        'cpu': 100,
        'oom_disabled': False
    },
    'feature_limits': {
        'databases': 2,
        'allocations': 1,
        'backups': 5
    },
    'allocation': {
        'default': 1
    }
}

response = requests.post('https://your-panel.com/api/application/servers', 
                        headers=headers, json=server_data)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();

$serverData = [
    'name' => 'My New Server',
    'user' => 1,
    'egg' => 5,
    'docker_image' => 'quay.io/pterodactyl/core:java',
    'startup' => 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}',
    'environment' => [
        'MINECRAFT_VERSION' => 'latest',
        'SERVER_JARFILE' => 'server.jar'
    ],
    'limits' => [
        'memory' => 1024,
        'swap' => 0,
        'disk' => 2048,
        'io' => 500,
        'cpu' => 100,
        'oom_disabled' => false
    ],
    'feature_limits' => [
        'databases' => 2,
        'allocations' => 1,
        'backups' => 5
    ],
    'allocation' => [
        'default' => 1
    ]
];

$response = $client->post('https://your-panel.com/api/application/servers', [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $serverData
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
    serverData := map[string]interface{}{
        "name": "My New Server",
        "user": 1,
        "egg":  5,
        "docker_image": "quay.io/pterodactyl/core:java",
        "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
        "environment": map[string]interface{}{
            "MINECRAFT_VERSION": "latest",
            "SERVER_JARFILE":    "server.jar",
        },
        "limits": map[string]interface{}{
            "memory":       1024,
            "swap":         0,
            "disk":         2048,
            "io":           500,
            "cpu":          100,
            "oom_disabled": false,
        },
        "feature_limits": map[string]interface{}{
            "databases":   2,
            "allocations": 1,
            "backups":     5,
        },
        "allocation": map[string]interface{}{
            "default": 1,
        },
    }
    
    jsonData, _ := json.Marshal(serverData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "https://your-panel.com/api/application/servers", bytes.NewBuffer(jsonData))
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
  "name": "My New Server",
  "user": 1,
  "egg": 5,
  "docker_image": "quay.io/pterodactyl/core:java",
  "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
  "environment": {
    "MINECRAFT_VERSION": "latest",
    "SERVER_JARFILE": "server.jar"
  },
  "limits": {
    "memory": 1024,
    "swap": 0,
    "disk": 2048,
    "io": 500,
    "cpu": 100,
    "oom_disabled": false
  },
  "feature_limits": {
    "databases": 2,
    "allocations": 1,
    "backups": 5
  },
  "allocation": {
    "default": 1
  }
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/application/servers"))
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

var serverData = new {
    name = "My New Server",
    user = 1,
    egg = 5,
    docker_image = "quay.io/pterodactyl/core:java",
    startup = "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
    environment = new {
        MINECRAFT_VERSION = "latest",
        SERVER_JARFILE = "server.jar"
    },
    limits = new {
        memory = 1024,
        swap = 0,
        disk = 2048,
        io = 500,
        cpu = 100,
        oom_disabled = false
    },
    feature_limits = new {
        databases = 2,
        allocations = 1,
        backups = 5
    },
    allocation = new {
        @default = 1
    }
};

var json = JsonSerializer.Serialize(serverData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync("https://your-panel.com/api/application/servers", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseContent);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'

uri = URI('https://your-panel.com/api/application/servers')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

server_data = {
  name: 'My New Server',
  user: 1,
  egg: 5,
  docker_image: 'quay.io/pterodactyl/core:java',
  startup: 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}',
  environment: {
    MINECRAFT_VERSION: 'latest',
    SERVER_JARFILE: 'server.jar'
  },
  limits: {
    memory: 1024,
    swap: 0,
    disk: 2048,
    io: 500,
    cpu: 100,
    oom_disabled: false
  },
  feature_limits: {
    databases: 2,
    allocations: 1,
    backups: 5
  },
  allocation: {
    default: 1
  }
}

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = server_data.to_json

response = http.request(request)
puts JSON.parse(response.body)
```
</TabItem>

</Tabs>




### Example Response

```json
{
  "object": "server",
  "attributes": {
    "id": 2,
    "external_id": null,
    "uuid": "bf3b26c0-9d2e-4d8f-8c8a-1234567890ab",
    "identifier": "bf3b26c0",
    "name": "My New Server",
    "description": "",
    "status": null,
    "suspended": false,
    "limits": {
      "memory": 2048,
      "swap": 0,
      "disk": 4096,
      "io": 500,
      "cpu": 200,
      "threads": null,
      "oom_disabled": false
    },
    "feature_limits": {
      "databases": 5,
      "allocations": 2,
      "backups": 10
    },
    "user": 1,
    "node": 1,
    "allocation": 1,
    "nest": 1,
    "egg": 5,
    "container": {
      "startup_command": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
      "image": "quay.io/pterodactyl/core:java",
      "installed": true,
      "environment": {
        "MINECRAFT_VERSION": "1.19.4",
        "SERVER_JARFILE": "server.jar",
        "STARTUP": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
        "P_SERVER_LOCATION": "global",
        "P_SERVER_UUID": "bf3b26c0-9d2e-4d8f-8c8a-1234567890ab",
        "P_SERVER_ALLOCATION_LIMIT": "2"
      }
    },
    "created_at": "2024-01-20T14:30:45+00:00",
    "updated_at": "2024-01-20T15:15:30+00:00"
  }
}
```

## Update Server Details

Update server configuration, limits, and settings.

```http
PATCH /api/application/servers/{server}/details
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | integer | Server ID |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Server name |
| `user` | integer | No | Owner user ID |
| `external_id` | string | No | External ID |
| `description` | string | No | Server description |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X PATCH "https://your-panel.com/api/application/servers/2/details" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Server Name",
    "description": "This is an updated description"
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 2;
const updateData = {
  name: 'Updated Server Name',
  description: 'This is an updated description'
};

const response = await axios.patch(`https://your-panel.com/api/application/servers/${serverId}/details`, updateData, {
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

server_id = 2
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

update_data = {
    'name': 'Updated Server Name',
    'description': 'This is an updated description'
}

response = requests.patch(f'https://your-panel.com/api/application/servers/{server_id}/details', 
                         headers=headers, json=update_data)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$serverId = 2;

$updateData = [
    'name' => 'Updated Server Name',
    'description' => 'This is an updated description'
];

$response = $client->patch("https://your-panel.com/api/application/servers/{$serverId}/details", [
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
    serverId := 2
    updateData := map[string]interface{}{
        "name":        "Updated Server Name",
        "description": "This is an updated description",
    }
    
    jsonData, _ := json.Marshal(updateData)
    url := fmt.Sprintf("https://your-panel.com/api/application/servers/%d/details", serverId)
    
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

int serverId = 2;
String jsonBody = """
{
  "name": "Updated Server Name",
  "description": "This is an updated description"
}
""";

String url = String.format("https://your-panel.com/api/application/servers/%d/details", serverId);

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

int serverId = 2;
var updateData = new {
    name = "Updated Server Name",
    description = "This is an updated description"
};

var json = JsonSerializer.Serialize(updateData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PatchAsync($"https://your-panel.com/api/application/servers/{serverId}/details", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseContent);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'

server_id = 2
uri = URI("https://your-panel.com/api/application/servers/#{server_id}/details")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

update_data = {
  name: 'Updated Server Name',
  description: 'This is an updated description'
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


## Update Server Build Configuration

Update server resource limits and feature limits.

```http
PATCH /api/application/servers/{server}/build
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `allocation` | integer | Yes | Primary allocation ID |
| `memory` | integer | Yes | Memory limit in MB |
| `swap` | integer | Yes | Swap limit in MB |
| `disk` | integer | Yes | Disk space limit in MB |
| `io` | integer | Yes | Block IO weight (10-1000) |
| `cpu` | integer | Yes | CPU limit percentage |
| `threads` | string | No | CPU thread pinning |
| `feature_limits` | object | Yes | Feature limits object |
| `add_allocations` | array | No | Additional allocation IDs to add |
| `remove_allocations` | array | No | Allocation IDs to remove |
| `oom_disabled` | boolean | No | Disable OOM killer |

### Example Request



<CodeTabs
  endpoint="/api/application/servers/{server}/build"
  method="PATCH"
  examples={{
    curl: `curl -X PATCH "https://your-panel.com/api/application/servers/2/build" \\
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "allocation": 1,
    "memory": 2048,
    "swap": 0,
    "disk": 4096,
    "io": 500,
    "cpu": 200,
    "feature_limits": {
      "databases": 5,
      "allocations": 2,
      "backups": 10
    }
  }'`,
    javascript: `const axios = require('axios');

const serverId = 2;
const updatedConfiguration = {
  allocation: 1,
  memory: 2048,
  swap: 0,
  disk: 4096,
  io: 500,
  cpu: 200,
  feature_limits: {
    databases: 5,
    allocations: 2,
    backups: 10
  }
};

const response = await axios.patch(\`https://your-panel.com/api/application/servers/\${serverId}/build\`, updatedConfiguration, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);`,
    python: `import requests

server_id = 2
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}
updated_configuration = {
    'allocation': 1,
    'memory': 2048,
    'swap': 0,
    'disk': 4096,
    'io': 500,
    'cpu': 200,
    'feature_limits': {
        'databases': 5,
        'allocations': 2,
        'backups': 10
    }
}

response = requests.patch(
    f'https://your-panel.com/api/application/servers/{server_id}/build',
    headers=headers,
    json=updated_configuration
)
print(response.json())`,
    php: `<?php
$client = new GuzzleHttp\\Client();
$serverId = 2;

$updatedConfiguration = [
    'allocation' => 1,
    'memory' => 2048,
    'swap' => 0,
    'disk' => 4096,
    'io' => 500,
    'cpu' => 200,
    'feature_limits' => [
        'databases' => 5,
        'allocations' => 2,
        'backups' => 10,
    ],
];

$response = $client->patch("https://your-panel.com/api/application/servers/{$serverId}/build", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json',
    ],
    'json' => $updatedConfiguration,
]);

$data = json_decode($response->getBody(), true);
print_r($data);
?>`,
    go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    serverId := 2
    url := fmt.Sprintf("https://your-panel.com/api/application/servers/%d/build", serverId)

    updatedConfiguration := map[string]interface{}{
        "allocation": 1,
        "memory": 2048,
        "swap": 0,
        "disk": 4096,
        "io": 500,
        "cpu": 200,
        "feature_limits": map[string]int{
            "databases": 5,
            "allocations": 2,
            "backups": 10,
        },
    }

    body, _ := json.Marshal(updatedConfiguration)
    req, _ := http.NewRequest("PATCH", url, bytes.NewBuffer(body))
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()

    fmt.Println("Status:", resp.Status)
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

int serverId = 2;
String requestBody = """
{
  "allocation": 1,
  "memory": 2048,
  "swap": 0,
  "disk": 4096,
  "io": 500,
  "cpu": 200,
  "feature_limits": {
    "databases": 5,
    "allocations": 2,
    "backups": 10
  }
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(String.format("https://your-panel.com/api/application/servers/%d/build", serverId)))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .method("PATCH", HttpRequest.BodyPublishers.ofString(requestBody))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    csharp: `using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

int serverId = 2;
var requestBody = """
{
  "allocation": 1,
  "memory": 2048,
  "swap": 0,
  "disk": 4096,
  "io": 500,
  "cpu": 200,
  "feature_limits": {
    "databases": 5,
    "allocations": 2,
    "backups": 10
  }
}
""";

var content = new StringContent(requestBody, Encoding.UTF8, "application/json");
var response = await client.PatchAsync($"https://your-panel.com/api/application/servers/{serverId}/build", content);
var responseBody = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseBody);`,
    ruby: `require 'net/http'
require 'json'

server_id = 2
uri = URI("https://your-panel.com/api/application/servers/#{server_id}/build")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

updated_configuration = {
  allocation: 1,
  memory: 2048,
  swap: 0,
  disk: 4096,
  io: 500,
  cpu: 200,
  feature_limits: {
    databases: 5,
    allocations: 2,
    backups: 10
  }
}

request = Net::HTTP::Patch.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = updated_configuration.to_json

response = http.request(request)
puts JSON.parse(response.body)`
  }}
/>




### Example Response

```json
{
  "object": "server",
  "attributes": {
    "id": 2,
    "external_id": null,
    "uuid": "bf3b26c0-9d2e-4d8f-8c8a-1234567890ab",
    "identifier": "bf3b26c0",
    "name": "Updated Server Name",
    "description": "This is an updated description",
    "status": null,
    "suspended": false,
    "limits": {
      "memory": 2048,
      "swap": 0,
      "disk": 4096,
      "io": 500,
      "cpu": 200,
      "threads": null,
      "oom_disabled": false
    },
    "feature_limits": {
      "databases": 5,
      "allocations": 2,
      "backups": 10
    },
    "user": 1,
    "node": 1,
    "allocation": 1,
    "nest": 1,
    "egg": 5,
    "created_at": "2024-01-20T14:30:45+00:00",
    "updated_at": "2024-01-20T15:15:30+00:00"
  }
}
```


## Update Server Startup

Update server startup command and environment variables.

```http
PATCH /api/application/servers/{server}/startup
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `startup` | string | Yes | Server startup command |
| `environment` | object | Yes | Environment variables |
| `egg` | integer | Yes | Egg ID |
| `image` | string | No | Docker image override |
| `skip_scripts` | boolean | No | Skip install scripts |

### Example Request



```bash
curl -X PATCH "https://your-panel.com/api/application/servers/2/startup" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
    "environment": {
      "MINECRAFT_VERSION": "1.19.4",
      "SERVER_JARFILE": "server.jar",
      "BUILD_TYPE": "recommended"
    },
    "egg": 5,
    "image": "quay.io/pterodactyl/core:java",
    "skip_scripts": false
  }'
```




### Example Response

```json
{
  "object": "server",
  "attributes": {
    "id": 2,
    "external_id": null,
    "uuid": "bf3b26c0-9d2e-4d8f-8c8a-1234567890ab",
    "identifier": "bf3b26c0",
    "name": "Updated Server Name",
    "description": "This is an updated description",
    "status": null,
    "suspended": false,
    "limits": {
      "memory": 2048,
      "swap": 0,
      "disk": 4096,
      "io": 500,
      "cpu": 200,
      "threads": null,
      "oom_disabled": false
    },
    "feature_limits": {
      "databases": 5,
      "allocations": 2,
      "backups": 10
    },
    "user": 1,
    "node": 1,
    "allocation": 1,
    "nest": 1,
    "egg": 5,
    "container": {
      "startup_command": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
      "image": "quay.io/pterodactyl/core:java",
      "installed": true,
      "environment": {
        "MINECRAFT_VERSION": "1.19.4",
        "SERVER_JARFILE": "server.jar",
        "BUILD_TYPE": "recommended",
        "STARTUP": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
        "P_SERVER_LOCATION": "global",
        "P_SERVER_UUID": "bf3b26c0-9d2e-4d8f-8c8a-1234567890ab",
        "P_SERVER_ALLOCATION_LIMIT": "2"
      }
    },
    "created_at": "2024-01-20T14:30:45+00:00",
    "updated_at": "2024-01-20T15:30:15+00:00"
  }
}
```


## Suspend Server

Suspend a server to prevent it from starting.

```http
POST /api/application/servers/{server}/suspend
```

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/application/servers/2/suspend" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 2;
const response = await axios.post(`https://your-panel.com/api/application/servers/${serverId}/suspend`, {}, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  }
});

console.log('Server suspended successfully');
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 2
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

response = requests.post(f'https://your-panel.com/api/application/servers/{server_id}/suspend', 
                        headers=headers)
print('Server suspended successfully' if response.status_code == 204 else 'Error suspending server')
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$serverId = 2;

$response = $client->post("https://your-panel.com/api/application/servers/{$serverId}/suspend", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ]
]);

echo 'Server suspended successfully';
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
    serverId := 2
    url := fmt.Sprintf("https://your-panel.com/api/application/servers/%d/suspend", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, nil)
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    if resp.StatusCode == 204 {
        fmt.Println("Server suspended successfully")
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

int serverId = 2;
String url = String.format("https://your-panel.com/api/application/servers/%d/suspend", serverId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .POST(HttpRequest.BodyPublishers.noBody())
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
if (response.statusCode() == 204) {
    System.out.println("Server suspended successfully");
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

int serverId = 2;
var response = await client.PostAsync($"https://your-panel.com/api/application/servers/{serverId}/suspend", null);

if (response.StatusCode == System.Net.HttpStatusCode.NoContent) {
    Console.WriteLine("Server suspended successfully");
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'

server_id = 2
uri = URI("https://your-panel.com/api/application/servers/#{server_id}/suspend")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts 'Server suspended successfully' if response.code == '204'
```
</TabItem>

</Tabs>


### Response

Returns HTTP 204 No Content on successful suspension.

## Unsuspend Server

Remove suspension from a server to allow it to start.

```http
POST /api/application/servers/{server}/unsuspend
```

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/application/servers/2/unsuspend" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```


### Response

Returns HTTP 204 No Content on successful unsuspension.

## Reinstall Server

Reinstall a server from its egg configuration.

```http
POST /api/application/servers/{server}/reinstall
```

### Example Request



```bash
curl -X POST "https://your-panel.com/api/application/servers/2/reinstall" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```


### Response

Returns HTTP 204 No Content on successful reinstall trigger.

## Delete Server

Delete a server from the panel. This action is irreversible.

```http
DELETE /api/application/servers/{server}
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `force` | boolean | Force deletion even if server is running |

### Example Request



```bash
curl -X DELETE "https://your-panel.com/api/application/servers/2?force=true" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 2;
const response = await axios.delete(`https://your-panel.com/api/application/servers/${serverId}`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    force: true
  }
});

console.log('Server deleted successfully');
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 2
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {'force': True}

response = requests.delete(f'https://your-panel.com/api/application/servers/{server_id}', 
                          headers=headers, params=params)
print('Server deleted successfully' if response.status_code == 204 else 'Error deleting server')
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$serverId = 2;

$response = $client->delete("https://your-panel.com/api/application/servers/{$serverId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => ['force' => true]
]);

echo 'Server deleted successfully';
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
    serverId := 2
    url := fmt.Sprintf("https://your-panel.com/api/application/servers/%d?force=true", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("DELETE", url, nil)
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    if resp.StatusCode == 204 {
        fmt.Println("Server deleted successfully")
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

int serverId = 2;
String url = String.format("https://your-panel.com/api/application/servers/%d?force=true", serverId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .DELETE()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
if (response.statusCode() == 204) {
    System.out.println("Server deleted successfully");
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

int serverId = 2;
var response = await client.DeleteAsync($"https://your-panel.com/api/application/servers/{serverId}?force=true");

if (response.StatusCode == System.Net.HttpStatusCode.NoContent) {
    Console.WriteLine("Server deleted successfully");
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'

server_id = 2
uri = URI("https://your-panel.com/api/application/servers/#{server_id}")
uri.query = URI.encode_www_form({force: true})

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts 'Server deleted successfully' if response.code == '204'
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
| 404 | Not Found - Server does not exist |
| 422 | Validation Error - Invalid field values |
| 429 | Too Many Requests - Rate limit exceeded |

### Example Error Response

```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The name field is required.",
      "source": {
        "field": "name"
      }
    }
  ]
}
```


## Best Practices

### Security Considerations

1. **API Key Protection**: Store API keys securely and never expose them in client-side code
2. **HTTPS Only**: Always use HTTPS for API requests
3. **Resource Limits**: Set appropriate resource limits to prevent abuse
4. **Input Validation**: Validate all input data before sending API requests
5. **Force Deletion**: Use force deletion carefully as it can cause data loss

### Performance Tips

1. **Pagination**: Use pagination for large server lists
2. **Filtering**: Apply filters to reduce response size
3. **Selective Includes**: Only include necessary relationships
4. **Caching**: Implement caching strategies for server data
5. **Bulk Operations**: Consider bulk operations for multiple servers

### Integration Examples

```javascript
// Server management service example
class ServerService {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'application/json'
    };
  }

  async getAllServers(options = {}) {
    const params = new URLSearchParams(options);
    const response = await fetch(`${this.baseUrl}/api/application/servers?${params}`, {
      headers: this.headers
    });
    return response.json();
  }

  async createServer(serverData) {
    const response = await fetch(`${this.baseUrl}/api/application/servers`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(serverData)
    });
    return response.json();
  }

  async updateServerDetails(serverId, updateData) {
    const response = await fetch(`${this.baseUrl}/api/application/servers/${serverId}/details`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(updateData)
    });
    return response.json();
  }

  async suspendServer(serverId) {
    const response = await fetch(`${this.baseUrl}/api/application/servers/${serverId}/suspend`, {
      method: 'POST',
      headers: this.headers
    });
    return response.status === 204;
  }

  async deleteServer(serverId, force = false) {
    const url = `${this.baseUrl}/api/application/servers/${serverId}${force ? '?force=true' : ''}`;
    const response = await fetch(url, {
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



## Server Database Management

Manage server databases through the Application API for administrative control.

### List Server Databases

Retrieve all databases assigned to a specific server.

**`GET /api/application/servers/{server}/databases`**

#### Example Request

```bash
curl "https://your-panel.com/api/application/servers/2/databases" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

#### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "server_database",
      "attributes": {
        "id": 3,
        "server": 2,
        "host": 1,
        "database": "s2_gamedata",
        "username": "u2_dbuser",
        "remote": "%",
        "max_connections": 50,
        "created_at": "2023-10-20T10:30:00+00:00",
        "updated_at": "2023-10-20T10:30:00+00:00",
        "relationships": {
          "host": {
            "object": "database_host",
            "attributes": {
              "id": 1,
              "name": "MySQL Server 1",
              "host": "mysql.example.com",
              "port": 3306,
              "username": "pterodactyl",
              "max_databases": 100,
              "created_at": "2023-10-15T09:00:00+00:00",
              "updated_at": "2023-10-15T09:00:00+00:00"
            }
          }
        }
      }
    }
  ]
}
```

### Get Database Details

Retrieve detailed information about a specific server database.

**`GET /api/application/servers/{server}/databases/{database}`**

#### Example Request

```bash
curl "https://your-panel.com/api/application/servers/2/databases/3" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

### Create Server Database

Create a new database for a server.

**`POST /api/application/servers/{server}/databases`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `database` | string | Yes | Database name (without prefix) |
| `remote` | string | Yes | Remote connection string (% for all) |
| `host` | integer | Yes | Database host ID |

#### Example Request

```bash
curl -X POST "https://your-panel.com/api/application/servers/2/databases" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "database": "gamedata",
    "remote": "%",
    "host": 1
  }'
```

### Update Database

Update database configuration including remote connection settings.

**`PATCH /api/application/servers/{server}/databases/{database}`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `remote` | string | No | Remote connection string |

#### Example Request

```bash
curl -X PATCH "https://your-panel.com/api/application/servers/2/databases/3" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "remote": "192.168.1.%"
  }'
```

### Reset Database Password

Generate a new password for the database user.

**`POST /api/application/servers/{server}/databases/{database}/reset-password`**

#### Example Request

```bash
curl -X POST "https://your-panel.com/api/application/servers/2/databases/3/reset-password" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

#### Example Response

```json
{
  "object": "server_database",
  "attributes": {
    "id": 3,
    "server": 2,
    "host": 1,
    "database": "s2_gamedata",
    "username": "u2_dbuser",
    "remote": "%",
    "max_connections": 50,
    "password": "new_generated_password_here",
    "created_at": "2023-10-20T10:30:00+00:00",
    "updated_at": "2023-10-20T16:45:00+00:00"
  }
}
```

:::warning Password Security
The new password is only returned in this response. Store it securely as it cannot be retrieved again through the API.
:::

### Delete Database

Permanently delete a server database and all its data.

**`DELETE /api/application/servers/{server}/databases/{database}`**

#### Example Request

```bash
curl -X DELETE "https://your-panel.com/api/application/servers/2/databases/3" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

#### Success Response (204)

Returns empty response body with status code 204.

:::danger Warning
Database deletion is **permanent and irreversible**. All data will be lost.
:::

---

## Source Code References

### Controllers and Routes

**Method**: `ServerController@index` (List Servers)  
**Route**: `GET /api/application/servers`  
**Source**: [ServerController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Servers/ServerController.php)

**Method**: `ServerController@view` (Get Server)  
**Route**: `GET /api/application/servers/{server}`  
**Source**: [ServerController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Servers/ServerController.php)

**Method**: `ServerController@store` (Create Server)  
**Route**: `POST /api/application/servers`  
**Source**: [ServerController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Servers/ServerController.php)

**Method**: `ServerDetailsController@details` (Update Details)  
**Route**: `PATCH /api/application/servers/{server}/details`  
**Source**: [Servers Controllers](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Http/Controllers/Api/Application/Servers)

**Method**: `ServerBuildController@build` (Update Build)  
**Route**: `PATCH /api/application/servers/{server}/build`  
**Source**: [Servers Controllers](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Http/Controllers/Api/Application/Servers)

**Method**: `StartupController@startup` (Update Startup)  
**Route**: `PATCH /api/application/servers/{server}/startup`  
**Source**: [StartupController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Servers/StartupController.php)

**Method**: `ServerManagementController@suspend` (Suspend Server)  
**Route**: `POST /api/application/servers/{server}/suspend`  
**Source**: [ServerManagementController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Servers/ServerManagementController.php)

**Method**: `ServerManagementController@unsuspend` (Unsuspend Server)  
**Route**: `POST /api/application/servers/{server}/unsuspend`  
**Source**: [ServerManagementController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Servers/ServerManagementController.php)

**Method**: `ServerController@delete` (Delete Server)  
**Route**: `DELETE /api/application/servers/{server}`  
**Source**: [ServerController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Servers/ServerController.php)

### Services

**Server Creation Service**: [ServerCreationService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Servers/ServerCreationService.php)  
**Server Build Modification Service**: [BuildModificationService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Servers/BuildModificationService.php)  
**Server Deletion Service**: [ServerDeletionService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Servers/ServerDeletionService.php)  
**Startup Modification Service**: [StartupModificationService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Servers/StartupModificationService.php)

### Models and Validation

**Server Model**: [Server.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Server.php)  
**Server Store Request**: [StoreServerRequest.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Requests/Api/Application/Servers/StoreServerRequest.php)  
**Server Update Requests**: [Server Request Classes](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Http/Requests/Api/Application/Servers)

### Route Definitions

**Application Routes**: [api-application.php](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-application.php) - Lines 55-75

For detailed implementation and the latest updates, refer to the [Pterodactyl Panel repository](https://github.com/pterodactyl/panel). 

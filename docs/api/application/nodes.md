---
sidebar_position: 3
title: Node Management
description: Complete Application API documentation for managing nodes, including creation, configuration, and allocation management
keywords: [pterodactyl, application api, node management, server nodes, allocation management]
---

import CodeTabs from '@site/src/components/CodeTabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Node Management

The Application API Node Management endpoints allow administrators to manage Wings daemon nodes in the panel. These endpoints provide comprehensive node lifecycle management including creation, configuration, allocation management, and deletion.

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

## List All Nodes

Retrieve a paginated list of all nodes in the panel.

```http
GET /api/application/nodes
```

### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number for pagination | 1 |
| `per_page` | integer | Results per page (1-100) | 50 |
| `filter[name]` | string | Filter by node name | - |
| `filter[uuid]` | string | Filter by node UUID | - |
| `filter[fqdn]` | string | Filter by FQDN | - |
| `sort` | string | Sort field (id, uuid, name, created_at, updated_at) | id |
| `include` | string | Include relationships (allocations, location, servers) | - |

### Example Request



```bash
curl "https://your-panel.com/api/application/nodes?include=location,allocations&per_page=25" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const response = await axios.get('https://your-panel.com/api/application/nodes', {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'location,allocations',
    per_page: 25,
    'filter[name]': 'node'
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
    'include': 'location,allocations',
    'per_page': 25,
    'filter[name]': 'node'
}

response = requests.get('https://your-panel.com/api/application/nodes', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();

$response = $client->get('https://your-panel.com/api/application/nodes', [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => [
        'include' => 'location,allocations',
        'per_page' => 25,
        'filter' => ['name' => 'node']
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
    req, _ := http.NewRequest("GET", "https://your-panel.com/api/application/nodes?include=location,allocations&per_page=25", nil)
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
    .uri(URI.create("https://your-panel.com/api/application/nodes?include=location,allocations&per_page=25"))
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

var response = await client.GetAsync("https://your-panel.com/api/application/nodes?include=location,allocations&per_page=25");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/application/nodes')
uri.query = URI.encode_www_form({
  include: 'location,allocations',
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
      "object": "node",
      "attributes": {
        "id": 1,
        "uuid": "d3aac109-e5e0-4331-b03e-3454f7e02bbe",
        "public": true,
        "name": "Node 1",
        "description": "Main production node",
        "location_id": 1,
        "fqdn": "node1.example.com",
        "scheme": "https",
        "behind_proxy": false,
        "maintenance_mode": false,
        "memory": 8192,
        "memory_overallocate": 0,
        "disk": 102400,
        "disk_overallocate": 0,
        "upload_size": 100,
        "daemon_listen": 8080,
        "daemon_sftp": 2022,
        "daemon_base": "/var/lib/pterodactyl/volumes",
        "created_at": "2024-01-15T10:26:32+00:00",
        "updated_at": "2024-01-15T10:26:32+00:00",
        "allocated_resources": {
          "memory": 1024,
          "disk": 2048
        }
      },
      "relationships": {
        "location": {
          "object": "location",
          "attributes": {
            "id": 1,
            "short": "us-east",
            "long": "US East Coast"
          }
        },
        "allocations": {
          "object": "list",
          "data": [
            {
              "object": "allocation",
              "attributes": {
                "id": 1,
                "ip": "192.168.1.100",
                "ip_alias": null,
                "port": 25565,
                "notes": null,
                "assigned": true
              }
            }
          ]
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

## Get Node Details

Retrieve detailed information about a specific node.

```http
GET /api/application/nodes/{node}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `node` | integer | Node ID |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include` | string | Include relationships (allocations, location, servers) |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/application/nodes/1?include=allocations,location,servers" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const nodeId = 1;
const response = await axios.get(`https://your-panel.com/api/application/nodes/${nodeId}`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'allocations,location,servers'
  }
});

console.log(response.data);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

node_id = 1
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {'include': 'allocations,location,servers'}

response = requests.get(f'https://your-panel.com/api/application/nodes/{node_id}', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$nodeId = 1;

$response = $client->get("https://your-panel.com/api/application/nodes/{$nodeId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => ['include' => 'allocations,location,servers']
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
    nodeId := 1
    url := fmt.Sprintf("https://your-panel.com/api/application/nodes/%d?include=allocations,location,servers", nodeId)
    
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

int nodeId = 1;
String url = String.format("https://your-panel.com/api/application/nodes/%d?include=allocations,location,servers", nodeId);

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

int nodeId = 1;
var response = await client.GetAsync($"https://your-panel.com/api/application/nodes/{nodeId}?include=allocations,location,servers");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

node_id = 1
uri = URI("https://your-panel.com/api/application/nodes/#{node_id}")
uri.query = URI.encode_www_form({include: 'allocations,location,servers'})

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

## Get Deployable Nodes

Retrieve a list of nodes available for server deployment.

```http
GET /api/application/nodes/deployable
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `per_page` | integer | Results per page (default: 50) |
| `page` | integer | Page number |
| `memory` | integer | Required memory in MB |
| `disk` | integer | Required disk space in MB |

<CodeTabs
  endpoint="/api/application/nodes/deployable"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/application/nodes/deployable?memory=1024&disk=5000" \\
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`,
    javascript: `const axios = require('axios');

const response = await axios.get('https://your-panel.com/api/application/nodes/deployable', {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    memory: 1024,
    disk: 5000
  }
});

console.log(response.data);`,
    python: `import requests

headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {
    'memory': 1024,
    'disk': 5000
}

response = requests.get('https://your-panel.com/api/application/nodes/deployable', 
                       headers=headers, params=params)
print(response.json())`,
    php: `<?php
$client = new GuzzleHttp\\Client();

$response = $client->get('https://your-panel.com/api/application/nodes/deployable', [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => [
        'memory' => 1024,
        'disk' => 5000
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
    url := "https://your-panel.com/api/application/nodes/deployable?memory=1024&disk=5000"
    
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

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/application/nodes/deployable?memory=1024&disk=5000"))
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

var response = await client.GetAsync("https://your-panel.com/api/application/nodes/deployable?memory=1024&disk=5000");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`,
    ruby: `require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/application/nodes/deployable')
uri.query = URI.encode_www_form(memory: 1024, disk: 5000)

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
  "object": "list",
  "data": [
    {
      "object": "node",
      "attributes": {
        "id": 1,
        "uuid": "4aec6f5b-8fbc-4f95-bc7f-8f0c8e6b6f0e",
        "public": true,
        "name": "Node 1",
        "description": "Primary node",
        "location_id": 1,
        "fqdn": "node1.example.com",
        "scheme": "https",
        "behind_proxy": false,
        "maintenance_mode": false,
        "memory": 32768,
        "memory_overallocate": 0,
        "disk": 409600,
        "disk_overallocate": 0,
        "upload_size": 100,
        "daemon_listen": 8080,
        "daemon_sftp": 2022,
        "daemon_base": "/var/lib/pterodactyl/volumes",
        "created_at": "2024-01-01T00:00:00+00:00",
        "updated_at": "2024-01-01T00:00:00+00:00",
        "allocated_resources": {
          "memory": 8192,
          "disk": 102400
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
      "total_pages": 1
    }
  }
}
```

## Create New Node

Create a new Wings daemon node in the panel.

```http
POST /api/application/nodes
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Node display name |
| `description` | string | No | Node description |
| `location_id` | integer | Yes | Location ID where node is located |
| `fqdn` | string | Yes | Fully qualified domain name |
| `scheme` | string | No | Connection scheme (http/https) |
| `behind_proxy` | boolean | No | Whether node is behind a proxy |
| `public` | boolean | No | Whether node is publicly accessible |
| `daemon_base` | string | No | Base directory for daemon files |
| `daemon_sftp` | integer | No | SFTP port (default: 2022) |
| `daemon_listen` | integer | No | Daemon listen port (default: 8080) |
| `memory` | integer | Yes | Total memory in MB |
| `memory_overallocate` | integer | No | Memory overallocation percentage |
| `disk` | integer | Yes | Total disk space in MB |
| `disk_overallocate` | integer | No | Disk overallocation percentage |
| `upload_size` | integer | No | Maximum upload size in MB (default: 100) |
| `maintenance_mode` | boolean | No | Whether node is in maintenance mode |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/application/nodes" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Node 2",
    "description": "Secondary node for testing",
    "location_id": 1,
    "fqdn": "node2.example.com",
    "scheme": "https",
    "behind_proxy": false,
    "public": true,
    "daemon_base": "/var/lib/pterodactyl/volumes",
    "daemon_sftp": 2022,
    "daemon_listen": 8080,
    "memory": 16384,
    "memory_overallocate": 0,
    "disk": 204800,
    "disk_overallocate": 0,
    "upload_size": 100,
    "maintenance_mode": false
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const nodeData = {
  name: 'Node 2',
  description: 'Secondary node for testing',
  location_id: 1,
  fqdn: 'node2.example.com',
  scheme: 'https',
  behind_proxy: false,
  public: true,
  daemon_base: '/var/lib/pterodactyl/volumes',
  daemon_sftp: 2022,
  daemon_listen: 8080,
  memory: 16384,
  memory_overallocate: 0,
  disk: 204800,
  disk_overallocate: 0,
  upload_size: 100,
  maintenance_mode: false
};

const response = await axios.post('https://your-panel.com/api/application/nodes', nodeData, {
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

node_data = {
    'name': 'Node 2',
    'description': 'Secondary node for testing',
    'location_id': 1,
    'fqdn': 'node2.example.com',
    'scheme': 'https',
    'behind_proxy': False,
    'public': True,
    'daemon_base': '/var/lib/pterodactyl/volumes',
    'daemon_sftp': 2022,
    'daemon_listen': 8080,
    'memory': 16384,
    'memory_overallocate': 0,
    'disk': 204800,
    'disk_overallocate': 0,
    'upload_size': 100,
    'maintenance_mode': False
}

response = requests.post('https://your-panel.com/api/application/nodes', 
                        headers=headers, json=node_data)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();

$nodeData = [
    'name' => 'Node 2',
    'description' => 'Secondary node for testing',
    'location_id' => 1,
    'fqdn' => 'node2.example.com',
    'scheme' => 'https',
    'behind_proxy' => false,
    'public' => true,
    'daemon_base' => '/var/lib/pterodactyl/volumes',
    'daemon_sftp' => 2022,
    'daemon_listen' => 8080,
    'memory' => 16384,
    'memory_overallocate' => 0,
    'disk' => 204800,
    'disk_overallocate' => 0,
    'upload_size' => 100,
    'maintenance_mode' => false
];

$response = $client->post('https://your-panel.com/api/application/nodes', [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $nodeData
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
    nodeData := map[string]interface{}{
        "name":                 "Node 2",
        "description":          "Secondary node for testing",
        "location_id":          1,
        "fqdn":                 "node2.example.com",
        "scheme":               "https",
        "behind_proxy":         false,
        "public":               true,
        "daemon_base":          "/var/lib/pterodactyl/volumes",
        "daemon_sftp":          2022,
        "daemon_listen":        8080,
        "memory":               16384,
        "memory_overallocate":  0,
        "disk":                 204800,
        "disk_overallocate":    0,
        "upload_size":          100,
        "maintenance_mode":     false,
    }
    
    jsonData, _ := json.Marshal(nodeData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "https://your-panel.com/api/application/nodes", bytes.NewBuffer(jsonData))
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
  "name": "Node 2",
  "description": "Secondary node for testing",
  "location_id": 1,
  "fqdn": "node2.example.com",
  "scheme": "https",
  "behind_proxy": false,
  "public": true,
  "daemon_base": "/var/lib/pterodactyl/volumes",
  "daemon_sftp": 2022,
  "daemon_listen": 8080,
  "memory": 16384,
  "memory_overallocate": 0,
  "disk": 204800,
  "disk_overallocate": 0,
  "upload_size": 100,
  "maintenance_mode": false
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/application/nodes"))
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

var nodeData = new {
    name = "Node 2",
    description = "Secondary node for testing",
    location_id = 1,
    fqdn = "node2.example.com",
    scheme = "https",
    behind_proxy = false,
    @public = true,
    daemon_base = "/var/lib/pterodactyl/volumes",
    daemon_sftp = 2022,
    daemon_listen = 8080,
    memory = 16384,
    memory_overallocate = 0,
    disk = 204800,
    disk_overallocate = 0,
    upload_size = 100,
    maintenance_mode = false
};

var json = JsonSerializer.Serialize(nodeData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync("https://your-panel.com/api/application/nodes", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseContent);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/application/nodes')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

node_data = {
  name: 'Node 2',
  description: 'Secondary node for testing',
  location_id: 1,
  fqdn: 'node2.example.com',
  scheme: 'https',
  behind_proxy: false,
  public: true,
  daemon_base: '/var/lib/pterodactyl/volumes',
  daemon_sftp: 2022,
  daemon_listen: 8080,
  memory: 16384,
  memory_overallocate: 0,
  disk: 204800,
  disk_overallocate: 0,
  upload_size: 100,
  maintenance_mode: false
}

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = node_data.to_json

response = http.request(request)
puts JSON.parse(response.body)
```
</TabItem>

</Tabs>




### Example Response

```json
{
  "object": "node",
  "attributes": {
    "id": 2,
    "uuid": "bf3b26c0-9d2e-4d8f-8c8a-1234567890ab",
    "public": true,
    "name": "Node 2",
    "description": "Secondary node for testing",
    "location_id": 1,
    "fqdn": "node2.example.com",
    "scheme": "https",
    "behind_proxy": false,
    "maintenance_mode": false,
    "memory": 16384,
    "memory_overallocate": 0,
    "disk": 204800,
    "disk_overallocate": 0,
    "upload_size": 100,
    "daemon_listen": 8080,
    "daemon_sftp": 2022,
    "daemon_base": "/var/lib/pterodactyl/volumes",
    "created_at": "2024-01-20T14:30:45+00:00",
    "updated_at": "2024-01-20T14:30:45+00:00",
    "allocated_resources": {
      "memory": 0,
      "disk": 0
    }
  }
}
```

## Update Node Configuration

Update an existing node's configuration.

```http
PATCH /api/application/nodes/{node}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `node` | integer | Node ID |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Node display name |
| `description` | string | No | Node description |
| `location_id` | integer | No | Location ID |
| `fqdn` | string | No | Fully qualified domain name |
| `scheme` | string | No | Connection scheme |
| `behind_proxy` | boolean | No | Whether node is behind a proxy |
| `public` | boolean | No | Whether node is publicly accessible |
| `daemon_base` | string | No | Base directory for daemon files |
| `daemon_sftp` | integer | No | SFTP port |
| `daemon_listen` | integer | No | Daemon listen port |
| `memory` | integer | No | Total memory in MB |
| `memory_overallocate` | integer | No | Memory overallocation percentage |
| `disk` | integer | No | Total disk space in MB |
| `disk_overallocate` | integer | No | Disk overallocation percentage |
| `upload_size` | integer | No | Maximum upload size in MB |
| `maintenance_mode` | boolean | No | Whether node is in maintenance mode |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X PATCH "https://your-panel.com/api/application/nodes/2" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Node 2",
    "description": "Updated description for node 2",
    "memory": 20480,
    "disk": 409600
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const nodeId = 2;
const updateData = {
  name: 'Updated Node 2',
  description: 'Updated description for node 2',
  memory: 20480,
  disk: 409600
};

const response = await axios.patch(`https://your-panel.com/api/application/nodes/${nodeId}`, updateData, {
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

node_id = 2
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

update_data = {
    'name': 'Updated Node 2',
    'description': 'Updated description for node 2',
    'memory': 20480,
    'disk': 409600
}

response = requests.patch(f'https://your-panel.com/api/application/nodes/{node_id}', 
                         headers=headers, json=update_data)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$nodeId = 2;

$updateData = [
    'name' => 'Updated Node 2',
    'description' => 'Updated description for node 2',
    'memory' => 20480,
    'disk' => 409600
];

$response = $client->patch("https://your-panel.com/api/application/nodes/{$nodeId}", [
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
    nodeId := 2
    updateData := map[string]interface{}{
        "name":        "Updated Node 2",
        "description": "Updated description for node 2",
        "memory":      20480,
        "disk":        409600,
    }
    
    jsonData, _ := json.Marshal(updateData)
    url := fmt.Sprintf("https://your-panel.com/api/application/nodes/%d", nodeId)
    
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

int nodeId = 2;
String jsonBody = """
{
  "name": "Updated Node 2",
  "description": "Updated description for node 2",
  "memory": 20480,
  "disk": 409600
}
""";

String url = String.format("https://your-panel.com/api/application/nodes/%d", nodeId);

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

int nodeId = 2;
var updateData = new {
    name = "Updated Node 2",
    description = "Updated description for node 2",
    memory = 20480,
    disk = 409600
};

var json = JsonSerializer.Serialize(updateData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PatchAsync($"https://your-panel.com/api/application/nodes/{nodeId}", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseContent);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

node_id = 2
uri = URI("https://your-panel.com/api/application/nodes/#{node_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

update_data = {
  name: 'Updated Node 2',
  description: 'Updated description for node 2',
  memory: 20480,
  disk: 409600
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


## Get Node Configuration

Get the Wings daemon configuration for a node.

```http
GET /api/application/nodes/{node}/configuration
```

This endpoint returns the complete Wings configuration that should be placed in the Wings configuration file.

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `node` | integer | Node ID |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/application/nodes/1/configuration" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const nodeId = 1;
const response = await axios.get(`https://your-panel.com/api/application/nodes/${nodeId}/configuration`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  }
});

console.log(response.data);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

node_id = 1
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

response = requests.get(f'https://your-panel.com/api/application/nodes/{node_id}/configuration', 
                       headers=headers)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$nodeId = 1;

$response = $client->get("https://your-panel.com/api/application/nodes/{$nodeId}/configuration", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
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
    nodeId := 1
    url := fmt.Sprintf("https://your-panel.com/api/application/nodes/%d/configuration", nodeId)
    
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

int nodeId = 1;
String url = String.format("https://your-panel.com/api/application/nodes/%d/configuration", nodeId);

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

int nodeId = 1;
var response = await client.GetAsync($"https://your-panel.com/api/application/nodes/{nodeId}/configuration");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

node_id = 1
uri = URI("https://your-panel.com/api/application/nodes/#{node_id}/configuration")

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

### Response

Returns HTTP 200 OK with the Wings configuration.

### Example Response

```json
{
  "debug": false,
  "uuid": "d3aac109-e5e0-4331-b03e-3454f7e02bbe",
  "token_id": "7L7X7X7X7X7X7X7X",
  "token": "very_long_token_string_here",
  "api": {
    "host": "0.0.0.0",
    "port": 8080,
    "ssl": {
      "enabled": true,
      "cert": "/etc/ssl/certs/wings.crt",
      "key": "/etc/ssl/private/wings.key"
    },
    "upload_limit": 100
  },
  "system": {
    "data": "/var/lib/pterodactyl/volumes",
    "sftp": {
      "bind_port": 2022
    }
  },
  "allowed_mounts": [],
  "remote": "https://your-panel.com"
}
```


## List Node Allocations

Get all allocations for a specific node.

```http
GET /api/application/nodes/{node}/allocations
```

### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number for pagination | 1 |
| `per_page` | integer | Results per page (1-100) | 50 |

### Example Request



```bash
curl "https://your-panel.com/api/application/nodes/1/allocations?per_page=25" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```



```javascript
const axios = require('axios');

const nodeId = 1;
const response = await axios.get(`https://your-panel.com/api/application/nodes/${nodeId}/allocations`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    per_page: 25
  }
});

console.log(response.data);
```




### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "allocation",
      "attributes": {
        "id": 1,
        "ip": "192.168.1.100",
        "ip_alias": null,
        "port": 25565,
        "notes": "Minecraft server port",
        "assigned": true
      }
    },
    {
      "object": "allocation",
      "attributes": {
        "id": 2,
        "ip": "192.168.1.100",
        "port": 25566,
        "notes": null,
        "assigned": false
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 2,
      "count": 2,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {}
    }
  }
}
```


## Create Node Allocations

Create new allocations for a node.

```http
POST /api/application/nodes/{node}/allocations
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ip` | string | Yes | IP address for allocations |
| `ip_alias` | string | No | IP alias for display |
| `ports` | array | Yes | Array of ports or port ranges |

### Example Request



```bash
curl -X POST "https://your-panel.com/api/application/nodes/1/allocations" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "ip": "192.168.1.100",
    "ip_alias": "Node1-Main",
    "ports": ["25567", "25568-25570", "30000"]
  }'
```




### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "allocation",
      "attributes": {
        "id": 3,
        "ip": "192.168.1.100",
        "ip_alias": "Node1-Main",
        "port": 25567,
        "notes": null,
        "assigned": false
      }
    },
    {
      "object": "allocation",
      "attributes": {
        "id": 4,
        "ip": "192.168.1.100",
        "ip_alias": "Node1-Main",
        "port": 25568,
        "notes": null,
        "assigned": false
      }
    }
  ]
}
```


## Delete Node Allocation

Delete a specific allocation from a node.

```http
DELETE /api/application/nodes/{node}/allocations/{allocation}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `node` | integer | Node ID |
| `allocation` | integer | Allocation ID |

### Example Request



```bash
curl -X DELETE "https://your-panel.com/api/application/nodes/1/allocations/3" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```


### Response

Returns HTTP 204 No Content on successful deletion.

## Delete Node

Delete a node from the panel. This action is irreversible.

```http
DELETE /api/application/nodes/{node}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `node` | integer | Node ID |

### Example Request

<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X DELETE "https://your-panel.com/api/application/nodes/2" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const nodeId = 2;
const response = await axios.delete(`https://your-panel.com/api/application/nodes/${nodeId}`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  }
});

console.log('Node deleted successfully');
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

node_id = 2
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

response = requests.delete(f'https://your-panel.com/api/application/nodes/{node_id}', 
                          headers=headers)
print('Node deleted successfully' if response.status_code == 204 else 'Error deleting node')
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$nodeId = 2;

$response = $client->delete("https://your-panel.com/api/application/nodes/{$nodeId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ]
]);

echo 'Node deleted successfully';
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
    nodeId := 2
    url := fmt.Sprintf("https://your-panel.com/api/application/nodes/%d", nodeId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("DELETE", url, nil)
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    if resp.StatusCode == 204 {
        fmt.Println("Node deleted successfully")
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

int nodeId = 2;
String url = String.format("https://your-panel.com/api/application/nodes/%d", nodeId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .DELETE()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
if (response.statusCode() == 204) {
    System.out.println("Node deleted successfully");
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

int nodeId = 2;
var response = await client.DeleteAsync($"https://your-panel.com/api/application/nodes/{nodeId}");

if (response.StatusCode == System.Net.HttpStatusCode.NoContent) {
    Console.WriteLine("Node deleted successfully");
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'

node_id = 2
uri = URI("https://your-panel.com/api/application/nodes/#{node_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts 'Node deleted successfully' if response.code == '204'
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
| 404 | Not Found - Node does not exist |
| 422 | Validation Error - Invalid field values |
| 429 | Too Many Requests - Rate limit exceeded |

### Example Error Response

```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The fqdn field is required.",
      "source": {
        "field": "fqdn"
      }
    }
  ]
}
```


## Best Practices

### Security Considerations

1. **API Key Protection**: Store API keys securely and never expose them in client-side code
2. **HTTPS Only**: Always use HTTPS for API requests and Wings communication
3. **Firewall Configuration**: Properly configure firewalls for node communication
4. **Regular Updates**: Keep Wings daemon updated to latest version
5. **Secure Configuration**: Use secure Wings configuration with proper SSL certificates

### Performance Tips

1. **Resource Planning**: Plan memory and disk allocations carefully
2. **Monitoring**: Monitor node resource usage and performance
3. **Allocation Management**: Create allocations efficiently to avoid conflicts
4. **Maintenance Mode**: Use maintenance mode for node updates
5. **Load Balancing**: Distribute servers across multiple nodes

### Wings Setup

After creating a node via the API, you'll need to:

1. **Install Wings**: Install the Wings daemon on the target server
2. **Configure Wings**: Use the configuration endpoint to get the Wings config
3. **Start Wings**: Start the Wings daemon with the configuration
4. **Verify Connection**: Ensure the node appears as connected in the panel

### Integration Examples

```javascript
// Node management service example
class NodeService {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'application/json'
    };
  }

  async getAllNodes(options = {}) {
    const params = new URLSearchParams(options);
    const response = await fetch(`${this.baseUrl}/api/application/nodes?${params}`, {
      headers: this.headers
    });
    return response.json();
  }

  async createNode(nodeData) {
    const response = await fetch(`${this.baseUrl}/api/application/nodes`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(nodeData)
    });
    return response.json();
  }

  async getNodeConfiguration(nodeId) {
    const response = await fetch(`${this.baseUrl}/api/application/nodes/${nodeId}/configuration`, {
      headers: this.headers
    });
    return response.json();
  }

  async createAllocations(nodeId, allocationData) {
    const response = await fetch(`${this.baseUrl}/api/application/nodes/${nodeId}/allocations`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(allocationData)
    });
    return response.json();
  }

  async deleteNode(nodeId) {
    const response = await fetch(`${this.baseUrl}/api/application/nodes/${nodeId}`, {
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

**Method**: `NodeController@index` (List Nodes)  
**Route**: `GET /api/application/nodes`  
**Source**: [NodeController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nodes/NodeController.php)

**Method**: `NodeController@view` (Get Node)  
**Route**: `GET /api/application/nodes/{node}`  
**Source**: [NodeController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nodes/NodeController.php)

**Method**: `NodeController@store` (Create Node)  
**Route**: `POST /api/application/nodes`  
**Source**: [NodeController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nodes/NodeController.php)

**Method**: `NodeController@update` (Update Node)  
**Route**: `PATCH /api/application/nodes/{node}`  
**Source**: [NodeController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nodes/NodeController.php)

**Method**: `NodeController@delete` (Delete Node)  
**Route**: `DELETE /api/application/nodes/{node}`  
**Source**: [NodeController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nodes/NodeController.php)

**Method**: `NodeConfigurationController@configuration` (Get Configuration)  
**Route**: `GET /api/application/nodes/{node}/configuration`  
**Source**: [NodeConfigurationController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nodes/NodeConfigurationController.php)

**Method**: `AllocationController@index` (List Allocations)  
**Route**: `GET /api/application/nodes/{node}/allocations`  
**Source**: [AllocationController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nodes/AllocationController.php)

**Method**: `AllocationController@store` (Create Allocations)  
**Route**: `POST /api/application/nodes/{node}/allocations`  
**Source**: [AllocationController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nodes/AllocationController.php)

**Method**: `AllocationController@delete` (Delete Allocation)  
**Route**: `DELETE /api/application/nodes/{node}/allocations/{allocation}`  
**Source**: [AllocationController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nodes/AllocationController.php)

### Services

**Node Creation Service**: [NodeCreationService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Nodes/NodeCreationService.php)  
**Node Update Service**: [NodeUpdateService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Nodes/NodeUpdateService.php)  
**Node Deletion Service**: [NodeDeletionService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Nodes/NodeDeletionService.php)  
**Allocation Services**: [Allocation Services](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Services/Allocations)

### Models and Validation

**Node Model**: [Node.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Node.php)  
**Allocation Model**: [Allocation.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Allocation.php)  
**Node Store Request**: [StoreNodeRequest.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Requests/Api/Application/Nodes/StoreNodeRequest.php)  
**Node Update Request**: [UpdateNodeRequest.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Requests/Api/Application/Nodes/UpdateNodeRequest.php)

### Route Definitions

**Application Routes**: [api-application.php](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-application.php) - Lines 75-90

For detailed implementation and the latest updates, refer to the [Pterodactyl Panel repository](https://github.com/pterodactyl/panel). 

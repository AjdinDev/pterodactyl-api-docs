---
sidebar_position: 4
title: Location Management
description: Complete Application API documentation for managing locations, including creation, configuration, and deletion
keywords: [pterodactyl, application api, location management, geographic organization, data centers]
---

import CodeTabs from '@site/src/components/CodeTabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Location Management

The Application API Location Management endpoints allow administrators to manage geographic locations in the panel. Locations are used to organize nodes by geographic regions or data centers for better server management and user experience.

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

## List All Locations

Retrieve a paginated list of all locations in the panel.

```http
GET /api/application/locations
```

### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number for pagination | 1 |
| `per_page` | integer | Results per page (1-100) | 50 |
| `filter[short]` | string | Filter by location short code | - |
| `filter[long]` | string | Filter by location long name | - |
| `sort` | string | Sort field (id, short, long, created_at, updated_at) | id |
| `include` | string | Include relationships (nodes, servers) | - |

### Example Request



```bash
curl "https://your-panel.com/api/application/locations?include=nodes&per_page=25" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const response = await axios.get('https://your-panel.com/api/application/locations', {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'nodes',
    per_page: 25,
    'filter[short]': 'us'
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
    'include': 'nodes',
    'per_page': 25,
    'filter[short]': 'us'
}

response = requests.get('https://your-panel.com/api/application/locations', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();

$response = $client->get('https://your-panel.com/api/application/locations', [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => [
        'include' => 'nodes',
        'per_page' => 25,
        'filter' => ['short' => 'us']
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
    req, _ := http.NewRequest("GET", "https://your-panel.com/api/application/locations?include=nodes&per_page=25", nil)
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
    .uri(URI.create("https://your-panel.com/api/application/locations?include=nodes&per_page=25"))
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

var response = await client.GetAsync("https://your-panel.com/api/application/locations?include=nodes&per_page=25");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/application/locations')
uri.query = URI.encode_www_form({
  include: 'nodes',
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
      "object": "location",
      "attributes": {
        "id": 1,
        "short": "us-east",
        "long": "US East Coast",
        "created_at": "2024-01-15T10:26:32+00:00",
        "updated_at": "2024-01-15T10:26:32+00:00"
      },
      "relationships": {
        "nodes": {
          "object": "list",
          "data": [
            {
              "object": "node",
              "attributes": {
                "id": 1,
                "public": true,
                "name": "Node 1",
                "fqdn": "node1.example.com"
              }
            }
          ]
        }
      }
    },
    {
      "object": "location",
      "attributes": {
        "id": 2,
        "short": "eu-west",
        "long": "Europe West",
        "created_at": "2024-01-16T09:15:00+00:00",
        "updated_at": "2024-01-16T09:15:00+00:00"
      },
      "relationships": {
        "nodes": {
          "object": "list",
          "data": []
        }
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

## Get Location Details

Retrieve detailed information about a specific location.

```http
GET /api/application/locations/{location}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `location` | integer | Location ID |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include` | string | Include relationships (nodes, servers) |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/application/locations/1?include=nodes,servers" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const locationId = 1;
const response = await axios.get(`https://your-panel.com/api/application/locations/${locationId}`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'nodes,servers'
  }
});

console.log(response.data);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

location_id = 1
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {'include': 'nodes,servers'}

response = requests.get(f'https://your-panel.com/api/application/locations/{location_id}', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$locationId = 1;

$response = $client->get("https://your-panel.com/api/application/locations/{$locationId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => ['include' => 'nodes,servers']
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
    locationId := 1
    url := fmt.Sprintf("https://your-panel.com/api/application/locations/%d?include=nodes,servers", locationId)
    
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

int locationId = 1;
String url = String.format("https://your-panel.com/api/application/locations/%d?include=nodes,servers", locationId);

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

int locationId = 1;
var response = await client.GetAsync($"https://your-panel.com/api/application/locations/{locationId}?include=nodes,servers");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

location_id = 1
uri = URI("https://your-panel.com/api/application/locations/#{location_id}")
uri.query = URI.encode_www_form({include: 'nodes,servers'})

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
  "object": "location",
  "attributes": {
    "id": 1,
    "short": "us-east",
    "long": "US East Coast",
    "created_at": "2024-01-15T10:26:32+00:00",
    "updated_at": "2024-01-15T10:26:32+00:00"
  },
  "relationships": {
    "nodes": {
      "object": "list",
      "data": [
        {
          "object": "node",
          "attributes": {
            "id": 1,
            "public": true,
            "name": "Node 1",
            "fqdn": "node1.example.com",
            "memory": 8192,
            "disk": 102400
          }
        }
      ]
    },
    "servers": {
      "object": "list",
      "data": [
        {
          "object": "server",
          "attributes": {
            "id": 1,
            "uuid": "d3aac109-e5e0-4331-b03e-3454f7e02bbe",
            "name": "Minecraft Server",
            "node": 1
          }
        }
      ]
    }
  }
}
```

## Create New Location

Create a new location in the panel.

```http
POST /api/application/locations
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `short` | string | Yes | Short location code (3-60 characters) |
| `long` | string | No | Long location name (3-191 characters) |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/application/locations" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "short": "ap-south",
    "long": "Asia Pacific South"
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const locationData = {
  short: 'ap-south',
  long: 'Asia Pacific South'
};

const response = await axios.post('https://your-panel.com/api/application/locations', locationData, {
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

location_data = {
    'short': 'ap-south',
    'long': 'Asia Pacific South'
}

response = requests.post('https://your-panel.com/api/application/locations', 
                        headers=headers, json=location_data)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();

$locationData = [
    'short' => 'ap-south',
    'long' => 'Asia Pacific South'
];

$response = $client->post('https://your-panel.com/api/application/locations', [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $locationData
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
    locationData := map[string]interface{}{
        "short": "ap-south",
        "long":  "Asia Pacific South",
    }
    
    jsonData, _ := json.Marshal(locationData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "https://your-panel.com/api/application/locations", bytes.NewBuffer(jsonData))
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
  "short": "ap-south",
  "long": "Asia Pacific South"
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/application/locations"))
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

var locationData = new {
    @short = "ap-south",
    @long = "Asia Pacific South"
};

var json = JsonSerializer.Serialize(locationData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync("https://your-panel.com/api/application/locations", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseContent);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/application/locations')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

location_data = {
  short: 'ap-south',
  long: 'Asia Pacific South'
}

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = location_data.to_json

response = http.request(request)
puts JSON.parse(response.body)
```
</TabItem>

</Tabs>




### Example Response

```json
{
  "object": "location",
  "attributes": {
    "id": 3,
    "short": "ap-south",
    "long": "Asia Pacific South",
    "created_at": "2024-01-20T14:30:45+00:00",
    "updated_at": "2024-01-20T14:30:45+00:00"
  }
}
```


## Update Location

Update an existing location's information.

```http
PATCH /api/application/locations/{location}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `location` | integer | Location ID |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `short` | string | No | Short location code |
| `long` | string | No | Long location name |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X PATCH "https://your-panel.com/api/application/locations/3" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "short": "apac-south",
    "long": "Asia Pacific South Region"
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const locationId = 3;
const updateData = {
  short: 'apac-south',
  long: 'Asia Pacific South Region'
};

const response = await axios.patch(`https://your-panel.com/api/application/locations/${locationId}`, updateData, {
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

location_id = 3
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

update_data = {
    'short': 'apac-south',
    'long': 'Asia Pacific South Region'
}

response = requests.patch(f'https://your-panel.com/api/application/locations/{location_id}', 
                         headers=headers, json=update_data)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$locationId = 3;

$updateData = [
    'short' => 'apac-south',
    'long' => 'Asia Pacific South Region'
];

$response = $client->patch("https://your-panel.com/api/application/locations/{$locationId}", [
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
    locationId := 3
    updateData := map[string]interface{}{
        "short": "apac-south",
        "long":  "Asia Pacific South Region",
    }
    
    jsonData, _ := json.Marshal(updateData)
    url := fmt.Sprintf("https://your-panel.com/api/application/locations/%d", locationId)
    
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

int locationId = 3;
String jsonBody = """
{
  "short": "apac-south",
  "long": "Asia Pacific South Region"
}
""";

String url = String.format("https://your-panel.com/api/application/locations/%d", locationId);

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

int locationId = 3;
var updateData = new {
    @short = "apac-south",
    @long = "Asia Pacific South Region"
};

var json = JsonSerializer.Serialize(updateData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PatchAsync($"https://your-panel.com/api/application/locations/{locationId}", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseContent);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

location_id = 3
uri = URI("https://your-panel.com/api/application/locations/#{location_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

update_data = {
  short: 'apac-south',
  long: 'Asia Pacific South Region'
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
  "object": "location",
  "attributes": {
    "id": 3,
    "short": "apac-south",
    "long": "Asia Pacific South Region",
    "created_at": "2024-01-20T14:30:45+00:00",
    "updated_at": "2024-01-20T15:45:30+00:00"
  }
}
```


## Delete Location

Delete a location from the panel. This action is irreversible.

```http
DELETE /api/application/locations/{location}
```

:::warning[Dependencies Required]
A location can only be deleted if it has no associated nodes. Move or delete all nodes in the location before attempting to delete it.
:::

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `location` | integer | Location ID |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X DELETE "https://your-panel.com/api/application/locations/3" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const locationId = 3;
const response = await axios.delete(`https://your-panel.com/api/application/locations/${locationId}`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  }
});

console.log('Location deleted successfully');
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

location_id = 3
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

response = requests.delete(f'https://your-panel.com/api/application/locations/{location_id}', 
                          headers=headers)
print('Location deleted successfully' if response.status_code == 204 else 'Error deleting location')
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$locationId = 3;

$response = $client->delete("https://your-panel.com/api/application/locations/{$locationId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ]
]);

echo 'Location deleted successfully';
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
    locationId := 3
    url := fmt.Sprintf("https://your-panel.com/api/application/locations/%d", locationId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("DELETE", url, nil)
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    if resp.StatusCode == 204 {
        fmt.Println("Location deleted successfully")
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

int locationId = 3;
String url = String.format("https://your-panel.com/api/application/locations/%d", locationId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptla_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .DELETE()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
if (response.statusCode() == 204) {
    System.out.println("Location deleted successfully");
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

int locationId = 3;
var response = await client.DeleteAsync($"https://your-panel.com/api/application/locations/{locationId}");

if (response.StatusCode == System.Net.HttpStatusCode.NoContent) {
    Console.WriteLine("Location deleted successfully");
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'

location_id = 3
uri = URI("https://your-panel.com/api/application/locations/#{location_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts 'Location deleted successfully' if response.code == '204'
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
| 404 | Not Found - Location does not exist |
| 422 | Validation Error - Invalid field values |
| 429 | Too Many Requests - Rate limit exceeded |

### Example Error Response

```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The short field is required.",
      "source": {
        "field": "short"
      }
    }
  ]
}
```


## Best Practices

### Naming Conventions

1. **Short Codes**: Use consistent, descriptive short codes
   - Geographic: `us-east`, `eu-west`, `ap-south`
   - Data Center: `dc1`, `dc2`, `aws-us-east-1`
   - Provider: `vultr-ny`, `do-fra`, `hetzner-de`

2. **Long Names**: Use full descriptive names
   - `United States East Coast`
   - `Europe West (Frankfurt)`
   - `Asia Pacific South (Singapore)`

### Organization Strategies

1. **Geographic Organization**
   ```
   us-east    → United States East Coast
   us-west    → United States West Coast
   eu-central → Europe Central
   ap-south   → Asia Pacific South
   ```

2. **Provider-Based Organization**
   ```
   vultr-ny   → Vultr New York
   do-fra     → DigitalOcean Frankfurt
   aws-ohio   → Amazon Web Services Ohio
   ```

3. **Data Center Organization**
   ```
   dc1-primary   → Primary Data Center
   dc2-backup    → Backup Data Center
   dc3-disaster  → Disaster Recovery
   ```

### Security Considerations

1. **API Key Protection**: Store API keys securely and never expose them in client-side code
2. **HTTPS Only**: Always use HTTPS for API requests
3. **Input Validation**: Validate all input data before sending API requests
4. **Rate Limiting**: Implement proper rate limiting to avoid hitting API limits
5. **Error Handling**: Implement comprehensive error handling for all API calls

### Integration Examples

```javascript
// Location management service example
class LocationService {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'application/json'
    };
  }

  async getAllLocations(options = {}) {
    const params = new URLSearchParams(options);
    const response = await fetch(`${this.baseUrl}/api/application/locations?${params}`, {
      headers: this.headers
    });
    return response.json();
  }

  async createLocation(locationData) {
    const response = await fetch(`${this.baseUrl}/api/application/locations`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(locationData)
    });
    return response.json();
  }

  async updateLocation(locationId, updateData) {
    const response = await fetch(`${this.baseUrl}/api/application/locations/${locationId}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(updateData)
    });
    return response.json();
  }

  async deleteLocation(locationId) {
    const response = await fetch(`${this.baseUrl}/api/application/locations/${locationId}`, {
      method: 'DELETE',
      headers: this.headers
    });
    return response.status === 204;
  }

  async getLocationWithNodes(locationId) {
    const response = await fetch(`${this.baseUrl}/api/application/locations/${locationId}?include=nodes`, {
      headers: this.headers
    });
    return response.json();
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

**Method**: `LocationController@index` (List Locations)  
**Route**: `GET /api/application/locations`  
**Source**: [LocationController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Locations/LocationController.php)

**Method**: `LocationController@view` (Get Location)  
**Route**: `GET /api/application/locations/{location}`  
**Source**: [LocationController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Locations/LocationController.php)

**Method**: `LocationController@store` (Create Location)  
**Route**: `POST /api/application/locations`  
**Source**: [LocationController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Locations/LocationController.php)

**Method**: `LocationController@update` (Update Location)  
**Route**: `PATCH /api/application/locations/{location}`  
**Source**: [LocationController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Locations/LocationController.php)

**Method**: `LocationController@delete` (Delete Location)  
**Route**: `DELETE /api/application/locations/{location}`  
**Source**: [LocationController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Locations/LocationController.php)

### Services

**Location Creation Service**: [LocationCreationService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Locations/LocationCreationService.php)  
**Location Update Service**: [LocationUpdateService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Locations/LocationUpdateService.php)  
**Location Deletion Service**: [LocationDeletionService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Locations/LocationDeletionService.php)

### Models and Validation

**Location Model**: [Location.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Location.php)  
**Location Store Request**: [StoreLocationRequest.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Requests/Api/Application/Locations/StoreLocationRequest.php)  
**Location Update Request**: [UpdateLocationRequest.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Requests/Api/Application/Locations/UpdateLocationRequest.php)

### Route Definitions

**Application Routes**: [api-application.php](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-application.php) - Lines 90-95

For detailed implementation and the latest updates, refer to the [Pterodactyl Panel repository](https://github.com/pterodactyl/panel). 

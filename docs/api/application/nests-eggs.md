---
sidebar_position: 5
title: Nests & Eggs Management
description: Complete Application API documentation for managing nests and eggs, including server types, configurations, and egg variables
keywords: [pterodactyl, application api, nests, eggs, server types, game configurations, startup scripts]
---

import CodeTabs from '@site/src/components/CodeTabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Nests & Eggs Management

The Application API Nests & Eggs Management endpoints allow administrators to manage server types and configurations. Nests are categories that group similar server types (like "Minecraft" or "Discord Bots"), while eggs are specific server configurations within those nests (like "Vanilla Minecraft" or "Paper").

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
</TabItem>
</Tabs>

## Nest Management

### List All Nests

Retrieve a paginated list of all nests in the panel.

```http
GET /api/application/nests
```

#### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number for pagination | 1 |
| `per_page` | integer | Results per page (1-100) | 50 |
| `include` | string | Include relationships (eggs, servers) | - |

#### Example Request

<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/application/nests?include=eggs" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const response = await axios.get('https://your-panel.com/api/application/nests', {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'eggs'
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

params = {'include': 'eggs'}

response = requests.get('https://your-panel.com/api/application/nests', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();

$response = $client->get('https://your-panel.com/api/application/nests', [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => ['include' => 'eggs']
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
    "fmt"
    "io"
    "net/http"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://your-panel.com/api/application/nests?include=eggs", nil)
    
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import okhttp3.*;

public class Main {
    public static void main(String[] args) throws Exception {
        OkHttpClient client = new OkHttpClient();
        
        Request request = new Request.Builder()
            .url("https://your-panel.com/api/application/nests?include=eggs")
            .addHeader("Authorization", "Bearer ptla_YOUR_API_KEY")
            .addHeader("Accept", "Application/vnd.pterodactyl.v1+json")
            .build();
            
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program 
{
    static async Task Main(string[] args)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        var response = await client.GetAsync("https://your-panel.com/api/application/nests?include=eggs");
        var content = await response.Content.ReadAsStringAsync();
        
        Console.WriteLine(content);
    }
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'

uri = URI('https://your-panel.com/api/application/nests?include=eggs')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts response.body
```
</TabItem>
</Tabs>

#### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "nest",
      "attributes": {
        "id": 1,
        "uuid": "f6b04292-7c5c-4b8a-8c4e-1c1e2a3b4c5d",
        "author": "support@pterodactyl.io",
        "name": "Minecraft",
        "description": "Minecraft - the classic game from Mojang. With support for Vanilla MC, Spigot, and many others!",
        "created_at": "2021-01-01T00:00:00+00:00",
        "updated_at": "2021-01-01T00:00:00+00:00",
        "relationships": {
          "eggs": {
            "object": "list",
            "data": [
              {
                "object": "egg",
                "attributes": {
                  "id": 1,
                  "uuid": "e1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
                  "name": "Vanilla Minecraft",
                  "nest": 1,
                  "author": "support@pterodactyl.io",
                  "description": "Minecraft Java Edition server",
                  "docker_image": "ghcr.io/pterodactyl/yolks:java_17",
                  "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
                  "created_at": "2021-01-01T00:00:00+00:00",
                  "updated_at": "2021-01-01T00:00:00+00:00"
                }
              }
            ]
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

### Get Nest Details

Retrieve detailed information about a specific nest.

```http
GET /api/application/nests/{nest}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `nest` | integer | Nest ID |

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include` | string | Include relationships (eggs, servers) |

#### Example Request

<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/application/nests/1?include=eggs" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const nestId = 1;
const response = await axios.get(`https://your-panel.com/api/application/nests/${nestId}`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'eggs'
  }
});

console.log(response.data);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

nest_id = 1
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {'include': 'eggs'}

response = requests.get(f'https://your-panel.com/api/application/nests/{nest_id}', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$nestId = 1;

$response = $client->get("https://your-panel.com/api/application/nests/{$nestId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => ['include' => 'eggs']
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
    "fmt"
    "io"
    "net/http"
)

func main() {
    nestId := 1
    client := &http.Client{}
    req, _ := http.NewRequest("GET", fmt.Sprintf("https://your-panel.com/api/application/nests/%d?include=eggs", nestId), nil)
    
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import okhttp3.*;

public class Main {
    public static void main(String[] args) throws Exception {
        int nestId = 1;
        OkHttpClient client = new OkHttpClient();
        
        Request request = new Request.Builder()
            .url("https://your-panel.com/api/application/nests/" + nestId + "?include=eggs")
            .addHeader("Authorization", "Bearer ptla_YOUR_API_KEY")
            .addHeader("Accept", "Application/vnd.pterodactyl.v1+json")
            .build();
            
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program 
{
    static async Task Main(string[] args)
    {
        int nestId = 1;
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        var response = await client.GetAsync($"https://your-panel.com/api/application/nests/{nestId}?include=eggs");
        var content = await response.Content.ReadAsStringAsync();
        
        Console.WriteLine(content);
    }
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'

nest_id = 1
uri = URI("https://your-panel.com/api/application/nests/#{nest_id}?include=eggs")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts response.body
```
</TabItem>
</Tabs>

## Egg Management

### List Nest Eggs

Retrieve all eggs within a specific nest.

```http
GET /api/application/nests/{nest}/eggs
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `nest` | integer | Nest ID |

#### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number for pagination | 1 |
| `per_page` | integer | Results per page (1-100) | 50 |
| `include` | string | Include relationships (variables, nest) | - |

#### Example Request

<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/application/nests/1/eggs?include=variables" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const nestId = 1;
const response = await axios.get(`https://your-panel.com/api/application/nests/${nestId}/eggs`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'variables'
  }
});

console.log(response.data);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

nest_id = 1
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {'include': 'variables'}

response = requests.get(f'https://your-panel.com/api/application/nests/{nest_id}/eggs', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$nestId = 1;

$response = $client->get("https://your-panel.com/api/application/nests/{$nestId}/eggs", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => ['include' => 'variables']
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
    "fmt"
    "io"
    "net/http"
)

func main() {
    nestId := 1
    client := &http.Client{}
    req, _ := http.NewRequest("GET", fmt.Sprintf("https://your-panel.com/api/application/nests/%d/eggs?include=variables", nestId), nil)
    
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import okhttp3.*;

public class Main {
    public static void main(String[] args) throws Exception {
        int nestId = 1;
        OkHttpClient client = new OkHttpClient();
        
        Request request = new Request.Builder()
            .url("https://your-panel.com/api/application/nests/" + nestId + "/eggs?include=variables")
            .addHeader("Authorization", "Bearer ptla_YOUR_API_KEY")
            .addHeader("Accept", "Application/vnd.pterodactyl.v1+json")
            .build();
            
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program 
{
    static async Task Main(string[] args)
    {
        int nestId = 1;
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        var response = await client.GetAsync($"https://your-panel.com/api/application/nests/{nestId}/eggs?include=variables");
        var content = await response.Content.ReadAsStringAsync();
        
        Console.WriteLine(content);
    }
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'

nest_id = 1
uri = URI("https://your-panel.com/api/application/nests/#{nest_id}/eggs?include=variables")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts response.body
```
</TabItem>
</Tabs>

### Get Egg Details

Retrieve detailed information about a specific egg within a nest.

```http
GET /api/application/nests/{nest}/eggs/{egg}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `nest` | integer | Nest ID |
| `egg` | integer | Egg ID |

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include` | string | Include relationships (variables, nest) |

#### Example Request

<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/application/nests/1/eggs/1?include=variables,nest" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const nestId = 1;
const eggId = 1;
const response = await axios.get(`https://your-panel.com/api/application/nests/${nestId}/eggs/${eggId}`, {
  headers: {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  },
  params: {
    include: 'variables,nest'
  }
});

console.log(response.data);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

nest_id = 1
egg_id = 1
headers = {
    'Authorization': 'Bearer ptla_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {'include': 'variables,nest'}

response = requests.get(f'https://your-panel.com/api/application/nests/{nest_id}/eggs/{egg_id}', 
                       headers=headers, params=params)
print(response.json())
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$nestId = 1;
$eggId = 1;

$response = $client->get("https://your-panel.com/api/application/nests/{$nestId}/eggs/{$eggId}", [
    'headers' => [
        'Authorization' => 'Bearer ptla_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ],
    'query' => ['include' => 'variables,nest']
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
    "fmt"
    "io"
    "net/http"
)

func main() {
    nestId := 1
eggId := 1
client := &http.Client{}
    req, _ := http.NewRequest("GET", fmt.Sprintf("https://your-panel.com/api/application/nests/%d/eggs/%d?include=variables,nest", nestId, eggId), nil)
    
    req.Header.Add("Authorization", "Bearer ptla_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import okhttp3.*;

public class Main {
    public static void main(String[] args) throws Exception {
        int nestId = 1;
int eggId = 1;
OkHttpClient client = new OkHttpClient();
        
        Request request = new Request.Builder()
            .url("https://your-panel.com/api/application/nests/" + nestId + "/eggs/" + eggId + "?include=variables,nest")
            .addHeader("Authorization", "Bearer ptla_YOUR_API_KEY")
            .addHeader("Accept", "Application/vnd.pterodactyl.v1+json")
            .build();
            
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program 
{
    static async Task Main(string[] args)
    {
        int nestId = 1;
        int eggId = 1;
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", "Bearer ptla_YOUR_API_KEY");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        var response = await client.GetAsync($"https://your-panel.com/api/application/nests/{nestId}/eggs/{eggId}?include=variables,nest");
        var content = await response.Content.ReadAsStringAsync();
        
        Console.WriteLine(content);
    }
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'

nest_id = 1
egg_id = 1
uri = URI("https://your-panel.com/api/application/nests/#{nest_id}/eggs/#{egg_id}?include=variables,nest")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptla_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
puts response.body
```
</TabItem>
</Tabs>

#### Example Response

```json
{
  "object": "egg",
  "attributes": {
    "id": 1,
    "uuid": "b6e07e1e-ffa6-4152-9d1f-95b8e7ece3e6",
    "name": "Forge Minecraft",
    "nest": 1,
    "author": "support@pterodactyl.io",
    "description": "Minecraft Forge Server. Minecraft Forge is a modding API (Application Programming Interface), which makes it easier to create mods, and also make sure mods are compatible with each other.",
    "docker_image": "ghcr.io/pterodactyl/yolks:java_8",
    "docker_images": {
      "Java 8": "ghcr.io/pterodactyl/yolks:java_8",
      "Java 11": "ghcr.io/pterodactyl/yolks:java_11",
      "Java 16": "ghcr.io/pterodactyl/yolks:java_16",
      "Java 17": "ghcr.io/pterodactyl/yolks:java_17",
      "Java 21": "ghcr.io/pterodactyl/yolks:java_21"
    },
    "config": {
      "files": {
        "server.properties": {
          "parser": "properties",
          "find": {
            "server-ip": "0.0.0.0",
            "server-port": "{{server.build.default.port}}",
            "query.port": "{{server.build.default.port}}"
          }
        }
      },
      "startup": {
        "done": ")! For help, type "
      },
      "stop": "stop",
      "logs": [],
      "file_denylist": [],
      "extends": null
    },
    "startup": "java -Xms128M -XX:MaxRAMPercentage=95.0 -Dterminal.jline=false -Dterminal.ansi=true $( [[  ! -f unix_args.txt ]] && printf %s \"-jar {{SERVER_JARFILE}}\" || printf %s \"@unix_args.txt\" )",
    "script": {
      "privileged": true,
      "install": "#!/bin/bash\r\n# Forge Installation Script\r\n#\r\n# Server Files: /mnt/server\r\napt update\r\napt install -y curl jq\r\n\r\nif [[ ! -d /mnt/server ]]; then\r\n  mkdir /mnt/server\r\nfi\r\n\r\ncd /mnt/server\r\n\r\n# Remove spaces from the version number to avoid issues with curl\r\nFORGE_VERSION=\"$(echo \"$FORGE_VERSION\" | tr -d ' ')\"\r\nMC_VERSION=\"$(echo \"$MC_VERSION\" | tr -d ' ')\"\r\n\r\n# [Additional installation script content truncated for brevity]\r\necho -e \"Installation process is completed\"",
      "entry": "bash",
      "container": "openjdk:8-jdk-slim",
      "extends": null
    },
    "created_at": "2025-07-16T15:49:54+00:00",
    "updated_at": "2025-07-16T15:49:54+00:00"
  }
}
```

## Common Response Codes

| Status Code | Description |
|-------------|-------------|
| `200` | Request successful |
| `404` | Nest or egg not found |
| `422` | Validation errors in request data |
| `403` | Insufficient permissions |
| `429` | Rate limit exceeded |

## Error Response Format

```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The given data was invalid.",
      "meta": {
        "field": "name",
        "rule": "required"
      }
    }
  ]
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

## Best Practices

### Efficient Querying
- Use `include` parameter to fetch related data in a single request
- Implement pagination for large datasets
- Cache frequently accessed nest and egg information

### Performance Optimization
- Limit the use of `include=servers` for nests with many servers
- Use specific egg IDs when possible instead of listing all eggs
- Consider implementing local caching for static data

### Error Handling
```javascript
try {
  const response = await api.get('/api/application/nests');
  return response.data;
} catch (error) {
  if (error.response?.status === 429) {
    // Handle rate limiting
    await new Promise(resolve => setTimeout(resolve, 60000));
    return retryRequest();
  }
  throw error;
}
```

## Source Code References

### Controllers and Routes

**Method**: `NestController@index` (List Nests)  
**Route**: `GET /api/application/nests`  
**Source**: [NestController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nests/NestController.php)

**Method**: `NestController@view` (Get Nest)  
**Route**: `GET /api/application/nests/{nest}`  
**Source**: [NestController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Application/Nests/NestController.php)

**Method**: `EggController@index` (List Nest Eggs)  
**Route**: `GET /api/application/nests/{nest}/eggs`  
**Source**: [Nests Controllers](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Http/Controllers/Api/Application/Nests)

**Method**: `EggController@view` (Get Egg)  
**Route**: `GET /api/application/nests/{nest}/eggs/{egg}`  
**Source**: [Nests Controllers](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Http/Controllers/Api/Application/Nests)

### Models and Services

**Nest Model**: [Nest.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Nest.php)  
**Egg Model**: [Egg.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Egg.php)  
**EggVariable Model**: [EggVariable.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/EggVariable.php)

### Route Definitions

**Application Routes**: [api-application.php](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-application.php) - Lines 91-105

For detailed implementation and the latest updates, refer to the [Pterodactyl Panel repository](https://github.com/pterodactyl/panel).

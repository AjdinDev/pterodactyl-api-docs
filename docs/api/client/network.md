import CodeTabs from '@site/src/components/CodeTabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Network Management

Manage server network settings including IP allocations, ports, and network configuration.

## List Server Allocations

Retrieve all network allocations assigned to a server.

**`GET /api/client/servers/{server}/network/allocations`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |

### Example Request



<CodeTabs
  endpoint="/api/client/servers/{server}/network/allocations"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/network/allocations" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/network/allocations\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Server allocations:', response.data.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/network/allocations', headers=headers)
print('Server allocations:', response.json()['data'])`,
    php: `<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\\Client();

$response = $client->get("https://your-panel.com/api/client/servers/{$serverId}/network/allocations", [
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
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/network/allocations", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("Server allocations:", result["data"])
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String url = String.format("https://your-panel.com/api/client/servers/%s/network/allocations", serverId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("Server allocations: " + response.body());`,
    csharp: `using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
var response = await client.GetAsync($"https://your-panel.com/api/client/servers/{serverId}/network/allocations");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine("Server allocations: " + content);`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/network/allocations")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)
puts "Server allocations: #{data['data']}"`
  }}
/>








### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "allocation",
      "attributes": {
        "id": 15,
        "ip": "45.86.168.218",
        "ip_alias": "game.example.com",
        "port": 25565,
        "notes": "Main Minecraft server port",
        "is_default": true
      }
    },
    {
      "object": "allocation",
      "attributes": {
        "id": 16,
        "ip": "45.86.168.218",
        "ip_alias": "game.example.com",
        "port": 25566,
        "notes": "Secondary port for plugins",
        "is_default": false
      }
    },
    {
      "object": "allocation",
      "attributes": {
        "id": 17,
        "ip": "45.86.168.218",
        "ip_alias": null,
        "port": 25567,
        "notes": null,
        "is_default": false
      }
    }
  ]
}
```

### Allocation Object Attributes

| Field | Description |
|-------|-------------|
| `id` | Unique allocation identifier |
| `ip` | IP address of the allocation |
| `ip_alias` | Friendly name/hostname for the IP |
| `port` | Port number |
| `notes` | User-defined notes for the allocation |
| `is_default` | Whether this is the primary allocation |









---

## Assign New Allocation

Request assignment of an available allocation to the server.

**`POST /api/client/servers/{server}/network/allocations`**

### Request Body

This endpoint does not accept a request body. When client auto-allocation is enabled, Pterodactyl selects an available allocation using the server's primary allocation IP, or creates one from the configured auto-allocation port range.

:::tip Assigning Specific Allocations
The Client API cannot request a specific IP address or port. To assign specific allocation IDs, use the [Application API server build configuration endpoint](../application/servers#update-server-build-configuration) with `add_allocations` or `remove_allocations`.
:::

### Example Request



<CodeTabs
  endpoint="/api/client/servers/{server}/network/allocations"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/network/allocations" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/network/allocations\`, null, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  }
});

console.log('Allocation assigned:', response.data.attributes);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/network/allocations', headers=headers)
print('Allocation assigned:', response.json()['attributes'])`,
    php: `<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\Client();

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/network/allocations", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
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
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/network/allocations", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("Allocation assigned:", result["attributes"])
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String url = String.format("https://your-panel.com/api/client/servers/%s/network/allocations", serverId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .POST(HttpRequest.BodyPublishers.noBody())
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("Allocation assigned: " + response.body());`,
    csharp: `using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/network/allocations", null);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine("Allocation assigned: " + responseContent);`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/network/allocations")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
data = JSON.parse(response.body)
puts "Allocation assigned: #{data['attributes']}"`
  }}
/>








### Success Response

```json
{
  "object": "allocation",
  "attributes": {
    "id": 18,
    "ip": "45.86.168.218",
    "ip_alias": "game.example.com",
    "port": 25568,
    "notes": null,
    "is_default": false
  }
}
```




### Error Responses

**Allocation Limit Reached (400)**
```json
{
  "errors": [
    {
      "code": "DisplayException",
      "status": "400",
      "detail": "Cannot assign additional allocations to this server: limit has been reached."
    }
  ]
}
```


**Auto-Allocation Disabled (400)**
```json
{
  "errors": [
    {
      "code": "AutoAllocationNotEnabledException",
      "status": "400",
      "detail": "Server auto-allocation is not enabled for this instance."
    }
  ]
}
```


**No Auto-Allocation Space Available (400)**
```json
{
  "errors": [
    {
      "code": "NoAutoAllocationSpaceAvailableException",
      "status": "400",
      "detail": "Cannot assign additional allocation: no more space available on node."
    }
  ]
}
```










---

## Set Primary Allocation

Change which allocation is the primary (default) allocation for the server.

**`POST /api/client/servers/{server}/network/allocations/{allocation}/primary`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `allocation` | integer | Allocation ID to set as primary |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/network/allocations/16/primary" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const allocationId = 16;

const response = await axios.post(`https://your-panel.com/api/client/servers/${serverId}/network/allocations/${allocationId}/primary`, {}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Primary allocation set:', response.data.attributes);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
allocation_id = 16

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/network/allocations/{allocation_id}/primary', 
                        headers=headers)
print('Primary allocation set:', response.json()['attributes'])
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$allocationId = 16;
$client = new GuzzleHttp\Client();

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/network/allocations/{$allocationId}/primary", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ]
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
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    allocationId := 16
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/network/allocations/%d/primary", serverId, allocationId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("Primary allocation set:", result["attributes"])
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
int allocationId = 16;
String url = String.format("https://your-panel.com/api/client/servers/%s/network/allocations/%d/primary", serverId, allocationId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.noBody())
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("Primary allocation set: " + response.body());
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
int allocationId = 16;

var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/network/allocations/{allocationId}/primary", null);
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine("Primary allocation set: " + content);
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

server_id = 'd3aac109'
allocation_id = 16
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/network/allocations/#{allocation_id}/primary")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)
puts "Primary allocation set: #{data['attributes']}"
```
</TabItem>

</Tabs>








### Success Response

```json
{
  "object": "allocation",
  "attributes": {
    "id": 16,
    "ip": "45.86.168.218",
    "ip_alias": "game.example.com",
    "port": 25566,
    "notes": "Secondary port for plugins",
    "is_default": true
  }
}
```


:::info Primary Allocation
The primary allocation is the main IP:Port combination used for server connections. Only one allocation can be primary at a time.
:::



### Error Responses

**Server Must Be Stopped (400)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "400",
      "detail": "Server must be stopped to change the primary allocation."
    }
  ]
}
```










---

## Update Allocation Notes

Add or modify notes for a specific allocation.

**`POST /api/client/servers/{server}/network/allocations/{allocation}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `allocation` | integer | Allocation ID |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `notes` | string | No | Notes for the allocation (max 255 characters) |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/network/allocations/17" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "notes": "Reserved for future web interface"
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const allocationId = 17;
const updateData = {
  notes: 'Reserved for future web interface'
};

const response = await axios.post(`https://your-panel.com/api/client/servers/${serverId}/network/allocations/${allocationId}`, updateData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Allocation notes updated:', response.data.attributes);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
allocation_id = 17
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

update_data = {
    'notes': 'Reserved for future web interface'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/network/allocations/{allocation_id}', 
                         headers=headers, json=update_data)
print(f"Allocation notes updated: {response.json()['attributes']['notes']}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$allocationId = 17;
$updateData = [
    'notes' => 'Reserved for future web interface'
];

$client = new GuzzleHttp\Client();

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/network/allocations/{$allocationId}", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $updateData
]);

$data = json_decode($response->getBody(), true);
echo "Allocation notes updated: " . $data['attributes']['notes'] . "\n";
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
    allocationId := 17
    updateData := map[string]string{
        "notes": "Reserved for future web interface",
    }
    
    jsonData, _ := json.Marshal(updateData)
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/network/allocations/%d", serverId, allocationId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    
    attrs := result["attributes"].(map[string]interface{})
    fmt.Printf("Allocation notes updated: %s\n", attrs["notes"])
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
int allocationId = 17;
String jsonData = """
{
  "notes": "Reserved for future web interface"
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(String.format("https://your-panel.com/api/client/servers/%s/network/allocations/%d", serverId, allocationId)))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("Allocation notes updated: " + response.body());
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
int allocationId = 17;
var updateData = new {
    notes = "Reserved for future web interface"
};

var json = JsonSerializer.Serialize(updateData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/network/allocations/{allocationId}", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine($"Allocation notes updated: {responseContent}");
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

server_id = 'd3aac109'
allocation_id = 17
update_data = {
  notes: 'Reserved for future web interface'
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/network/allocations/#{allocation_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = update_data.to_json

response = http.request(request)
data = JSON.parse(response.body)
puts "Allocation notes updated: #{data['attributes']['notes']}"
```
</TabItem>

</Tabs>








### Success Response

```json
{
  "object": "allocation",
  "attributes": {
    "id": 17,
    "ip": "45.86.168.218",
    "ip_alias": "game.example.com",
    "port": 25567,
    "notes": "Reserved for future web interface",
    "is_default": false
  }
}
```










---

## Remove Allocation

Unassign an allocation from the server, making it available for other servers.

**`DELETE /api/client/servers/{server}/network/allocations/{allocation}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `allocation` | integer | Allocation ID to remove |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X DELETE "https://your-panel.com/api/client/servers/d3aac109/network/allocations/18" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const allocationId = 18;

const response = await axios.delete(`https://your-panel.com/api/client/servers/${serverId}/network/allocations/${allocationId}`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

if (response.status === 204) {
  console.log('Allocation removed successfully');
} else {
  console.error('Failed to remove allocation');
}
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
allocation_id = 18
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.delete(f'https://your-panel.com/api/client/servers/{server_id}/network/allocations/{allocation_id}', 
                          headers=headers)

if response.status_code == 204:
    print("Allocation removed successfully")
else:
    print(f"Failed to remove allocation: {response.status_code}")
    if response.content:
        print(f"Error: {response.json()}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$allocationId = 18;

$client = new GuzzleHttp\Client();

try {
    $response = $client->delete("https://your-panel.com/api/client/servers/{$serverId}/network/allocations/{$allocationId}", [
        'headers' => [
            'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
            'Accept' => 'Application/vnd.pterodactyl.v1+json',
            'Content-Type' => 'application/json'
        ]
    ]);
    
    if ($response->getStatusCode() === 204) {
        echo "Allocation removed successfully\n";
    }
} catch (GuzzleHttp\Exception\ClientException $e) {
    echo "Failed to remove allocation: " . $e->getCode() . "\n";
    echo "Error: " . $e->getResponse()->getBody() . "\n";
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
    allocationId := 18
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/network/allocations/%d", serverId, allocationId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("DELETE", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode == 204 {
        fmt.Println("Allocation removed successfully")
    } else {
        fmt.Printf("Failed to remove allocation: %d\n", resp.StatusCode)
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
int allocationId = 18;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(String.format("https://your-panel.com/api/client/servers/%s/network/allocations/%d", serverId, allocationId)))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .DELETE()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

if (response.statusCode() == 204) {
    System.out.println("Allocation removed successfully");
} else {
    System.out.println("Failed to remove allocation: " + response.statusCode());
    if (!response.body().isEmpty()) {
        System.out.println("Error: " + response.body());
    }
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
int allocationId = 18;

try
{
    var response = await client.DeleteAsync($"https://your-panel.com/api/client/servers/{serverId}/network/allocations/{allocationId}");
    
    if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
    {
        Console.WriteLine("Allocation removed successfully");
    }
    else
    {
        Console.WriteLine($"Failed to remove allocation: {(int)response.StatusCode}");
        string errorContent = await response.Content.ReadAsStringAsync();
        if (!string.IsNullOrEmpty(errorContent))
        {
            Console.WriteLine($"Error: {errorContent}");
        }
    }
}
catch (HttpRequestException ex)
{
    Console.WriteLine($"Error removing allocation: {ex.Message}");
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'
require 'json'

server_id = 'd3aac109'
allocation_id = 18

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/network/allocations/#{allocation_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)

if response.code == '204'
  puts "Allocation removed successfully"
else
  puts "Failed to remove allocation: #{response.code}"
  puts "Error: #{response.body}" unless response.body.empty?
end
```
</TabItem>

</Tabs>








### Success Response (204)

Returns empty response body with status code 204.



### Error Responses

**Cannot Remove Primary Allocation (400)**
```json
{
  "errors": [
    {
      "code": "CannotDeletePrimaryAllocationException",
      "status": "400",
      "detail": "Cannot remove the primary allocation. Set another allocation as primary first."
    }
  ]
}
```


**Server Must Be Stopped (400)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "400",
      "detail": "Server must be stopped to remove allocations."
    }
  ]
}
```










---

## Network Configuration Examples

### Request Additional Allocations

The Client API can request additional allocations, but it cannot choose the IP address or port. Pterodactyl assigns an available allocation from the server's node.

```bash
# Request one additional allocation
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/network/allocations" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"

# Request another additional allocation
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/network/allocations" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

### Assign Specific Game Ports

Specific game ports must already exist as allocations. Administrators can assign specific allocation IDs to a server with the [Application API server build configuration endpoint](../application/servers#update-server-build-configuration).

```bash
# Assign allocation IDs 42 and 43 to a server using the Application API
curl -X PATCH "https://your-panel.com/api/application/servers/2/build" \
  -H "Authorization: Bearer ptla_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "allocation": 1,
    "memory": 2048,
    "swap": 0,
    "disk": 20480,
    "io": 500,
    "cpu": 100,
    "feature_limits": {
      "databases": 2,
      "allocations": 3,
      "backups": 1
    },
    "add_allocations": [42, 43]
  }'
```

### Set Primary Allocation

```bash
# Set allocation as primary (main server port)
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/network/allocations/1/primary" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```

### Port Testing

Test allocation connectivity:

```bash
# Test port connectivity
telnet 45.86.168.218 25565

# Verify port listening
netstat -tuln | grep 25565

# Test from specific location
curl -I http://45.86.168.218:8080
```

### Network Monitoring

- **Port scanning**: Regular port availability checks
- **Latency monitoring**: Track connection latency
- **Bandwidth usage**: Monitor data transfer
- **Uptime tracking**: Ensure allocation availability

---

## Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | `DisplayException` | Allocation limit reached |
| 400 | `AutoAllocationNotEnabledException` | Server auto-allocation is disabled |
| 400 | `NoAutoAllocationSpaceAvailableException` | No auto-allocation space available on the node |
| 400 | `CannotDeletePrimaryAllocationException` | Cannot remove primary allocation |
| 400 | `ConflictingServerStateException` | Server state prevents operation |
| 401 | `InvalidCredentialsException` | Invalid API key |
| 403 | `InsufficientPermissionsException` | Missing required permissions |
| 404 | `NotFoundHttpException` | Allocation not found |
| 422 | `ValidationException` | Invalid request data |

## Required Permissions

Network allocation operations require specific permissions:

| Permission | Description |
|------------|-------------|
| `allocation.read` | View server allocations |
| `allocation.create` | Add new allocations |
| `allocation.update` | Modify allocation settings |
| `allocation.delete` | Remove allocations |

## Next Steps

- Explore [Server Management](./servers) for server control and monitoring
- Check [User Management](./users) for allocation access control
- Review [Scheduled Tasks](./schedules) for automated network checks 

## Source References

**Controller**: [`NetworkAllocationController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/NetworkAllocationController.php)  
**Routes**: [`api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php) - Network allocation endpoints  
**Allocation Model**: [`Allocation.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Allocation.php)  
**Allocation Service**: [`FindAssignableAllocationService`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Allocations/FindAssignableAllocationService.php)

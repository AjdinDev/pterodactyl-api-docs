import CodeTabs from '@site/src/components/CodeTabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Backup Management

Manage server backups including creation, downloads, and backup operations.

## List Backups

Retrieve all backups for a server.

**`GET /api/client/servers/{server}/backups`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |

### Example Request




<CodeTabs
  endpoint="/api/client/servers/{server}/backups"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/backups" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const serverId = 'd3aac109';

const response = await fetch(\`https://your-panel.com/api/client/servers/\${serverId}/backups\`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ptlc_YOUR_API_KEY',
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json'
    }
});

const data = await response.json();
console.log('Server backups:', data.data);`,
    python: `import requests

server_id = 'd3aac109'
url = f'https://your-panel.com/api/client/servers/{server_id}/backups'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(url, headers=headers)
data = response.json()

for backup in data['data']:
    print(f"Backup: {backup['attributes']['name']}")
    print(f"Size: {backup['attributes']['bytes']} bytes")
    print(f"Status: {'Successful' if backup['attributes']['is_successful'] else 'Failed'}")
    print("---")`,
    php: `<?php
$serverId = 'd3aac109';
$url = "https://your-panel.com/api/client/servers/{$serverId}/backups";

$client = new GuzzleHttp\\Client();

$response = $client->get($url, [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ]
]);

$data = json_decode($response->getBody(), true);

foreach ($data['data'] as $backup) {
    echo "Backup: " . $backup['attributes']['name'] . "\\n";
    echo "Size: " . number_format($backup['attributes']['bytes']) . " bytes\\n";
    echo "Status: " . ($backup['attributes']['is_successful'] ? 'Successful' : 'Failed') . "\\n";
    echo "---\\n";
}
?>`,
    go: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/backups", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    
    backups := result["data"].([]interface{})
    for _, backup := range backups {
        attrs := backup.(map[string]interface{})["attributes"].(map[string]interface{})
        fmt.Printf("Backup: %s\\n", attrs["name"])
        fmt.Printf("Size: %.0f bytes\\n", attrs["bytes"])
        fmt.Printf("Status: %s\\n", map[bool]string{true: "Successful", false: "Failed"}[attrs["is_successful"].(bool)])
        fmt.Println("---")
    }
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

public class BackupManager {
    private static final String API_KEY = "ptlc_YOUR_API_KEY";
    private static final String BASE_URL = "https://your-panel.com/api/client";
    
    public void listBackups(String serverId) throws Exception {
        String url = BASE_URL + "/servers/" + serverId + "/backups";
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Accept", "Application/vnd.pterodactyl.v1+json")
            .header("Content-Type", "application/json")
            .GET()
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        ObjectMapper mapper = new ObjectMapper();
        JsonNode data = mapper.readTree(response.body());
        
        for (JsonNode backup : data.get("data")) {
            JsonNode attrs = backup.get("attributes");
            System.out.println("Backup: " + attrs.get("name").asText());
            System.out.println("Size: " + attrs.get("bytes").asLong() + " bytes");
            System.out.println("Status: " + (attrs.get("is_successful").asBoolean() ? "Successful" : "Failed"));
            System.out.println("---");
        }
    }
}`,
    csharp: `using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

public class BackupManager
{
    private static readonly string ApiKey = "ptlc_YOUR_API_KEY";
    private static readonly string BaseUrl = "https://your-panel.com/api/client";
    
    public async Task ListBackupsAsync(string serverId)
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        string url = $"{BaseUrl}/servers/{serverId}/backups";
        HttpResponseMessage response = await client.GetAsync(url);
        string content = await response.Content.ReadAsStringAsync();
        
        JObject data = JObject.Parse(content);
        
        foreach (var backup in data["data"])
        {
            var attrs = backup["attributes"];
            Console.WriteLine($"Backup: {attrs["name"]}");
            Console.WriteLine($"Size: {attrs["bytes"]:N0} bytes");
            Console.WriteLine($"Status: {(attrs["is_successful"].Value<bool>() ? "Successful" : "Failed")}");
            Console.WriteLine("---");
        }
    }
}`,
    ruby: `require 'net/http'
require 'uri'
require 'json'

class BackupManager
  API_KEY = 'ptlc_YOUR_API_KEY'
  BASE_URL = 'https://your-panel.com/api/client'
  
  def self.list_backups(server_id)
    uri = URI("#{BASE_URL}/servers/#{server_id}/backups")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Get.new(uri)
    request['Authorization'] = "Bearer #{API_KEY}"
    request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
    request['Content-Type'] = 'application/json'
    
    response = http.request(request)
    data = JSON.parse(response.body)
    
    data['data'].each do |backup|
      attrs = backup['attributes']
      puts "Backup: #{attrs['name']}"
      puts "Size: #{attrs['bytes'].to_s.reverse.gsub(/(\\d{3})(?=\\d)/, '\\\\1,').reverse} bytes"
      puts "Status: #{attrs['is_successful'] ? 'Successful' : 'Failed'}"
      puts "---"
    end
  end
end

# Usage
BackupManager.list_backups('d3aac109')`
  }}
/>




### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "backup",
      "attributes": {
        "uuid": "a4962fe6-90c8-4b89-ba62-a5d3b06426c0",
        "name": "Weekly Backup - 2023-10-20",
        "ignored_files": [
          "*.log",
          "cache/*",
          "temp/*"
        ],
        "sha256_hash": "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
        "bytes": 1073741824,
        "created_at": "2023-10-20T14:30:00+00:00",
        "completed_at": "2023-10-20T14:35:22+00:00",
        "is_successful": true,
        "is_locked": false
      }
    },
    {
      "object": "backup",
      "attributes": {
        "uuid": "b7823cd9-45e1-4c23-9a84-c8d5f06b93a1",
        "name": "Pre-Update Backup",
        "ignored_files": [],
        "sha256_hash": "x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4930291f82d1",
        "bytes": 524288000,
        "created_at": "2023-10-18T09:15:00+00:00",
        "completed_at": "2023-10-18T09:20:45+00:00",
        "is_successful": true,
        "is_locked": true
      }
    },
    {
      "object": "backup",
      "attributes": {
        "uuid": "c3948f1a-67b2-4d89-8c45-a1b2c3d4e5f6",
        "name": "Failed Backup Attempt",
        "ignored_files": [],
        "sha256_hash": null,
        "bytes": 0,
        "created_at": "2023-10-15T12:00:00+00:00",
        "completed_at": null,
        "is_successful": false,
        "is_locked": false
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 3,
      "count": 3,
      "per_page": 25,
      "current_page": 1,
      "total_pages": 1,
      "links": {}
    }
  }
}
```

### Backup Object Attributes

| Field | Description |
|-------|-------------|
| `uuid` | Unique backup identifier |
| `name` | Backup name/description |
| `ignored_files` | Array of file patterns excluded from backup |
| `sha256_hash` | SHA256 hash of backup file (null for failed backups) |
| `bytes` | Backup file size in bytes |
| `created_at` | Backup creation start time |
| `completed_at` | Backup completion time (null for failed/in-progress) |
| `is_successful` | Whether backup completed successfully |
| `is_locked` | Whether backup is locked from deletion |



---

## Get Backup Details

Retrieve detailed information about a specific backup.

**`GET /api/client/servers/{server}/backups/{backup}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `backup` | string | Backup UUID |

### Example Request




<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/client/servers/d3aac109/backups/a4962fe6-90c8-4b89-ba62-a5d3b06426c0" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const serverId = 'd3aac109';
const backupId = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0';

const response = await fetch(`https://your-panel.com/api/client/servers/${serverId}/backups/${backupId}`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ptlc_YOUR_API_KEY',
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json'
    }
});

const backup = await response.json();
console.log('Backup details:', backup.attributes);
console.log(`Status: ${backup.attributes.is_successful ? 'Successful' : 'Failed'}`);
console.log(`Size: ${(backup.attributes.bytes / 1024 / 1024).toFixed(2)} MB`);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
backup_id = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0'
url = f'https://your-panel.com/api/client/servers/{server_id}/backups/{backup_id}'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(url, headers=headers)
backup = response.json()

print(f"Backup Name: {backup['attributes']['name']}")
print(f"Status: {'Successful' if backup['attributes']['is_successful'] else 'Failed'}")
print(f"Size: {backup['attributes']['bytes'] / 1024 / 1024:.2f} MB")
print(f"Created: {backup['attributes']['created_at']}")
print(f"Completed: {backup['attributes']['completed_at']}")
print(f"Locked: {backup['attributes']['is_locked']}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$backupId = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0';
$url = "https://your-panel.com/api/client/servers/{$serverId}/backups/{$backupId}";

$client = new GuzzleHttp\Client();

$response = $client->get($url, [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ]
]);

$backup = json_decode($response->getBody(), true);
$attrs = $backup['attributes'];

echo "Backup Name: " . $attrs['name'] . "\n";
echo "Status: " . ($attrs['is_successful'] ? 'Successful' : 'Failed') . "\n";
echo "Size: " . round($attrs['bytes'] / 1024 / 1024, 2) . " MB\n";
echo "Created: " . $attrs['created_at'] . "\n";
echo "Completed: " . $attrs['completed_at'] . "\n";
echo "Locked: " . ($attrs['is_locked'] ? 'Yes' : 'No') . "\n";
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
    backupId := "a4962fe6-90c8-4b89-ba62-a5d3b06426c0"
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/backups/%s", serverId, backupId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    
    attrs := result["attributes"].(map[string]interface{})
    fmt.Printf("Backup Name: %s\n", attrs["name"])
    fmt.Printf("Status: %s\n", map[bool]string{true: "Successful", false: "Failed"}[attrs["is_successful"].(bool)])
    fmt.Printf("Size: %.2f MB\n", attrs["bytes"].(float64)/1024/1024)
    fmt.Printf("Created: %s\n", attrs["created_at"])
    fmt.Printf("Completed: %s\n", attrs["completed_at"])
    fmt.Printf("Locked: %s\n", map[bool]string{true: "Yes", false: "No"}[attrs["is_locked"].(bool)])
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

public class BackupManager {
    private static final String API_KEY = "ptlc_YOUR_API_KEY";
    private static final String BASE_URL = "https://your-panel.com/api/client";
    
    public void getBackupDetails(String serverId, String backupId) throws Exception {
        String url = BASE_URL + "/servers/" + serverId + "/backups/" + backupId;
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Accept", "Application/vnd.pterodactyl.v1+json")
            .header("Content-Type", "application/json")
            .GET()
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        ObjectMapper mapper = new ObjectMapper();
        JsonNode backup = mapper.readTree(response.body());
        JsonNode attrs = backup.get("attributes");
        
        System.out.println("Backup Name: " + attrs.get("name").asText());
        System.out.println("Status: " + (attrs.get("is_successful").asBoolean() ? "Successful" : "Failed"));
        System.out.println("Size: " + String.format("%.2f MB", attrs.get("bytes").asDouble() / 1024 / 1024));
        System.out.println("Created: " + attrs.get("created_at").asText());
        System.out.println("Completed: " + attrs.get("completed_at").asText());
        System.out.println("Locked: " + (attrs.get("is_locked").asBoolean() ? "Yes" : "No"));
    }
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

public class BackupManager
{
    private static readonly string ApiKey = "ptlc_YOUR_API_KEY";
    private static readonly string BaseUrl = "https://your-panel.com/api/client";
    
    public async Task GetBackupDetailsAsync(string serverId, string backupId)
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        string url = $"{BaseUrl}/servers/{serverId}/backups/{backupId}";
        HttpResponseMessage response = await client.GetAsync(url);
        string content = await response.Content.ReadAsStringAsync();
        
        JObject backup = JObject.Parse(content);
        var attrs = backup["attributes"];
        
        Console.WriteLine($"Backup Name: {attrs["name"]}");
        Console.WriteLine($"Status: {(attrs["is_successful"].Value<bool>() ? "Successful" : "Failed")}");
        Console.WriteLine($"Size: {attrs["bytes"].Value<long>() / 1024.0 / 1024.0:F2} MB");
        Console.WriteLine($"Created: {attrs["created_at"]}");
        Console.WriteLine($"Completed: {attrs["completed_at"]}");
        Console.WriteLine($"Locked: {(attrs["is_locked"].Value<bool>() ? "Yes" : "No")}");
    }
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'
require 'json'

class BackupManager
  API_KEY = 'ptlc_YOUR_API_KEY'
  BASE_URL = 'https://your-panel.com/api/client'
  
  def self.get_backup_details(server_id, backup_id)
    uri = URI("#{BASE_URL}/servers/#{server_id}/backups/#{backup_id}")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Get.new(uri)
    request['Authorization'] = "Bearer #{API_KEY}"
    request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
    request['Content-Type'] = 'application/json'
    
    response = http.request(request)
    backup = JSON.parse(response.body)
    attrs = backup['attributes']
    
    puts "Backup Name: #{attrs['name']}"
    puts "Status: #{attrs['is_successful'] ? 'Successful' : 'Failed'}"
    puts "Size: #{'%.2f' % (attrs['bytes'].to_f / 1024 / 1024)} MB"
    puts "Created: #{attrs['created_at']}"
    puts "Completed: #{attrs['completed_at']}"
    puts "Locked: #{attrs['is_locked'] ? 'Yes' : 'No'}"
  end
end

# Usage
BackupManager.get_backup_details('d3aac109', 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0')
```
</TabItem>

</Tabs>




### Example Response

```json
{
  "object": "backup",
  "attributes": {
    "uuid": "a4962fe6-90c8-4b89-ba62-a5d3b06426c0",
    "name": "Weekly Backup - 2023-10-20",
    "ignored_files": [
      "*.log",
      "cache/*",
      "temp/*"
    ],
    "sha256_hash": "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    "bytes": 1073741824,
    "created_at": "2023-10-20T14:30:00+00:00",
    "completed_at": "2023-10-20T14:35:22+00:00",
    "is_successful": true,
    "is_locked": false
  }
}
```



---

## Create Backup

Create a new backup of the server.

**`POST /api/client/servers/{server}/backups`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Backup name (auto-generated if not provided) |
| `ignored` | string | No | File patterns to exclude (one per line) |
| `is_locked` | boolean | No | Whether to lock backup from deletion (default: false) |

### Example Request




<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/backups" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pre-maintenance backup",
    "ignored": "*.log\ncache/*\ntemp/*\n*.tmp",
    "is_locked": true
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const serverId = 'd3aac109';

const backupData = {
    name: 'Pre-maintenance backup',
    ignored: '*.log\ncache/*\ntemp/*\n*.tmp',
    is_locked: true
};

const response = await fetch(`https://your-panel.com/api/client/servers/${serverId}/backups`, {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ptlc_YOUR_API_KEY',
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(backupData)
});

const backup = await response.json();
console.log('Backup created:', backup.attributes.uuid);
console.log('Backup name:', backup.attributes.name);
console.log('Status: Initiated - check progress with backup UUID');
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
url = f'https://your-panel.com/api/client/servers/{server_id}/backups'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

backup_data = {
    'name': 'Pre-maintenance backup',
    'ignored': '*.log\ncache/*\ntemp/*\n*.tmp',
    'is_locked': True
}

response = requests.post(url, headers=headers, json=backup_data)
backup = response.json()

print(f"Backup created: {backup['attributes']['uuid']}")
print(f"Backup name: {backup['attributes']['name']}")
print(f"Locked: {backup['attributes']['is_locked']}")
print("Status: Initiated - backup is now being created")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$url = "https://your-panel.com/api/client/servers/{$serverId}/backups";

$backupData = [
    'name' => 'Pre-maintenance backup',
    'ignored' => "*.log\ncache/*\ntemp/*\n*.tmp",
    'is_locked' => true
];

$client = new GuzzleHttp\Client();

$response = $client->post($url, [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $backupData
]);

$backup = json_decode($response->getBody(), true);
$attrs = $backup['attributes'];

echo "Backup created: " . $attrs['uuid'] . "\n";
echo "Backup name: " . $attrs['name'] . "\n";
echo "Locked: " . ($attrs['is_locked'] ? 'Yes' : 'No') . "\n";
echo "Status: Initiated - backup is now being created\n";
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
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/backups", serverId)
    
    backupData := map[string]interface{}{
        "name":      "Pre-maintenance backup",
        "ignored":   "*.log\ncache/*\ntemp/*\n*.tmp",
        "is_locked": true,
    }
    
    jsonData, _ := json.Marshal(backupData)
    
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
    fmt.Printf("Backup created: %s\n", attrs["uuid"])
    fmt.Printf("Backup name: %s\n", attrs["name"])
    fmt.Printf("Locked: %s\n", map[bool]string{true: "Yes", false: "No"}[attrs["is_locked"].(bool)])
    fmt.Println("Status: Initiated - backup is now being created")
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.HashMap;
import java.util.Map;

public class BackupManager {
    private static final String API_KEY = "ptlc_YOUR_API_KEY";
    private static final String BASE_URL = "https://your-panel.com/api/client";
    
    public void createBackup(String serverId) throws Exception {
        String url = BASE_URL + "/servers/" + serverId + "/backups";
        
        Map<String, Object> backupData = new HashMap<>();
        backupData.put("name", "Pre-maintenance backup");
        backupData.put("ignored", "*.log\ncache/*\ntemp/*\n*.tmp");
        backupData.put("is_locked", true);
        
        ObjectMapper mapper = new ObjectMapper();
        String jsonData = mapper.writeValueAsString(backupData);
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Accept", "Application/vnd.pterodactyl.v1+json")
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonData))
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        JsonNode backup = mapper.readTree(response.body());
        JsonNode attrs = backup.get("attributes");
        
        System.out.println("Backup created: " + attrs.get("uuid").asText());
        System.out.println("Backup name: " + attrs.get("name").asText());
        System.out.println("Locked: " + (attrs.get("is_locked").asBoolean() ? "Yes" : "No"));
        System.out.println("Status: Initiated - backup is now being created");
    }
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public class BackupManager
{
    private static readonly string ApiKey = "ptlc_YOUR_API_KEY";
    private static readonly string BaseUrl = "https://your-panel.com/api/client";
    
    public async Task CreateBackupAsync(string serverId)
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        var backupData = new
        {
            name = "Pre-maintenance backup",
            ignored = "*.log\ncache/*\ntemp/*\n*.tmp",
            is_locked = true
        };
        
        string jsonData = JsonConvert.SerializeObject(backupData);
        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");
        
        string url = $"{BaseUrl}/servers/{serverId}/backups";
        HttpResponseMessage response = await client.PostAsync(url, content);
        string responseContent = await response.Content.ReadAsStringAsync();
        
        JObject backup = JObject.Parse(responseContent);
        var attrs = backup["attributes"];
        
        Console.WriteLine($"Backup created: {attrs["uuid"]}");
        Console.WriteLine($"Backup name: {attrs["name"]}");
        Console.WriteLine($"Locked: {(attrs["is_locked"].Value<bool>() ? "Yes" : "No")}");
        Console.WriteLine("Status: Initiated - backup is now being created");
    }
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'
require 'json'

class BackupManager
  API_KEY = 'ptlc_YOUR_API_KEY'
  BASE_URL = 'https://your-panel.com/api/client'
  
  def self.create_backup(server_id)
    uri = URI("#{BASE_URL}/servers/#{server_id}/backups")
    
    backup_data = {
      name: 'Pre-maintenance backup',
      ignored: "*.log\ncache/*\ntemp/*\n*.tmp",
      is_locked: true
    }
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Post.new(uri)
    request['Authorization'] = "Bearer #{API_KEY}"
    request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
    request['Content-Type'] = 'application/json'
    request.body = backup_data.to_json
    
    response = http.request(request)
    backup = JSON.parse(response.body)
    attrs = backup['attributes']
    
    puts "Backup created: #{attrs['uuid']}"
    puts "Backup name: #{attrs['name']}"
    puts "Locked: #{attrs['is_locked'] ? 'Yes' : 'No'}"
    puts "Status: Initiated - backup is now being created"
  end
end

# Usage
BackupManager.create_backup('d3aac109')
```
</TabItem>

</Tabs>




### Success Response

```json
{
  "object": "backup",
  "attributes": {
    "uuid": "d5a847b2-89c3-4f12-a456-789abc0def12",
    "name": "Pre-maintenance backup",
    "ignored_files": [
      "*.log",
      "cache/*",
      "temp/*",
      "*.tmp"
    ],
    "sha256_hash": null,
    "bytes": 0,
    "created_at": "2023-10-21T10:30:00+00:00",
    "completed_at": null,
    "is_successful": null,
    "is_locked": true
  }
}
```

### Ignored Files Format

Specify file patterns to exclude from the backup, one pattern per line:

```
*.log
*.tmp
cache/*
temp/*
node_modules/*
.git/*
logs/*.log
backups/*
*.cache
```

### Backup Process

1. **Initiation**: Backup request is queued
2. **Processing**: Server files are compressed and archived
3. **Completion**: Backup is stored and hash is calculated
4. **Notification**: Backup status is updated

### Error Responses

**Backup Limit Reached (400)**
```json
{
  "errors": [
    {
      "code": "TooManyBackupsException",
      "status": "400",
      "detail": "This server has reached its backup limit."
    }
  ]
}
```

**Server Busy (409)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "409",
      "detail": "Cannot create backup while another backup is in progress."
    }
  ]
}
```

**Insufficient Storage (507)**
```json
{
  "errors": [
    {
      "code": "InsufficientStorageException",
      "status": "507",
      "detail": "Not enough storage space available for backup."
    }
  ]
}
```



---

## Download Backup

Get a download URL for a backup file.

**`GET /api/client/servers/{server}/backups/{backup}/download`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `backup` | string | Backup UUID |

### Example Request




<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/client/servers/d3aac109/backups/a4962fe6-90c8-4b89-ba62-a5d3b06426c0/download" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const serverId = 'd3aac109';
const backupId = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0';

const response = await fetch(`https://your-panel.com/api/client/servers/${serverId}/backups/${backupId}/download`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ptlc_YOUR_API_KEY',
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json'
    }
});

const downloadData = await response.json();
const downloadUrl = downloadData.attributes.url;

console.log('Download URL generated:', downloadUrl);
console.log('URL expires in 1 hour');

// Use the URL to download the backup
const downloadResponse = await fetch(downloadUrl);
const backup = await downloadResponse.blob();
console.log('Backup downloaded, size:', backup.size, 'bytes');
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests
import os

server_id = 'd3aac109'
backup_id = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0'
url = f'https://your-panel.com/api/client/servers/{server_id}/backups/{backup_id}/download'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

# Get download URL
response = requests.get(url, headers=headers)
download_data = response.json()
download_url = download_data['attributes']['url']

print(f"Download URL generated: {download_url}")
print("URL expires in 1 hour")

# Download the backup file
download_response = requests.get(download_url, stream=True)
filename = f"backup_{backup_id}.tar.gz"

with open(filename, 'wb') as f:
    for chunk in download_response.iter_content(chunk_size=8192):
        f.write(chunk)

print(f"Backup downloaded as: {filename}")
print(f"File size: {os.path.getsize(filename)} bytes")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$backupId = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0';
$url = "https://your-panel.com/api/client/servers/{$serverId}/backups/{$backupId}/download";

$client = new GuzzleHttp\Client();

// Get download URL
$response = $client->get($url, [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ]
]);

$downloadData = json_decode($response->getBody(), true);
$downloadUrl = $downloadData['attributes']['url'];

echo "Download URL generated: " . $downloadUrl . "\n";
echo "URL expires in 1 hour\n";

// Download the backup file
$filename = "backup_{$backupId}.tar.gz";
$downloadResponse = $client->get($downloadUrl, [
    'sink' => $filename
]);

echo "Backup downloaded as: " . $filename . "\n";
echo "File size: " . filesize($filename) . " bytes\n";
?>
```
</TabItem>

<TabItem value="go" label="Go">
```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
)

func main() {
    serverId := "d3aac109"
    backupId := "a4962fe6-90c8-4b89-ba62-a5d3b06426c0"
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/backups/%s/download", serverId, backupId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    // Get download URL
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    
    downloadUrl := result["attributes"].(map[string]interface{})["url"].(string)
    fmt.Printf("Download URL generated: %s\n", downloadUrl)
    fmt.Println("URL expires in 1 hour")
    
    // Download the backup file
    downloadResp, _ := http.Get(downloadUrl)
    defer downloadResp.Body.Close()
    
    filename := fmt.Sprintf("backup_%s.tar.gz", backupId)
    file, _ := os.Create(filename)
    defer file.Close()
    
    size, _ := io.Copy(file, downloadResp.Body)
    fmt.Printf("Backup downloaded as: %s\n", filename)
    fmt.Printf("File size: %d bytes\n", size)
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.nio.file.Paths;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

public class BackupManager {
    private static final String API_KEY = "ptlc_YOUR_API_KEY";
    private static final String BASE_URL = "https://your-panel.com/api/client";
    
    public void downloadBackup(String serverId, String backupId) throws Exception {
        String url = BASE_URL + "/servers/" + serverId + "/backups/" + backupId + "/download";
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Accept", "Application/vnd.pterodactyl.v1+json")
            .header("Content-Type", "application/json")
            .GET()
            .build();
        
        // Get download URL
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        ObjectMapper mapper = new ObjectMapper();
        JsonNode downloadData = mapper.readTree(response.body());
        String downloadUrl = downloadData.get("attributes").get("url").asText();
        
        System.out.println("Download URL generated: " + downloadUrl);
        System.out.println("URL expires in 1 hour");
        
        // Download the backup file
        String filename = "backup_" + backupId + ".tar.gz";
        HttpRequest downloadRequest = HttpRequest.newBuilder()
            .uri(URI.create(downloadUrl))
            .GET()
            .build();
        
        HttpResponse<java.nio.file.Path> downloadResponse = client.send(downloadRequest,
            HttpResponse.BodyHandlers.ofFile(Paths.get(filename)));
        
        System.out.println("Backup downloaded as: " + filename);
        System.out.println("File size: " + java.nio.file.Files.size(downloadResponse.body()) + " bytes");
    }
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

public class BackupManager
{
    private static readonly string ApiKey = "ptlc_YOUR_API_KEY";
    private static readonly string BaseUrl = "https://your-panel.com/api/client";
    
    public async Task DownloadBackupAsync(string serverId, string backupId)
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        // Get download URL
        string url = $"{BaseUrl}/servers/{serverId}/backups/{backupId}/download";
        HttpResponseMessage response = await client.GetAsync(url);
        string content = await response.Content.ReadAsStringAsync();
        
        JObject downloadData = JObject.Parse(content);
        string downloadUrl = downloadData["attributes"]["url"].ToString();
        
        Console.WriteLine($"Download URL generated: {downloadUrl}");
        Console.WriteLine("URL expires in 1 hour");
        
        // Download the backup file
        string filename = $"backup_{backupId}.tar.gz";
        using var downloadResponse = await client.GetAsync(downloadUrl);
        using var fileStream = File.Create(filename);
        await downloadResponse.Content.CopyToAsync(fileStream);
        
        Console.WriteLine($"Backup downloaded as: {filename}");
        Console.WriteLine($"File size: {new FileInfo(filename).Length} bytes");
    }
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'
require 'json'

class BackupManager
  API_KEY = 'ptlc_YOUR_API_KEY'
  BASE_URL = 'https://your-panel.com/api/client'
  
  def self.download_backup(server_id, backup_id)
    uri = URI("#{BASE_URL}/servers/#{server_id}/backups/#{backup_id}/download")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    # Get download URL
    request = Net::HTTP::Get.new(uri)
    request['Authorization'] = "Bearer #{API_KEY}"
    request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
    request['Content-Type'] = 'application/json'
    
    response = http.request(request)
    download_data = JSON.parse(response.body)
    download_url = download_data['attributes']['url']
    
    puts "Download URL generated: #{download_url}"
    puts "URL expires in 1 hour"
    
    # Download the backup file
    download_uri = URI(download_url)
    filename = "backup_#{backup_id}.tar.gz"
    
    Net::HTTP.start(download_uri.host, download_uri.port, use_ssl: true) do |http|
      request = Net::HTTP::Get.new(download_uri)
      http.request(request) do |response|
        File.open(filename, 'wb') do |file|
          response.read_body do |chunk|
            file.write(chunk)
          end
        end
      end
    end
    
    puts "Backup downloaded as: #{filename}"
    puts "File size: #{File.size(filename)} bytes"
  end
end

# Usage
BackupManager.download_backup('d3aac109', 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0')
```
</TabItem>

</Tabs>




### Example Response

```json
{
  "object": "signed_url",
  "attributes": {
    "url": "https://s3.amazonaws.com/backups/servers/d3aac109/backup_a4962fe6.tar.gz?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20231020%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231020T143000Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=abcd1234..."
  }
}
```

### Download URL Properties

- **Validity**: URLs expire after 1 hour
- **Single use**: Each request generates a new URL
- **Authentication**: URLs are pre-signed and don't require additional auth
- **File format**: Backups are provided as compressed tar.gz files

### Using the Download URL

<Tabs>
<TabItem value="curl" label="cURL">
```bash
# Download using curl
curl -L "https://s3.amazonaws.com/backups/..." -o backup.tar.gz

# Download using wget
wget "https://s3.amazonaws.com/backups/..." -O backup.tar.gz
```

### Error Responses

**Backup Not Ready (400)**
```json
{
  "errors": [
    {
      "code": "BackupNotCompletedException",
      "status": "400",
      "detail": "This backup has not completed yet and cannot be downloaded."
    }
  ]
}
```

**Backup Failed (400)**
```json
{
  "errors": [
    {
      "code": "BackupFailedException",
      "status": "400",
      "detail": "This backup failed and cannot be downloaded."
    }
  ]
}
```



---

## Delete Backup

Permanently delete a backup file.

**`DELETE /api/client/servers/{server}/backups/{backup}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `backup` | string | Backup UUID |

### Example Request




```bash
curl -X DELETE "https://your-panel.com/api/client/servers/d3aac109/backups/c3948f1a-67b2-4d89-8c45-a1b2c3d4e5f6" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const serverId = 'd3aac109';
const backupId = 'c3948f1a-67b2-4d89-8c45-a1b2c3d4e5f6';

const response = await fetch(`https://your-panel.com/api/client/servers/${serverId}/backups/${backupId}`, {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer ptlc_YOUR_API_KEY',
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json'
    }
});

if (response.status === 204) {
    console.log('Backup successfully deleted');
} else {
    console.error('Failed to delete backup:', response.status);
}
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
backup_id = 'c3948f1a-67b2-4d89-8c45-a1b2c3d4e5f6'
url = f'https://your-panel.com/api/client/servers/{server_id}/backups/{backup_id}'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.delete(url, headers=headers)

if response.status_code == 204:
    print("Backup successfully deleted")
else:
    print(f"Failed to delete backup: {response.status_code}")
    if response.content:
        print(f"Error: {response.json()}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$backupId = 'c3948f1a-67b2-4d89-8c45-a1b2c3d4e5f6';
$url = "https://your-panel.com/api/client/servers/{$serverId}/backups/{$backupId}";

$client = new GuzzleHttp\Client();

try {
    $response = $client->delete($url, [
        'headers' => [
            'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
            'Accept' => 'Application/vnd.pterodactyl.v1+json',
            'Content-Type' => 'application/json'
        ]
    ]);
    
    if ($response->getStatusCode() === 204) {
        echo "Backup successfully deleted\n";
    }
} catch (GuzzleHttp\Exception\ClientException $e) {
    echo "Failed to delete backup: " . $e->getCode() . "\n";
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
    backupId := "c3948f1a-67b2-4d89-8c45-a1b2c3d4e5f6"
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/backups/%s", serverId, backupId)
    
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
        fmt.Println("Backup successfully deleted")
    } else {
        fmt.Printf("Failed to delete backup: %d\n", resp.StatusCode)
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

public class BackupManager {
    private static final String API_KEY = "ptlc_YOUR_API_KEY";
    private static final String BASE_URL = "https://your-panel.com/api/client";
    
    public void deleteBackup(String serverId, String backupId) throws Exception {
        String url = BASE_URL + "/servers/" + serverId + "/backups/" + backupId;
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Accept", "Application/vnd.pterodactyl.v1+json")
            .header("Content-Type", "application/json")
            .DELETE()
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() == 204) {
            System.out.println("Backup successfully deleted");
        } else {
            System.out.println("Failed to delete backup: " + response.statusCode());
            if (!response.body().isEmpty()) {
                System.out.println("Error: " + response.body());
            }
        }
    }
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

public class BackupManager
{
    private static readonly string ApiKey = "ptlc_YOUR_API_KEY";
    private static readonly string BaseUrl = "https://your-panel.com/api/client";
    
    public async Task DeleteBackupAsync(string serverId, string backupId)
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        string url = $"{BaseUrl}/servers/{serverId}/backups/{backupId}";
        
        try
        {
            HttpResponseMessage response = await client.DeleteAsync(url);
            
            if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
            {
                Console.WriteLine("Backup successfully deleted");
            }
            else
            {
                Console.WriteLine($"Failed to delete backup: {(int)response.StatusCode}");
                string errorContent = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrEmpty(errorContent))
                {
                    Console.WriteLine($"Error: {errorContent}");
                }
            }
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error deleting backup: {ex.Message}");
        }
    }
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'
require 'json'

class BackupManager
  API_KEY = 'ptlc_YOUR_API_KEY'
  BASE_URL = 'https://your-panel.com/api/client'
  
  def self.delete_backup(server_id, backup_id)
    uri = URI("#{BASE_URL}/servers/#{server_id}/backups/#{backup_id}")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Delete.new(uri)
    request['Authorization'] = "Bearer #{API_KEY}"
    request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
    request['Content-Type'] = 'application/json'
    
    response = http.request(request)
    
    if response.code == '204'
      puts "Backup successfully deleted"
    else
      puts "Failed to delete backup: #{response.code}"
      puts "Error: #{response.body}" unless response.body.empty?
    end
  rescue StandardError => e
    puts "Error deleting backup: #{e.message}"
  end
end

# Usage
BackupManager.delete_backup('d3aac109', 'c3948f1a-67b2-4d89-8c45-a1b2c3d4e5f6')
```
</TabItem>

</Tabs>




### Success Response (204)

Returns empty response body with status code 204.

:::danger[Warning]
Backup deletion is **permanent and irreversible**. Deleted backups cannot be recovered.
:::

### Error Responses

**Backup Locked (400)**
```json
{
  "errors": [
    {
      "code": "BackupIsLockedException",
      "status": "400",
      "detail": "This backup is locked and cannot be deleted."
    }
  ]
}
```

**Backup In Progress (409)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "409",
      "detail": "Cannot delete backup while it is being created."
    }
  ]
}
```



---

## Restore Backup

Restore a server from a backup file. This operation will replace all current server files.

**`POST /api/client/servers/{server}/backups/{backup}/restore`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `backup` | string | Backup UUID |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `truncate` | boolean | No | Whether to delete existing files before restore (default: true) |

### Example Request




<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/backups/a4962fe6-90c8-4b89-ba62-a5d3b06426c0/restore" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "truncate": true
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const serverId = 'd3aac109';
const backupId = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0';

const restoreData = {
    truncate: true  // Delete existing files before restore
};

const response = await fetch(`https://your-panel.com/api/client/servers/${serverId}/backups/${backupId}/restore`, {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ptlc_YOUR_API_KEY',
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(restoreData)
});

if (response.status === 202) {
    console.log('Backup restoration initiated');
    console.log('Server will be restored from backup - this may take several minutes');
} else {
    console.error('Failed to initiate restore:', response.status);
}
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
backup_id = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0'
url = f'https://your-panel.com/api/client/servers/{server_id}/backups/{backup_id}/restore'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

restore_data = {
    'truncate': True  # Delete existing files before restore
}

response = requests.post(url, headers=headers, json=restore_data)

if response.status_code == 202:
    print("Backup restoration initiated")
    print("Server will be restored from backup - this may take several minutes")
else:
    print(f"Failed to initiate restore: {response.status_code}")
    if response.content:
        print(f"Error: {response.json()}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$backupId = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0';
$url = "https://your-panel.com/api/client/servers/{$serverId}/backups/{$backupId}/restore";

$restoreData = [
    'truncate' => true  // Delete existing files before restore
];

$client = new GuzzleHttp\Client();

try {
    $response = $client->post($url, [
        'headers' => [
            'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
            'Accept' => 'Application/vnd.pterodactyl.v1+json',
            'Content-Type' => 'application/json'
        ],
        'json' => $restoreData
    ]);
    
    if ($response->getStatusCode() === 202) {
        echo "Backup restoration initiated\n";
        echo "Server will be restored from backup - this may take several minutes\n";
    }
} catch (GuzzleHttp\Exception\ClientException $e) {
    echo "Failed to initiate restore: " . $e->getCode() . "\n";
    echo "Error: " . $e->getResponse()->getBody() . "\n";
}
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
    backupId := "a4962fe6-90c8-4b89-ba62-a5d3b06426c0"
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/backups/%s/restore", serverId, backupId)
    
    restoreData := map[string]interface{}{
        "truncate": true,  // Delete existing files before restore
    }
    
    jsonData, _ := json.Marshal(restoreData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode == 202 {
        fmt.Println("Backup restoration initiated")
        fmt.Println("Server will be restored from backup - this may take several minutes")
    } else {
        fmt.Printf("Failed to initiate restore: %d\n", resp.StatusCode)
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
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

public class BackupManager {
    private static final String API_KEY = "ptlc_YOUR_API_KEY";
    private static final String BASE_URL = "https://your-panel.com/api/client";
    
    public void restoreBackup(String serverId, String backupId) throws Exception {
        String url = BASE_URL + "/servers/" + serverId + "/backups/" + backupId + "/restore";
        
        Map<String, Object> restoreData = new HashMap<>();
        restoreData.put("truncate", true);  // Delete existing files before restore
        
        ObjectMapper mapper = new ObjectMapper();
        String jsonData = mapper.writeValueAsString(restoreData);
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Accept", "Application/vnd.pterodactyl.v1+json")
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonData))
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() == 202) {
            System.out.println("Backup restoration initiated");
            System.out.println("Server will be restored from backup - this may take several minutes");
        } else {
            System.out.println("Failed to initiate restore: " + response.statusCode());
            if (!response.body().isEmpty()) {
                System.out.println("Error: " + response.body());
            }
        }
    }
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class BackupManager
{
    private static readonly string ApiKey = "ptlc_YOUR_API_KEY";
    private static readonly string BaseUrl = "https://your-panel.com/api/client";
    
    public async Task RestoreBackupAsync(string serverId, string backupId)
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        var restoreData = new
        {
            truncate = true  // Delete existing files before restore
        };
        
        string jsonData = JsonConvert.SerializeObject(restoreData);
        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");
        
        string url = $"{BaseUrl}/servers/{serverId}/backups/{backupId}/restore";
        
        try
        {
            HttpResponseMessage response = await client.PostAsync(url, content);
            
            if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
            {
                Console.WriteLine("Backup restoration initiated");
                Console.WriteLine("Server will be restored from backup - this may take several minutes");
            }
            else
            {
                Console.WriteLine($"Failed to initiate restore: {(int)response.StatusCode}");
                string errorContent = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrEmpty(errorContent))
                {
                    Console.WriteLine($"Error: {errorContent}");
                }
            }
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error restoring backup: {ex.Message}");
        }
    }
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'
require 'json'

class BackupManager
  API_KEY = 'ptlc_YOUR_API_KEY'
  BASE_URL = 'https://your-panel.com/api/client'
  
  def self.restore_backup(server_id, backup_id)
    uri = URI("#{BASE_URL}/servers/#{server_id}/backups/#{backup_id}/restore")
    
    restore_data = {
      truncate: true  # Delete existing files before restore
    }
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Post.new(uri)
    request['Authorization'] = "Bearer #{API_KEY}"
    request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
    request['Content-Type'] = 'application/json'
    request.body = restore_data.to_json
    
    response = http.request(request)
    
    if response.code == '202'
      puts "Backup restoration initiated"
      puts "Server will be restored from backup - this may take several minutes"
    else
      puts "Failed to initiate restore: #{response.code}"
      puts "Error: #{response.body}" unless response.body.empty?
    end
  rescue StandardError => e
    puts "Error restoring backup: #{e.message}"
  end
end

# Usage
BackupManager.restore_backup('d3aac109', 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0')
```
</TabItem>

</Tabs>




### Success Response (202)

Returns empty response body with status code 202 (Accepted).

:::warning[Important]
Backup restoration will **permanently replace all server files** with the backup contents. Make sure to create a backup of the current state if needed.
:::

### Restore Process

1. **Server Stop**: Server is automatically stopped if running
2. **File Cleanup**: Existing files are deleted (if truncate=true)
3. **Extraction**: Backup files are extracted to server directory
4. **Completion**: Server is ready to be started

### Error Responses

**Backup Not Ready (400)**
```json
{
  "errors": [
    {
      "code": "BackupNotCompletedException",
      "status": "400",
      "detail": "This backup has not completed yet and cannot be restored."
    }
  ]
}
```

**Server Installing (409)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "409",
      "detail": "Cannot restore backup while server is installing."
    }
  ]
}
```



---

## Toggle Backup Lock

Toggle backup lock status to prevent accidental deletion. This endpoint toggles the current lock state.

**`POST /api/client/servers/{server}/backups/{backup}/lock`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `backup` | string | Backup UUID |

### Example Request

<Tabs>
<TabItem value="curl" label="cURL">
```bash
# Toggle lock status (lock if unlocked, unlock if locked)
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/backups/a4962fe6-90c8-4b89-ba62-a5d3b06426c0/lock" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const serverId = 'd3aac109';
const backupId = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0';

// Toggle backup lock status
async function toggleBackupLock() {
    const response = await fetch(`https://your-panel.com/api/client/servers/${serverId}/backups/${backupId}/lock`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ptlc_YOUR_API_KEY',
            'Accept': 'Application/vnd.pterodactyl.v1+json',
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 204) {
        console.log('Backup lock status toggled successfully');
    } else {
        console.error('Failed to toggle backup lock:', response.status);
    }
}

// Usage
await toggleBackupLock(); // Toggle lock status
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
backup_id = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

def lock_backup():
    """Lock a backup to prevent deletion"""
    url = f'https://your-panel.com/api/client/servers/{server_id}/backups/{backup_id}/lock'
    response = requests.post(url, headers=headers)
    
    if response.status_code == 204:
        print("Backup locked successfully")
    else:
        print(f"Failed to lock backup: {response.status_code}")
        if response.content:
            print(f"Error: {response.json()}")

def unlock_backup():
    """Unlock a backup to allow deletion"""
    url = f'https://your-panel.com/api/client/servers/{server_id}/backups/{backup_id}/unlock'
    response = requests.post(url, headers=headers)
    
    if response.status_code == 204:
        print("Backup unlocked successfully")
    else:
        print(f"Failed to unlock backup: {response.status_code}")
        if response.content:
            print(f"Error: {response.json()}")

# Usage
lock_backup()    # Lock the backup
unlock_backup()  # Unlock the backup
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$backupId = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0';

$client = new GuzzleHttp\Client();
$headers = [
    'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
    'Accept' => 'Application/vnd.pterodactyl.v1+json',
    'Content-Type' => 'application/json'
];

function lockBackup($client, $serverId, $backupId, $headers) {
    $url = "https://your-panel.com/api/client/servers/{$serverId}/backups/{$backupId}/lock";
    
    try {
        $response = $client->post($url, ['headers' => $headers]);
        
        if ($response->getStatusCode() === 204) {
            echo "Backup locked successfully\n";
        }
    } catch (GuzzleHttp\Exception\ClientException $e) {
        echo "Failed to lock backup: " . $e->getCode() . "\n";
        echo "Error: " . $e->getResponse()->getBody() . "\n";
    }
}

function unlockBackup($client, $serverId, $backupId, $headers) {
    $url = "https://your-panel.com/api/client/servers/{$serverId}/backups/{$backupId}/unlock";
    
    try {
        $response = $client->post($url, ['headers' => $headers]);
        
        if ($response->getStatusCode() === 204) {
            echo "Backup unlocked successfully\n";
        }
    } catch (GuzzleHttp\Exception\ClientException $e) {
        echo "Failed to unlock backup: " . $e->getCode() . "\n";
        echo "Error: " . $e->getResponse()->getBody() . "\n";
    }
}

// Usage
lockBackup($client, $serverId, $backupId, $headers);    // Lock the backup
unlockBackup($client, $serverId, $backupId, $headers);  // Unlock the backup
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

func lockBackup(serverId, backupId string) {
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/backups/%s/lock", serverId, backupId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Error locking backup: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode == 204 {
        fmt.Println("Backup locked successfully")
    } else {
        fmt.Printf("Failed to lock backup: %d\n", resp.StatusCode)
    }
}

func unlockBackup(serverId, backupId string) {
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/backups/%s/unlock", serverId, backupId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Error unlocking backup: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode == 204 {
        fmt.Println("Backup unlocked successfully")
    } else {
        fmt.Printf("Failed to unlock backup: %d\n", resp.StatusCode)
    }
}

func main() {
    serverId := "d3aac109"
    backupId := "a4962fe6-90c8-4b89-ba62-a5d3b06426c0"
    
    lockBackup(serverId, backupId)    // Lock the backup
    unlockBackup(serverId, backupId)  // Unlock the backup
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class BackupManager {
    private static final String API_KEY = "ptlc_YOUR_API_KEY";
    private static final String BASE_URL = "https://your-panel.com/api/client";
    
    public void lockBackup(String serverId, String backupId) throws Exception {
        String url = BASE_URL + "/servers/" + serverId + "/backups/" + backupId + "/lock";
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Accept", "Application/vnd.pterodactyl.v1+json")
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.noBody())
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() == 204) {
            System.out.println("Backup locked successfully");
        } else {
            System.out.println("Failed to lock backup: " + response.statusCode());
        }
    }
    
    public void unlockBackup(String serverId, String backupId) throws Exception {
        String url = BASE_URL + "/servers/" + serverId + "/backups/" + backupId + "/unlock";
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Accept", "Application/vnd.pterodactyl.v1+json")
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.noBody())
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() == 204) {
            System.out.println("Backup unlocked successfully");
        } else {
            System.out.println("Failed to unlock backup: " + response.statusCode());
        }
    }
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

public class BackupManager
{
    private static readonly string ApiKey = "ptlc_YOUR_API_KEY";
    private static readonly string BaseUrl = "https://your-panel.com/api/client";
    
    public async Task LockBackupAsync(string serverId, string backupId)
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        string url = $"{BaseUrl}/servers/{serverId}/backups/{backupId}/lock";
        
        try
        {
            HttpResponseMessage response = await client.PostAsync(url, null);
            
            if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
            {
                Console.WriteLine("Backup locked successfully");
            }
            else
            {
                Console.WriteLine($"Failed to lock backup: {(int)response.StatusCode}");
            }
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error locking backup: {ex.Message}");
        }
    }
    
    public async Task UnlockBackupAsync(string serverId, string backupId)
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");
        client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
        
        string url = $"{BaseUrl}/servers/{serverId}/backups/{backupId}/unlock";
        
        try
        {
            HttpResponseMessage response = await client.PostAsync(url, null);
            
            if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
            {
                Console.WriteLine("Backup unlocked successfully");
            }
            else
            {
                Console.WriteLine($"Failed to unlock backup: {(int)response.StatusCode}");
            }
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error unlocking backup: {ex.Message}");
        }
    }
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'
require 'json'

class BackupManager
  API_KEY = 'ptlc_YOUR_API_KEY'
  BASE_URL = 'https://your-panel.com/api/client'
  
  def self.lock_backup(server_id, backup_id)
    uri = URI("#{BASE_URL}/servers/#{server_id}/backups/#{backup_id}/lock")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Post.new(uri)
    request['Authorization'] = "Bearer #{API_KEY}"
    request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
    request['Content-Type'] = 'application/json'
    
    response = http.request(request)
    
    if response.code == '204'
      puts "Backup locked successfully"
    else
      puts "Failed to lock backup: #{response.code}"
      puts "Error: #{response.body}" unless response.body.empty?
    end
  rescue StandardError => e
    puts "Error locking backup: #{e.message}"
  end
  
  def self.unlock_backup(server_id, backup_id)
    uri = URI("#{BASE_URL}/servers/#{server_id}/backups/#{backup_id}/unlock")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Post.new(uri)
    request['Authorization'] = "Bearer #{API_KEY}"
    request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
    request['Content-Type'] = 'application/json'
    
    response = http.request(request)
    
    if response.code == '204'
      puts "Backup unlocked successfully"
    else
      puts "Failed to unlock backup: #{response.code}"
      puts "Error: #{response.body}" unless response.body.empty?
    end
  rescue StandardError => e
    puts "Error unlocking backup: #{e.message}"
  end
end

# Usage
server_id = 'd3aac109'
backup_id = 'a4962fe6-90c8-4b89-ba62-a5d3b06426c0'

BackupManager.lock_backup(server_id, backup_id)    # Lock the backup
BackupManager.unlock_backup(server_id, backup_id)  # Unlock the backup
```
</TabItem>

</Tabs>




### Success Response (204)

Returns empty response body with status code 204.



---

## Backup Best Practices

### Scheduling Backups

- **Regular intervals**: Create backups on a consistent schedule
- **Before updates**: Always backup before major changes
- **Multiple retention**: Keep multiple backup generations
- **Verify integrity**: Periodically test backup restoration

### File Management

- **Exclude unnecessary files**: Use ignored patterns for logs, cache, temporary files
- **Optimize size**: Regularly clean up large unnecessary files
- **Monitor space**: Track backup storage usage and limits

### Security

- **Lock important backups**: Prevent accidental deletion of critical backups
- **Access control**: Limit backup access to authorized users only
- **Encryption**: Ensure backups are encrypted during storage and transfer

### Performance

- **Off-peak hours**: Schedule automated backups during low usage periods
- **Resource monitoring**: Monitor server performance during backup creation
- **Storage location**: Use appropriate storage backends for performance

---

## Backup Limits and Storage

### Default Limits

| Resource | Default Limit | Description |
|----------|---------------|-------------|
| Backups per server | 5-20 | Varies by hosting plan |
| Maximum backup size | 10GB | Per backup file |
| Backup retention | 30-90 days | Automatic cleanup |
| Concurrent backups | 1 | Per server |

### Storage Backends

| Backend | Features | Performance |
|---------|----------|-------------|
| **Local Storage** | Fast creation, limited space | High speed, low retention |
| **S3 Compatible** | Large capacity, longer retention | Moderate speed, high retention |
| **Google Cloud** | Enterprise features, encryption | Moderate speed, enterprise features |

### Backup Lifecycle

1. **Creation**: Backup is queued and processed
2. **Storage**: Backup is stored in configured backend
3. **Retention**: Backup is kept according to retention policy
4. **Cleanup**: Old backups are automatically deleted

---

## Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | `TooManyBackupsException` | Backup limit reached |
| 400 | `BackupNotCompletedException` | Backup not ready for operation |
| 400 | `BackupFailedException` | Backup creation failed |
| 400 | `BackupIsLockedException` | Backup is locked from deletion |
| 401 | `InvalidCredentialsException` | Invalid API key |
| 403 | `InsufficientPermissionsException` | Missing required permissions |
| 404 | `NotFoundHttpException` | Backup not found |
| 409 | `ConflictingServerStateException` | Server state prevents operation |
| 507 | `InsufficientStorageException` | Not enough storage space |

## Required Permissions

Backup operations require specific permissions:

| Permission | Description |
|------------|-------------|
| `backup.read` | View backup list and details |
| `backup.create` | Create new backups |
| `backup.download` | Download backup files |
| `backup.delete` | Delete backups |
| `backup.restore` | Restore from backups |

## Monitoring Backup Status

### Backup States

| State | Description | Actions Available |
|-------|-------------|-------------------|
| `creating` | Backup in progress | View details only |
| `completed` | Backup successful | Download, delete, restore, lock/unlock |
| `failed` | Backup failed | View details, delete |

### Checking Progress

Monitor backup creation progress by polling the backup details endpoint. The `completed_at` field will be null until the backup finishes.

## Source References

**Controller**: [`BackupController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/BackupController.php)  
**Routes**: [`api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php) - Backup endpoints  
**Backup Model**: [`Backup.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Backup.php)  
**Backup Service**: [`BackupService`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Backups/BackupService.php)  
**Wings Integration**: [Wings Server Code](https://github.com/pterodactyl/wings/tree/develop/server) - Backup creation

## Next Steps

- Explore [Scheduled Tasks](./schedules) for automated backup creation
- Check [File Management](./files) for manual file operations
- Review [Server Management](./servers) for server control during backups 
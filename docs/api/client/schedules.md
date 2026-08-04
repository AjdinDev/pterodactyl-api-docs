import CodeTabs from '@site/src/components/CodeTabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Scheduled Tasks

Manage automated server tasks including backups, restarts, command execution, and custom schedules.

## List Schedules

Retrieve all scheduled tasks for a server.

**`GET /api/client/servers/{server}/schedules`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |

### Example Request



<CodeTabs
  endpoint="/api/client/servers/{server}/schedules"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/schedules" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/schedules\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Server schedules:', response.data.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/schedules', headers=headers)
print('Server schedules:', response.json()['data'])`,
    php: `<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\\Client();

$response = $client->get("https://your-panel.com/api/client/servers/{$serverId}/schedules", [
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
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/schedules", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("Server schedules:", result["data"])
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String url = String.format("https://your-panel.com/api/client/servers/%s/schedules", serverId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("Server schedules: " + response.body());`,
    csharp: `using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
var response = await client.GetAsync($"https://your-panel.com/api/client/servers/{serverId}/schedules");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine("Server schedules: " + content);`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/schedules")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)
puts "Server schedules: #{data['data']}"`
  }}
/>










---

## Get Schedule Details

Retrieve detailed information about a specific schedule including all tasks.

**`GET /api/client/servers/{server}/schedules/{schedule}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `schedule` | integer | Schedule ID |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/client/servers/d3aac109/schedules/2" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const scheduleId = 2;

const response = await axios.get(`https://your-panel.com/api/client/servers/${serverId}/schedules/${scheduleId}`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

const schedule = response.data.attributes;
console.log(`Schedule: ${schedule.name}`);
console.log(`Cron: ${schedule.cron.minute} ${schedule.cron.hour} ${schedule.cron.day_of_month} ${schedule.cron.month} ${schedule.cron.day_of_week}`);
console.log(`Active: ${schedule.is_active}`);
console.log(`Tasks: ${schedule.relationships.tasks.data.length}`);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests
from datetime import datetime

server_id = 'd3aac109'
schedule_id = 2
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/schedules/{schedule_id}', 
                       headers=headers)
schedule = response.json()['attributes']

print(f"Schedule: {schedule['name']}")
print(f"Cron: {schedule['cron']['minute']} {schedule['cron']['hour']} {schedule['cron']['day_of_month']} {schedule['cron']['month']} {schedule['cron']['day_of_week']}")
print(f"Active: {schedule['is_active']}")
print(f"Processing: {schedule['is_processing']}")
print(f"Last run: {schedule['last_run_at']}")
print(f"Next run: {schedule['next_run_at']}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$scheduleId = 2;
$client = new GuzzleHttp\Client();

$response = $client->get("https://your-panel.com/api/client/servers/{$serverId}/schedules/{$scheduleId}", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ]
]);

$schedule = json_decode($response->getBody(), true)['attributes'];

echo "Schedule: " . $schedule['name'] . "\n";
echo "Cron: " . implode(' ', $schedule['cron']) . "\n";
echo "Active: " . ($schedule['is_active'] ? 'Yes' : 'No') . "\n";
echo "Processing: " . ($schedule['is_processing'] ? 'Yes' : 'No') . "\n";
echo "Last run: " . $schedule['last_run_at'] . "\n";
echo "Next run: " . $schedule['next_run_at'] . "\n";
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
    scheduleId := 2
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/schedules/%d", serverId, scheduleId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    
    schedule := result["attributes"].(map[string]interface{})
    cron := schedule["cron"].(map[string]interface{})
    
    fmt.Printf("Schedule: %s\n", schedule["name"])
    fmt.Printf("Cron: %s %s %s %s %s\n", 
        cron["minute"], cron["hour"], cron["day_of_month"], cron["month"], cron["day_of_week"])
    fmt.Printf("Active: %t\n", schedule["is_active"])
    fmt.Printf("Processing: %t\n", schedule["is_processing"])
    fmt.Printf("Last run: %s\n", schedule["last_run_at"])
    fmt.Printf("Next run: %s\n", schedule["next_run_at"])
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

String serverId = "d3aac109";
int scheduleId = 2;
String url = String.format("https://your-panel.com/api/client/servers/%s/schedules/%d", serverId, scheduleId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

ObjectMapper mapper = new ObjectMapper();
JsonNode data = mapper.readTree(response.body());
JsonNode schedule = data.get("attributes");
JsonNode cron = schedule.get("cron");

System.out.println("Schedule: " + schedule.get("name").asText());
System.out.printf("Cron: %s %s %s %s %s\n",
    cron.get("minute").asText(),
    cron.get("hour").asText(), 
    cron.get("day_of_month").asText(),
    cron.get("month").asText(),
    cron.get("day_of_week").asText());
System.out.println("Active: " + schedule.get("is_active").asBoolean());
System.out.println("Processing: " + schedule.get("is_processing").asBoolean());
System.out.println("Last run: " + schedule.get("last_run_at").asText());
System.out.println("Next run: " + schedule.get("next_run_at").asText());
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
int scheduleId = 2;
string url = $"https://your-panel.com/api/client/servers/{serverId}/schedules/{scheduleId}";

var response = await client.GetAsync(url);
var content = await response.Content.ReadAsStringAsync();

JObject data = JObject.Parse(content);
var schedule = data["attributes"];
var cron = schedule["cron"];

Console.WriteLine($"Schedule: {schedule["name"]}");
Console.WriteLine($"Cron: {cron["minute"]} {cron["hour"]} {cron["day_of_month"]} {cron["month"]} {cron["day_of_week"]}");
Console.WriteLine($"Active: {schedule["is_active"]}");
Console.WriteLine($"Processing: {schedule["is_processing"]}");
Console.WriteLine($"Last run: {schedule["last_run_at"]}");
Console.WriteLine($"Next run: {schedule["next_run_at"]}");
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'
require 'json'

server_id = 'd3aac109'
schedule_id = 2

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/schedules/#{schedule_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
schedule = JSON.parse(response.body)['attributes']
cron = schedule['cron']

puts "Schedule: #{schedule['name']}"
puts "Cron: #{cron['minute']} #{cron['hour']} #{cron['day_of_month']} #{cron['month']} #{cron['day_of_week']}"
puts "Active: #{schedule['is_active']}"
puts "Processing: #{schedule['is_processing']}"
puts "Last run: #{schedule['last_run_at']}"
puts "Next run: #{schedule['next_run_at']}"
```
</TabItem>

</Tabs>










---

## Create Schedule

Create a new scheduled task for the server.

**`POST /api/client/servers/{server}/schedules`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Schedule name (max 255 characters) |
| `minute` | string | Yes | Cron minute (0-59 or *) |
| `hour` | string | Yes | Cron hour (0-23 or *) |
| `day_of_month` | string | Yes | Cron day of month (1-31 or *) |
| `month` | string | Yes | Cron month (1-12 or *) |
| `day_of_week` | string | Yes | Cron day of week (0-6 or *) |
| `is_active` | boolean | No | Enable schedule immediately (default: true) |
| `only_when_online` | boolean | No | Only run when server is online (default: false) |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/schedules" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Daily Backup",
    "minute": "0",
    "hour": "3",
    "day_of_month": "*",
    "month": "*",
    "day_of_week": "*",
    "is_active": true,
    "only_when_online": false
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const scheduleData = {
  name: 'Daily Backup',
  minute: '0',
  hour: '3',
  day_of_month: '*',
  month: '*',
  day_of_week: '*',
  is_active: true,
  only_when_online: false
};

const response = await axios.post(`https://your-panel.com/api/client/servers/${serverId}/schedules`, scheduleData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

const schedule = response.data.attributes;
console.log(`Created schedule: ${schedule.name} (ID: ${schedule.id})`);
console.log(`Next run: ${schedule.next_run_at}`);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

schedule_data = {
    'name': 'Daily Backup',
    'minute': '0',
    'hour': '3',
    'day_of_month': '*',
    'month': '*',
    'day_of_week': '*',
    'is_active': True,
    'only_when_online': False
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/schedules', 
                        headers=headers, json=schedule_data)
schedule = response.json()['attributes']

print(f"Created schedule: {schedule['name']} (ID: {schedule['id']})")
print(f"Cron expression: {schedule['cron']['minute']} {schedule['cron']['hour']} {schedule['cron']['day_of_month']} {schedule['cron']['month']} {schedule['cron']['day_of_week']}")
print(f"Next run: {schedule['next_run_at']}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\Client();

$scheduleData = [
    'name' => 'Daily Backup',
    'minute' => '0',
    'hour' => '3',
    'day_of_month' => '*',
    'month' => '*',
    'day_of_week' => '*',
    'is_active' => true,
    'only_when_online' => false
];

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/schedules", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $scheduleData
]);

$schedule = json_decode($response->getBody(), true)['attributes'];

echo "Created schedule: " . $schedule['name'] . " (ID: " . $schedule['id'] . ")\n";
echo "Cron: " . implode(' ', $schedule['cron']) . "\n";
echo "Next run: " . $schedule['next_run_at'] . "\n";
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
    scheduleData := map[string]interface{}{
        "name":           "Daily Backup",
        "minute":         "0",
        "hour":           "3",
        "day_of_month":   "*",
        "month":          "*",
        "day_of_week":    "*",
        "is_active":      true,
        "only_when_online": false,
    }
    
    jsonData, _ := json.Marshal(scheduleData)
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/schedules", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    
    schedule := result["attributes"].(map[string]interface{})
    id := schedule["id"].(float64)
    name := schedule["name"].(string)
    nextRun := schedule["next_run_at"].(string)
    
    fmt.Printf("Created schedule: %s (ID: %.0f)\n", name, id)
    fmt.Printf("Next run: %s\n", nextRun)
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
  "name": "Daily Backup",
  "minute": "0",
  "hour": "3",
  "day_of_month": "*",
  "month": "*",
  "day_of_week": "*",
  "is_active": true,
  "only_when_online": false
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(String.format("https://your-panel.com/api/client/servers/%s/schedules", serverId)))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("Schedule created: " + response.body());
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
var scheduleData = new {
    name = "Daily Backup",
    minute = "0",
    hour = "3",
    day_of_month = "*",
    month = "*",
    day_of_week = "*",
    is_active = true,
    only_when_online = false
};

var json = JsonSerializer.Serialize(scheduleData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/schedules", content);
var responseContent = await response.Content.ReadAsStringAsync();

JObject data = JObject.Parse(responseContent);
var schedule = data["attributes"];

Console.WriteLine($"Created schedule: {schedule["name"]} (ID: {schedule["id"]})");
Console.WriteLine($"Next run: {schedule["next_run_at"]}");
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

server_id = 'd3aac109'
schedule_data = {
  name: 'Daily Backup',
  minute: '0',
  hour: '3',
  day_of_month: '*',
  month: '*',
  day_of_week: '*',
  is_active: true,
  only_when_online: false
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/schedules")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = schedule_data.to_json

response = http.request(request)
schedule = JSON.parse(response.body)['attributes']

puts "Created schedule: #{schedule['name']} (ID: #{schedule['id']})"
puts "Next run: #{schedule['next_run_at']}"
```
</TabItem>

</Tabs>








### Success Response

```json
{
  "object": "server_schedule",
  "attributes": {
    "id": 12,
    "name": "Daily Backup",
    "cron": {
      "day_of_week": "*",
      "day_of_month": "*",
      "hour": "3",
      "minute": "0",
      "month": "*"
    },
    "is_active": true,
    "is_processing": false,
    "only_when_online": false,
    "last_run_at": null,
    "next_run_at": "2023-10-21T03:00:00+00:00",
    "created_at": "2023-10-20T16:45:00+00:00",
    "updated_at": "2023-10-20T16:45:00+00:00",
    "relationships": {
      "tasks": {
        "object": "list",
        "data": []
      }
    }
  }
}
```

### Cron Expression Examples

| Schedule | Minute | Hour | Day Month | Month | Day Week | Description |
|----------|--------|------|-----------|-------|----------|-------------|
| Every hour | `0` | `*` | `*` | `*` | `*` | Run at minute 0 of every hour |
| Daily at 3 AM | `0` | `3` | `*` | `*` | `*` | Run daily at 3:00 AM |
| Weekly on Sunday | `0` | `2` | `*` | `*` | `0` | Run Sundays at 2:00 AM |
| Monthly on 1st | `30` | `4` | `1` | `*` | `*` | Run 1st of month at 4:30 AM |
| Every 15 minutes | `*/15` | `*` | `*` | `*` | `*` | Run every 15 minutes |
| Weekdays only | `0` | `8` | `*` | `*` | `1-5` | Run weekdays at 8:00 AM |



### Error Responses

**Schedule Limit Reached (400)**
```json
{
  "errors": [
    {
      "code": "TooManySchedulesException",
      "status": "400",
      "detail": "This server has reached its schedule limit."
    }
  ]
}
```


**Invalid Cron Expression (422)**
```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The provided cron expression is invalid.",
      "meta": {
        "rule": "cron_expression",
        "source_field": "minute"
      }
    }
  ]
}
```










---

## Update Schedule

Modify an existing schedule's configuration.

**`POST /api/client/servers/{server}/schedules/{schedule}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `schedule` | integer | Schedule ID |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Schedule name |
| `minute` | string | No | Cron minute |
| `hour` | string | No | Cron hour |
| `day_of_month` | string | No | Cron day of month |
| `month` | string | No | Cron month |
| `day_of_week` | string | No | Cron day of week |
| `is_active` | boolean | No | Enable/disable schedule |
| `only_when_online` | boolean | No | Only run when server is online |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/schedules/12" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Daily Backup",
    "hour": "2",
    "is_active": false
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const scheduleId = 12;
const updateData = {
  name: 'Updated Daily Backup',
  hour: '2',
  is_active: false
};

const response = await axios.post(`https://your-panel.com/api/client/servers/${serverId}/schedules/${scheduleId}`, updateData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

if (response.status === 204) {
  console.log('Schedule updated successfully');
} else {
  console.error('Failed to update schedule');
}
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
schedule_id = 12
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

update_data = {
    'name': 'Updated Daily Backup',
    'hour': '2',
    'is_active': False
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/schedules/{schedule_id}', 
                         headers=headers, json=update_data)

if response.status_code == 204:
    print("Schedule updated successfully")
else:
    print(f"Failed to update schedule: {response.status_code}")
    if response.content:
        print(f"Error: {response.json()}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$scheduleId = 12;
$client = new GuzzleHttp\Client();

$updateData = [
    'name' => 'Updated Daily Backup',
    'hour' => '2',
    'is_active' => false
];

try {
    $response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/schedules/{$scheduleId}", [
        'headers' => [
            'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
            'Accept' => 'Application/vnd.pterodactyl.v1+json',
            'Content-Type' => 'application/json'
        ],
        'json' => $updateData
    ]);
    
    if ($response->getStatusCode() === 204) {
        echo "Schedule updated successfully\n";
    }
} catch (GuzzleHttp\Exception\ClientException $e) {
    echo "Failed to update schedule: " . $e->getCode() . "\n";
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
    scheduleId := 12
    updateData := map[string]interface{}{
        "name":      "Updated Daily Backup",
        "hour":      "2",
        "is_active": false,
    }
    
    jsonData, _ := json.Marshal(updateData)
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/schedules/%d", serverId, scheduleId)
    
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
    
    if resp.StatusCode == 204 {
        fmt.Println("Schedule updated successfully")
    } else {
        fmt.Printf("Failed to update schedule: %d\n", resp.StatusCode)
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
int scheduleId = 12;
String jsonData = """
{
  "name": "Updated Daily Backup",
  "hour": "2",
  "is_active": false
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(String.format("https://your-panel.com/api/client/servers/%s/schedules/%d", serverId, scheduleId)))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

if (response.statusCode() == 204) {
    System.out.println("Schedule updated successfully");
} else {
    System.out.println("Failed to update schedule: " + response.statusCode());
    if (!response.body().isEmpty()) {
        System.out.println("Error: " + response.body());
    }
}
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
int scheduleId = 12;
var updateData = new {
    name = "Updated Daily Backup",
    hour = "2",
    is_active = false
};

var json = JsonSerializer.Serialize(updateData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

try
{
    var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/schedules/{scheduleId}", content);
    
    if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
    {
        Console.WriteLine("Schedule updated successfully");
    }
    else
    {
        Console.WriteLine($"Failed to update schedule: {(int)response.StatusCode}");
        string errorContent = await response.Content.ReadAsStringAsync();
        if (!string.IsNullOrEmpty(errorContent))
        {
            Console.WriteLine($"Error: {errorContent}");
        }
    }
}
catch (HttpRequestException ex)
{
    Console.WriteLine($"Error updating schedule: {ex.Message}");
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

server_id = 'd3aac109'
schedule_id = 12
update_data = {
  name: 'Updated Daily Backup',
  hour: '2',
  is_active: false
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/schedules/#{schedule_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = update_data.to_json

response = http.request(request)

if response.code == '204'
  puts "Schedule updated successfully"
else
  puts "Failed to update schedule: #{response.code}"
  puts "Error: #{response.body}" unless response.body.empty?
end
```
</TabItem>

</Tabs>








### Success Response (204)

Returns empty response body with status code 204.









---

## Delete Schedule

Permanently delete a schedule and all its tasks.

**`DELETE /api/client/servers/{server}/schedules/{schedule}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `schedule` | integer | Schedule ID |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X DELETE "https://your-panel.com/api/client/servers/d3aac109/schedules/12" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const scheduleId = 12;

const response = await axios.delete(`https://your-panel.com/api/client/servers/${serverId}/schedules/${scheduleId}`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

if (response.status === 204) {
  console.log('Schedule deleted successfully');
} else {
  console.error('Failed to delete schedule');
}
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
schedule_id = 12
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.delete(f'https://your-panel.com/api/client/servers/{server_id}/schedules/{schedule_id}', 
                          headers=headers)

if response.status_code == 204:
    print("Schedule deleted successfully")
else:
    print(f"Failed to delete schedule: {response.status_code}")
    if response.content:
        print(f"Error: {response.json()}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$scheduleId = 12;
$client = new GuzzleHttp\Client();

try {
    $response = $client->delete("https://your-panel.com/api/client/servers/{$serverId}/schedules/{$scheduleId}", [
        'headers' => [
            'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
            'Accept' => 'Application/vnd.pterodactyl.v1+json',
            'Content-Type' => 'application/json'
        ]
    ]);
    
    if ($response->getStatusCode() === 204) {
        echo "Schedule deleted successfully\n";
    }
} catch (GuzzleHttp\Exception\ClientException $e) {
    echo "Failed to delete schedule: " . $e->getCode() . "\n";
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
    scheduleId := 12
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/schedules/%d", serverId, scheduleId)
    
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
        fmt.Println("Schedule deleted successfully")
    } else {
        fmt.Printf("Failed to delete schedule: %d\n", resp.StatusCode)
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
int scheduleId = 12;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(String.format("https://your-panel.com/api/client/servers/%s/schedules/%d", serverId, scheduleId)))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .DELETE()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

if (response.statusCode() == 204) {
    System.out.println("Schedule deleted successfully");
} else {
    System.out.println("Failed to delete schedule: " + response.statusCode());
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
int scheduleId = 12;

try
{
    var response = await client.DeleteAsync($"https://your-panel.com/api/client/servers/{serverId}/schedules/{scheduleId}");
    
    if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
    {
        Console.WriteLine("Schedule deleted successfully");
    }
    else
    {
        Console.WriteLine($"Failed to delete schedule: {(int)response.StatusCode}");
        string errorContent = await response.Content.ReadAsStringAsync();
        if (!string.IsNullOrEmpty(errorContent))
        {
            Console.WriteLine($"Error: {errorContent}");
        }
    }
}
catch (HttpRequestException ex)
{
    Console.WriteLine($"Error deleting schedule: {ex.Message}");
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'
require 'json'

server_id = 'd3aac109'
schedule_id = 12

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/schedules/#{schedule_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)

if response.code == '204'
  puts "Schedule deleted successfully"
else
  puts "Failed to delete schedule: #{response.code}"
  puts "Error: #{response.body}" unless response.body.empty?
end
```
</TabItem>

</Tabs>








### Success Response (204)

Returns empty response body with status code 204.

:::danger[Warning]
Schedule deletion is **permanent and irreversible**. All associated tasks will also be deleted.
:::









---

## Execute Schedule

Manually trigger a schedule to run immediately.

**`POST /api/client/servers/{server}/schedules/{schedule}/execute`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |
| `schedule` | integer | Schedule ID |

### Example Request



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/schedules/2/execute" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const scheduleId = 2;

const response = await axios.post(`https://your-panel.com/api/client/servers/${serverId}/schedules/${scheduleId}/execute`, {}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

if (response.status === 204) {
  console.log('Schedule executed successfully');
} else {
  console.error('Failed to execute schedule');
}
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
schedule_id = 2
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/schedules/{schedule_id}/execute', 
                        headers=headers)

if response.status_code == 204:
    print("Schedule executed successfully")
elif response.status_code == 409:
    print("Schedule is already running")
elif response.status_code == 400:
    print("Cannot execute inactive schedule")
else:
    print(f"Failed to execute schedule: {response.status_code}")
    if response.content:
        print(f"Error: {response.json()}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$scheduleId = 2;
$client = new GuzzleHttp\Client();

try {
    $response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/schedules/{$scheduleId}/execute", [
        'headers' => [
            'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
            'Accept' => 'Application/vnd.pterodactyl.v1+json',
            'Content-Type' => 'application/json'
        ]
    ]);
    
    if ($response->getStatusCode() === 204) {
        echo "Schedule executed successfully\n";
    }
} catch (GuzzleHttp\Exception\ClientException $e) {
    $statusCode = $e->getCode();
    if ($statusCode === 409) {
        echo "Schedule is already running\n";
    } elseif ($statusCode === 400) {
        echo "Cannot execute inactive schedule\n";
    } else {
        echo "Failed to execute schedule: " . $statusCode . "\n";
        echo "Error: " . $e->getResponse()->getBody() . "\n";
    }
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
    scheduleId := 2
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/schedules/%d/execute", serverId, scheduleId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    switch resp.StatusCode {
    case 204:
        fmt.Println("Schedule executed successfully")
    case 409:
        fmt.Println("Schedule is already running")
    case 400:
        fmt.Println("Cannot execute inactive schedule")
    default:
        fmt.Printf("Failed to execute schedule: %d\n", resp.StatusCode)
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
int scheduleId = 2;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(String.format("https://your-panel.com/api/client/servers/%s/schedules/%d/execute", serverId, scheduleId)))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.noBody())
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

switch (response.statusCode()) {
    case 204:
        System.out.println("Schedule executed successfully");
        break;
    case 409:
        System.out.println("Schedule is already running");
        break;
    case 400:
        System.out.println("Cannot execute inactive schedule");
        break;
    default:
        System.out.println("Failed to execute schedule: " + response.statusCode());
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
int scheduleId = 2;

try
{
    var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/schedules/{scheduleId}/execute", new StringContent(""));
    
    switch ((int)response.StatusCode)
    {
        case 204:
            Console.WriteLine("Schedule executed successfully");
            break;
        case 409:
            Console.WriteLine("Schedule is already running");
            break;
        case 400:
            Console.WriteLine("Cannot execute inactive schedule");
            break;
        default:
            Console.WriteLine($"Failed to execute schedule: {(int)response.StatusCode}");
            string errorContent = await response.Content.ReadAsStringAsync();
            if (!string.IsNullOrEmpty(errorContent))
            {
                Console.WriteLine($"Error: {errorContent}");
            }
            break;
    }
}
catch (HttpRequestException ex)
{
    Console.WriteLine($"Error executing schedule: {ex.Message}");
}
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'uri'
require 'json'

server_id = 'd3aac109'
schedule_id = 2

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/schedules/#{schedule_id}/execute")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)

case response.code
when '204'
  puts "Schedule executed successfully"
when '409'
  puts "Schedule is already running"
when '400'
  puts "Cannot execute inactive schedule"
else
  puts "Failed to execute schedule: #{response.code}"
  puts "Error: #{response.body}" unless response.body.empty?
end
```
</TabItem>

</Tabs>








### Success Response (204)

Returns empty response body with status code 204.



### Error Responses

**Schedule Already Running (409)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "409",
      "detail": "This schedule is already running and cannot be executed again."
    }
  ]
}
```


**Schedule Inactive (400)**
```json
{
  "errors": [
    {
      "code": "BadRequestHttpException",
      "status": "400",
      "detail": "Cannot execute an inactive schedule."
    }
  ]
}
```










---

## Schedule Tasks Management

### List Schedule Tasks

**`GET /api/client/servers/{server}/schedules/{schedule}/tasks`**

### Create Schedule Task

**`POST /api/client/servers/{server}/schedules/{schedule}/tasks`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | string | Yes | Task action: `command`, `power`, `backup` |
| `payload` | string | Yes | Action payload (command text, power action, etc.) |
| `time_offset` | integer | Yes | Delay in seconds from previous task |
| `continue_on_failure` | boolean | No | Continue if task fails (default: false) |

#### Task Actions

| Action | Payload | Description |
|--------|---------|-------------|
| `command` | Command string | Execute console command |
| `power` | `start`, `stop`, `restart`, `kill` | Power management action |
| `backup` | Empty string or backup name | Create server backup |

### Example Create Task



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/schedules/12/tasks" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "backup",
    "payload": "Scheduled backup",
    "time_offset": 0,
    "continue_on_failure": false
  }'
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const scheduleId = 12;
const taskData = {
  action: 'backup',
  payload: 'Scheduled backup',
  time_offset: 0,
  continue_on_failure: false
};

const response = await axios.post(`https://your-panel.com/api/client/servers/${serverId}/schedules/${scheduleId}/tasks`, taskData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

const task = response.data.attributes;
console.log(`Created task: ${task.action} (ID: ${task.id})`);
console.log(`Sequence: ${task.sequence_id}, Offset: ${task.time_offset}s`);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

server_id = 'd3aac109'
schedule_id = 12
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

task_data = {
    'action': 'backup',
    'payload': 'Scheduled backup',
    'time_offset': 0,
    'continue_on_failure': False
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/schedules/{schedule_id}/tasks', 
                        headers=headers, json=task_data)
task = response.json()['attributes']

print(f"Created task: {task['action']} (ID: {task['id']})")
print(f"Sequence: {task['sequence_id']}, Offset: {task['time_offset']}s")
print(f"Payload: {task['payload']}")
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$serverId = 'd3aac109';
$scheduleId = 12;
$client = new GuzzleHttp\Client();

$taskData = [
    'action' => 'backup',
    'payload' => 'Scheduled backup',
    'time_offset' => 0,
    'continue_on_failure' => false
];

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/schedules/{$scheduleId}/tasks", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $taskData
]);

$task = json_decode($response->getBody(), true)['attributes'];

echo "Created task: " . $task['action'] . " (ID: " . $task['id'] . ")\n";
echo "Sequence: " . $task['sequence_id'] . ", Offset: " . $task['time_offset'] . "s\n";
echo "Payload: " . $task['payload'] . "\n";
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
    scheduleId := 12
    taskData := map[string]interface{}{
        "action":               "backup",
        "payload":              "Scheduled backup",
        "time_offset":          0,
        "continue_on_failure":  false,
    }
    
    jsonData, _ := json.Marshal(taskData)
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/schedules/%d/tasks", serverId, scheduleId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    
    task := result["attributes"].(map[string]interface{})
    id := task["id"].(float64)
    action := task["action"].(string)
    sequenceId := task["sequence_id"].(float64)
    timeOffset := task["time_offset"].(float64)
    
    fmt.Printf("Created task: %s (ID: %.0f)\n", action, id)
    fmt.Printf("Sequence: %.0f, Offset: %.0fs\n", sequenceId, timeOffset)
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
int scheduleId = 12;
String jsonData = """
{
  "action": "backup",
  "payload": "Scheduled backup",
  "time_offset": 0,
  "continue_on_failure": false
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(String.format("https://your-panel.com/api/client/servers/%s/schedules/%d/tasks", serverId, scheduleId)))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("Schedule task created: " + response.body());
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
int scheduleId = 12;
var taskData = new {
    action = "backup",
    payload = "Scheduled backup",
    time_offset = 0,
    continue_on_failure = false
};

var json = JsonSerializer.Serialize(taskData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/schedules/{scheduleId}/tasks", content);
var responseContent = await response.Content.ReadAsStringAsync();

JObject data = JObject.Parse(responseContent);
var task = data["attributes"];

Console.WriteLine($"Created task: {task["action"]} (ID: {task["id"]})");
Console.WriteLine($"Sequence: {task["sequence_id"]}, Offset: {task["time_offset"]}s");
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

server_id = 'd3aac109'
schedule_id = 12
task_data = {
  action: 'backup',
  payload: 'Scheduled backup',
  time_offset: 0,
  continue_on_failure: false
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/schedules/#{schedule_id}/tasks")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = task_data.to_json

response = http.request(request)
task = JSON.parse(response.body)['attributes']

puts "Created task: #{task['action']} (ID: #{task['id']})"
puts "Sequence: #{task['sequence_id']}, Offset: #{task['time_offset']}s"
puts "Payload: #{task['payload']}"
```
</TabItem>

</Tabs>


### Update Schedule Task

**`PATCH /api/client/servers/{server}/schedules/{schedule}/tasks/{task}`**

### Delete Schedule Task

**`DELETE /api/client/servers/{server}/schedules/{schedule}/tasks/{task}`**









---

## Common Schedule Patterns

### Daily Server Restart

```json
{
  "name": "Daily Restart",
  "minute": "0",
  "hour": "4",
  "day_of_month": "*",
  "month": "*",
  "day_of_week": "*",
  "tasks": [
    {
      "action": "command",
      "payload": "say Server restarting in 30 seconds!",
      "time_offset": 0
    },
    {
      "action": "power",
      "payload": "restart",
      "time_offset": 30
    }
  ]
}
```


### Weekly Backup with Cleanup

```json
{
  "name": "Weekly Maintenance",
  "minute": "0",
  "hour": "3",
  "day_of_month": "*",
  "month": "*",
  "day_of_week": "0",
  "tasks": [
    {
      "action": "command",
      "payload": "save-all",
      "time_offset": 0
    },
    {
      "action": "backup",
      "payload": "Weekly backup",
      "time_offset": 10
    },
    {
      "action": "command",
      "payload": "say Weekly backup completed",
      "time_offset": 300
    }
  ]
}
```


### Hourly Resource Check

```json
{
  "name": "Resource Monitor",
  "minute": "0",
  "hour": "*",
  "day_of_month": "*",
  "month": "*",
  "day_of_week": "*",
  "only_when_online": true,
  "tasks": [
    {
      "action": "command",
      "payload": "memory",
      "time_offset": 0
    },
    {
      "action": "command",
      "payload": "tps",
      "time_offset": 5
    }
  ]
}
```










---

## Schedule Best Practices

### Timing Considerations

- **Avoid peak hours**: Schedule intensive tasks during low usage periods
- **Stagger schedules**: Don't run multiple heavy tasks simultaneously
- **Time zones**: All times are in server timezone (usually UTC)
- **Buffer time**: Add delays between tasks to prevent conflicts

### Task Sequencing

- **Order matters**: Tasks execute in sequence_id order
- **Use time_offset**: Add delays between tasks for proper execution
- **Error handling**: Use continue_on_failure appropriately
- **Test first**: Execute schedules manually before enabling

### Resource Management

- **Monitor performance**: Watch server performance during scheduled tasks
- **Backup timing**: Schedule backups when server load is low
- **Restart coordination**: Notify users before automated restarts
- **Cleanup tasks**: Regular cleanup of logs and temporary files

### Security

- **Limit permissions**: Only grant schedule permissions to trusted users
- **Validate commands**: Ensure scheduled commands are safe
- **Monitor execution**: Review schedule logs regularly
- **Disable unused**: Deactivate schedules that are no longer needed







---

## Schedule Limits and Quotas

### Default Limits

| Resource | Default Limit | Description |
|----------|---------------|-------------|
| Schedules per server | 10-50 | Varies by hosting plan |
| Tasks per schedule | 20 | Maximum tasks in one schedule |
| Execution timeout | 900 seconds | Maximum task execution time |
| Concurrent schedules | 3 | Maximum simultaneous executions |

### Performance Considerations

- **Heavy operations**: Backups and restarts consume significant resources
- **Command execution**: Long-running commands may timeout
- **Schedule overlap**: Prevent schedules from overlapping execution
- **Resource monitoring**: Monitor CPU and memory during scheduled tasks







---

## Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | `TooManySchedulesException` | Schedule limit reached |
| 400 | `BadRequestHttpException` | Invalid schedule configuration |
| 401 | `InvalidCredentialsException` | Invalid API key |
| 403 | `InsufficientPermissionsException` | Missing required permissions |
| 404 | `NotFoundHttpException` | Schedule not found |
| 409 | `ConflictingServerStateException` | Schedule already running |
| 422 | `ValidationException` | Invalid request data |

## Required Permissions

Schedule operations require specific permissions:

| Permission | Description |
|------------|-------------|
| `schedule.read` | View schedules and tasks |
| `schedule.create` | Create new schedules |
| `schedule.update` | Modify existing schedules |
| `schedule.delete` | Delete schedules |
| `schedule.execute` | Manually trigger schedules |

## Monitoring Schedule Execution

### Execution Tracking

Monitor schedule execution through:

- **`last_run_at`**: Last successful execution time
- **`next_run_at`**: Next scheduled execution time
- **`is_processing`**: Current execution status
- **Task logs**: Individual task execution results

### Troubleshooting

Common schedule issues:

- **Cron expression errors**: Validate cron syntax
- **Permission issues**: Ensure proper API permissions
- **Resource conflicts**: Check for overlapping schedules
- **Server state**: Verify server is in correct state for tasks

## Source References

**Controller**: [`ScheduleController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/ScheduleController.php)  
**Task Controller**: [`ScheduleTaskController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/ScheduleTaskController.php)  
**Routes**: [`api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php) - Schedule endpoints  
**Schedule Model**: [`Schedule.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Schedule.php)  
**Task Model**: [`Task.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Task.php)  
**Schedule Service**: [`ScheduleCreationService`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Schedules/ScheduleCreationService.php)

## Next Steps

- Explore [Backup Management](./backups) for automated backup creation
- Check [Server Management](./servers) for power and command operations
- Review [File Management](./files) for scheduled file operations 

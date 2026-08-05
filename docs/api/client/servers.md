# Server Management

import CodeTabs from '@site/src/components/CodeTabs';

Manage your servers including power states, resource monitoring, console access, and command execution.

## Source Code References

All Client API server management endpoints are implemented in the Pterodactyl Panel source code:

- **Client Controller**: [`ClientController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/ClientController.php)
- **Server Controllers**: [`ServerController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/ServerController.php)
- **Power Controller**: [`PowerController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/PowerController.php)
- **Command Controller**: [`CommandController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/CommandController.php)
- **Routes Definition**: [`api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php#L45-L95)
- **Server Model**: [`Server.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Server.php)

## List Servers

Retrieve a list of all servers you have access to.

**`GET /api/client`**

### Source Reference
- **Method**: [`ClientController@index`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/ClientController.php#L47)
- **Route**: [`GET /api/client`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php#L45)

### Example Request

<CodeTabs
  endpoint="/api/client"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const response = await axios.get('https://your-panel.com/api/client', {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);`,
    python: `import requests

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get('https://your-panel.com/api/client', headers=headers)
data = response.json()
print(data)`,
    php: `<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://your-panel.com/api/client');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`,
    go: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://your-panel.com/api/client", nil)
    
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    csharp: `using System;
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var response = await client.GetAsync("https://your-panel.com/api/client");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`,
    ruby: `require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/client')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)
puts data`
  }}
/>

### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "server",
      "attributes": {
        "server_owner": true,
        "identifier": "d3aac109",
        "internal_id": 4,
        "uuid": "d3aac109-e5e0-4331-b03e-3454f7e136dc",
        "name": "Survival Server",
        "description": "A vanilla Minecraft survival server",
        "status": null,
        "is_suspended": false,
        "is_installing": false,
        "is_transferring": false,
        "node": "Node 1",
        "sftp_details": {
          "ip": "node.example.com",
          "port": 2022
        },
        "invocation": "java -Xms128M -Xmx1024M -jar server.jar",
        "docker_image": "ghcr.io/pterodactyl/yolks:java_17",
        "egg_features": [
          "eula",
          "java_version",
          "pid_limit"
        ],
        "feature_limits": {
          "databases": 2,
          "allocations": 1,
          "backups": 10
        },
        "user_permissions": [
          "control.console",
          "control.start",
          "control.stop",
          "control.restart"
        ],
        "limits": {
          "memory": 1024,
          "swap": 0,
          "disk": 5120,
          "io": 500,
          "cpu": 200,
          "threads": null
        },
        "relationships": {
          "allocations": {
            "object": "list",
            "data": [
              {
                "object": "allocation",
                "attributes": {
                  "id": 1,
                  "ip": "45.86.168.218",
                  "ip_alias": null,
                  "port": 25565,
                  "notes": null,
                  "is_default": true
                }
              }
            ]
          },
          "variables": {
            "object": "list",
            "data": [
              {
                "object": "egg_variable",
                "attributes": {
                  "name": "Server Jar File",
                  "description": "The name of the server jarfile to run the server with.",
                  "env_variable": "SERVER_JARFILE",
                  "default_value": "server.jar",
                  "server_value": "server.jar",
                  "is_editable": true,
                  "rules": "required|regex:/^([\\w\\d._-]+)(\\.jar)$/"
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
      "per_page": 25,
      "current_page": 1,
      "total_pages": 1,
      "links": {}
    }
  }
}
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include` | string | Comma-separated list of relationships to include (`allocations`, `variables`) |
| `page` | integer | Page number for pagination |
| `per_page` | integer | Number of servers per page (max 100) |

---

## Get Permissions

Get a list of all available permissions that can be assigned to users.

**`GET /api/client/permissions`**

### Example Request

<CodeTabs
  endpoint="/api/client/permissions"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/permissions" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const response = await axios.get('https://your-panel.com/api/client/permissions', {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Available permissions:', response.data);`,
    python: `import requests

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get('https://your-panel.com/api/client/permissions', headers=headers)
print('Available permissions:', response.json())`,
    php: `<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://your-panel.com/api/client/permissions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`,
    go: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://your-panel.com/api/client/permissions", nil)
    
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client/permissions"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    csharp: `using System;
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var response = await client.GetAsync("https://your-panel.com/api/client/permissions");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`,
    ruby: `require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/client/permissions')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)
puts data`
  }}
/>

### Example Response

```json
{
  "object": "system_permissions",
  "attributes": {
    "permissions": {
      "websocket": {
        "description": "Allows the user to connect to the server websocket, allowing them to view console output and statistics in real-time.",
        "keys": {
          "connect": "Allows a user to connect to the websocket instance for a server to stream the console."
        }
      },
      "control": {
        "description": "Permissions that control a user's ability to control the power state of a server, or send commands.",
        "keys": {
          "console": "Allows a user to send commands to the server instance via the console.",
          "start": "Allows a user to start the server if it is stopped.",
          "stop": "Allows a user to stop a server if it is running.",
          "restart": "Allows a user to perform a server restart. This allows them to start the server if it is offline, or stop and restart the server if it is running."
        }
      },
      "user": {
        "description": "Permissions that allow a user to manage subusers for a server. They will never be able to edit their own account, or assign permissions they do not have themselves.",
        "keys": {
          "create": "Allows a user to create new subusers for the server.",
          "read": "Allows the user to view subusers and their permissions for the server.",
          "update": "Allows a user to modify other subusers.",
          "delete": "Allows a user to delete a subuser from the server."
        }
      },
      "file": {
        "description": "Permissions that control a user's ability to modify the filesystem for a server.",
        "keys": {
          "create": "Allows a user to create additional files and folders via the Panel or direct upload.",
          "read": "Allows a user to view the contents of a directory and read the contents of a file. Users with this permission can also download files.",
          "update": "Allows a user to update the contents of an existing file or directory.",
          "delete": "Allows a user to delete files or directories.",
          "archive": "Allows a user to archive the contents of a directory as well as decompress existing archives on the system.",
          "sftp": "Allows a user to connect to SFTP and manage server files using the other assigned file permissions."
        }
      },
      "backup": {
        "description": "Permissions that control a user's ability to generate and manage server backups.",
        "keys": {
          "create": "Allows a user to create new backups for the server.",
          "read": "Allows a user to view all backups that exist for the server.",
          "delete": "Allows a user to remove backups from the system.",
          "download": "Allows a user to download backups.",
          "restore": "Allows a user to restore a backup for the server."
        }
      },
      "allocation": {
        "description": "Permissions that control a user's ability to modify the port allocations for a server.",
        "keys": {
          "read": "Allows a user to view all allocations currently assigned to a server. Users with any level of access to this server can always view the primary allocation.",
          "create": "Allows a user to assign additional allocations to the server.",
          "update": "Allows a user to change the primary server allocation and attach notes to each allocation.",
          "delete": "Allows a user to delete an allocation from the server."
        }
      },
      "startup": {
        "description": "Permissions that control a user's ability to view and modify the startup parameters for a server.",
        "keys": {
          "read": "Allows a user to view the startup variables for a server.",
          "update": "Allows a user to modify the startup variables for the server.",
          "docker-image": "Allows a user to modify the Docker image used when running the server."
        }
      },
      "database": {
        "description": "Permissions that control a user's ability to manage databases for a server.",
        "keys": {
          "create": "Allows a user to create a new database for the server.",
          "read": "Allows a user to view the database associated with the server.",
          "update": "Allows a user to rotate the password on a database instance. If the user does not have the view_password permission they will not see the updated password.",
          "delete": "Allows a user to remove a database instance from the server.",
          "view_password": "Allows a user to view the password associated with a database instance for the server."
        }
      },
      "schedule": {
        "description": "Permissions that control a user's ability to manage schedules for a server.",
        "keys": {
          "create": "Allows a user to create new schedules for the server.",
          "read": "Allows a user to view schedules for the server.",
          "update": "Allows a user to update schedules and schedule tasks for the server.",
          "delete": "Allows a user to delete schedules for the server."
        }
      },
      "settings": {
        "description": "Permissions that control a user's ability to view and modify server settings.",
        "keys": {
          "rename": "Allows a user to rename the server.",
          "reinstall": "Allows a user to trigger a reinstall of the server."
        }
      },
      "activity": {
        "description": "Permissions that control a user's ability to view activity logs for a server.",
        "keys": {
          "read": "Allows a user to view the activity logs for the server."
        }
      }
    }
  }
}
```

---

## Get Server Details

Retrieve detailed information about a specific server.

**`GET /api/client/servers/{server}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}', headers=headers)
data = response.json()
print(data)`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`,
    go: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    client := &http.Client{}
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s", serverId)
    req, _ := http.NewRequest("GET", url, nil)
    
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`
  }}
/>

### Example Response

```json
{
  "object": "server",
  "attributes": {
    "server_owner": true,
    "identifier": "d3aac109",
    "internal_id": 4,
    "uuid": "d3aac109-e5e0-4331-b03e-3454f7e136dc",
    "name": "Survival Server",
    "node": "Node 1",
    "is_node_under_maintenance": false,
    "sftp_details": {
      "ip": "node.example.com",
      "port": 2022
    },
    "description": "A vanilla Minecraft survival server",
    "limits": {
      "memory": 1024,
      "swap": 0,
      "disk": 5120,
      "io": 500,
      "cpu": 200,
      "threads": null,
      "oom_disabled": true
    },
    "invocation": "java -Xms128M -Xmx1024M -jar server.jar",
    "docker_image": "ghcr.io/pterodactyl/yolks:java_17",
    "egg_features": [
      "eula",
      "java_version",
      "pid_limit"
    ],
    "feature_limits": {
      "databases": 2,
      "allocations": 1,
      "backups": 10
    },
    "status": "running",
    "is_suspended": false,
    "is_installing": false,
    "is_transferring": false,
    "relationships": {
      "allocations": {
        "object": "list",
        "data": []
      },
      "variables": {
        "object": "list",
        "data": []
      }
    }
  },
  "meta": {
    "is_server_owner": true,
    "user_permissions": [
      "*"
    ]
  }
}
```

---

## Server Resource Usage

Get real-time resource usage statistics for a server.

**`GET /api/client/servers/{server}/resources`**

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/resources"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/resources" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/resources\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

const stats = response.data.attributes.resources;
console.log(\`Memory: \${(stats.memory_bytes / 1024 / 1024).toFixed(2)} MB\`);
console.log(\`CPU: \${stats.cpu_absolute.toFixed(2)}%\`);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/resources', headers=headers)
data = response.json()

stats = data['attributes']['resources']
print(f"Memory: {stats['memory_bytes'] / 1024 / 1024:.2f} MB")
print(f"CPU: {stats['cpu_absolute']:.2f}%")`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/resources");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

$stats = $data['attributes']['resources'];
echo "Memory: " . round($stats['memory_bytes'] / 1024 / 1024, 2) . " MB\\n";
echo "CPU: " . round($stats['cpu_absolute'], 2) . "%\\n";
?>`
  }}
/>

### Example Response

```json
{
  "object": "stats",
  "attributes": {
    "current_state": "running",
    "is_suspended": false,
    "resources": {
      "memory_bytes": 671088640,
      "cpu_absolute": 1.522,
      "disk_bytes": 2147483648,
      "network_rx_bytes": 676237,
      "network_tx_bytes": 1097738,
      "uptime": 3600000
    }
  }
}
```

### Resource Fields

| Field | Description |
|-------|-------------|
| `memory_bytes` | Current memory usage in bytes |
| `cpu_absolute` | Current CPU usage percentage |
| `disk_bytes` | Current disk usage in bytes |
| `network_rx_bytes` | Total bytes received |
| `network_tx_bytes` | Total bytes transmitted |
| `uptime` | Server uptime in milliseconds |

---

## Power Management

Control server power states including start, stop, restart, and kill operations.

### Source Reference
- **Controller**: [`PowerController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/PowerController.php)
- **Route**: [`POST /api/client/servers/{server}/power`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php#L75)
- **Service**: [`DaemonPowerRepository`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Repositories/Wings/DaemonPowerRepository.php)

### Start Server

**`POST /api/client/servers/{server}/power`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `signal` | string | Yes | Power action: `start`, `stop`, `restart`, `kill` |

#### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/power"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/power" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "signal": "restart"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/power\`, {
  signal: 'restart'
}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Server restart initiated');`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

data = {
    'signal': 'restart'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/power', 
                        json=data, headers=headers)

if response.status_code == 204:
    print('Server restart initiated')`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/power");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['signal' => 'restart']));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 204) {
    echo "Server restart initiated\\n";
}
?>`
  }}
/>

#### Success Response (204)

Returns empty response body with status code 204.

#### Power Actions

| Action | Description |
|--------|-------------|
| `start` | Start the server |
| `stop` | Gracefully stop the server |
| `restart` | Restart the server |
| `kill` | Force kill the server process |

#### Error Responses

**Server Already Running (400)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "400",
      "detail": "Cannot start server, server is already running."
    }
  ]
}
```

**Server Installing (400)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "400",
      "detail": "Cannot perform power action, server is currently installing."
    }
  ]
}
```

---

## Console Access

### WebSocket Console Connection

Connect to the server console via WebSocket for real-time input/output.

**`GET /api/client/servers/{server}/websocket`**

This endpoint returns authentication details for establishing a WebSocket connection.

#### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/websocket"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/websocket" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');
const WebSocket = require('ws');

// Get WebSocket credentials
const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/websocket\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

const { token, socket } = response.data.data;

// Connect to WebSocket
const ws = new WebSocket(socket, {
  headers: {
    'Origin': 'https://your-panel.com'
  }
});

ws.on('open', () => {
  // Authenticate
  ws.send(JSON.stringify({
    event: 'auth',
    args: [token]
  }));
});

ws.on('message', (data) => {
  const message = JSON.parse(data);
  console.log('Console:', message);
});`,
    python: `import requests
import websocket
import json

# Get WebSocket credentials
server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/websocket', headers=headers)
data = response.json()

token = data['data']['token']
socket_url = data['data']['socket']

# Connect to WebSocket
def on_open(ws):
    auth_message = json.dumps({
        'event': 'auth',
        'args': [token]
    })
    ws.send(auth_message)

def on_message(ws, message):
    data = json.loads(message)
    print('Console:', data)

ws = websocket.WebSocketApp(socket_url,
                          on_open=on_open,
                          on_message=on_message)
ws.run_forever()`
  }}
/>

#### Example Response

```json
{
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "socket": "wss://node.example.com:8080/api/servers/d3aac109-e5e0-4331-b03e-3454f7e136dc/ws"
  }
}
```

#### WebSocket Connection

Use the returned token and socket URL to establish a WebSocket connection:

```javascript
const socket = new WebSocket('wss://node.example.com:8080/api/servers/d3aac109-e5e0-4331-b03e-3454f7e136dc/ws', {
  headers: {
    'Origin': 'https://your-panel.com'
  }
});

socket.addEventListener('open', function (event) {
    // Authenticate with the WebSocket
    socket.send(JSON.stringify({
        event: 'auth',
        args: ['eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...']
    }));
});

socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    console.log('Console output:', data);
});
```

#### WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `auth` | Send | Authenticate with the token |
| `send command` | Send | Execute a command on the server |
| `set state` | Send | Request server state updates |
| `console output` | Receive | Real-time console output |
| `status` | Receive | Server status changes |
| `stats` | Receive | Resource usage updates |

---

## Send Console Command

Execute a command on the server console.

**`POST /api/client/servers/{server}/command`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `command` | string | Yes | Command to execute on the server |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/command"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/command" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "command": "say Hello from the API!"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const command = 'say Hello from the API!';

const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/command\`, {
  command: command
}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Command executed successfully');`,
    python: `import requests

server_id = 'd3aac109'
command = 'say Hello from the API!'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

data = {
    'command': command
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/command', 
                        json=data, headers=headers)

if response.status_code == 204:
    print('Command executed successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$command = 'say Hello from the API!';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/command");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['command' => $command]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 204) {
    echo "Command executed successfully\\n";
}
?>`
  }}
/>

### Success Response (204)

Returns empty response body with status code 204.

### Error Responses

**Server Offline (400)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "400",
      "detail": "Cannot send command to stopped server."
    }
  ]
}
```

**Missing Permissions (403)**
```json
{
  "errors": [
    {
      "code": "InsufficientPermissionsException",
      "status": "403",
      "detail": "This action requires the 'control.console' permission."
    }
  ]
}
```

---

## Server Settings

### Update Server Details

Update basic server information like name and description.

**`POST /api/client/servers/{server}/settings/rename`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | New server name (max 255 characters) |
| `description` | string | No | New server description (max 500 characters) |

#### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/settings/rename" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Server Name",
    "description": "Updated server description"
  }'
```

#### Success Response (204)

Returns empty response body with status code 204.

### Reinstall Server

Trigger a server reinstallation with a fresh copy of the egg.

**`POST /api/client/servers/{server}/settings/reinstall`**

#### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/settings/reinstall" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```

#### Success Response (202)

Returns empty response body with status code 202.

:::warning[Important]
Reinstalling a server will just **rerun the install script** with all files still on the server. There is also no endpoint to delete all files.
:::

### Update Docker Image

Change the Docker image used by the server.

**`PUT /api/client/servers/{server}/settings/docker-image`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `docker_image` | string | Yes | New Docker image to use for the server |

#### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/settings/docker-image"
  method="PUT"
  examples={{
    curl: `curl -X PUT "https://your-panel.com/api/client/servers/d3aac109/settings/docker-image" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "docker_image": "ghcr.io/pterodactyl/yolks:java_17"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.put(\`https://your-panel.com/api/client/servers/\${serverId}/settings/docker-image\`, {
  docker_image: 'ghcr.io/pterodactyl/yolks:java_17'
}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Docker image updated successfully');`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

data = {
    'docker_image': 'ghcr.io/pterodactyl/yolks:java_17'
}

response = requests.put(f'https://your-panel.com/api/client/servers/{server_id}/settings/docker-image', 
                       json=data, headers=headers)

if response.status_code == 204:
    print('Docker image updated successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/settings/docker-image");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'docker_image' => 'ghcr.io/pterodactyl/yolks:java_17'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 204) {
    echo "Docker image updated successfully\\n";
}
?>`
  }}
/>

#### Success Response (204)

Returns empty response body with status code 204.

#### Error Responses

**Invalid Docker Image (422)**
```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The selected docker image is invalid.",
      "meta": {
        "rule": "in"
      }
    }
  ]
}
```

**Missing Permissions (403)**
```json
{
  "errors": [
    {
      "code": "InsufficientPermissionsException",
      "status": "403",
      "detail": "This action requires the 'startup.docker-image' permission."
    }
  ]
}
```

:::info[Available Images]
The available Docker images are defined by the server's egg configuration. Use the startup configuration endpoint to see available images in the `meta.docker_images` field.
:::

---

## Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | `ConflictingServerStateException` | Server is in a state that prevents the action |
| 401 | `InvalidCredentialsException` | Invalid API key |
| 403 | `InsufficientPermissionsException` | Missing required permissions |
| 404 | `NotFoundHttpException` | Server not found or no access |
| 409 | `TooManyRequestsHttpException` | Rate limit exceeded |

## Required Permissions

Different server actions require specific permissions:

| Permission | Description |
|------------|-------------|
| `control.console` | View console output and send commands |
| `control.start` | Start the server |
| `control.stop` | Stop the server |
| `control.restart` | Restart the server |
| `control.kill` | Force kill server process |
| `admin.websocket` | Access WebSocket console |
| `settings.rename` | Update server name and description |
| `settings.reinstall` | Reinstall the server |
| `startup.read` | View startup configuration and variables |
| `startup.update` | Modify startup variables |
| `startup.docker-image` | Change Docker image |

## Startup Configuration

Retrieve and update server startup configuration including environment variables.

### Get Startup Configuration

Retrieve the current startup configuration and environment variables for a server.

**`GET /api/client/servers/{server}/startup`**

#### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/startup"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/startup" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/startup\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Startup config:', response.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/startup', headers=headers)
data = response.json()
print('Startup config:', data)`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/startup");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`
  }}
/>

#### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "egg_variable",
      "attributes": {
        "name": "Server Jar File",
        "description": "The name of the server jarfile to run the server with.",
        "env_variable": "SERVER_JARFILE",
        "default_value": "server.jar",
        "server_value": "server.jar",
        "is_editable": true,
        "rules": "required|regex:/^([\\w\\d._-]+)(\\.jar)$/"
      }
    },
    {
      "object": "egg_variable",
      "attributes": {
        "name": "Server Version",
        "description": "The version of Minecraft to download and use.",
        "env_variable": "MINECRAFT_VERSION",
        "default_value": "latest",
        "server_value": "1.19.4",
        "is_editable": true,
        "rules": "required|string|between:1,20"
      }
    }
  ],
  "meta": {
    "startup_command": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
    "raw_startup_command": "java -Xms128M -Xmx1024M -jar server.jar",
    "docker_images": {
      "ghcr.io/pterodactyl/yolks:java_17": "Java 17",
      "ghcr.io/pterodactyl/yolks:java_11": "Java 11",
      "ghcr.io/pterodactyl/yolks:java_8": "Java 8"
    }
  }
}
```

### Update Startup Variable

Update a specific environment variable for the server startup configuration.

**`PUT /api/client/servers/{server}/startup/variable`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `key` | string | Yes | Environment variable name |
| `value` | string | Yes | New value for the variable |

#### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/startup/variable"
  method="PUT"
  examples={{
    curl: `curl -X PUT "https://your-panel.com/api/client/servers/d3aac109/startup/variable" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "MINECRAFT_VERSION",
    "value": "1.20.1"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.put(\`https://your-panel.com/api/client/servers/\${serverId}/startup/variable\`, {
  key: 'MINECRAFT_VERSION',
  value: '1.20.1'
}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Variable updated:', response.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

data = {
    'key': 'MINECRAFT_VERSION',
    'value': '1.20.1'
}

response = requests.put(f'https://your-panel.com/api/client/servers/{server_id}/startup/variable', 
                       json=data, headers=headers)
result = response.json()
print('Variable updated:', result)`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/startup/variable");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'key' => 'MINECRAFT_VERSION',
    'value' => '1.20.1'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`
  }}
/>

#### Example Response

```json
{
  "object": "egg_variable",
  "attributes": {
    "name": "Server Version",
    "description": "The version of Minecraft to download and use.",
    "env_variable": "MINECRAFT_VERSION",
    "default_value": "latest",
    "server_value": "1.20.1",
    "is_editable": true,
    "rules": "required|string|between:1,20"
  }
}
```

#### Variable Field Descriptions

| Field | Description |
|-------|-------------|
| `name` | Human-readable variable name |
| `description` | Description of what the variable controls |
| `env_variable` | Environment variable name used in startup command |
| `default_value` | Default value defined by the egg |
| `server_value` | Current value set for this server |
| `is_editable` | Whether the variable can be modified by users |
| `rules` | Validation rules for the variable value |

#### Error Responses

**Variable Not Found (422)**
```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The selected key is invalid.",
      "meta": {
        "rule": "in"
      }
    }
  ]
}
```

**Invalid Value (422)**
```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The value field must be between 1 and 20 characters.",
      "meta": {
        "rule": "between"
      }
    }
  ]
}
```

**Variable Not Editable (400)**
```json
{
  "errors": [
    {
      "code": "BadRequestException",
      "status": "400",
      "detail": "This environment variable is not editable."
    }
  ]
}
```

---

## Server Activity

### Get Server Activity Logs

Retrieve server activity logs including recent events and actions.

**`GET /api/client/servers/{server}/activity`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/activity"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/activity" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/activity\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Server activity:', response.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/activity', headers=headers)
print('Server activity:', response.json())`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/activity");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`,
    go: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    client := &http.Client{}
    req, _ := http.NewRequest("GET", fmt.Sprintf("https://your-panel.com/api/client/servers/%s/activity", serverId), nil)
    
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client/servers/" + serverId + "/activity"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    csharp: `using System;
using System.Net.Http;
using System.Threading.Tasks;

var serverId = "d3aac109";
var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var response = await client.GetAsync($"https://your-panel.com/api/client/servers/{serverId}/activity");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/activity")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)
puts data`
  }}
/>

### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "activity_log",
      "attributes": {
        "id": "3c5608f7-9798-4db6-becd-f3c4b63e1a7f",
        "batch": null,
        "event": "server:power.start",
        "is_api": false,
        "ip": "192.168.1.100",
        "description": "Server was started",
        "properties": {
          "action": "start",
          "username": "admin"
        },
        "has_additional_metadata": true,
        "timestamp": "2024-01-15T10:30:00.000000Z"
      }
    },
    {
      "object": "activity_log",
      "attributes": {
        "id": "2a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
        "batch": null,
        "event": "server:backup.complete",
        "is_api": true,
        "ip": "192.168.1.100",
        "description": "Backup completed successfully",
        "properties": {
          "backup_uuid": "550e8400-e29b-41d4-a716-446655440000",
          "name": "Daily Backup"
        },
        "has_additional_metadata": false,
        "timestamp": "2024-01-15T09:00:00.000000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 125,
      "count": 2,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 3,
      "links": {}
    }
  }
}
```

---

## Server Settings

### Rename Server

Change the display name of a server.

**`POST /api/client/servers/{server}/settings/rename`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | New server name (1-255 characters) |
| `description` | string | No | Server description |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/settings/rename"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/settings/rename" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production Server",
    "description": "Main production Minecraft server"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const renameData = {
  name: 'Production Server',
  description: 'Main production Minecraft server'
};

const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/settings/rename\`, renameData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Server renamed successfully');`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

rename_data = {
    'name': 'Production Server',
    'description': 'Main production Minecraft server'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/settings/rename', 
                        headers=headers, json=rename_data)
print('Server renamed successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\\Client();

$renameData = [
    'name' => 'Production Server',
    'description' => 'Main production Minecraft server'
];

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/settings/rename", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $renameData
]);

echo "Server renamed successfully";
?>`,
    go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    renameData := map[string]interface{}{
        "name": "Production Server",
        "description": "Main production Minecraft server",
    }
    
    jsonData, _ := json.Marshal(renameData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", fmt.Sprintf("https://your-panel.com/api/client/servers/%s/settings/rename", serverId), bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    fmt.Println("Server renamed successfully")
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String jsonData = """
{
  "name": "Production Server",
  "description": "Main production Minecraft server"
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client/servers/" + serverId + "/settings/rename"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println("Server renamed successfully");`,
    csharp: `using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var serverId = "d3aac109";
var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var renameData = new {
    name = "Production Server",
    description = "Main production Minecraft server"
};

var json = JsonSerializer.Serialize(renameData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/settings/rename", content);
Console.WriteLine("Server renamed successfully");`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
rename_data = {
  name: 'Production Server',
  description: 'Main production Minecraft server'
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/settings/rename")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = rename_data.to_json

response = http.request(request)
puts "Server renamed successfully"`
  }}
/>

### Success Response (204)

Returns empty response body with status code 204.

### Reinstall Server

Trigger a reinstallation of the server. This will stop the server and re-run the installation script.

**`POST /api/client/servers/{server}/settings/reinstall`**

:::warning[Important]
Reinstalling a server will just **rerun the install script** with all files still on the server. There is also no endpoint to delete all files.
:::

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/settings/reinstall"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/settings/reinstall" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/settings/reinstall\`, {}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Server reinstall initiated');`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/settings/reinstall', 
                        headers=headers)
print('Server reinstall initiated')`,
    php: `<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\\Client();

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/settings/reinstall", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ]
]);

echo "Server reinstall initiated";
?>`,
    go: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    client := &http.Client{}
    req, _ := http.NewRequest("POST", fmt.Sprintf("https://your-panel.com/api/client/servers/%s/settings/reinstall", serverId), nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    fmt.Println("Server reinstall initiated")
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client/servers/" + serverId + "/settings/reinstall"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.noBody())
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println("Server reinstall initiated");`,
    csharp: `using System.Net.Http;
using System.Threading.Tasks;

var serverId = "d3aac109";
var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/settings/reinstall", null);
Console.WriteLine("Server reinstall initiated");`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/settings/reinstall")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
puts "Server reinstall initiated"`
  }}
/>

### Success Response (202)

Returns empty response body with status code 202 (Accepted).

---

## Next Steps

- Explore [File Management](./files) for server file operations
- Check [Database Management](./databases) for server databases
- Review [Network Management](./network) for allocation management 

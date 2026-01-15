---
sidebar_position: 9
title: WebSocket API - Real-time Server Communication
description: Complete WebSocket API documentation for real-time server communication, including console access, log streaming, and power management
keywords: [pterodactyl, websocket api, real-time communication, server console, live logs, power management]
---

import CodeTabs from '@site/src/components/CodeTabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# WebSocket API - Real-time Server Communication

The WebSocket API enables real-time communication with Pterodactyl servers, providing live console access, log streaming, and power state monitoring. This API is essential for building interactive server management interfaces.

:::warning Client API Access Only
WebSocket connections use Client API authentication and provide access only to servers the authenticated user owns or has permissions for. Users must have the `websocket.connect` permission to obtain tokens.
:::

## Overview

The WebSocket API allows you to:

- **Console Access**: Send commands and receive output in real-time
- **Log Streaming**: Receive live server logs as they're generated
- **Power Management**: Monitor server power state changes
- **Resource Monitoring**: Track server resource usage in real-time
- **File System Events**: Monitor file changes and uploads

## Authentication

WebSocket connections require a JWT token obtained through the Client API. The token provides temporary access with a **10-minute expiration** and must be refreshed periodically.

### Token Details

- **Expiration**: 10 minutes from generation
- **Signing Algorithm**: SHA256 with node-specific keys
- **Claims**: Server UUID, user permissions, user identification
- **Security**: Time-limited, permission-scoped access
- **Required Permission**: `websocket.connect`

### Get WebSocket Token

First, obtain a WebSocket token for your server:

```http
GET /api/client/servers/{server}/websocket
```

**Example Request**



<Tabs>
<TabItem value="curl" label="cURL">
```bash
curl "https://your-panel.com/api/client/servers/d3aac109/websocket" \
  -H "Authorization: Bearer ptlc_YOUR_CLIENT_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json"
```
</TabItem>

<TabItem value="javascript" label="JavaScript">
```javascript
const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(`https://your-panel.com/api/client/servers/${serverId}/websocket`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_CLIENT_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  }
});

const { token, socket } = response.data.data;
console.log('WebSocket URL:', socket);
console.log('JWT Token:', token);
```
</TabItem>

<TabItem value="python" label="Python">
```python
import requests

headers = {
    'Authorization': 'Bearer ptlc_YOUR_CLIENT_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

server_id = 'd3aac109'
response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/websocket', 
                       headers=headers)

data = response.json()['data']
socket_url = data['socket']
jwt_token = data['token']

print(f'WebSocket URL: {socket_url}')
print(f'JWT Token: {jwt_token}')
```
</TabItem>

<TabItem value="php" label="PHP">
```php
<?php
$client = new GuzzleHttp\Client();
$serverId = 'd3aac109';

$response = $client->get("https://your-panel.com/api/client/servers/{$serverId}/websocket", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_CLIENT_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json'
    ]
]);

$data = json_decode($response->getBody(), true)['data'];
$socketUrl = $data['socket'];
$jwtToken = $data['token'];

echo "WebSocket URL: {$socketUrl}\n";
echo "JWT Token: {$jwtToken}\n";
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

type WebSocketResponse struct {
    Data struct {
        Token  string `json:"token"`
        Socket string `json:"socket"`
    } `json:"data"`
}

func main() {
    serverId := "d3aac109"
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/websocket", serverId)
    
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_CLIENT_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result WebSocketResponse
    json.NewDecoder(resp.Body).Decode(&result)
    
    fmt.Printf("WebSocket URL: %s\n", result.Data.Socket)
    fmt.Printf("JWT Token: %s\n", result.Data.Token)
}
```
</TabItem>

<TabItem value="java" label="Java">
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import com.google.gson.Gson;

class WebSocketData {
    String token;
    String socket;
}

class WebSocketResponse {
    WebSocketData data;
}

String serverId = "d3aac109";
String url = String.format("https://your-panel.com/api/client/servers/%s/websocket", serverId);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("Authorization", "Bearer ptlc_YOUR_CLIENT_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
WebSocketResponse wsResponse = new Gson().fromJson(response.body(), WebSocketResponse.class);

System.out.println("WebSocket URL: " + wsResponse.data.socket);
System.out.println("JWT Token: " + wsResponse.data.token);
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

public class WebSocketData
{
    public string token { get; set; }
    public string socket { get; set; }
}

public class WebSocketResponse
{
    public WebSocketData data { get; set; }
}

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_CLIENT_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

string serverId = "d3aac109";
var response = await client.GetAsync($"https://your-panel.com/api/client/servers/{serverId}/websocket");
var content = await response.Content.ReadAsStringAsync();

var wsResponse = JsonSerializer.Deserialize<WebSocketResponse>(content);
Console.WriteLine($"WebSocket URL: {wsResponse.data.socket}");
Console.WriteLine($"JWT Token: {wsResponse.data.token}");
```
</TabItem>

<TabItem value="ruby" label="Ruby">
```ruby
require 'net/http'
require 'json'

server_id = 'd3aac109'
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/websocket")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_CLIENT_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
data = JSON.parse(response.body)['data']

puts "WebSocket URL: #{data['socket']}"
puts "JWT Token: #{data['token']}"
```
</TabItem>

</Tabs>




### Example Response

```json
{
  "object": "websocket_token",
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "socket": "wss://node1.example.com:8080/api/servers/d3aac109-e5e0-4331-b03e-3454f7e02bbe/ws"
  }
}
```

## WebSocket Connection

### Establishing Connection

Connect to the WebSocket URL using the JWT token for authentication:

**JavaScript (Browser)**
```javascript
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...';
const socketUrl = 'wss://node1.example.com:8080/api/servers/d3aac109-e5e0-4331-b03e-3454f7e02bbe/ws';

const socket = new WebSocket(socketUrl, [], {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Origin': 'https://your-panel.com'
  }
});

socket.onopen = function(event) {
  console.log('WebSocket connection established');
  
  // Authenticate with the server
  socket.send(JSON.stringify({
    event: 'auth',
    args: [token]
  }));
};

socket.onmessage = function(event) {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};

socket.onclose = function(event) {
  console.log('WebSocket connection closed:', event.code, event.reason);
};

socket.onerror = function(error) {
  console.error('WebSocket error:', error);
};
```

**Node.js (with ws library)**
```javascript
const WebSocket = require('ws');

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...';
const socketUrl = 'wss://node1.example.com:8080/api/servers/d3aac109-e5e0-4331-b03e-3454f7e02bbe/ws';

const socket = new WebSocket(socketUrl, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Origin': 'https://your-panel.com'
  }
});

socket.on('open', function() {
  console.log('WebSocket connection established');
  
  // Authenticate with the server
  socket.send(JSON.stringify({
    event: 'auth',
    args: [token]
  }));
});

socket.on('message', function(data) {
  const message = JSON.parse(data.toString());
  console.log('Received:', message);
});

socket.on('close', function(code, reason) {
  console.log('WebSocket connection closed:', code, reason.toString());
});

socket.on('error', function(error) {
  console.error('WebSocket error:', error);
});
```

**Python (with websockets library)**
```python
import asyncio
import websockets
import json

async def connect_websocket():
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
    socket_url = 'wss://node1.example.com:8080/api/servers/d3aac109-e5e0-4331-b03e-3454f7e02bbe/ws'
    
    extra_headers = {
        'Authorization': f'Bearer {token}'
    }
    
    async with websockets.connect(socket_url, extra_headers=extra_headers) as websocket:
        print('WebSocket connection established')
        
        # Authenticate with the server
        auth_message = {
            'event': 'auth',
            'args': [token]
        }
        await websocket.send(json.dumps(auth_message))
        
        # Listen for messages
        async for message in websocket:
            data = json.loads(message)
            print('Received:', data)

# Run the WebSocket client
asyncio.run(connect_websocket())
```

**PHP (with ReactPHP)**
```php
<?php
require 'vendor/autoload.php';

use Ratchet\Client\WebSocket;
use Ratchet\Client\Connector;

$connector = new Connector();
$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...';
$socketUrl = 'wss://node1.example.com:8080/api/servers/d3aac109-e5e0-4331-b03e-3454f7e02bbe/ws';

$connector($socketUrl, ['Sec-WebSocket-Protocol' => 'pterodactyl'], [
    'Authorization' => "Bearer {$token}"
])
->then(function (WebSocket $conn) use ($token) {
    echo "WebSocket connection established\n";
    
    // Authenticate with the server
    $authMessage = json_encode([
        'event' => 'auth',
        'args' => [$token]
    ]);
    $conn->send($authMessage);
    
    $conn->on('message', function ($msg) {
        $data = json_decode($msg->getPayload(), true);
        echo "Received: " . print_r($data, true) . "\n";
    });
    
    $conn->on('close', function ($code = null, $reason = null) {
        echo "Connection closed ({$code} - {$reason})\n";
    });
}, function (\Exception $e) {
    echo "Could not connect: {$e->getMessage()}\n";
});
?>
```

**Go (with gorilla/websocket)**
```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "github.com/gorilla/websocket"
)

type Message struct {
    Event string   `json:"event"`
    Args  []string `json:"args"`
}

func main() {
    token := "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
    socketURL := "wss://node1.example.com:8080/api/servers/d3aac109-e5e0-4331-b03e-3454f7e02bbe/ws"
    
    headers := http.Header{}
    headers.Add("Authorization", "Bearer "+token)
    
    conn, _, err := websocket.DefaultDialer.Dial(socketURL, headers)
    if err != nil {
        fmt.Printf("Error connecting: %v\n", err)
        return
    }
    defer conn.Close()
    
    fmt.Println("WebSocket connection established")
    
    // Authenticate with the server
    authMessage := Message{
        Event: "auth",
        Args:  []string{token},
    }
    
    if err := conn.WriteJSON(authMessage); err != nil {
        fmt.Printf("Error sending auth: %v\n", err)
        return
    }
    
    // Listen for messages
    for {
        var message map[string]interface{}
        err := conn.ReadJSON(&message)
        if err != nil {
            fmt.Printf("Error reading message: %v\n", err)
            break
        }
        
        fmt.Printf("Received: %+v\n", message)
    }
}
```

## Message Format

All WebSocket messages use JSON format with the following structure:

```json
{
  "event": "event_name",
  "args": ["argument1", "argument2"]
}
```

### Common Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `auth` | Client → Server | Authenticate with JWT token |
| `send command` | Client → Server | Send console command |
| `set state` | Client → Server | Change server power state |
| `console output` | Server → Client | Console output/logs |
| `install logs` | Server → Client | Sends the installation logs |
| `transfer logs` | Server → Client | Sends the transfer logs |
| `status` | Server → Client | Server status updates |
| `stats` | Server → Client | Resource usage statistics |
| `jwt error` | Server → Client | Authentication error |
| `daemon message` | Server → Client | System messages |

## Console Access

### Sending Commands

Send commands to the server console:

**Example: Start Server**
```javascript
socket.send(JSON.stringify({
  event: 'send command',
  args: ['start']
}));
```

**Example: Execute Game Command**
```javascript
socket.send(JSON.stringify({
  event: 'send command',
  args: ['say Hello, players!']
}));
```

**Example: Stop Server**
```javascript
socket.send(JSON.stringify({
  event: 'send command',
  args: ['stop']
}));
```

### Receiving Console Output

Listen for console output and logs:

```javascript
socket.onmessage = function(event) {
  const message = JSON.parse(event.data);
  
  switch(message.event) {
    case 'console output':
      console.log('Console:', message.args[0]);
      break;
    case 'status':
      console.log('Status changed:', message.args[0]);
      break;
    case 'stats':
      const stats = JSON.parse(message.args[0]);
      console.log('Resource usage:', stats);
      break;
  }
};
```

### Example Console Output

```json
{
  "event": "console output",
  "args": ["[10:30:45] [Server thread/INFO]: Starting minecraft server version 1.19.4"]
}
```

## Power Management

### Power State Commands

Change server power state through WebSocket:

**Start Server**
```javascript
socket.send(JSON.stringify({
  event: 'set state',
  args: ['start']
}));
```

**Stop Server**
```javascript
socket.send(JSON.stringify({
  event: 'set state',
  args: ['stop']
}));
```

**Restart Server**
```javascript
socket.send(JSON.stringify({
  event: 'set state',
  args: ['restart']
}));
```

**Kill Server (Force Stop)**
```javascript
socket.send(JSON.stringify({
  event: 'set state',
  args: ['kill']
}));
```

### Power State Events

Monitor server power state changes:

```javascript
socket.onmessage = function(event) {
  const message = JSON.parse(event.data);
  
  if (message.event === 'status') {
    const status = message.args[0];
    
    switch(status) {
      case 'running':
        console.log('Server is now running');
        break;
      case 'starting':
        console.log('Server is starting...');
        break;
      case 'stopping':
        console.log('Server is stopping...');
        break;
      case 'offline':
        console.log('Server is offline');
        break;
    }
  }
};
```

### Example Status Event

```json
{
  "event": "status",
  "args": ["running"]
}
```

## Resource Monitoring

### Statistics Events

Receive real-time resource usage statistics:

```javascript
socket.onmessage = function(event) {
  const message = JSON.parse(event.data);
  
  if (message.event === 'stats') {
    const stats = JSON.parse(message.args[0]);
    
    console.log('CPU Usage:', stats.cpu_absolute, '%');
    console.log('Memory Usage:', stats.memory_bytes, 'bytes');
    console.log('Memory Limit:', stats.memory_limit_bytes, 'bytes');
    console.log('Disk Usage:', stats.disk_bytes, 'bytes');
    console.log('Network RX:', stats.network.rx_bytes, 'bytes');
    console.log('Network TX:', stats.network.tx_bytes, 'bytes');
  }
};
```

### Example Statistics Event

```json
{
  "event": "stats",
  "args": ["{\"memory_bytes\":134217728,\"memory_limit_bytes\":1073741824,\"cpu_absolute\":2.5,\"network\":{\"rx_bytes\":1024,\"tx_bytes\":2048},\"uptime\":3600,\"state\":\"running\",\"disk_bytes\":50331648}"]
}
```

## Error Handling

### JWT Errors

Handle authentication errors and token expiration:

```javascript
socket.onmessage = function(event) {
  const message = JSON.parse(event.data);
  
  if (message.event === 'jwt error') {
    console.error('JWT Error:', message.args[0]);
    
    // Common JWT error scenarios:
    // - Token expired (after 10 minutes)
    // - Invalid token signature
    // - Insufficient permissions
    
    // Token expired or invalid - refresh token
    refreshWebSocketToken()
      .then(newToken => {
        // Reconnect with new token
        connectWebSocket(newToken);
      })
      .catch(error => {
        console.error('Failed to refresh token:', error);
      });
  }
};
```

### Connection Errors

Handle connection issues:

```javascript
socket.onclose = function(event) {
  console.log(`WebSocket closed: ${event.code} - ${event.reason}`);
  
  // Common close codes
  switch(event.code) {
    case 1000:
      console.log('Normal closure');
      break;
    case 1001:
      console.log('Going away');
      break;
    case 1006:
      console.log('Abnormal closure - attempting reconnect...');
      setTimeout(reconnectWebSocket, 5000);
      break;
    case 4001:
      console.log('Authentication failed');
      break;
    case 4004:
      console.log('Token expired');
      refreshAndReconnect();
      break;
  }
};

socket.onerror = function(error) {
  console.error('WebSocket error:', error);
};
```

## Advanced Usage

### React Hook Example

Here's a complete React hook for managing WebSocket connections:

**useWebSocket.js**
```javascript
import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebSocket(serverId, apiKey) {
  const [isConnected, setIsConnected] = useState(false);
  const [console, setConsole] = useState([]);
  const [serverStatus, setServerStatus] = useState('unknown');
  const [stats, setStats] = useState(null);
  const socketRef = useRef(null);
  const tokenRef = useRef(null);

  const getWebSocketToken = useCallback(async () => {
    const response = await fetch(`/api/client/servers/${serverId}/websocket`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'Application/vnd.pterodactyl.v1+json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get WebSocket token');
    }
    
    const data = await response.json();
    return data.data;
  }, [serverId, apiKey]);

  const connect = useCallback(async () => {
    try {
      const { token, socket: socketUrl } = await getWebSocketToken();
      tokenRef.current = token;

      const socket = new WebSocket(socketUrl, {
        headers: {
          'Origin': 'https://your-panel.com'
        }
      });
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        
        // Authenticate
        socket.send(JSON.stringify({
          event: 'auth',
          args: [token]
        }));
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        
        switch (message.event) {
          case 'console output':
            setConsole(prev => [...prev, message.args[0]]);
            break;
          case 'status':
            setServerStatus(message.args[0]);
            break;
          case 'stats':
            setStats(JSON.parse(message.args[0]));
            break;
          case 'jwt error':
            console.error('JWT Error:', message.args[0]);
            // Attempt to reconnect with new token
            setTimeout(connect, 1000);
            break;
        }
      };

      socket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code);
        setIsConnected(false);
        
        // Attempt to reconnect after 5 seconds
        if (event.code !== 1000) {
          setTimeout(connect, 5000);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setTimeout(connect, 5000);
    }
  }, [getWebSocketToken]);

  const sendCommand = useCallback((command) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        event: 'send command',
        args: [command]
      }));
    }
  }, []);

  const setPowerState = useCallback((state) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        event: 'set state',
        args: [state]
      }));
    }
  }, []);

  useEffect(() => {
    connect();
    
    return () => {
      if (socketRef.current) {
        socketRef.current.close(1000, 'Component unmounting');
      }
    };
  }, [connect]);

  return {
    isConnected,
    console,
    serverStatus,
    stats,
    sendCommand,
    setPowerState,
    reconnect: connect
  };
}
```

**ServerConsole.jsx**
```javascript
import React, { useState } from 'react';
import { useWebSocket } from './useWebSocket';

export function ServerConsole({ serverId, apiKey }) {
  const [command, setCommand] = useState('');
  const {
    isConnected,
    console,
    serverStatus,
    stats,
    sendCommand,
    setPowerState
  } = useWebSocket(serverId, apiKey);

  const handleSendCommand = (e) => {
    e.preventDefault();
    if (command.trim()) {
      sendCommand(command);
      setCommand('');
    }
  };

  return (
    <div className="server-console">
      <div className="server-status">
        <span className={`status ${serverStatus}`}>
          {serverStatus.toUpperCase()}
        </span>
        <span className={`connection ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="power-controls">
        <button onClick={() => setPowerState('start')}>Start</button>
        <button onClick={() => setPowerState('restart')}>Restart</button>
        <button onClick={() => setPowerState('stop')}>Stop</button>
        <button onClick={() => setPowerState('kill')}>Kill</button>
      </div>

      {stats && (
        <div className="server-stats">
          <div>CPU: {stats.cpu_absolute}%</div>
          <div>Memory: {(stats.memory_bytes / 1024 / 1024).toFixed(2)} MB</div>
          <div>Uptime: {stats.uptime}s</div>
        </div>
      )}

      <div className="console-output">
        {console.map((line, index) => (
          <div key={index} className="console-line">
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendCommand} className="command-input">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command..."
          disabled={!isConnected || serverStatus !== 'running'}
        />
        <button type="submit" disabled={!isConnected || serverStatus !== 'running'}>
          Send
        </button>
      </form>
    </div>
  );
}
```

### Vue.js Composable Example

**useWebSocket.js (Vue 3)**
```javascript
import { ref, onMounted, onUnmounted, computed } from 'vue';

export function useWebSocket(serverId, apiKey) {
  const socket = ref(null);
  const isConnected = ref(false);
  const console = ref([]);
  const serverStatus = ref('unknown');
  const stats = ref(null);
  const token = ref(null);

  const getWebSocketToken = async () => {
    const response = await fetch(`/api/client/servers/${serverId}/websocket`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'Application/vnd.pterodactyl.v1+json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get WebSocket token');
    }
    
    const data = await response.json();
    return data.data;
  };

  const connect = async () => {
    try {
      const { token: wsToken, socket: socketUrl } = await getWebSocketToken();
      token.value = wsToken;

      socket.value = new WebSocket(socketUrl, {
        headers: {
          'Origin': 'https://your-panel.com'
        }
      });

      socket.value.onopen = () => {
        console.log('WebSocket connected');
        isConnected.value = true;
        
        socket.value.send(JSON.stringify({
          event: 'auth',
          args: [wsToken]
        }));
      };

      socket.value.onmessage = (event) => {
        const message = JSON.parse(event.data);
        
        switch (message.event) {
          case 'console output':
            console.value.push(message.args[0]);
            break;
          case 'status':
            serverStatus.value = message.args[0];
            break;
          case 'stats':
            stats.value = JSON.parse(message.args[0]);
            break;
          case 'jwt error':
            console.error('JWT Error:', message.args[0]);
            setTimeout(connect, 1000);
            break;
        }
      };

      socket.value.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code);
        isConnected.value = false;
        
        if (event.code !== 1000) {
          setTimeout(connect, 5000);
        }
      };

      socket.value.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setTimeout(connect, 5000);
    }
  };

  const sendCommand = (command) => {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify({
        event: 'send command',
        args: [command]
      }));
    }
  };

  const setPowerState = (state) => {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify({
        event: 'set state',
        args: [state]
      }));
    }
  };

  const memoryUsage = computed(() => {
    if (!stats.value) return null;
    return {
      used: Math.round(stats.value.memory_bytes / 1024 / 1024),
      total: Math.round(stats.value.memory_limit_bytes / 1024 / 1024),
      percentage: Math.round((stats.value.memory_bytes / stats.value.memory_limit_bytes) * 100)
    };
  });

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.close(1000, 'Component unmounting');
    }
  });

  return {
    isConnected,
    console,
    serverStatus,
    stats,
    memoryUsage,
    sendCommand,
    setPowerState,
    reconnect: connect
  };
}
```

## Best Practices

### Connection Management

1. **Token Refresh**: Implement automatic token refresh before expiration
2. **Reconnection Logic**: Handle disconnections gracefully with exponential backoff
3. **Resource Cleanup**: Always close WebSocket connections when no longer needed
4. **Error Handling**: Implement comprehensive error handling for all events

### Performance Optimization

1. **Message Throttling**: Limit command sending frequency to avoid overwhelming the server
2. **Console Buffer**: Limit console output buffer size to prevent memory issues
3. **Event Debouncing**: Debounce rapid status changes to improve UI performance
4. **Lazy Loading**: Only establish WebSocket connections when needed

### Security Considerations

1. **Token Security**: 
   - Never expose JWT tokens in logs or client-side storage
   - Tokens expire after 10 minutes for security
   - Each token is signed with node-specific keys
   
2. **Permission Validation**:
   - Users must have `websocket.connect` permission
   - Tokens contain user-specific permissions
   - Server access is validated during token generation
   
3. **Command Validation**: Validate commands before sending to prevent injection
4. **Rate Limiting**: Implement client-side rate limiting for commands
5. **Connection Monitoring**: Monitor for unusual connection patterns
6. **Automatic Refresh**: Implement token refresh before 10-minute expiration

### Example Implementation

```javascript
class PterodactylWebSocket {
  constructor(serverId, apiKey) {
    this.serverId = serverId;
    this.apiKey = apiKey;
    this.socket = null;
    this.token = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.isConnecting = false;
    
    this.eventHandlers = {
      'console output': [],
      'status': [],
      'stats': [],
      'jwt error': []
    };
  }

  async connect() {
    if (this.isConnecting) return;
    this.isConnecting = true;

    try {
      const tokenData = await this.getWebSocketToken();
      this.token = tokenData.token;

      this.socket = new WebSocket(tokenData.socket, {
        headers: {
          'Origin': 'https://your-panel.com'
        }
      });
      this.setupEventHandlers();
      
    } catch (error) {
      console.error('Failed to connect:', error);
      this.scheduleReconnect();
    } finally {
      this.isConnecting = false;
    }
  }

  async getWebSocketToken() {
    const response = await fetch(`/api/client/servers/${this.serverId}/websocket`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'Application/vnd.pterodactyl.v1+json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get WebSocket token');
    }

    const data = await response.json();
    return data.data;
  }

  setupEventHandlers() {
    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      
      this.socket.send(JSON.stringify({
        event: 'auth',
        args: [this.token]
      }));
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket closed:', event.code);
      
      if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.scheduleReconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  handleMessage(message) {
    const handlers = this.eventHandlers[message.event];
    if (handlers) {
      handlers.forEach(handler => handler(message.args));
    }

    // Handle JWT errors
    if (message.event === 'jwt error') {
      console.error('JWT Error:', message.args[0]);
      this.scheduleReconnect();
    }
  }

  scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);
    this.reconnectAttempts++;

    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      this.connect();
    }, delay);
  }

  on(event, handler) {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event].push(handler);
    }
  }

  off(event, handler) {
    if (this.eventHandlers[event]) {
      const index = this.eventHandlers[event].indexOf(handler);
      if (index > -1) {
        this.eventHandlers[event].splice(index, 1);
      }
    }
  }

  sendCommand(command) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        event: 'send command',
        args: [command]
      }));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  setPowerState(state) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        event: 'set state',
        args: [state]
      }));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close(1000, 'Manual disconnect');
      this.socket = null;
    }
  }
}

// Usage
const ws = new PterodactylWebSocket('d3aac109', 'ptlc_YOUR_CLIENT_API_KEY');

ws.on('console output', (output) => {
  console.log('Console:', output[0]);
});

ws.on('status', (status) => {
  console.log('Status:', status[0]);
});

ws.on('stats', (stats) => {
  const data = JSON.parse(stats[0]);
  console.log('Stats:', data);
});

ws.connect();
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**: 
   - Ensure JWT token is valid and not expired (10-minute limit)
   - Verify user has `websocket.connect` permission
   - Check token format and signature
   
2. **Token Expired**: 
   - Tokens automatically expire after 10 minutes
   - Implement automatic refresh before expiration
   - Handle `jwt error` events for expired tokens
   
3. **Connection Refused**: Check Wings daemon is running and accessible
4. **Permission Denied**: Ensure user has `websocket.connect` permission on the server
5. **CORS Errors**: WebSocket connections bypass CORS, but initial token request may fail
6. **SSL Certificate Issues**: Ensure valid SSL certificates for wss:// connections

### Debug Mode

Enable debug logging to troubleshoot connection issues:

```javascript
// Enable debug mode
const debug = true;

if (debug) {
  socket.onopen = function(event) {
    console.debug('WebSocket opened:', event);
  };

  socket.onmessage = function(event) {
    console.debug('WebSocket message:', event.data);
  };

  socket.onclose = function(event) {
    console.debug('WebSocket closed:', event.code, event.reason);
  };

  socket.onerror = function(error) {
    console.debug('WebSocket error:', error);
  };
}
```

## Source Code References

### Panel WebSocket Controller

**Method**: `WebsocketController@__invoke` (Get Token)  
**Route**: `GET /api/client/servers/{server}/websocket`  
**Source**: [WebsocketController.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/WebsocketController.php)

### JWT Token Service

**Service**: `NodeJWTService` (Token Generation)  
**Source**: [NodeJWTService.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Nodes/NodeJWTService.php)  
**Features**: 10-minute expiration, SHA256 signing, custom claims

### Permissions

**Permission Constant**: `Permission::ACTION_WEBSOCKET_CONNECT`  
**Permission Key**: `websocket.connect`  
**Source**: [Permission.php](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Permission.php)

### Wings WebSocket Implementation

**WebSocket Implementation**: [Wings Server Code](https://github.com/pterodactyl/wings/tree/develop/server)

### JWT Token Generation

**JWT Service**: [Helper Services](https://github.com/pterodactyl/panel/tree/1.0-develop/app/Services/Helpers)  
**Token Validation**: [Wings Server Code](https://github.com/pterodactyl/wings/tree/develop/server)

### Route Definitions

**Client Routes**: [api-client.php](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php) - WebSocket endpoints

For detailed implementation and the latest updates, refer to the [Pterodactyl Panel](https://github.com/pterodactyl/panel) and [Wings](https://github.com/pterodactyl/wings) repositories. 

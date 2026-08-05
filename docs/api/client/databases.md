# Database Management

import CodeTabs from '@site/src/components/CodeTabs';

Manage MySQL/MariaDB databases for your servers including creation, password rotation, and deletion.

## List Databases

Retrieve all databases associated with a server.

**`GET /api/client/servers/{server}/databases`**

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/databases"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/databases" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/databases\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Databases:', response.data.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/databases', headers=headers)
data = response.json()
print('Databases:', data['data'])`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/databases");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data['data']);
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
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/databases", serverId)
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
  "object": "list",
  "data": [
    {
      "object": "server_database",
      "attributes": {
        "id": "s4_1",
        "host": {
          "address": "mysql.example.com",
          "port": 3306
        },
        "name": "s4_gamedata",
        "username": "u4_gKGSzC8x9M",
        "connections_from": "%",
        "max_connections": 0
      }
    },
    {
      "object": "server_database",
      "attributes": {
        "id": "s4_2",
        "host": {
          "address": "mysql.example.com",
          "port": 3306
        },
        "name": "s4_website",
        "username": "u4_hN7jL4mP6Q",
        "connections_from": "127.0.0.1",
        "max_connections": 10
      }
    }
  ]
}
```

### Database Fields

| Field | Description |
|-------|-------------|
| `id` | Unique database identifier |
| `host` | Database server connection details |
| `name` | Database name |
| `username` | Database username |
| `remote` | Allowed remote connection pattern |
| `max_connections` | Maximum concurrent connections (0 = unlimited) |

---

## Create Database

Create a new MySQL/MariaDB database for the server.

**`POST /api/client/servers/{server}/databases`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `database` | string | Yes | Database name (without server prefix) |
| `remote` | string | Yes | Remote access pattern (`%` for all, specific IP, etc.) |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/databases"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/databases" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "database": "playerdata",
    "remote": "%"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/databases\`, {
  database: 'playerdata',
  remote: '%'
}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

const db = response.data.attributes;
console.log(\`Database created: \${db.name}\`);
console.log(\`Username: \${db.username}\`);
console.log(\`Password: \${db.relationships.password.attributes.password}\`);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

data = {
    'database': 'playerdata',
    'remote': '%'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/databases', 
                        json=data, headers=headers)

if response.status_code == 201:
    db = response.json()['attributes']
    print(f"Database created: {db['name']}")
    print(f"Username: {db['username']}")
    print(f"Password: {db['relationships']['password']['attributes']['password']}")`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

$data = [
    'database' => 'playerdata',
    'remote' => '%'
];

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/databases");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 201) {
    $db = json_decode($response, true)['attributes'];
    echo "Database created: " . $db['name'] . "\\n";
    echo "Username: " . $db['username'] . "\\n";
    echo "Password: " . $db['relationships']['password']['attributes']['password'] . "\\n";
}
?>`
  }}
/>

### Example Response

```json
{
  "object": "server_database",
  "attributes": {
    "id": "s4_3",
    "host": {
      "address": "mysql.example.com",
      "port": 3306
    },
    "name": "s4_playerdata",
    "username": "u4_kL9mN2pQ5R",
    "remote": "%",
    "max_connections": 0,
    "relationships": {
      "password": {
        "object": "database_password",
        "attributes": {
          "password": "yS$8oP#m4Nx7"
        }
      }
    }
  }
}
```

### Remote Access Patterns

| Pattern | Description | Example Use Case |
|---------|-------------|------------------|
| `%` | Allow from any IP | Development, web applications |
| `127.0.0.1` | Local connections only | Same-server applications |
| `192.168.1.%` | Specific subnet | Private network access |
| `example.com` | Specific hostname | External web server |

---

## Rotate Database Password

Generate a new password for an existing database.

**`POST /api/client/servers/{server}/databases/{database}/rotate-password`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `database` | string | Database identifier |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/databases/{database}/rotate-password"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/databases/s4_1/rotate-password" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const databaseId = 's4_1';

const response = await axios.post(
  \`https://your-panel.com/api/client/servers/\${serverId}/databases/\${databaseId}/rotate-password\`,
  {},
  {
    headers: {
      'Authorization': 'Bearer ptlc_YOUR_API_KEY',
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'application/json'
    }
  }
);

const newPassword = response.data.attributes.relationships.password.attributes.password;
console.log(\`New password: \${newPassword}\`);`,
    python: `import requests

server_id = 'd3aac109'
database_id = 's4_1'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.post(
    f'https://your-panel.com/api/client/servers/{server_id}/databases/{database_id}/rotate-password',
    headers=headers
)

if response.status_code == 200:
    new_password = response.json()['attributes']['relationships']['password']['attributes']['password']
    print(f'New password: {new_password}')`,
    php: `<?php
$serverId = 'd3aac109';
$databaseId = 's4_1';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/databases/{$databaseId}/rotate-password");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $data = json_decode($response, true);
    $newPassword = $data['attributes']['relationships']['password']['attributes']['password'];
    echo "New password: " . $newPassword . "\\n";
}
?>`
  }}
/>

### Example Response

```json
{
  "object": "server_database",
  "attributes": {
    "id": "s4_1",
    "host": {
      "address": "mysql.example.com",
      "port": 3306
    },
    "name": "s4_gamedata",
    "username": "u4_gKGSzC8x9M",
    "remote": "%",
    "max_connections": 0,
    "relationships": {
      "password": {
        "object": "database_password",
        "attributes": {
          "password": "nR$5tK#w9Mx8"
        }
      }
    }
  }
}
```

:::warning[Important]
Password rotation immediately invalidates the old password. Update your application configuration before rotating passwords to avoid connection failures.
:::

---

## Delete Database

Permanently delete a database and all its data.

**`DELETE /api/client/servers/{server}/databases/{database}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `database` | string | Database identifier |

### Example Request

```bash
curl -X DELETE "https://your-panel.com/api/client/servers/d3aac109/databases/s4_1" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```

### Success Response (204)

Returns empty response body with status code 204.

:::danger[Permanent Deletion]
Database deletion is irreversible and will permanently destroy all data. Always create backups before deleting databases.
:::

---

## Database Connection Examples

### PHP (PDO)

<CodeTabs
  defaultValue="php"
  examples={{
    php: `<?php
try {
    $host = 'mysql.example.com';
    $port = 3306;
    $dbname = 's4_gamedata';
    $username = 'u4_gKGSzC8x9M';
    $password = 'aP$9gH#x2Kw8';
    
    $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    
    echo "Connected successfully!\\n";
    
    // Example query
    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM players");
    $stmt->execute();
    $result = $stmt->fetch();
    echo "Player count: " . $result['count'] . "\\n";
    
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\\n";
}
?>`,
    javascript: `const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'mysql.example.com',
      port: 3306,
      user: 'u4_gKGSzC8x9M',
      password: 'aP$9gH#x2Kw8',
      database: 's4_gamedata',
      charset: 'utf8mb4'
    });
    
    console.log('Connected successfully!');
    
    // Example query
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM players');
    console.log(\`Player count: \${rows[0].count}\`);
    
    await connection.end();
  } catch (error) {
    console.error('Connection failed:', error.message);
  }
}

connectToDatabase();`,
    python: `import mysql.connector
from mysql.connector import Error

try:
    connection = mysql.connector.connect(
        host='mysql.example.com',
        port=3306,
        database='s4_gamedata',
        user='u4_gKGSzC8x9M',
        password='aP$9gH#x2Kw8',
        charset='utf8mb4'
    )
    
    if connection.is_connected():
        print('Connected successfully!')
        
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(*) as count FROM players")
        result = cursor.fetchone()
        print(f"Player count: {result[0]}")
        
except Error as e:
    print(f"Connection failed: {e}")
    
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()`,
    java: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseConnection {
    public static void main(String[] args) {
        String url = "jdbc:mysql://mysql.example.com:3306/s4_gamedata?useSSL=false&useUnicode=true&characterEncoding=utf8";
        String username = "u4_gKGSzC8x9M";
        String password = "aP$9gH#x2Kw8";
        
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            System.out.println("Connected successfully!");
            
            // Example query
            String sql = "SELECT COUNT(*) as count FROM players";
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();
            
            if (resultSet.next()) {
                int count = resultSet.getInt("count");
                System.out.println("Player count: " + count);
            }
            
        } catch (SQLException e) {
            System.err.println("Connection failed: " + e.getMessage());
        }
    }
}`
  }}
/>

### MySQL CLI

```bash
mysql -h mysql.example.com -P 3306 -u u4_gKGSzC8x9M -p s4_gamedata
# Enter password when prompted: aP$9gH#x2Kw8
```

---

## Database Limits

| Limit | Default | Description |
|-------|---------|-------------|
| Maximum databases per server | 5 | Configurable by admin |
| Database name length | 48 characters | Including server prefix |
| Username length | 16 characters | Including server prefix |
| Password length | 32 characters | Auto-generated |

---

## Best Practices

### Security

1. **Use Specific Remote Patterns**: Avoid `%` in production if possible
2. **Regular Password Rotation**: Rotate passwords periodically
3. **Principle of Least Privilege**: Create application-specific databases
4. **SSL Connections**: Enable SSL/TLS when available

### Performance

1. **Connection Pooling**: Use connection pools in applications
2. **Proper Indexing**: Create indexes for frequently queried columns
3. **Query Optimization**: Use prepared statements and efficient queries
4. **Connection Limits**: Monitor and optimize max_connections

### Backup Strategy

```javascript
// Example backup script
const mysqldump = require('mysqldump');

async function backupDatabase() {
  try {
    await mysqldump({
      connection: {
        host: 'mysql.example.com',
        user: 'u4_gKGSzC8x9M',
        password: 'aP$9gH#x2Kw8',
        database: 's4_gamedata',
      },
      dumpToFile: `./backup-${Date.now()}.sql`,
    });
    console.log('Backup completed successfully');
  } catch (error) {
    console.error('Backup failed:', error);
  }
}
```

---

## Troubleshooting

### Connection Issues

**"Access denied" errors**
- Verify username and password
- Check remote access pattern
- Ensure database exists

**"Can't connect to MySQL server"**
- Verify host and port
- Check firewall settings
- Ensure database server is running

**"Too many connections"**
- Check max_connections limit
- Implement connection pooling
- Close unused connections

### Database Limits Reached

```bash
# Check current database count
curl "https://your-panel.com/api/client/servers/d3aac109/databases" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" | \
  jq '.data | length'
```

---

## Required Permissions

| Permission | Description |
|------------|-------------|
| `database.read` | View existing databases |
| `database.create` | Create new databases |
| `database.update` | Rotate database passwords |
| `database.delete` | Delete databases |

## Source References

**Controller**: [`DatabaseController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/DatabaseController.php)  
**Password Controller**: [`DatabasePasswordController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/DatabasePasswordController.php)  
**Routes**: [`api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php) - Database endpoints  
**Database Model**: [`Database.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Database.php)  
**Database Service**: [`DatabaseManagementService`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Services/Databases/DatabaseManagementService.php)

## Next Steps

- Explore [Backup Management](./backups) for database backup strategies
- Learn about [Scheduled Tasks](./schedules) for automated database maintenance
- Check [File Management](./files) for database dump file operations 
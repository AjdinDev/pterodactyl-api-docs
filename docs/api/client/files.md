# File Management

import CodeTabs from '@site/src/components/CodeTabs';

Manage server files and directories including listing, reading, uploading, downloading, and manipulating files.

## List Directory Contents

Retrieve the contents of a server directory.

**`GET /api/client/servers/{server}/files/list`**

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `directory` | string | Directory path to list (default: `/`) |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/list"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/files/list?directory=%2F" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const directory = '/';

const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/files/list\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  },
  params: {
    directory: directory
  }
});

console.log('Files:', response.data.data);`,
    python: `import requests
from urllib.parse import quote

server_id = 'd3aac109'
directory = '/'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

params = {
    'directory': directory
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/files/list', 
                       headers=headers, params=params)
data = response.json()
print('Files:', data['data'])`,
    php: `<?php
$serverId = 'd3aac109';
$directory = '/';
$ch = curl_init();

$url = "https://your-panel.com/api/client/servers/{$serverId}/files/list?" . 
       http_build_query(['directory' => $directory]);

curl_setopt($ch, CURLOPT_URL, $url);
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
?>`
  }}
/>

### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "file_object",
      "attributes": {
        "name": "server.jar",
        "mode": "-rw-r--r--",
        "mode_bits": "644",
        "size": 47698923,
        "is_file": true,
        "is_symlink": false,
        "mimetype": "application/java-archive",
        "created_at": "2024-01-15T14:30:25+00:00",
        "modified_at": "2024-01-15T14:30:25+00:00"
      }
    },
    {
      "object": "file_object",
      "attributes": {
        "name": "logs",
        "mode": "drwxr-xr-x",
        "mode_bits": "755",
        "size": 4096,
        "is_file": false,
        "is_symlink": false,
        "mimetype": "inode/directory",
        "created_at": "2024-01-15T14:30:25+00:00",
        "modified_at": "2024-01-15T14:30:25+00:00"
      }
    },
    {
      "object": "file_object",
      "attributes": {
        "name": "world",
        "mode": "drwxr-xr-x",
        "mode_bits": "755",
        "size": 4096,
        "is_file": false,
        "is_symlink": false,
        "mimetype": "inode/directory",
        "created_at": "2024-01-15T14:30:25+00:00",
        "modified_at": "2024-01-15T14:30:25+00:00"
      }
    }
  ]
}
```

---

## Read File Contents

Read the contents of a specific file.

**`GET /api/client/servers/{server}/files/contents`**

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | string | Path to the file to read |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/contents"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/files/contents?file=%2Fserver.properties" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const filePath = '/server.properties';

const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/files/contents\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  },
  params: {
    file: filePath
  }
});

console.log('File contents:', response.data);`,
    python: `import requests

server_id = 'd3aac109'
file_path = '/server.properties'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

params = {
    'file': file_path
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/files/contents', 
                       headers=headers, params=params)
print('File contents:', response.text)`,
    php: `<?php
$serverId = 'd3aac109';
$filePath = '/server.properties';
$ch = curl_init();

$url = "https://your-panel.com/api/client/servers/{$serverId}/files/contents?" . 
       http_build_query(['file' => $filePath]);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
curl_close($ch);

echo "File contents: " . $response;
?>`
  }}
/>

### Example Response (Plain Text)

```
# Minecraft server properties
server-port=25565
gamemode=survival
max-players=20
online-mode=true
difficulty=normal
spawn-protection=16
white-list=false
generate-structures=true
allow-flight=false
```

---

## Write File Contents

Create or update a file with new content.

**`POST /api/client/servers/{server}/files/write`**

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | string | Path to the file to write |

### Request Body

Send the file content as raw text in the request body.

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/write"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/write?file=%2Fserver.properties" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: text/plain" \\
  -d "# Minecraft server properties
server-port=25565
gamemode=survival
max-players=30
online-mode=true
difficulty=hard"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const filePath = '/server.properties';
const content = \`# Minecraft server properties
server-port=25565
gamemode=survival
max-players=30
online-mode=true
difficulty=hard\`;

const response = await axios.post(
  \`https://your-panel.com/api/client/servers/\${serverId}/files/write\`,
  content,
  {
    headers: {
      'Authorization': 'Bearer ptlc_YOUR_API_KEY',
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'text/plain'
    },
    params: {
      file: filePath
    }
  }
);

console.log('File updated successfully');`,
    python: `import requests

server_id = 'd3aac109'
file_path = '/server.properties'
content = """# Minecraft server properties
server-port=25565
gamemode=survival
max-players=30
online-mode=true
difficulty=hard"""

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'text/plain'
}

params = {
    'file': file_path
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/files/write',
                        data=content, headers=headers, params=params)

if response.status_code == 204:
    print('File updated successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$filePath = '/server.properties';
$content = "# Minecraft server properties
server-port=25565
gamemode=survival
max-players=30
online-mode=true
difficulty=hard";

$ch = curl_init();

$url = "https://your-panel.com/api/client/servers/{$serverId}/files/write?" . 
       http_build_query(['file' => $filePath]);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: text/plain'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 204) {
    echo "File updated successfully\\n";
}
?>`
  }}
/>

### Success Response (204)

Returns empty response body with status code 204.

---

## Upload Files

Upload files to the server using a two-step process: first get a signed upload URL, then upload the file.

### How File Upload Works

The Pterodactyl file upload system uses a secure two-step process:

1. **Get Upload URL**: Request a signed upload URL from the API (`GET /api/client/servers/{server}/files/upload`)
2. **Upload File**: Use the signed URL to upload your file(s) via multipart form data

This approach ensures secure file uploads without exposing server credentials and allows the panel to validate permissions before accepting files.

### Step 1: Get Upload URL

**`GET /api/client/servers/{server}/files/upload`**

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `directory` | string | No | Target directory for upload (default: `/`) |

#### Example Response

```json
{
  "object": "signed_url",
  "attributes": {
    "url": "https://your-panel.com/upload/signed/abc123..."
  }
}
```

### Step 2: Upload File to Signed URL

**`POST {signed_url}`**

Use the signed URL from Step 1 to upload your file(s).

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `directory` | string | No | Target directory (must match Step 1) |

#### Form Data Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `files` | file | Yes | File to upload (use `files` as field name) |

### Complete Example

<CodeTabs
  endpoint="/api/client/servers/{server}/files/upload"
  method="GET + POST"
  examples={{
    curl: `# Step 1: Get signed upload URL
signed_url=$(curl -s \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  "https://your-panel.com/api/client/servers/d3aac109/files/upload?directory=%2F" \\
  | jq -r '.attributes.url')

# Step 2: Upload file to signed URL
curl -X POST "$signed_url?directory=%2F" \\
  -F "files=@/path/to/local/file.txt"`,
    javascript: `const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const serverId = 'd3aac109';
const directory = '/';
const filePath = '/path/to/local/file.txt';

// Step 1: Get signed upload URL
const uploadUrlResponse = await axios.get(
  \`https://your-panel.com/api/client/servers/\${serverId}/files/upload\`,
  {
    headers: {
      'Authorization': 'Bearer ptlc_YOUR_API_KEY',
      'Accept': 'Application/vnd.pterodactyl.v1+json'
    },
    params: {
      directory: directory
    }
  }
);

const signedUrl = uploadUrlResponse.data.attributes.url;

// Step 2: Upload file to signed URL
const formData = new FormData();
formData.append('files', fs.createReadStream(filePath));
formData.append('directory', directory);

const uploadResponse = await axios.post(signedUrl, formData, {
  headers: formData.getHeaders()
});

console.log('File uploaded successfully');`,
    python: `import requests
import json

server_id = 'd3aac109'
directory = '/'
file_path = '/path/to/local/file.txt'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

# Step 1: Get signed upload URL
params = {'directory': directory}
response = requests.get(
    f'https://your-panel.com/api/client/servers/{server_id}/files/upload',
    headers=headers,
    params=params
)
signed_url = response.json()['attributes']['url']

# Step 2: Upload file to signed URL
with open(file_path, 'rb') as f:
    files = {'files': f}
    data = {'directory': directory}
    upload_response = requests.post(signed_url, files=files, data=data)

if upload_response.status_code in [200, 204]:
    print('File uploaded successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$directory = '/';
$filePath = '/path/to/local/file.txt';

// Step 1: Get signed upload URL
$ch = curl_init();
$url = "https://your-panel.com/api/client/servers/{$serverId}/files/upload?" . 
       http_build_query(['directory' => $directory]);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

$signedUrl = $data['attributes']['url'];

// Step 2: Upload file to signed URL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $signedUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
    'files' => new CURLFile($filePath),
    'directory' => $directory
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$uploadResponse = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200 || $httpCode === 204) {
    echo "File uploaded successfully\\n";
}
?>`,
    go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "mime/multipart"
    "net/http"
    "net/url"
    "os"
    "path/filepath"
)

func main() {
    serverId := "d3aac109"
    directory := "/"
    filePath := "/path/to/local/file.txt"
    apiKey := "ptlc_YOUR_API_KEY"

    // Step 1: Get signed upload URL
    uploadUrl := fmt.Sprintf("https://your-panel.com/api/client/servers/%s/files/upload?directory=%s",
        serverId, url.QueryEscape(directory))
    
    req, _ := http.NewRequest("GET", uploadUrl, nil)
    req.Header.Set("Authorization", "Bearer " + apiKey)
    req.Header.Set("Accept", "Application/vnd.pterodactyl.v1+json")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var uploadData struct {
        Attributes struct {
            URL string \`json:"url"\`
        } \`json:"attributes"\`
    }
    json.NewDecoder(resp.Body).Decode(&uploadData)
    signedUrl := uploadData.Attributes.URL

    // Step 2: Upload file to signed URL
    file, _ := os.Open(filePath)
    defer file.Close()

    body := &bytes.Buffer{}
    writer := multipart.NewWriter(body)
    
    part, _ := writer.CreateFormFile("files", filepath.Base(filePath))
    io.Copy(part, file)
    
    writer.WriteField("directory", directory)
    writer.Close()

    req, _ = http.NewRequest("POST", signedUrl, body)
    req.Header.Set("Content-Type", writer.FormDataContentType())
    
    resp, _ = client.Do(req)
    defer resp.Body.Close()
    
    if resp.StatusCode == 200 || resp.StatusCode == 204 {
        fmt.Println("File uploaded successfully")
    }
}`,
    java: `import java.io.*;
import java.net.*;
import java.nio.file.*;
import org.json.*;
import okhttp3.*;

public class FileUpload {
    public static void main(String[] args) throws IOException {
        String serverId = "d3aac109";
        String directory = "/";
        String filePath = "/path/to/local/file.txt";
        String apiKey = "ptlc_YOUR_API_KEY";
        
        OkHttpClient client = new OkHttpClient();
        
        // Step 1: Get signed upload URL
        String uploadUrl = String.format(
            "https://your-panel.com/api/client/servers/%s/files/upload?directory=%s",
            serverId, URLEncoder.encode(directory, "UTF-8")
        );
        
        Request uploadRequest = new Request.Builder()
            .url(uploadUrl)
            .header("Authorization", "Bearer " + apiKey)
            .header("Accept", "Application/vnd.pterodactyl.v1+json")
            .build();
        
        Response uploadResponse = client.newCall(uploadRequest).execute();
        JSONObject json = new JSONObject(uploadResponse.body().string());
        String signedUrl = json.getJSONObject("attributes").getString("url");
        uploadResponse.close();
        
        // Step 2: Upload file to signed URL
        File file = new File(filePath);
        RequestBody requestBody = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("files", file.getName(),
                RequestBody.create(MediaType.parse("application/octet-stream"), file))
            .addFormDataPart("directory", directory)
            .build();
        
        Request fileUploadRequest = new Request.Builder()
            .url(signedUrl)
            .post(requestBody)
            .build();
        
        Response fileResponse = client.newCall(fileUploadRequest).execute();
        if (fileResponse.code() == 200 || fileResponse.code() == 204) {
            System.out.println("File uploaded successfully");
        }
        fileResponse.close();
    }
}`,
    csharp: `using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

class FileUpload
{
    static async Task Main(string[] args)
    {
        string serverId = "d3aac109";
        string directory = "/";
        string filePath = "/path/to/local/file.txt";
        string apiKey = "ptlc_YOUR_API_KEY";
        
        using (var client = new HttpClient())
        {
            // Step 1: Get signed upload URL
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
            client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");
            
            var uploadUrl = $"https://your-panel.com/api/client/servers/{serverId}/files/upload?directory={Uri.EscapeDataString(directory)}";
            var uploadResponse = await client.GetStringAsync(uploadUrl);
            var json = JObject.Parse(uploadResponse);
            var signedUrl = json["attributes"]["url"].ToString();
            
            // Step 2: Upload file to signed URL
            using (var content = new MultipartFormDataContent())
            using (var fileStream = File.OpenRead(filePath))
            {
                content.Add(new StreamContent(fileStream), "files", Path.GetFileName(filePath));
                content.Add(new StringContent(directory), "directory");
                
                var fileResponse = await client.PostAsync(signedUrl, content);
                if (fileResponse.IsSuccessStatusCode)
                {
                    Console.WriteLine("File uploaded successfully");
                }
            }
        }
    }
}`,
    ruby: `require 'net/http'
require 'uri'
require 'json'

server_id = 'd3aac109'
directory = '/'
file_path = '/path/to/local/file.txt'
api_key = 'ptlc_YOUR_API_KEY'

# Step 1: Get signed upload URL
uri = URI("https://your-panel.com/api/client/servers/#{server_id}/files/upload")
uri.query = URI.encode_www_form(directory: directory)

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = "Bearer #{api_key}"
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'

response = http.request(request)
data = JSON.parse(response.body)
signed_url = data['attributes']['url']

# Step 2: Upload file to signed URL
uri = URI(signed_url)
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

File.open(file_path, 'rb') do |file|
  request = Net::HTTP::Post::Multipart.new(uri.path, {
    'files' => UploadIO.new(file, 'application/octet-stream', File.basename(file_path)),
    'directory' => directory
  })
  
  response = http.request(request)
  if response.code.to_i == 200 || response.code.to_i == 204
    puts 'File uploaded successfully'
  end
end`
  }}
/>

### Upload Limits

| Limit | Value |
|-------|-------|
| Maximum file size | 100 MB per file |
| Maximum files per request | 10 files |
| Allowed file types | All types (configurable by admin) |

### Multiple File Upload Example

<CodeTabs
  endpoint="/api/client/servers/{server}/files/upload"
  method="Multiple Files"
  examples={{
    curl: `# Step 1: Get signed upload URL (same as single file)
signed_url=$(curl -s \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  "https://your-panel.com/api/client/servers/d3aac109/files/upload?directory=%2F" \\
  | jq -r '.attributes.url')

# Step 2: Upload multiple files to signed URL
curl -X POST "$signed_url" \\
  -F "files=@/path/to/file1.txt" \\
  -F "files=@/path/to/file2.log" \\
  -F "files=@/path/to/config.yml" \\
  -F "directory=/"`,
    javascript: `const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const serverId = 'd3aac109';
const directory = '/';
const filePaths = [
  '/path/to/file1.txt',
  '/path/to/file2.log',
  '/path/to/config.yml'
];

// Step 1: Get signed upload URL
const uploadUrlResponse = await axios.get(
  \`https://your-panel.com/api/client/servers/\${serverId}/files/upload\`,
  {
    headers: {
      'Authorization': 'Bearer ptlc_YOUR_API_KEY',
      'Accept': 'Application/vnd.pterodactyl.v1+json'
    },
    params: { directory }
  }
);

const signedUrl = uploadUrlResponse.data.attributes.url;

// Step 2: Upload multiple files
const formData = new FormData();

// Add each file to the form
filePaths.forEach(filePath => {
  formData.append('files', fs.createReadStream(filePath));
});

formData.append('directory', directory);

const uploadResponse = await axios.post(signedUrl, formData, {
  headers: formData.getHeaders()
});

console.log('Multiple files uploaded successfully');`,
    python: `import requests

server_id = 'd3aac109'
directory = '/'
file_paths = [
    '/path/to/file1.txt',
    '/path/to/file2.log',
    '/path/to/config.yml'
]

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

# Step 1: Get signed upload URL
response = requests.get(
    f'https://your-panel.com/api/client/servers/{server_id}/files/upload',
    headers=headers,
    params={'directory': directory}
)
signed_url = response.json()['attributes']['url']

# Step 2: Upload multiple files
files = []
for file_path in file_paths:
    files.append(('files', open(file_path, 'rb')))

data = {'directory': directory}
upload_response = requests.post(signed_url, files=files, data=data)

# Close file handles
for _, file_handle in files:
    file_handle.close()

if upload_response.status_code in [200, 204]:
    print('Multiple files uploaded successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$directory = '/';
$filePaths = [
    '/path/to/file1.txt',
    '/path/to/file2.log',
    '/path/to/config.yml'
];

// Step 1: Get signed upload URL
$ch = curl_init();
$url = "https://your-panel.com/api/client/servers/{$serverId}/files/upload?" . 
       http_build_query(['directory' => $directory]);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

$signedUrl = $data['attributes']['url'];

// Step 2: Upload multiple files
// Note: PHP cURL limitation - cannot use the same field name multiple times
// in an associative array. Common workarounds:

// Option 1: Multiple separate uploads (most reliable)
foreach ($filePaths as $filePath) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $signedUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'files' => new CURLFile($filePath),
        'directory' => $directory
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $uploadResponse = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200 && $httpCode !== 204) {
        echo "Failed to upload: " . basename($filePath) . "\\n";
        break;
    }
}

echo "Files uploaded successfully\\n";

// Option 2: Check if your panel accepts array notation
// Some implementations may accept files[0], files[1], etc.
/*
$postFields = ['directory' => $directory];
foreach ($filePaths as $index => $filePath) {
    $postFields["files[{$index}]"] = new CURLFile($filePath);
}
*/
?>`
  }}
/>

### Important Notes

- **Signed URL Validity**: The signed URL is valid for 15 minutes (verified from source code)
- **Directory Parameter**: Must be URL-encoded when used in the query string
- **Form Field Name**: Must use `files` as the field name for each file
- **Multiple Files**: Supported by adding multiple `files` fields in the form data
- **Folder Uploads**: **NOT SUPPORTED** - Pterodactyl does not support uploading entire folders. You must upload individual files
- **File Permissions**: Uploaded files are created with 0644 permissions (read/write for owner, read-only for others)

---

## Download File

Download a file from the server.

**`GET /api/client/servers/{server}/files/download`**

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | string | Path to the file to download |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/download"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/files/download?file=%2Fbackups%2Fworld.zip" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -o "world.zip"`,
    javascript: `const axios = require('axios');
const fs = require('fs');

const serverId = 'd3aac109';
const filePath = '/backups/world.zip';

const response = await axios.get(
  \`https://your-panel.com/api/client/servers/\${serverId}/files/download\`,
  {
    headers: {
      'Authorization': 'Bearer ptlc_YOUR_API_KEY',
      'Accept': 'Application/vnd.pterodactyl.v1+json'
    },
    params: {
      file: filePath
    },
    responseType: 'stream'
  }
);

// Save to file
response.data.pipe(fs.createWriteStream('world.zip'));
console.log('File download started');`,
    python: `import requests

server_id = 'd3aac109'
file_path = '/backups/world.zip'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {
    'file': file_path
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/files/download',
                       headers=headers, params=params, stream=True)

with open('world.zip', 'wb') as f:
    for chunk in response.iter_content(chunk_size=8192):
        f.write(chunk)

print('File downloaded successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$filePath = '/backups/world.zip';
$ch = curl_init();

$url = "https://your-panel.com/api/client/servers/{$serverId}/files/download?" . 
       http_build_query(['file' => $filePath]);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json'
]);

$response = curl_exec($ch);
curl_close($ch);

file_put_contents('world.zip', $response);
echo "File downloaded successfully\\n";
?>`
  }}
/>

---

## Create Directory

Create a new directory on the server.

**`POST /api/client/servers/{server}/files/create-folder`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Parent directory path |
| `name` | string | Yes | Directory name to create |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/create-folder" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "name": "plugins"
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

---

## Copy Files

Copy files or directories to a new location.

**`POST /api/client/servers/{server}/files/copy`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `location` | string | Yes | Source file/directory path |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/copy" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "location": "/world"
  }'
```

Creates a copy of the file/directory with "_copy" appended to the name.

### Success Response (204)

Returns empty response body with status code 204.

---

## Rename Files

Rename or move files and directories.

**`PUT /api/client/servers/{server}/files/rename`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Parent directory |
| `files` | array | Yes | Array of rename operations |

### Files Array Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `from` | string | Yes | Current filename |
| `to` | string | Yes | New filename |

### Example Request

```bash
curl -X PUT "https://your-panel.com/api/client/servers/d3aac109/files/rename" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "files": [
      {
        "from": "old_name.txt",
        "to": "new_name.txt"
      }
    ]
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

---

## Delete Files

Delete files or directories from the server.

**`POST /api/client/servers/{server}/files/delete`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Parent directory |
| `files` | array | Yes | Array of filenames to delete |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/delete" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "files": [
      "unnecessary_file.txt",
      "old_backup.zip"
    ]
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

:::warning[Permanent Deletion]
File deletion is permanent and cannot be undone. Always ensure you have backups before deleting important files.
:::

---

## Compress Files

Create an archive (ZIP/TAR) from files and directories.

**`POST /api/client/servers/{server}/files/compress`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Root directory |
| `files` | array | Yes | Files/directories to compress |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/compress" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "files": [
      "world",
      "plugins"
    ]
  }'
```

### Example Response

```json
{
  "object": "file_object",
  "attributes": {
    "name": "archive-2024-01-15-143025.tar.gz",
    "mode": "-rw-r--r--",
    "mode_bits": "0644",
    "size": 125829120,
    "is_file": true,
    "is_symlink": false,
    "mimetype": "application/gzip",
    "created_at": "2024-01-15T14:30:25+00:00",
    "modified_at": "2024-01-15T14:30:25+00:00"
  }
}
```

---

## Decompress Files

Extract files from an archive.

**`POST /api/client/servers/{server}/files/decompress`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Directory containing the archive |
| `file` | string | Yes | Archive filename |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/decompress" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "file": "backup.zip"
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

### Supported Archive Types

| Extension | Format | Description |
|-----------|--------|-------------|
| `.zip` | ZIP | Most common format |
| `.tar` | TAR | Uncompressed tarball |
| `.tar.gz` | TAR+GZIP | Compressed tarball |
| `.tar.bz2` | TAR+BZIP2 | Compressed tarball |

---

## Change File Permissions

Modify file or directory permissions (chmod).

**`POST /api/client/servers/{server}/files/chmod`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Parent directory |
| `files` | array | Yes | Array of permission changes |

### Files Array Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | string | Yes | Filename |
| `mode` | string | Yes | Octal permission mode (e.g., "755", "644") |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/chmod" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "files": [
      {
        "file": "start.sh",
        "mode": "755"
      },
      {
        "file": "config.yml",
        "mode": "644"
      }
    ]
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

### Common Permission Modes

| Mode | Description | Symbolic |
|------|-------------|----------|
| `755` | rwxr-xr-x | Full access for owner, read+execute for others |
| `644` | rw-r--r-- | Read+write for owner, read-only for others |
| `600` | rw------- | Read+write for owner only |
| `777` | rwxrwxrwx | Full access for everyone (not recommended) |

---

## Pull Remote File

Download a file from a URL directly to the server.

**`POST /api/client/servers/{server}/files/pull`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | URL of the file to download |
| `directory` | string | Yes | Directory to save the file |
| `filename` | string | No | Custom filename (optional) |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/pull" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://piston-data.mojang.com/v1/objects/8dd1a28015f51b1803213892b50b7b4fc76e594d/server.jar",
    "directory": "/",
    "filename": "server.jar"
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

### Remote Pull Limitations

- Maximum file size: 1 GB
- Timeout: 5 minutes
- Only HTTP/HTTPS URLs allowed
- Some panel configurations may restrict certain domains

---

## Rename File

Rename a file or directory on the server.

**`PUT /api/client/servers/{server}/files/rename`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Directory containing the file |
| `files` | array | Yes | Array containing old and new names |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/rename"
  method="PUT"
  examples={{
    curl: `curl -X PUT "https://your-panel.com/api/client/servers/d3aac109/files/rename" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "root": "/",
    "files": [
      {
        "from": "old-name.txt",
        "to": "new-name.txt"
      }
    ]
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const renameData = {
  root: '/',
  files: [
    {
      from: 'old-name.txt',
      to: 'new-name.txt'
    }
  ]
};

const response = await axios.put(\`https://your-panel.com/api/client/servers/\${serverId}/files/rename\`, renameData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('File renamed successfully');`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

rename_data = {
    'root': '/',
    'files': [
        {
            'from': 'old-name.txt',
            'to': 'new-name.txt'
        }
    ]
}

response = requests.put(f'https://your-panel.com/api/client/servers/{server_id}/files/rename', 
                        headers=headers, json=rename_data)
print('File renamed successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\\Client();

$renameData = [
    'root' => '/',
    'files' => [
        [
            'from' => 'old-name.txt',
            'to' => 'new-name.txt'
        ]
    ]
];

$response = $client->put("https://your-panel.com/api/client/servers/{$serverId}/files/rename", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $renameData
]);

echo "File renamed successfully";
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
        "root": "/",
        "files": []map[string]string{
            {
                "from": "old-name.txt",
                "to": "new-name.txt",
            },
        },
    }
    
    jsonData, _ := json.Marshal(renameData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("PUT", fmt.Sprintf("https://your-panel.com/api/client/servers/%s/files/rename", serverId), bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    fmt.Println("File renamed successfully")
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String jsonData = """
{
  "root": "/",
  "files": [
    {
      "from": "old-name.txt",
      "to": "new-name.txt"
    }
  ]
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client/servers/" + serverId + "/files/rename"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .PUT(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println("File renamed successfully");`,
    csharp: `using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var serverId = "d3aac109";
var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var renameData = new {
    root = "/",
    files = new[] {
        new { from = "old-name.txt", to = "new-name.txt" }
    }
};

var json = JsonSerializer.Serialize(renameData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PutAsync($"https://your-panel.com/api/client/servers/{serverId}/files/rename", content);
Console.WriteLine("File renamed successfully");`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
rename_data = {
  root: '/',
  files: [
    {
      from: 'old-name.txt',
      to: 'new-name.txt'
    }
  ]
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/files/rename")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Put.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = rename_data.to_json

response = http.request(request)
puts "File renamed successfully"`
  }}
/>

### Success Response (204)

Returns empty response body with status code 204.

---

## Copy File

Copy files to another location on the server.

**`POST /api/client/servers/{server}/files/copy`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `location` | string | Yes | Source file path |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/copy"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/copy" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "location": "/config.yml"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const copyData = {
  location: '/config.yml'
};

const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/files/copy\`, copyData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('File copied successfully');`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

copy_data = {
    'location': '/config.yml'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/files/copy', 
                        headers=headers, json=copy_data)
print('File copied successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\\Client();

$copyData = [
    'location' => '/config.yml'
];

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/files/copy", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $copyData
]);

echo "File copied successfully";
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
    copyData := map[string]interface{}{
        "location": "/config.yml",
    }
    
    jsonData, _ := json.Marshal(copyData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", fmt.Sprintf("https://your-panel.com/api/client/servers/%s/files/copy", serverId), bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    fmt.Println("File copied successfully")
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String jsonData = """
{
  "location": "/config.yml"
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client/servers/" + serverId + "/files/copy"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println("File copied successfully");`,
    csharp: `using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var serverId = "d3aac109";
var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var copyData = new {
    location = "/config.yml"
};

var json = JsonSerializer.Serialize(copyData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/files/copy", content);
Console.WriteLine("File copied successfully");`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
copy_data = {
  location: '/config.yml'
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/files/copy")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = copy_data.to_json

response = http.request(request)
puts "File copied successfully"`
  }}
/>

### Success Response (204)

Returns empty response body with status code 204. The file will be copied with "_copy" appended to the filename.

---

## Delete Files

Delete one or more files or directories.

**`POST /api/client/servers/{server}/files/delete`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Base directory path |
| `files` | array | Yes | Array of files/directories to delete |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/delete"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/delete" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "root": "/",
    "files": ["old-file.txt", "temp-folder"]
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const deleteData = {
  root: '/',
  files: ['old-file.txt', 'temp-folder']
};

const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/files/delete\`, deleteData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Files deleted successfully');`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

delete_data = {
    'root': '/',
    'files': ['old-file.txt', 'temp-folder']
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/files/delete', 
                        headers=headers, json=delete_data)
print('Files deleted successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\\Client();

$deleteData = [
    'root' => '/',
    'files' => ['old-file.txt', 'temp-folder']
];

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/files/delete", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $deleteData
]);

echo "Files deleted successfully";
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
    deleteData := map[string]interface{}{
        "root": "/",
        "files": []string{"old-file.txt", "temp-folder"},
    }
    
    jsonData, _ := json.Marshal(deleteData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", fmt.Sprintf("https://your-panel.com/api/client/servers/%s/files/delete", serverId), bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    fmt.Println("Files deleted successfully")
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String jsonData = """
{
  "root": "/",
  "files": ["old-file.txt", "temp-folder"]
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client/servers/" + serverId + "/files/delete"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println("Files deleted successfully");`,
    csharp: `using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var serverId = "d3aac109";
var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var deleteData = new {
    root = "/",
    files = new[] { "old-file.txt", "temp-folder" }
};

var json = JsonSerializer.Serialize(deleteData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/files/delete", content);
Console.WriteLine("Files deleted successfully");`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
delete_data = {
  root: '/',
  files: ['old-file.txt', 'temp-folder']
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/files/delete")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = delete_data.to_json

response = http.request(request)
puts "Files deleted successfully"`
  }}
/>

### Success Response (204)

Returns empty response body with status code 204.

:::warning[Important]
Deleted files cannot be recovered. Always create backups before deleting important files.
:::

---

## Create Folder

Create a new directory on the server.

**`POST /api/client/servers/{server}/files/create-folder`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Parent directory path |
| `name` | string | Yes | Name of the new folder |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/create-folder"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/create-folder" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "root": "/",
    "name": "new-folder"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const folderData = {
  root: '/',
  name: 'new-folder'
};

const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/files/create-folder\`, folderData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Folder created successfully');`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

folder_data = {
    'root': '/',
    'name': 'new-folder'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/files/create-folder', 
                        headers=headers, json=folder_data)
print('Folder created successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$client = new GuzzleHttp\\Client();

$folderData = [
    'root' => '/',
    'name' => 'new-folder'
];

$response = $client->post("https://your-panel.com/api/client/servers/{$serverId}/files/create-folder", [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $folderData
]);

echo "Folder created successfully";
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
    folderData := map[string]interface{}{
        "root": "/",
        "name": "new-folder",
    }
    
    jsonData, _ := json.Marshal(folderData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", fmt.Sprintf("https://your-panel.com/api/client/servers/%s/files/create-folder", serverId), bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    fmt.Println("Folder created successfully")
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String serverId = "d3aac109";
String jsonData = """
{
  "root": "/",
  "name": "new-folder"
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client/servers/" + serverId + "/files/create-folder"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println("Folder created successfully");`,
    csharp: `using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var serverId = "d3aac109";
var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var folderData = new {
    root = "/",
    name = "new-folder"
};

var json = JsonSerializer.Serialize(folderData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync($"https://your-panel.com/api/client/servers/{serverId}/files/create-folder", content);
Console.WriteLine("Folder created successfully");`,
    ruby: `require 'net/http'
require 'json'

server_id = 'd3aac109'
folder_data = {
  root: '/',
  name: 'new-folder'
}

uri = URI("https://your-panel.com/api/client/servers/#{server_id}/files/create-folder")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = folder_data.to_json

response = http.request(request)
puts "Folder created successfully"`
  }}
/>

### Success Response (204)

Returns empty response body with status code 204.

---

## Required Permissions

| Permission | Description |
|------------|-------------|
| `file.read` | View file contents and directory listings |
| `file.read-content` | Read individual file contents |
| `file.create` | Create new files and directories |
| `file.update` | Modify existing files |
| `file.delete` | Delete files and directories |
| `file.archive` | Create and extract archives |
| `file.sftp` | Access files via SFTP |

## Security Best Practices

1. **File Size Limits**: Be aware of upload and download limits
2. **Path Traversal**: The API prevents access outside the server directory
3. **File Types**: Some file extensions may be restricted by server configuration
4. **Permissions**: Always use the minimum required file permissions
5. **Backups**: Create backups before making bulk changes

## Source References

**Controller**: [`FileController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/FileController.php)  
**Routes**: [`api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php) - File management endpoints  
**Wings Integration**: [Wings Server Code](https://github.com/pterodactyl/wings/tree/develop/server) - File operations

## Next Steps

- Learn about [Database Management](./databases) for server databases  
- Explore [Backup Management](./backups) for automated backups
- Check [Scheduled Tasks](./schedules) for automated file operations 

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Simple Social Cards Plugin
module.exports = function simpleSocialCardsPlugin(context, options) {
  return {
    name: 'simple-social-cards-plugin',
    
    async postBuild(props) {
      const { routesPaths, outDir } = props;
      
      console.log('🎨 Creating simple social cards...');
      
      // Ensure the social cards directory exists
      const socialDir = path.join(outDir, 'img', 'social');
      if (!fs.existsSync(socialDir)) {
        fs.mkdirSync(socialDir, { recursive: true });
      }
      
      // Generate cards for each route
      for (const routePath of routesPaths) {
        try {
          await generateSimpleCard(routePath, socialDir);
          await updateHtmlMeta(routePath, outDir);
        } catch (error) {
          console.warn(`⚠️  Failed to generate card for ${routePath}:`, error.message);
        }
      }
      
      console.log(`✅ Generated ${routesPaths.length} simple social cards with meta tags`);
    },
  };
};

async function generateSimpleCard(routePath, outputDir) {
  // Skip certain routes
  if (routePath === '/404.html' || routePath.includes('/search')) {
    return;
  }
  
  // Create canvas
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Simple blue background
  ctx.fillStyle = '#1a365d';
  ctx.fillRect(0, 0, width, height);
  
  // Site name in center
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 120px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('PteroAPI', width/2, 250);
  
  // Simple subtitle
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '48px Arial';
  ctx.fillText('Pterodactyl API Documentation', width/2, 350);
  
  // Very minimal bottom text
  ctx.fillStyle = '#cbd5e0';
  ctx.font = '32px Arial';
  ctx.fillText('pteroapi.com', width/2, 500);
  
  // Save the image
  const filename = routePath.replace(/\//g, '_').replace(/\.html$/, '') || 'index';
  const outputPath = path.join(outputDir, `${filename}.jpg`);
  
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(outputPath, buffer);
  
  return outputPath;
}

async function updateHtmlMeta(routePath, outDir) {
  // Skip certain routes
  if (routePath === '/404.html' || routePath.includes('/search')) {
    return;
  }
  
  // Get the HTML file path - handle both root and nested paths correctly
  let htmlPath;
  if (routePath === '/') {
    htmlPath = path.join(outDir, 'index.html');
  } else {
    // Remove leading slash and add .html if not present
    const cleanPath = routePath.replace(/^\//, '').replace(/\/$/, '');
    htmlPath = path.join(outDir, cleanPath + (cleanPath.endsWith('.html') ? '' : '.html'));
  }
  
  if (!fs.existsSync(htmlPath)) {
    console.warn(`HTML file not found: ${htmlPath}`);
    return;
  }
  
  // Get the social card filename
  const cardFilename = routePath.replace(/\//g, '_').replace(/\.html$/, '') || 'index';
  const cardUrl = `https://pteroapi.com/img/social/${cardFilename}.jpg`;
  
  // Read and update HTML file
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Update existing og:image meta tag or add if it doesn't exist
  if (html.includes('property="og:image"')) {
    html = html.replace(
      /(<meta[^>]*property="og:image"[^>]*content=")[^"]*("[^>]*>)/g,
      `$1${cardUrl}$2`
    );
  } else {
    html = html.replace(
      '</head>',
      `  <meta property="og:image" content="${cardUrl}" />\n</head>`
    );
  }
  
  // Update existing twitter:image meta tag or add if it doesn't exist
  if (html.includes('name="twitter:image"')) {
    html = html.replace(
      /(<meta[^>]*name="twitter:image"[^>]*content=")[^"]*("[^>]*>)/g,
      `$1${cardUrl}$2`
    );
  } else {
    html = html.replace(
      '</head>',
      `  <meta name="twitter:image" content="${cardUrl}" />\n</head>`
    );
  }
  
  // Write the updated HTML
  fs.writeFileSync(htmlPath, html);
} 

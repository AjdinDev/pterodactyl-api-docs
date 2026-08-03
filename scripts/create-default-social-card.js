const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create default social card
function createDefaultSocialCard() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a365d');
  gradient.addColorStop(1, '#2d3748'); // Darker blue
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add subtle pattern/texture
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Title - Large and centered
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 110px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('PteroAPI', width / 2, 160);

  ctx.font = 'bold 70px Arial';
  ctx.fillText('Pterodactyl API Documentation', width / 2, 250);

  // Description
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '48px Arial';
  ctx.fillText('Complete API reference and developer guide', width / 2, 340);
  ctx.fillText('for Pterodactyl Panel v1', width / 2, 400);

  // URL Branding
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 38px Arial';
  ctx.textAlign = 'right';
  ctx.fillText('pteroapi.com', width - 30, height - 40);

  // Save the image
  const outputDir = path.join(__dirname, '../static/img');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'pteroapi-social-card.jpg');
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(outputPath, buffer);

  console.log('✅ Created default social card:', outputPath);
}

// Run if called directly
if (require.main === module) {
  createDefaultSocialCard();
}

module.exports = { createDefaultSocialCard };

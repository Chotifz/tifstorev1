// This script helps with the initial setup of the project
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if .env file exists, if not create it
const envFilePath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envFilePath)) {
  console.log('Creating .env file with default values...');
  const defaultEnv = `DATABASE_URL="postgresql://postgres:your_password@localhost:5432/tif_store"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
FACEBOOK_CLIENT_ID="your_facebook_app_id" 
FACEBOOK_CLIENT_SECRET="your_facebook_app_secret"

# For integration with payment gateway (e.g., Midtrans)
MIDTRANS_SERVER_KEY="your_midtrans_server_key"
MIDTRANS_CLIENT_KEY="your_midtrans_client_key"
MIDTRANS_MERCHANT_ID="your_midtrans_merchant_id"`;

  fs.writeFileSync(envFilePath, defaultEnv);
  console.log('Created .env file. Please update it with your actual values.');
}

// Run database setup
console.log('Setting up the database...');
try {
  console.log('Running database migrations...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  
  console.log('Seeding the database...');
  execSync('npx prisma db seed', { stdio: 'inherit' });
  
  console.log('Database setup completed successfully!');
} catch (error) {
  console.error('Error setting up the database:', error.message);
  console.log('Please check your database connection and try again.');
  process.exit(1);
}

console.log('\n--- Setup Complete ---');
console.log('You can now start the development server with:');
console.log('npm run dev');
console.log('\nVisit http://localhost:3000 to see your application');
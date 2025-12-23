// Quick script to check if .env file is configured correctly
require('dotenv').config();

console.log('\n🔍 Checking Environment Variables...\n');

const required = ['JWT_SECRET', 'PORT'];
const optional = ['OPENAI_API_KEY'];

let hasErrors = false;

// Check required variables
required.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ ${key} is missing`);
    hasErrors = true;
  } else {
    console.log(`✅ ${key} is set`);
  }
});

// Check optional variables
optional.forEach(key => {
  if (!process.env[key]) {
    console.warn(`⚠️  ${key} is not set (optional but recommended)`);
  } else {
    console.log(`✅ ${key} is set`);
  }
});

if (hasErrors) {
  console.log('\n❌ Some required environment variables are missing!');
  console.log('Please create a .env file with the required variables.');
  console.log('See .env.example for reference.\n');
  process.exit(1);
} else {
  console.log('\n✅ All required environment variables are set!\n');
}


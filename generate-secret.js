// Helper script to generate a secure JWT secret
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
console.log('\n🔐 Generated JWT Secret:');
console.log(secret);
console.log('\n📝 Add this to your .env file:');
console.log(`JWT_SECRET=${secret}\n`);


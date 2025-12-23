# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create .env File

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here_make_it_long_and_random
```

### Getting Your OpenAI API Key:
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new secret key
5. Copy and paste it in your `.env` file

### Generating a JWT Secret:
You can use any long random string. For example:
- Use an online generator: https://randomkeygen.com/
- Or generate using Node.js: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## Step 3: Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

## Step 4: Open in Browser

Navigate to: `http://localhost:3000`

## 🎉 You're Ready!

1. Register a new account
2. Start building your resume
3. Use AI suggestions to improve your content
4. Export as PDF

## 📝 Notes

- The app uses in-memory storage by default (data resets on server restart)
- For production, consider upgrading to MongoDB
- Make sure your OpenAI API key has credits
- JWT tokens expire after 7 days

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy, change it in `.env`:
```env
PORT=3001
```

### OpenAI API Errors
- Check your API key is correct
- Ensure you have credits in your OpenAI account
- Verify the API key has proper permissions

### Module Not Found
Run `npm install` again to ensure all dependencies are installed.


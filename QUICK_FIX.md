# 🚨 Quick Fix Guide - Registration/Login Failed

## Step 1: Check if Server is Running

Open a terminal and run:
```bash
npm start
```

You should see: `🚀 Server running on http://localhost:3000`

If you see an error about `JWT_SECRET`, go to Step 2.

## Step 2: Check .env File

Make sure you have a `.env` file in the root directory with:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key_here
```

### Generate JWT Secret:
```bash
node generate-secret.js
```

Copy the generated secret and add it to your `.env` file.

## Step 3: Verify Environment Variables

Run this command to check if everything is configured:
```bash
node check-env.js
```

You should see all ✅ green checkmarks.

## Step 4: Restart Server

After fixing the `.env` file:
1. Stop the server (Ctrl+C)
2. Start again: `npm start`

## Step 5: Test in Browser

1. Open browser console (F12)
2. Go to Network tab
3. Try to register/login
4. Check the Network tab for the API request
5. Click on the request to see the error details

## Common Issues:

### Issue: "JWT_SECRET is not configured"
**Fix:** Add JWT_SECRET to your .env file

### Issue: "Network error" or "Failed to fetch"
**Fix:** 
- Make sure server is running
- Check the URL is `http://localhost:3000`
- Check browser console for CORS errors

### Issue: Server won't start
**Fix:**
- Make sure you're in the project directory
- Run `npm install` first
- Check Node.js version (should be 14+)

## Still Not Working?

1. **Check server logs** - Look at the terminal where server is running
2. **Check browser console** - Press F12, go to Console tab
3. **Check Network tab** - See what error the API is returning

---

**Most Common Fix:** Make sure `.env` file exists and has `JWT_SECRET` set!


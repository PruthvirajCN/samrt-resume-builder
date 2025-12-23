# 🔧 Troubleshooting Guide

## Login/Registration Issues

### Issue: "Email already exists" when trying to register

**Possible Causes:**
1. You've already registered with this email
2. Server was restarted and you're trying to register again (in-memory storage resets)
3. Email case sensitivity issue (now fixed)

**Solutions:**
- If you've already registered, use the **Login** page instead
- If server was restarted, you'll need to register again (data is stored in memory)
- Try using lowercase email addresses
- Clear your browser's localStorage if needed

### Issue: "Invalid email or password" when logging in

**Possible Causes:**
1. Wrong email or password
2. Server was restarted (users are stored in memory)
3. Email has extra spaces or wrong case

**Solutions:**
- Double-check your email and password
- Make sure there are no extra spaces in the email field
- Try registering again if the server was restarted
- Check browser console for detailed error messages

### Issue: Can't login after registration

**Possible Causes:**
1. Server restarted (in-memory storage lost)
2. Email/password mismatch
3. Network error

**Solutions:**
1. **Check if server is running:**
   ```bash
   npm start
   ```

2. **Verify your credentials:**
   - Make sure you're using the exact same email you registered with
   - Check for typos in password

3. **Clear browser data:**
   - Open browser DevTools (F12)
   - Go to Application/Storage tab
   - Clear LocalStorage
   - Try registering again

4. **Check server logs:**
   - Look at the terminal where the server is running
   - Check for any error messages

## Common Issues

### Server won't start

**Error: "Port 3000 already in use"**
- Change PORT in `.env` file to another number (e.g., 3001)
- Or stop the process using port 3000

### OpenAI API errors

**Error: "OpenAI API key not configured"**
- Make sure `.env` file exists in root directory
- Check that `OPENAI_API_KEY` is set correctly
- Restart the server after changing `.env`

**Error: "Failed to get AI suggestion"**
- Verify your OpenAI API key has credits
- Check API key permissions
- Make sure the key is valid

### PDF Export not working

**Issue: PDF download doesn't start**
- Check browser console for errors
- Make sure jsPDF library is loaded
- Try a different browser

### Dark mode not persisting

**Issue: Theme resets on page reload**
- Check browser localStorage is enabled
- Clear browser cache and try again

## Debugging Steps

1. **Check Server Status:**
   ```bash
   # Make sure server is running
   npm start
   ```

2. **Check Environment Variables:**
   ```bash
   # Verify .env file exists and has correct values
   cat .env
   ```

3. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for any error messages

4. **Check Network Tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Try logging in/registering
   - Check if API requests are successful

5. **Test API Endpoints:**
   ```bash
   # Test registration
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123"}'
   
   # Test login
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123"}'
   ```

## Still Having Issues?

1. **Restart the server:**
   ```bash
   # Stop server (Ctrl+C)
   # Start again
   npm start
   ```

2. **Clear all data:**
   - Stop server
   - Clear browser localStorage
   - Restart server
   - Register again

3. **Check for updates:**
   - Make sure all dependencies are installed: `npm install`
   - Check Node.js version (should be 14+)

4. **Verify file structure:**
   - Make sure all files are in correct locations
   - Check that `.env` file is in root directory

---

**Note:** This app uses in-memory storage, so all data is lost when the server restarts. For production use, upgrade to MongoDB or another database.


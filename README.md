# 🚀 Smarter Resume Builder with AI Suggestions

A modern, AI-powered resume builder that creates ATS-friendly resumes with intelligent suggestions, multiple professional templates, and instant PDF export.

## ✨ Features

- **🔐 Secure Authentication** - JWT-based authentication with bcrypt password hashing
- **🤖 AI-Powered Suggestions** - OpenAI integration for resume content optimization
- **📄 Multiple ATS-Friendly Templates** - 4 professional templates (Minimal, Modern, Corporate, Clean Creative)
- **👁️ Live Preview** - Real-time resume preview as you type
- **📥 PDF Export** - One-click PDF download with clean formatting
- **🌓 Dark/Light Mode** - Toggle between themes for comfortable editing
- **📱 Fully Responsive** - Works seamlessly on all devices
- **🎨 Modern UI/UX** - Beautiful gradient backgrounds and smooth animations

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### AI
- **OpenAI API** - GPT-3.5 for resume suggestions

### Other
- **jsPDF** - PDF generation
- **LocalStorage** - Client-side data storage (can be upgraded to MongoDB)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   OPENAI_API_KEY=your_openai_api_key_here
   JWT_SECRET=your_jwt_secret_here_make_it_long_and_random
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
resume/
├── backend/
│   ├── models/
│   │   └── User.js          # User model
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   └── routes/
│       ├── auth.js          # Authentication routes
│       ├── resume.js        # Resume CRUD routes
│       └── ai.js            # AI suggestion routes
├── frontend/
│   ├── assets/
│   │   └── favicon.svg      # Favicon
│   ├── js/
│   │   ├── main.js          # Landing page logic
│   │   ├── auth.js          # Authentication logic
│   │   ├── dashboard.js     # Resume builder logic
│   │   ├── ai.js            # AI suggestion logic
│   │   ├── templates.js     # Resume templates
│   │   └── pdf.js           # PDF export logic
│   ├── styles/
│   │   └── main.css         # Custom styles
│   ├── index.html           # Landing page
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   └── dashboard.html       # Resume builder dashboard
├── server.js                # Express server
├── package.json             # Dependencies
├── .env.example            # Environment variables example
└── README.md               # This file
```

## 🎯 Usage

### 1. Create an Account
- Navigate to the registration page
- Enter your email and password
- You'll be automatically logged in

### 2. Build Your Resume
- Fill in your personal information
- Add professional summary (use AI suggestions for optimization)
- Add skills, experience, education, projects, and certifications
- Switch between templates to find your preferred style

### 3. Get AI Suggestions
- Click "Get AI Suggestion" on any text field
- Review the AI-generated improvement
- Accept or reject the suggestion

### 4. Export Your Resume
- Click "Export PDF" button
- Your resume will be downloaded as a clean PDF

## 🔒 Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens for secure authentication
- Protected API routes with authentication middleware
- Environment variables for sensitive data (never hardcoded)

## 🎨 Templates

All templates are ATS-friendly with:
- Standard fonts (Arial, Helvetica)
- No icons in resume body
- Proper heading hierarchy
- Clean formatting
- A4 page size compatibility

### Available Templates:
1. **Minimal** - Clean and simple
2. **Modern** - Gradient header with modern styling
3. **Corporate** - Professional and formal
4. **Clean Creative** - Balanced creative and professional

## 🤖 AI Features

The AI suggestion feature:
- Improves grammar and wording
- Optimizes for ATS systems
- Suggests action verbs
- Enhances professional tone
- Provides ATS-friendly keywords

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Resume
- `GET /api/resume` - Get user's resume (protected)
- `POST /api/resume` - Save user's resume (protected)

### AI
- `POST /api/ai/suggest` - Get AI suggestion (protected)

## 🚀 Deployment

### Environment Variables
Make sure to set these in your production environment:
- `PORT` - Server port
- `OPENAI_API_KEY` - Your OpenAI API key
- `JWT_SECRET` - A long, random secret for JWT signing

### Recommended Platforms
- **Heroku** - Easy deployment with Git
- **Vercel** - Great for frontend + serverless
- **Railway** - Simple Node.js deployment
- **DigitalOcean** - Full control VPS

## 🔧 Development

### Running in Development Mode
```bash
npm run dev
```

This uses `nodemon` for automatic server restarts.

### Adding New Templates
1. Add template function in `frontend/js/templates.js`
2. Add option to template selector in `dashboard.html`
3. Update `renderTemplate()` function

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 🙏 Acknowledgments

- OpenAI for GPT API
- Tailwind CSS for styling framework
- jsPDF for PDF generation

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Built with ❤️ for students and job seekers**  

<img width="1920" height="1080" alt="Screenshot 2025-12-23 091643" src="https://github.com/user-attachments/assets/582ca6a1-dd1f-4205-a4e9-ba6a7c726acf" />

<img width="1920" height="1080" alt="Screenshot 2025-12-23 091655" src="https://github.com/user-attachments/assets/2c4ddf91-d8db-4ea5-bac2-f0bced6b35d8" />

<img width="1920" height="1080" alt="Screenshot 2025-12-23 091743" src="https://github.com/user-attachments/assets/9002cf85-fbd6-49d7-8328-106d179b1fe1" />


live demo: https://samrt-resume-builder.vercel.app/

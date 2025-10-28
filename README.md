# 🎈 Lecture Summarizer AI

> Transform your lectures into clear, actionable study notes—automatically.

A real-time AI-powered lecture transcription and summarization tool built by students, for students. Never miss important points or spend hours reviewing recordings again.

[![Built with React](https://img.shields.io/badge/React-19.2-61dafb?style=flat&logo=react)](https://react.dev/)
[![Powered by Gemini](https://img.shields.io/badge/Gemini-AI-4285f4?style=flat&logo=google)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?style=flat&logo=vite)](https://vitejs.dev/)

---

## ✨ Features

### 🎤 Real-Time Transcription
- Live audio capture during lectures
- Accurate speech-to-text powered by Google Gemini
- Works for in-person and online classes

### 📝 Intelligent Summarization
- AI generates concise bullet-point summaries as you record
- Contextual understanding using your textbook content
- Continuous updates throughout the lecture

### 📚 Textbook Integration
- Optional: Upload relevant textbook sections
- AI uses context to improve summary quality
- Better understanding of technical terms and concepts

### 💾 Export & Share
- Download as PDF or plain text
- One-click copy to clipboard
- Share summaries with classmates
- Review anytime, anywhere

### 🎨 Minimal Design
- Clean, distraction-free interface
- Award-worthy minimal aesthetic
- Retro floating balloons on landing page
- Ultra-light typography and maximum whitespace

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- A [Google Gemini API key](https://ai.google.dev/)
- Microphone access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rashil9955/lecture-summarizer-ai.git
   cd lecture-summarizer-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   VITE_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📖 How to Use

### Step 1: Start Recording
Click on the **"Start Summarization"** balloon on the home page.

### Step 2: Add Context (Optional)
- Upload a textbook section or chapter
- Paste relevant content
- Or skip and let AI work solo

### Step 3: Record Your Lecture
- Grant microphone permissions
- Watch live transcription appear in real-time
- See AI-generated summaries update automatically

### Step 4: Export & Study
- Stop recording when lecture ends
- Get a comprehensive final summary
- Export as PDF, text, or copy to clipboard

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### AI & Audio
- **Google Gemini 2.5 Flash** - AI summarization
- **Gemini Live API** - Real-time transcription
- **Web Audio API** - Audio processing

### Export
- **jsPDF** - PDF generation
- **Web Share API** - Native sharing

---

## 📁 Project Structure

```
lecture-summarizer-ai/
├── components/
│   ├── About.tsx           # About page with creator info
│   ├── ContextPrompt.tsx   # Context decision screen
│   ├── FinalSummary.tsx    # Summary display & export
│   ├── LectureSetup.tsx    # Textbook input form
│   ├── LiveLectureView.tsx # Real-time recording UI
│   └── Welcome.tsx         # Landing page with balloons
├── utils/
│   └── audio.ts            # Audio processing utilities
├── types.ts                # TypeScript definitions
├── App.tsx                 # Main app component
├── index.tsx               # App entry point
├── index.html              # HTML template
├── vite-env.d.ts          # Vite environment types
├── .env.local             # Environment variables (create this)
└── package.json           # Dependencies
```

---

## 🎨 Design Philosophy

This app follows a **retro-minimalist** design aesthetic:

- **Whitespace is King** - Generous spacing everywhere
- **Typography First** - Ultra-light Inter font (200-300 weights)
- **Minimal Color** - White, black, and soft pastels only
- **Playful Elements** - Floating balloons with realistic physics
- **Ghost Buttons** - Transparent → filled on hover
- **Professional Feel** - Award-worthy presentation

Inspired by: Design Is Yummy, Apple Design, Stripe, Linear

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | Your Google Gemini API key | Yes |

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new project (if needed)
4. Copy your API key
5. Add it to `.env.local`

---

## 🐛 Troubleshooting

### Microphone Not Working
- Check browser permissions (Settings → Privacy → Microphone)
- Ensure Chrome/Firefox has access
- Try refreshing the page

### No Transcription Appearing
- Verify API key is set correctly in `.env.local`
- Check browser console for errors
- Ensure you're speaking clearly into microphone

### TypeScript Errors
- Make sure `vite-env.d.ts` exists in project root
- Restart TypeScript server: `Cmd+Shift+P` → "Restart TS Server"
- Reload VS Code window

### App Not Loading
- Clear browser cache
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Check terminal for build errors

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Then drag the dist/ folder to netlify.com/drop
```

**Important:** Remember to add `VITE_API_KEY` to your deployment platform's environment variables!

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Keep components minimal and functional
- Maintain the design aesthetic
- Test with real lectures before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 About the Creator

**Rashil Shibakoti**  
Junior, Computer Science & Data Science  
South Dakota State University

This project was born from a tough semester of working two jobs while juggling CS classes. I built Lecture Summarizer AI to help busy students like me who record lectures but never have time to review them. My goal is to make learning more efficient by turning long, unstructured lectures into clear summaries you can actually use.

### Connect
- LinkedIn: [rashilshibakoti](https://www.linkedin.com/in/rashilshibakoti/)
- GitHub: [@rashil9955](https://github.com/rashil9955)

---

## 🙏 Acknowledgments

- **Google Gemini** - For powerful AI capabilities
- **React Team** - For an amazing framework
- **Tailwind CSS** - For beautiful, minimal styling
- **Design Is Yummy** - Design inspiration
- **SDSU CS Department** - For the education and support

---

## 📊 Roadmap

- [ ] **Past Recordings** - Browse and search old summaries
- [ ] **Multi-language Support** - Transcribe in multiple languages
- [ ] **Lecture Notes Integration** - Combine summaries with manual notes
- [ ] **Study Mode** - Generate quizzes from summaries
- [ ] **Team Collaboration** - Share and collaborate on notes
- [ ] **Mobile App** - iOS and Android versions
- [ ] **Calendar Integration** - Auto-organize by class schedule

---

## 💡 Why This Exists

Lectures move fast. Professors race through slides, explain concepts verbally, and move on. Students are left with:
- ❌ Incomplete notes
- ❌ Hours of unreviewed recordings  
- ❌ Gaps in understanding
- ❌ Stress from falling behind

**Lecture Summarizer AI fixes this.**

✅ Captures everything in real-time  
✅ Generates clear, organized summaries  
✅ No more frantic note-taking  
✅ Study smarter, not harder

---

## ⭐ Star This Repo

If this tool helped you, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 📢 Sharing with classmates

---

<div align="center">

**Built with ❤️ by students, for students**

[Get Started](https://github.com/rashil9955/lecture-summarizer-ai) • [Report Bug](https://github.com/rashil9955/lecture-summarizer-ai/issues) • [Request Feature](https://github.com/rashil9955/lecture-summarizer-ai/issues)

</div>

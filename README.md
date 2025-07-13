# 📚 సంభాషణ | Sambhashana

A React-based Progressive Web App (PWA) designed to help Telugu-speaking housewives learn spoken English through daily interactive lessons.

## 🌟 Features

- **60-Day Structured Learning**: Complete 60-day lesson plan with increasing complexity
- **Interactive Chat Lessons**: Embedded ChatGPT web UI for practical English practice
- **Video Lessons**: YouTube video lessons embedded within the app
- **No API Costs**: Uses embedded web UIs instead of direct API calls
- **No Authentication Required**: Optional login for enhanced features
- **Telugu-Friendly UI**: Complete interface in Telugu with English translations
- **Progress Tracking**: Local storage-based progress tracking and streak counting
- **Daily Notifications**: Reminder notifications for daily lessons
- **PWA Support**: Installable as a mobile app
- **Offline Capability**: Works offline except for chat and video features
- **Voice Support**: Text-to-speech and speech-to-text capabilities

## 🎯 Target Audience

Telugu-speaking housewives who want to:

- Learn practical spoken English
- Improve communication skills
- Build confidence in English conversations
- Access lessons at their own pace
- Use free, embedded learning tools without API costs

## 🔄 Embedded Approach

This app uses embedded web UIs instead of direct API calls to:

- **Eliminate API Costs**: No OpenAI or YouTube API billing
- **Reduce Backend Dependencies**: No server-side API management
- **Simplify Authentication**: Optional login for enhanced features
- **Maintain Functionality**: Full ChatGPT and YouTube integration

### How It Works

1. **ChatGPT Lessons**:

   - Embeds `https://chat.openai.com/chat` in an iframe
   - Provides lesson prompts for easy copying
   - Optional login for conversation history

2. **YouTube Lessons**:

   - Embeds YouTube videos using iframe
   - No YouTube Data API required
   - Works with or without YouTube login

3. **Progress Tracking**:
   - Manual completion tracking via "Mark Complete" buttons
   - Local storage-based progress management
   - No server-side data storage required

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sambhashana-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Optional: Login to ChatGPT/YouTube**

   - You can optionally log in to ChatGPT or YouTube for enhanced features
   - Login is not required to use the app
   - If you're already logged in, your progress will continue seamlessly

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 PWA & Mobile App Setup

### Web PWA

The app is configured as a Progressive Web App and can be installed on mobile devices through the browser.

### Capacitor (Native Apps)

1. **Add Capacitor platforms**

   ```bash
   npm run cap:add
   ```

2. **Sync with native platforms**

   ```bash
   npm run cap:sync
   ```

3. **Open native IDEs**

   ```bash
   # For Android
   npm run cap:open:android

   # For iOS
   npm run cap:open:ios
   ```

## 📚 Lesson Structure

### Lesson Types

- **Chat Lessons**: Interactive conversations with AI tutor
- **Video Lessons**: YouTube video lessons with progress tracking
- **Review Lessons**: Every 5th lesson includes review and testing

### Lesson Topics

1. Basic greetings and introductions
2. Family conversations
3. Shopping and market interactions
4. Kitchen and cooking vocabulary
5. Transportation and directions
6. Health and doctor visits
7. Banking and financial transactions
8. Phone conversations
9. School and parent-teacher meetings
10. Neighbor interactions
11. Restaurant ordering
12. Mall shopping
13. Traffic and road safety
14. Postal services
15. Emergency situations
16. Weather discussions
17. Job and career conversations
18. Future planning
19. Cultural discussions
20. Confidence building

## 🛠️ Technical Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Hooks + Local Storage
- **PWA**: Vite PWA Plugin
- **Mobile**: Capacitor
- **AI Integration**: Embedded ChatGPT Web UI
- **Notifications**: Capacitor Local Notifications
- **Icons**: React Icons

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatGPTEmbed.tsx
│   ├── YouTubeEmbed.tsx
│   ├── LessonHeader.tsx
│   ├── LessonComplete.tsx
│   └── ProgressBar.tsx
├── pages/              # Main application pages
│   ├── Home.tsx
│   ├── Lesson.tsx
│   └── Completed.tsx
├── services/           # Business logic services
│   ├── LessonScheduler.ts
│   └── NotificationService.ts
├── hooks/              # Custom React hooks
│   ├── useLessonProgress.ts
│   └── useNotifications.ts
├── utils/              # Utility functions
│   ├── dateHelpers.ts
│   ├── storageHelpers.ts
│   └── promptCopier.ts
└── data/               # Static data
    └── lessons.json
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configurations:

```env
VITE_APP_NAME=Sambhashana
```

### PWA Configuration

The app includes:

- Service worker for offline functionality
- App manifest for PWA installation
- Proper meta tags for mobile optimization

## 📊 Progress Tracking

The app tracks:

- Completed lessons
- Daily streaks
- Overall progress percentage
- Lesson completion dates
- Manual lesson completion tracking

## 🔔 Notifications

- Daily lesson reminders at 9:00 AM
- Progress milestone notifications
- Streak achievement notifications

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📱 Mobile Support

- iOS 12+
- Android 8+
- PWA installation support
- Native app deployment via Capacitor

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for ChatGPT web interface
- YouTube for video lesson content
- Telugu language community for feedback
- React and Vite communities for excellent tooling

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**సంభాషణ | Sambhashana** - Empowering Telugu-speaking housewives to learn English, one lesson at a time! 🌟

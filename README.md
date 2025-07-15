# Baby Names App 💕

A responsive, mobile-first web application where couples can swipe through baby names (like Tinder), match on liked names, and build a shared shortlist together. Features real-time synchronization and a beautiful, modern UI optimized for mobile devices.

![Baby Names App](https://via.placeholder.com/800x400/e85d75/ffffff?text=Baby+Names+App)

## 🌟 Features

### Core Functionality
- **Tinder-style Swipe Interface**: Smooth swipe gestures with spring physics animations
- **Real-time Partner Synchronization**: See matches instantly when both partners like the same name
- **Partner Invitation System**: Connect with your partner using unique invite codes
- **Comprehensive Name Database**: Curated baby names with origins, meanings, and popularity scores
- **Match Celebration**: Beautiful "It's a match!" animations with confetti effects
- **Shared Shortlist**: View and manage your matched names with notes

### User Experience
- **Mobile-First Design**: Optimized for iOS and Android devices
- **Smooth Animations**: Spring physics for natural, responsive interactions
- **Beautiful UI**: Soft pastels, gradients, and modern design language
- **Gender Filtering**: Filter names by boy, girl, or gender-neutral
- **Search Functionality**: Find specific names quickly
- **Offline-Ready**: Progressive Web App (PWA) support

### Technical Features
- **Authentication**: Secure email/password login with Supabase Auth
- **Real-time Updates**: Live synchronization using Supabase Realtime
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works seamlessly across all device sizes
- **Performance Optimized**: Lazy loading and efficient data fetching

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Styled Components** for styling and theming
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend & Database
- **Supabase** for backend services
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security (RLS)
- **Node.js** with Express (optional API layer)

### Deployment
- **Vercel** for frontend hosting
- **Supabase** for backend infrastructure

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd baby-names-app
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **API** and copy your project URL and anon key
3. Run the database schema in the SQL editor:
   ```bash
   # Copy contents of backend/data/schema.sql and run in Supabase SQL editor
   ```
4. Insert sample data:
   ```bash
   # Copy contents of backend/data/sample_names.sql and run in Supabase SQL editor
   ```

### 3. Configure Environment Variables

Create `frontend/.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Install Dependencies and Run

```bash
# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📱 Usage Guide

### Getting Started
1. **Sign Up**: Create your account with email and password
2. **Invite Partner**: Generate an invite code and share with your partner
3. **Start Swiping**: Browse through baby names and swipe right to like, left to pass
4. **Get Matches**: When both partners like the same name, you'll get a match notification
5. **Manage Shortlist**: View your matches, add notes, and organize your favorites

### Swipe Controls
- **Swipe Right** or **Tap ❤️**: Like the name
- **Swipe Left** or **Tap ✖️**: Pass on the name
- **Tap Info**: View detailed information about the name
- **Filter**: Use gender filters to customize your browsing

### Partner Features
- **Invite Codes**: 6-character unique codes that expire in 7 days
- **Real-time Sync**: See matches instantly across both devices
- **Shared Notes**: Add collaborative notes to your matched names

## 🏛️ Database Schema

### Tables
- **users**: User profiles and partner relationships
- **baby_names**: Curated name database with metadata
- **user_swipes**: Individual swipe history
- **matches**: Shared liked names between partners
- **partner_invites**: Invitation system for connecting partners

### Key Features
- Row Level Security (RLS) for data protection
- Real-time subscriptions for live updates
- Optimized indexes for fast queries
- Automatic timestamp management

## 🎨 Design System

### Color Palette
- **Primary**: Soft pink gradients (#e85d75 → #f8b8c0)
- **Secondary**: Gentle blue tones (#0ea5e9 → #7dd3fc)
- **Background**: Warm gradient (#fef7f7 → #f0f9ff)
- **Typography**: Inter (primary), Poppins (headings)

### Mobile-First Approach
- Touch-friendly 44px minimum touch targets
- Optimized for swipe gestures
- Responsive breakpoints for all screen sizes
- iOS and Android specific optimizations

## 🔧 Development

### Project Structure
```
baby-names-app/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API and Supabase client
│   │   ├── styles/        # Theme and global styles
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Helper functions
│   └── public/            # Static assets
├── backend/
│   ├── data/              # Database schema and sample data
│   └── src/               # Optional Express API (if needed)
└── docs/                  # Documentation
```

### Code Quality
- **ESLint** and **Prettier** for code formatting
- **TypeScript** for type safety
- **Component-driven** architecture
- **Custom hooks** for state management
- **Styled Components** for maintainable CSS

### Testing Strategy
- Unit tests for business logic
- Integration tests for API functions
- Component testing with React Testing Library
- End-to-end testing for critical user flows

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build for production
cd frontend
npm run build

# Deploy to Vercel
npm install -g vercel
vercel
```

### Environment Variables (Production)
Set these in your Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### PWA Features
- Offline support for basic functionality
- App-like installation on mobile devices
- Fast loading with service workers
- Push notifications (future feature)

## 🔮 Future Enhancements

### Planned Features
- **Push Notifications**: Real-time match alerts
- **Name Collections**: Organize names by themes
- **Family Integration**: Connect with extended family for input
- **Name Analytics**: Popularity trends and statistics
- **Social Features**: Share favorite names with friends
- **Voice Notes**: Audio recordings for name pronunciation

### Technical Improvements
- **React Native**: Native mobile app wrapper
- **AI Recommendations**: Suggest names based on preferences
- **Advanced Filtering**: Sort by popularity, origin, length
- **Backup & Sync**: Cloud backup of preferences
- **Analytics**: User behavior tracking (privacy-focused)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Getting Involved
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Areas for Contribution
- New name data and origins
- UI/UX improvements
- Performance optimizations
- Accessibility enhancements
- Translation and i18n

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Name Data**: Curated from public baby name registries
- **Design Inspiration**: Modern mobile app patterns
- **Open Source**: Built with amazing open source tools
- **Community**: Thanks to all contributors and users

## 📞 Support

- **Documentation**: [Wiki](wiki-url)
- **Issues**: [GitHub Issues](issues-url)
- **Discussions**: [GitHub Discussions](discussions-url)
- **Email**: support@babynamesapp.com

---

Made with ❤️ for expecting parents everywhere
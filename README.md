# 🎮 Game Database

A modern and responsive React application for discovering and exploring video games. Built with TypeScript, Vite, and Tailwind CSS, this application provides a beautiful interface to search through a comprehensive game database.

## ✨ Features

- **🔍 Real-time Search**: Debounced search functionality for smooth user experience
- **🎨 Beautiful UI**: Modern design with animated cards and particle effects
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎯 Game Details**: Detailed view for each game with rich information
- **🏷️ Smart Filtering**: Search games by name with intelligent results
- **💫 Smooth Animations**: Engaging transitions and hover effects

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support
- **Development**: Hot Module Replacement (HMR)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/game-database.git
   cd game-database
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_ENDPOINT=your_api_endpoint_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorMessage.tsx # Error handling component
│   ├── GameCard.tsx     # Individual game card display
│   ├── GameDetails.tsx  # Detailed game information modal
│   ├── Search.tsx       # Search input component
│   └── Spinner.tsx      # Loading spinner component
├── hooks/               # Custom React hooks
│   └── useFetch.ts      # Generic fetch hook with loading states
├── services/            # API integration
│   └── api.ts           # Game API service functions
├── types/               # TypeScript type definitions
│   ├── Game.interface.ts        # Game data structures
│   └── GameDetails.interface.ts # Detailed game information types
├── utils/               # Utility functions
│   └── utils.ts         # Helper functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎨 Features in Detail

### Search Functionality
- **Debounced Search**: 500ms delay to prevent excessive API calls
- **Real-time Results**: Instant feedback as you type
- **Empty State Handling**: Beautiful welcome screen and no-results state

### Game Cards
- **Hover Effects**: Smooth scale and elevation animations
- **Gradient Overlays**: Dynamic color effects on interaction
- **Responsive Layout**: Adapts to different screen sizes
- **Image Fallbacks**: Graceful handling of missing images

### Performance Optimizations
- **Memoized Components**: Optimized re-rendering with React.memo
- **Debounced API Calls**: Reduced server load and improved UX
- **Lazy Loading**: Efficient resource management

## 🌐 API Integration

The application integrates with a game database API that provides:
- Game search functionality
- Detailed game information
- Game metadata (ratings, platforms, genres, etc.)

API endpoints:
- `GET /games?search={query}` - Search games
- `GET /games/{slug}` - Get detailed game information

## 🔧 Configuration

### Environment Variables
- `VITE_API_ENDPOINT` - The base URL for your game database API

### Tailwind CSS
The project uses Tailwind CSS 4.x with custom animations and utilities. Configuration can be found in the Vite config.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ruben** - - [Ruben O. Alvarado](https://github.com/RubenOAlvarado)
- [LinkedIn](https://www.linkedin.com/in/ruben-alvarado-molina-9020010/)
- [X (twitter)](https://twitter.com/RubenOAlvarado)
- [Instagram](https://www.instagram.com/alvaradorubo/)

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for an amazing development experience
- Styled with [Tailwind CSS](https://tailwindcss.com/) for rapid UI development
- Powered by [React](https://reactjs.org/) for a robust component architecture

---

⭐ If you found this project helpful, please consider giving it a star!

# VentureForge Frontend

Modern, responsive frontend for the VentureForge research paper analysis platform.

## Features

- 📄 Drag-and-drop PDF upload
- 🎯 Real-time analysis progress tracking
- 📊 Beautiful results visualization
- 🎨 Modern gradient UI with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Fast and optimized performance

## Tech Stack

- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build
```

The application will open at `http://localhost:3000`

## Configuration

Make sure your backend is running on `http://localhost:5000` (or update the API URL in `UploadSection.jsx`)

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Header with branding
│   ├── UploadSection.jsx   # File upload interface
│   ├── AnalysisProgress.jsx # Progress tracking
│   ├── ResultsSection.jsx  # Results display
│   └── Footer.jsx          # Footer component
├── App.jsx                 # Main app component
├── index.css               # Global styles
└── main.jsx                # Entry point
```

## Color Scheme

- **Primary**: Sky Blue (50-900)
- **Accent**: Purple (50-900)
- **Background**: Gradient from primary-900 to accent-900

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

# 🌐 NexusHub - Advanced Web Proxy

A modern, feature-rich web proxy with a sleek React UI and scramjet-powered backend. Browse the web securely with a beautiful dark-themed interface featuring purple and black colors.

## ✨ Features

- 🎨 **Modern React UI** - Beautiful dark theme with purple and black color scheme
- ⚡ **Scramjet-Powered Backend** - Efficient stream-based proxy server
- 📑 **Tab System** - Multiple tabs with keyboard shortcuts
- 🔍 **Custom Search Bar** - Search with Google, DuckDuckGo, or Bing
- ⌨️ **Keyboard Navigation** - Full keyboard support with arrow keys and shortcuts
- 🔒 **Secure Browsing** - CORS-enabled proxy for privacy
- 📱 **Responsive Design** - Works on desktop and mobile browsers

## 🎮 Keyboard Shortcuts

- **Ctrl + T** - Open new tab
- **Ctrl + W** - Close current tab
- **Ctrl + Tab** - Next tab
- **Ctrl + Shift + Tab** - Previous tab

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

```bash
cd nexushub
npm run install-all
```

### Development

Start both server and client:

```bash
npm run dev
```

The server runs on `http://localhost:5000` and the client on `http://localhost:3000`

### Production Build

```bash
npm run build
npm run server
```

## 📁 Project Structure

```
nexushub/
├── server/              # Express backend
│   └── index.js        # Proxy server with scramjet
├── client/             # React frontend
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # React components
│       ├── App.js      # Main app component
│       └── App.css     # Global styles
├── package.json        # Root dependencies
└── README.md          # This file
```

## 🔧 Architecture

### Backend (server/index.js)
- **Express Server** - Handles API routes and proxy requests
- **Scramjet Streams** - Efficient data streaming for responses
- **CORS Support** - Enables cross-origin requests
- **Search Integration** - Multiple search engine support

### Frontend (client/)
- **React Components** - Modular UI structure
- **Tab Management** - State-based tab system
- **Keyboard Events** - Arrow key and shortcut support
- **CSS-in-JS Styling** - Scoped component styles
- **IFrame Proxy** - Embedded website viewing

## 🎨 Color Scheme

- **Primary Purple**: #7c3aed
- **Dark Background**: #0a0015
- **Secondary Purple**: #a78bfa
- **Text**: #e0e0e0

## 📝 API Endpoints

- `POST /api/proxy` - Proxy a request to a URL
- `GET /api/search` - Search with a specific engine

## 🔐 Security Notes

- Uses sandboxed iframes for webpage isolation
- Includes User-Agent spoofing for better site compatibility
- CORS-enabled for flexible cross-origin requests

## 📦 Dependencies

### Server
- express - Web framework
- scramjet - Stream processing
- cors - Cross-Origin Resource Sharing
- node-fetch - HTTP requests
- http-proxy - HTTP proxying

### Client
- react - UI library
- react-dom - React DOM rendering
- axios - HTTP client

## 📄 License

MIT

---

**Made with ⚡ by NexusHub**

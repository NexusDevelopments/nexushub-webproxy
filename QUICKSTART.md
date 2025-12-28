# NexusHub Development Guide

## Quick Start Commands

```bash
# Install all dependencies
cd /workspaces/codespaces-blank/nexushub
npm run install-all

# Start development mode (both frontend & backend)
npm run dev

# Start only server
npm run server

# Start only client
cd client && npm start

# Build for production
npm run build
```

## What You Get

✅ **Modern Dark Theme** - Purple (#7c3aed) and black color scheme inspired by Premium OS unblockers
✅ **Tab System** - Multiple browsing tabs with keyboard shortcuts (Ctrl+T, Ctrl+W, Ctrl+Tab)
✅ **Search Bar** - Multi-engine search (Google, DuckDuckGo, Bing)
✅ **Arrow Key Navigation** - Full keyboard support
✅ **Proxy Backend** - Scramjet-powered streaming proxy server
✅ **Responsive Design** - Works on desktop and modern browsers
✅ **Secure** - Sandboxed iframes and CORS-enabled

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + T` | New Tab |
| `Ctrl + W` | Close Tab |
| `Ctrl + Tab` | Next Tab |
| `Ctrl + Shift + Tab` | Previous Tab |

## Project Files

```
nexushub/
├── server/
│   └── index.js              # Express + Scramjet proxy server
├── client/
│   ├── public/
│   │   └── index.html        # React app entry
│   └── src/
│       ├── App.js            # Main app component
│       ├── App.css           # Global styles (purple & black)
│       └── components/
│           ├── SearchBar.js  # Multi-engine search
│           ├── TabBar.js     # Tab management
│           ├── UrlBar.js     # URL input
│           └── ProxyFrame.js # Iframe proxy viewer
├── package.json              # Root dependencies
└── README.md                 # Full documentation
```

## Next Steps

1. Open terminal: `cd /workspaces/codespaces-blank/nexushub`
2. Run: `npm run dev`
3. Open: http://localhost:3000
4. Try searching or entering a URL!

## Features Ready to Use

- 🎨 Purple & black UI with smooth animations
- 🔍 Multi-engine search functionality
- 📑 Unlimited tabs
- ⌨️ Full keyboard navigation
- 🔒 Secure proxy with iframes
- 🌐 Scramjet-powered streaming backend
- 📱 Modern responsive design

Enjoy NexusHub! 🚀

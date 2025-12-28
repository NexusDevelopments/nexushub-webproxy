# 🌐 NexusHub - Advanced Web Proxy

A fast, modern web proxy built with **Next.js** and optimized for **Vercel deployment**. Features a sleek React UI with purple/black theme, tab system, keyboard navigation, and DuckDuckGo search integration.

## ✨ Features

- 🎨 **Modern React UI** - Beautiful dark theme with purple and black color scheme
- 🚀 **Next.js & Vercel** - Lightning-fast serverless deployment
- 📑 **Tab System** - Multiple tabs with keyboard shortcuts (Ctrl+T, Ctrl+W, etc.)
- 🔍 **DuckDuckGo Search** - Secure, private search integration
- ⌨️ **Keyboard Navigation** - Full arrow key and shortcut support
- 🔒 **Secure Proxy** - CORS-enabled with sandboxed iframes
- 📱 **Full Mobile Support** - Responsive design for all devices (desktop, tablet, mobile)
- 🌍 **Custom Domain Ready** - Easy FreeDNS setup for custom domains

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

## � Vercel Deployment

### Prerequisites
- Vercel account (free at vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

### Deploy in One Click

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Paste: `https://github.com/NexusDevelopments/nexushub-webproxy`
4. Click **Deploy**
5. Done! Your proxy will be live in ~2 minutes

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 🌍 Custom Domain Setup (FreeDNS)

Get a free domain and point it to your Vercel deployment:

### Step 1: Get Free Domain on FreeDNS
1. Go to https://freedns.afraid.org/
2. Register account (free)
3. Go to "Subdomains" → "Add Subdomain"
4. Create your domain: `nexushub.freedns.io` (or choose your own)
5. Point to your Vercel URL

### Step 2: Set Custom Domain on Vercel
1. In Vercel Dashboard, go to your project
2. Settings → Domains
3. Add your FreeDNS domain
4. Update DNS records in FreeDNS to point to Vercel's servers

### Step 3: Access Your Proxy
- Mobile: `https://nexushub.freedns.io`
- Desktop: `https://nexushub.freedns.io`
- Fully responsive on all devices!

## 📁 Project Structure

```
nexushub/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   └── api/
│       ├── proxy/route.ts       # Proxy API endpoint
│       └── search/route.ts      # Search endpoint
├── components/
│   ├── App.tsx & App.module.css
│   ├── SearchBar.tsx & SearchBar.module.css
│   ├── TabBar.tsx & TabBar.module.css
│   ├── UrlBar.tsx & UrlBar.module.css
│   └── ProxyFrame.tsx & ProxyFrame.module.css
├── package.json
├── tsconfig.json
├── next.config.js
└── vercel.json
```

## 🔧 Architecture

### Frontend (Next.js + React)
- **App Router** - Modern React 18+ setup
- **TypeScript** - Full type safety
- **CSS Modules** - Scoped styling with responsive design
- **Mobile First** - Optimized for all screen sizes

### Backend (Serverless APIs)
- **`/api/proxy`** - Fetch and proxy any URL securely
- **`/api/search`** - Direct DuckDuckGo integration
- **Timeout Safe** - Built for Vercel's serverless limits

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

### Production
- `next` - React framework for production
- `react` - UI library
- `react-dom` - React DOM rendering

### Development
- `typescript` - Type safety
- `eslint` - Code linting
- `@types/*` - TypeScript type definitions

## 🔐 Security Features

- ✅ Sandboxed iframes for website isolation
- ✅ CORS headers configured correctly
- ✅ User-Agent spoofing for compatibility
- ✅ No data logging or storage
- ✅ Private DuckDuckGo search integration

## 🎯 Use Cases

- 🏫 **School/Work Bypass** - Access blocked sites securely
- 🔍 **Private Searching** - DuckDuckGo for anonymous searches
- 📱 **Mobile Browsing** - Fully responsive on all devices
- 🌍 **Custom Domains** - Easy FreeDNS setup for personal domains
- 🚀 **Fast Deployment** - Vercel edge network for global speed

## 📄 License

MIT - Open source and free to use

---

**Built with ⚡ for Vercel | Powered by Next.js**

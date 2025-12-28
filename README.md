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
- 🌍 **Wildcard Subdomains** - Unlimited free subdomains for users

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
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app runs on `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## 🚀 Vercel Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NexusDevelopments/nexushub-webproxy)

Or manually:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Paste: `https://github.com/NexusDevelopments/nexushub-webproxy`
4. Click **Deploy**

## 🌐 Wildcard Subdomains (Like Doge/Utopia)

NexusHub supports **unlimited wildcard subdomains**. Anyone can create their own subdomain for free!

### How It Works

**Everyone visiting any subdomain gets the same NexusHub proxy:**
- `alice.nexushublol.com` → NexusHub
- `bob.nexushublol.com` → NexusHub
- `xyz.nexushublol.com` → NexusHub

### Setup (3 Simple Steps)

#### 1️⃣ Get a Domain

**Free Option (Recommended):**
- Go to https://freedns.afraid.org
- Sign up (takes 2 minutes)
- Choose a free domain from their list
- You now own something like `subdomain.example.com`

**Paid Option:**
- Buy from Namecheap, GoDaddy, etc. ($1-15/year)

#### 2️⃣ Point Domain to NexusHub

In your domain's DNS settings, add this wildcard record:

| Type | Name | Target |
|------|------|--------|
| CNAME | `*` | `nexushublol.vercel.app` |

**That's it!** All subdomains now point to NexusHub.

#### 3️⃣ Share With Others

Share your domain:
```
🌐 Visit alice.nexushublol.com for a proxy
🌐 Visit bob.nexushublol.com for browsing
🌐 Visit xyz.nexushublol.com for searching
```

Each person gets their own unique subdomain - no signup needed!

### Example DNS Setups

**FreeDNS:**
1. Go to freedns.afraid.org
2. Add subdomain:
   - Name: `*`
   - Domain: `example.freedns.io`
   - Type: CNAME
   - Destination: `nexushublol.vercel.app`

**Namecheap/GoDaddy:**
1. Go to DNS settings
2. Add CNAME record:
   - Host: `*`
   - Value: `nexushublol.vercel.app`

### Verify It Works

```bash
nslookup test.nexushublol.com
nslookup alice.nexushublol.com
nslookup bob.nexushublol.com
# All should resolve successfully
```

### What Users Get

Anyone visiting ANY subdomain gets:
- ✅ Full NexusHub proxy
- ✅ DuckDuckGo search
- ✅ Tab system with keyboard shortcuts
- ✅ Mobile responsive interface
- ✅ All features working

**No signup, no claiming, just works!**

## 📁 Project Structure

```
nexushub/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── algebra/                # Search proxy endpoint
│   └── api/
│       ├── proxy/route.ts       # Website proxy
│       ├── search/route.ts      # Search endpoint
│       ├── ddg-search/route.ts  # DuckDuckGo proxy
│       └── subdomains/route.ts  # Subdomain API
├── components/
│   ├── App.tsx & App.module.css
│   ├── SearchBar.tsx & SearchBar.module.css
│   ├── TabBar.tsx & TabBar.module.css
│   ├── UrlBar.tsx & UrlBar.module.css
│   └── ProxyFrame.tsx & ProxyFrame.module.css
├── middleware.ts                # Subdomain detection
├── package.json
├── tsconfig.json
├── next.config.js
└── vercel.json
```

## 🔧 Architecture

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI components with hooks
- **TypeScript** - Full type safety
- **CSS Modules** - Scoped, responsive styling
- **Responsive Design** - Mobile-first approach

### Backend (Serverless APIs)
- **`/api/proxy`** - Fetch and proxy any URL
- **`/api/search`** - Search functionality
- **`/api/ddg-search`** - DuckDuckGo proxy with scramjet streaming
- **`/api/subdomains`** - Subdomain management
- **`/algebra`** - Private search endpoint
- **Timeout Safe** - Optimized for Vercel's serverless

## 🎨 Color Scheme

- **Primary Purple**: #7c3aed
- **Dark Background**: #0a0015
- **Secondary Purple**: #a78bfa
- **Text**: #e0e0e0

## 🔐 Security Features

- ✅ Sandboxed iframes for website isolation
- ✅ CORS headers configured correctly
- ✅ User-Agent spoofing for compatibility
- ✅ No data logging or storage
- ✅ Private DuckDuckGo search integration
- ✅ HTTPS-only on Vercel

## 📦 Dependencies

### Production
- `next` - React framework for production
- `react` - UI library  
- `react-dom` - React DOM rendering
- `scramjet` - Stream processing for responses

### Development
- `typescript` - Type safety
- `eslint` - Code linting
- `@types/*` - TypeScript type definitions

## 🎯 Use Cases

- 🏫 **School/Work Bypass** - Access blocked sites securely
- 🔍 **Private Searching** - DuckDuckGo for anonymous searches
- 📱 **Mobile Browsing** - Fully responsive on all devices
- 🌍 **Multi-User Platform** - Like Doge/Utopia with wildcard subdomains
- 🚀 **Fast Deployment** - Global CDN via Vercel edge network

## 📄 License

MIT - Open source and free to use

---

**Built with ⚡ for Vercel | Powered by Next.js**

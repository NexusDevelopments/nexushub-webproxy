# 🌐 NexusHub Wildcard Subdomain Setup Guide

This guide explains how to set up wildcard subdomains for NexusHub (like Doge/Utopia).

## What You're Setting Up

After following this guide:
- Users visit `alice.nexushublol.com` → Get their own proxy instance
- Users visit `bob.nexushublol.com` → Get another proxy instance
- Each subdomain is independent and unique

## Step-by-Step Setup

### Step 1: Get a Domain

#### Option A: Buy a Domain (Recommended for Production)

1. Go to a domain registrar:
   - [Namecheap](https://www.namecheap.com)
   - [GoDaddy](https://www.godaddy.com)
   - [Google Domains](https://domains.google)

2. Search and buy a domain (e.g., `nexushublol.com`)
   - Costs $1-15 per year

#### Option B: Free Domain (Perfect for Testing)

1. Visit [FreeDNS.afraid.org](https://freedns.afraid.org)
2. Click "Sign Up" and create an account
3. Go to "Registry" → Click "Browse Domains"
4. Find a free domain you like (e.g., `nexushublol.freedns.io`)
5. Note the domain name

### Step 2: Connect to Vercel

If using your own domain:

1. Go to **Vercel Dashboard**
2. Click your NexusHub project
3. Go to **Settings** → **Domains**
4. Add your domain (e.g., `nexushublol.com`)
5. Vercel will show you DNS records to add

If using FreeDNS:
- Skip this step, we'll add DNS records in FreeDNS instead

### Step 3: Add Wildcard DNS Record

#### If Using Your Own Domain (via Namecheap, GoDaddy, etc.):

1. Log into your domain registrar
2. Find "DNS Records" or "DNS Settings"
3. Add a new CNAME record:
   - **Name:** `*` (wildcard)
   - **Type:** CNAME
   - **Value:** `nexushublol.vercel.app` (your Vercel domain)
   - **TTL:** 3600 (or default)

4. Also add for the root domain:
   - **Name:** `@` (root)
   - **Type:** CNAME (or ALIAS if available)
   - **Value:** `nexushublol.vercel.app`

**Example (Namecheap):**
```
Name: *
Type: CNAME
Target: nexushublol.vercel.app

Name: @
Type: ALIAS
Target: nexushublol.vercel.app
```

#### If Using FreeDNS:

1. Log into [FreeDNS.afraid.org](https://freedns.afraid.org)
2. Go to "Subdomains"
3. Add multiple subdomain entries for your chosen domain:
   - **Subdomain:** `*`
   - **Domain:** Your chosen domain
   - **Type:** CNAME
   - **Destination:** `nexushublol.vercel.app`

4. Also add one for root:
   - **Subdomain:** (leave blank)
   - **Domain:** Your chosen domain
   - **Type:** CNAME
   - **Destination:** `nexushublol.vercel.app`

### Step 4: Wait for DNS Propagation

DNS changes take 5 minutes to 24 hours to propagate globally.

**Check if it's working:**
```bash
# In terminal, check if DNS resolves
nslookup alice.nexushublol.com
nslookup bob.nexushublol.com

# Should both return Vercel's IP address
```

### Step 5: Test It!

1. Visit any subdomain in your browser:
   - `https://alice.nexushublol.com`
   - `https://bob.nexushublol.com`

2. You should see NexusHub loading!

3. Click "🌐 Manage Subdomain" button

4. Enter a username (e.g., "alice") and claim the subdomain

5. The subdomain is now registered to that user!

## How Users Use It

1. **Share the Link:** User shares `https://alice.nexushublol.com` with friends
2. **Friends Visit:** They go to that URL
3. **Claim or Access:** If not claimed, they can claim it. If claimed, they use the existing proxy
4. **Their Own Proxy:** Or they can visit a different subdomain like `https://bob.nexushublol.com` to get their own

## Advanced: Custom Setup

### Add More Features

You can modify `/app/api/subdomains/route.ts` to:
- Add user authentication
- Store settings per subdomain
- Add password protection
- Track usage statistics
- Add subdomain aliases

### Database (Optional)

Currently, subdomains are stored in-memory (resets on deploy).

For persistent storage, upgrade to:
- **Vercel KV** (Redis) - Recommended for Vercel
- **PostgreSQL** - For more features
- **MongoDB** - For flexibility

### Redirect Main Domain

If you want `nexushublol.com` to show a landing page:

1. Create `app/landing/page.tsx` for the main domain
2. Modify middleware to detect main domain vs subdomains
3. Show different content based on subdomain

## Troubleshooting

### Subdomains not working?

1. **Check DNS:** Use `nslookup subdomain.nexushublol.com`
2. **Wait for Propagation:** DNS changes take up to 24 hours
3. **Clear Browser Cache:** Ctrl+Shift+Delete (Chrome)
4. **Check TTL:** Lower TTL (Time To Live) to speed up changes

### Getting "404" or "Connection Refused"?

1. Verify Vercel project is deployed
2. Check that subdomain DNS points to `nexushublol.vercel.app`
3. Make sure wildcard `*` record exists in DNS

### FreeDNS Specific Issues

- **Subdomain not active:** Check "Enable" checkbox on FreeDNS
- **Want to use custom domain:** Point your domain's nameservers to FreeDNS nameservers
- **Need help:** Visit FreeDNS documentation

## Security Considerations

⚠️ **Important:**

- Subdomains are registered with just a username (no authentication)
- Consider adding a password or token system for production
- Don't expose sensitive info in subdomain names
- Use HTTPS (enabled by default on Vercel)
- Be aware of terms of service for hosting

## Next Steps

1. ✅ Set up wildcard DNS
2. ✅ Test with a few subdomains
3. 🎯 Share with friends/community
4. 📊 Monitor usage and add features
5. 🔒 Add authentication if needed

---

**Questions?** Check the main README.md for more details!

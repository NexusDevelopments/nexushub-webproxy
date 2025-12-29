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
3. Add Vercel DNS records (recommended):
    - **A (apex/root)**
       - Name: `@`
       - Value: `76.76.21.21` (Vercel Edge Network)
    - **CNAME (wildcard)**
       - Name: `*`
       - Value: `cname.vercel-dns.com`
    - **CNAME (www)**
       - Name: `www`
       - Value: `cname.vercel-dns.com`

    Note: Some registrars show suggested IPs like `216.198.79.1`. That is not Vercel. Use `76.76.21.21` for the apex and `cname.vercel-dns.com` for CNAMEs.

#### Using A Records (when you insist on IP)

- **Best practice:** Use `A` only for the apex (`@`) → `76.76.21.21`. Use `CNAME` for `*` (wildcard) and `www`.
- **If you insist on A for subdomains:** Add explicit `A` records for each subdomain you want (e.g., `alice`, `bob`) pointing to `76.76.21.21`. Most registrars do not support `A` wildcard (`*`) reliably.
- **Caveat:** This is harder to maintain and not recommended by Vercel. `CNAME` to `cname.vercel-dns.com` is the supported way for subdomains.
- **Vercel requirement:** Regardless of `A` or `CNAME`, you must add the domain (or specific subdomain) to your Vercel project under Settings → Domains so Vercel serves your app and provisions SSL.

#### FreeDNS (donated domains) and A Records

- Donated domains usually only let you create specific subdomains, and commonly allow **CNAME** records (not apex `A`).
- To point a FreeDNS subdomain at NexusHub, set `Type: CNAME`, `Destination: cname.vercel-dns.com` (or your-project.vercel.app), then add that exact subdomain in Vercel → Domains.
- Using an `A` record to `76.76.21.21` on FreeDNS generally requires owning the zone and is rarely available for donated domains.

**Example (Namecheap):**
```
Host: @
Type: A
Value: 76.76.21.21

Host: *
Type: CNAME
Value: cname.vercel-dns.com

Host: www
Type: CNAME
Value: cname.vercel-dns.com
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

3. No claiming step: visiting any subdomain immediately serves NexusHub.
   - Share `https://alice.nexushublol.com` (or any name) and it just works.

## How Users Use It

1. **Pick any name:** `https://alice.nexushublol.com`, `https://bob.nexushublol.com`, etc.
2. **Visit directly:** The subdomain loads NexusHub instantly.
3. **Share freely:** Anyone can use any subdomain; no signup or claiming.

## Advanced: Custom Setup

### Add More Features (Optional)

If you later want per-subdomain personalization, you can enhance `/app/api/subdomains/route.ts` to:
- Store settings per subdomain
- Add passwords or tokens
- Track usage statistics
- Add aliases

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

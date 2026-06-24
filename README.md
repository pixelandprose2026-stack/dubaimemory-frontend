# DubaiMemory — The Honest Dubai Guide

Premium bilingual (EN/AR) Dubai experience platform built with React + TypeScript + Vite + Tailwind CSS.

## Project Overview

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + GSAP + Lenis
- **Backend**: WordPress (Headless CMS via REST API)
- **Hosting Frontend**: Netlify (connected to GitHub)
- **Hosting Backend**: WordPress on any hosting (Bluehost, SiteGround, Cloudways...)
- **Domain**: dubaimemory.com

---

## Architecture

```
User Browser
    |
    v
dubaimemory.com (Netlify - Frontend)
    |
    +-- React SPA (this project)
    +-- Static pages: Home, Blog, Login, Dashboards
    |
    v (API calls)
wp.dubaimemory.com (WordPress - Backend)
    |
    +-- Posts (blog articles)
    +-- Custom Post Types (experiences, photographers, partners)
    +-- Users (travelers, photographers, partners)
    +-- WooCommerce (bookings & payments)
    +-- Media (images, videos)
```

---

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/dubaimemory-frontend.git
cd dubaimemory-frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build
```

---

## Deployment Pipeline

```
1. You push code to GitHub
2. Netlify auto-detects the change
3. Netlify runs: npm install && npm run build
4. Netlify deploys the dist/ folder
5. Your site updates automatically (takes ~2 minutes)
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Main landing page with all sections |
| Blog | `/#/blog` | Blog listing page |
| Login | `/#/login` | Sign in / Create account |
| Traveler Dashboard | `/#/dashboard` | Saved, Bookings, Downloads, Settings |
| Photographer Dashboard | `/#/photographer-dashboard` | Profile, Bookings, Calendar |
| Partner Dashboard | `/#/partner-dashboard` | For tour operators, yacht owners, etc. |

---

## WordPress Integration

The frontend connects to WordPress via REST API:

```javascript
// Base URL for WordPress API
const WP_API = 'https://wp.dubaimemory.com/wp-json/wp/v2';

// Fetch blog posts
fetch(`${WP_API}/posts`)

// Fetch experiences (custom post type)
fetch(`${WP_API}/experience`)

// Fetch photographers
fetch(`${WP_API}/photographer`)
```

---

## License

All rights reserved. DubaiMemory.com 2025.

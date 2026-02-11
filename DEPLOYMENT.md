# Deployment Guide: Vercel + Railway MySQL

Deploy the BP Tangguh TEP Dashboard to **Vercel** (frontend) and **Railway** (MySQL database).

---

## Prerequisites

- [Vercel account](https://vercel.com) (free tier works)
- [Railway account](https://railway.app) (free trial, then $5/mo)
- Git repo pushed to GitHub
- Local project running and working

---

## Step 1: Push Code to GitHub

Make sure your code is committed and pushed. **Do NOT push `.env`** (already in `.gitignore`).

```bash
git add -A
git commit -m "feat: dashboard with global filters, new charts, dark theme"
git push origin main
```

### Add Prisma postinstall script

Vercel needs to generate the Prisma client during build. Add this to `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "next build",
    "dev": "next dev",
    "start": "next start",
    "lint": "eslint"
  }
}
```

Commit and push this change.

---

## Step 2: Create MySQL on Railway

### 2.1 Create a new project

1. Go to [railway.app/dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Provision MySQL"**
4. Wait for the MySQL instance to spin up (takes ~30 seconds)

### 2.2 Get the connection string

1. Click the MySQL service card
2. Go to the **"Variables"** tab
3. Find `MYSQL_URL` — it looks like:
   ```
   mysql://root:XXXX@roundhouse.proxy.rlwy.net:12345/railway
   ```
4. **Copy this URL** — you'll need it in Step 3 and Step 4

### 2.3 Import your data

You need to load the schema + data from `database/mysql_insert.sql` into Railway MySQL.

**Option A: Railway CLI (recommended)**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run the SQL import
railway run mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE < database/mysql_insert.sql
```

**Option B: MySQL client directly**

Use the connection details from Railway's Variables tab:

```bash
mysql -h roundhouse.proxy.rlwy.net -P 12345 -u root -pYOUR_PASSWORD railway < database/mysql_insert.sql
```

Replace host, port, password with your actual Railway values.

**Option C: Railway's built-in SQL editor**

1. Click the MySQL service
2. Go to **"Data"** tab
3. Click **"Query"**
4. Paste the contents of `database/mysql_insert.sql` in batches (the editor has a size limit — split the file at `-- INSERT` boundaries if needed)

### 2.4 Import the users table

Also run the users seed:

```bash
mysql -h HOST -P PORT -u root -pPASSWORD DATABASE < database/02-users.sql
```

### 2.5 Verify the data

Run a quick check:

```sql
SELECT COUNT(*) FROM tb_m_project;          -- Should be 1
SELECT COUNT(*) FROM tb_m_amendment;         -- Should be 6
SELECT COUNT(*) FROM tb_t_monthly_cost;      -- Should have rows
SELECT COUNT(*) FROM tb_t_pamf_claim;        -- Should have rows
```

---

## Step 3: Deploy to Vercel

### 3.1 Import the project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repo
4. Vercel auto-detects Next.js — leave framework preset as **Next.js**

### 3.2 Set environment variables

Before clicking Deploy, expand **"Environment Variables"** and add:

| Variable | Value | Notes |
|---|---|---|
| `DATABASE_URL` | `mysql://root:XXXX@roundhouse.proxy.rlwy.net:12345/railway` | Your Railway MySQL URL from Step 2.2 |
| `NEXTAUTH_SECRET` | *(generate one — see below)* | Must be 32+ chars, random |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` | Your Vercel domain (update after first deploy) |

**Generate NEXTAUTH_SECRET:**

```bash
# Run this locally and copy the output
openssl rand -base64 32
```

Or use: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

### 3.3 Deploy

1. Click **"Deploy"**
2. Wait for the build (~2-3 minutes)
3. Vercel runs `npm install` → `prisma generate` (via postinstall) → `next build`

### 3.4 Update NEXTAUTH_URL

After the first deploy:

1. Go to **Settings** → **Domains** to see your URL (e.g., `bp-dashboard-xxx.vercel.app`)
2. Go to **Settings** → **Environment Variables**
3. Update `NEXTAUTH_URL` to `https://bp-dashboard-xxx.vercel.app`
4. **Redeploy**: Go to Deployments → click "..." on latest → Redeploy

---

## Step 4: Verify Everything Works

### 4.1 Check the app loads

1. Visit your Vercel URL
2. You should see the login page
3. Log in with the credentials from `02-users.sql`

### 4.2 Check all features

- [ ] KPI cards load with real data
- [ ] All 4 tabs work (Overview, Cost Analysis, Operations, PAMF & VO)
- [ ] Year filter changes Monthly Cost and POB charts
- [ ] Discipline filter changes Cost Breakdown and PAMF charts
- [ ] Amendment filter changes Contract Evolution and VO charts
- [ ] Dark mode toggle works with glass-morphism theme
- [ ] Date range picker works

### 4.3 If charts show "No data available"

This means the database is empty or not connected:

1. Check Vercel **Function Logs** (Deployments → latest → Functions tab)
2. Look for `Error fetching...` messages
3. Verify `DATABASE_URL` is correct in Vercel env vars
4. Make sure you ran the SQL import in Step 2.3

---

## Step 5: Custom Domain (Optional)

### 5.1 Add domain in Vercel

1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `dashboard.yourcompany.com`)
3. Follow the DNS instructions (add CNAME or A record)

### 5.2 Update NEXTAUTH_URL

Update the `NEXTAUTH_URL` environment variable to your custom domain:

```
https://dashboard.yourcompany.com
```

Redeploy after changing.

---

## Troubleshooting

### Build fails: "prisma generate" error

Make sure `postinstall` script exists in `package.json`:
```json
"postinstall": "prisma generate"
```

### Build fails: "Cannot find module '@prisma/client'"

Ensure both `prisma` (devDependency) and `@prisma/client` (dependency) are in `package.json`. They already are in this project.

### Railway MySQL connection refused

Railway MySQL has **two connection modes**:
- **Private** (internal): Only works within Railway's network
- **Public** (proxy): Works from Vercel — use the URL with `proxy.rlwy.net`

Make sure you're using the **public/proxy URL**, not the private one.

### "Too many connections" error

Railway free tier has connection limits. Add connection pooling to your DATABASE_URL:

```
mysql://root:XXXX@host:port/railway?connection_limit=5
```

### Authentication not working

- Verify `NEXTAUTH_SECRET` is set and is the same across all environments
- Verify `NEXTAUTH_URL` matches your actual deployed URL (including `https://`)
- Check that the `users` table was imported (Step 2.4)

---

## Cost Estimates

| Service | Free Tier | Paid |
|---------|-----------|------|
| **Vercel** | 100GB bandwidth, unlimited deploys | $20/mo Pro |
| **Railway** | $5 free credit/mo, 500MB MySQL | $5/mo + usage |

For a dashboard with light traffic, you'll likely stay within free/minimal tiers.

---

## Architecture

```
User Browser
    ↓ HTTPS
Vercel (Next.js SSR + API Routes)
    ↓ MySQL protocol (TCP)
Railway MySQL (bp_project database)
```

All API routes (`/api/bp/*`) run as Vercel Serverless Functions. They connect to Railway MySQL via the `DATABASE_URL` environment variable using Prisma.

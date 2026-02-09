# Development & Deployment Workflow

## 📚 Table of Contents
1. [Development Setup](#development-setup)
2. [Daily Development Workflow](#daily-development-workflow)
3. [Production Deployment](#production-deployment)
4. [Common Commands](#common-commands)

---

## 🛠️ Development Setup

### Prerequisites
- Docker Desktop installed
- Git
- Code editor (VS Code recommended)

### Initial Setup (One-Time)

```bash
# 1. Clone repository
git clone <repo-url>
cd bp-dashboard

# 2. Copy environment variables
cp .env.example .env

# 3. Edit .env file (optional - defaults are fine for dev)
# DATABASE_URL sudah di-set di docker-compose.yml

# 4. Start Docker Compose
docker-compose up -d

# Output:
# ✅ Creating network "bp-dashboard_default"
# ✅ Creating volume "bp-dashboard_mysql_data"
# ✅ Creating bp-dashboard_mysql_1
# ✅ Creating bp-dashboard_app_1

# 5. Wait for MySQL to be ready (30 seconds)
# Check logs:
docker-compose logs -f mysql
# Wait until you see: "ready for connections"

# 6. Run Prisma migrations (setup database schema)
docker-compose exec app npx prisma migrate dev --name init

# Output:
# ✅ Your database is now in sync with your schema
# ✅ Generated Prisma Client

# 7. (Optional) Seed database dengan dummy data
docker-compose exec app npx prisma db seed

# Done! 🎉
```

### Verify Setup

```bash
# Check containers are running
docker-compose ps

# Should show:
# Name                    State    Ports
# bp-dashboard_app_1      Up       0.0.0.0:3000->3000/tcp
# bp-dashboard_mysql_1    Up       0.0.0.0:3306->3306/tcp

# Access the app
open http://localhost:3000

# Access Prisma Studio (Database GUI)
docker-compose exec app npx prisma studio
# Open http://localhost:5555
```

### What's Running?

```
┌─────────────────────────────────────────────┐
│          Docker Compose                      │
│                                               │
│  ┌──────────────────┐  ┌─────────────────┐ │
│  │   Next.js App    │  │   MySQL 8.0     │ │
│  │                  │  │                  │ │
│  │ Container: app   │  │ Container: mysql│ │
│  │ Port: 3000       │  │ Port: 3306      │ │
│  │                  │  │                  │ │
│  │ - Auto reload    │  │ - Data persisted│ │
│  │ - Hot module     │  │ - Volume mounted│ │
│  │   replacement    │  │                  │ │
│  └──────────────────┘  └─────────────────┘ │
│           ↓                      ↓          │
│    Your code changes    Database data      │
│    reflected instantly  saved permanently  │
└─────────────────────────────────────────────┘
```

---

## 💻 Daily Development Workflow

### Starting Your Day

```bash
# 1. Go to project directory
cd bp-dashboard

# 2. Start Docker Compose (if not running)
docker-compose up -d

# 3. Pull latest changes
git pull origin main

# 4. Check if database needs updates
docker-compose exec app npx prisma migrate dev

# 5. Start coding!
# Open VS Code: code .
```

### Making Code Changes

```bash
# Edit files in your editor
# Changes auto-reload in browser (Hot Module Replacement)

# Example workflow:
# 1. Edit app/dashboard/page.tsx
# 2. Save file (Cmd+S / Ctrl+S)
# 3. Browser auto-refreshes
# 4. See changes instantly!

# No need to restart Docker or run npm commands
```

### Database Changes

```bash
# 1. Edit prisma/schema.prisma
# Example: Add new field to User model

# 2. Create migration
docker-compose exec app npx prisma migrate dev --name add_phone_field

# 3. Migration applied automatically
# Prisma Client regenerated automatically

# 4. Use new field in your code immediately
```

### View Database Data

```bash
# Option 1: Prisma Studio (GUI)
docker-compose exec app npx prisma studio
# Open http://localhost:5555

# Option 2: MySQL CLI
docker-compose exec mysql mysql -u admin -padmin123 bp_dashboard

# Show tables
mysql> SHOW TABLES;

# Query users
mysql> SELECT * FROM User;
```

### Running Commands Inside Containers

```bash
# General pattern:
docker-compose exec <service> <command>

# Examples:
docker-compose exec app npm install <package>
docker-compose exec app npx prisma studio
docker-compose exec app npm run build
docker-compose exec app npx tsx scripts/seed.ts

# Install new npm package
docker-compose exec app npm install recharts
docker-compose exec app npm install -D @types/recharts
```

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f mysql

# Last 100 lines
docker-compose logs --tail=100 app
```

### Stopping Development

```bash
# Stop containers (data persists)
docker-compose stop

# Stop and remove containers (data persists in volume)
docker-compose down

# Stop, remove containers AND delete data (⚠️ careful!)
docker-compose down -v
```

### Restarting From Scratch

```bash
# If something goes wrong, full reset:

# 1. Stop everything and delete data
docker-compose down -v

# 2. Remove all Docker images
docker-compose down --rmi all

# 3. Start fresh
docker-compose up -d

# 4. Recreate database
docker-compose exec app npx prisma migrate dev

# 5. Seed data
docker-compose exec app npx prisma db seed
```

---

## 🚀 Production Deployment

### Strategy 1: Vercel + PlanetScale (Recommended)

**Best for:** MVP, startups, fast iteration
**Cost:** FREE (hobby tier)
**Setup Time:** 10 minutes

#### Step 1: Setup PlanetScale Database

```bash
# 1. Go to https://planetscale.com
# 2. Sign up / Login
# 3. Click "Create database"
#    Name: bp-dashboard
#    Region: Choose closest to your users (e.g., AWS ap-southeast-1 for Indonesia)
# 4. Click "Create"

# 5. Get connection string
# Click "Connect" → "Prisma" → Copy connection string
# Example: mysql://user:pass@aws.connect.psdb.cloud/bp-dashboard?sslaccept=strict
```

#### Step 2: Push Code to GitHub

```bash
# 1. Create GitHub repository
# Go to https://github.com/new
# Name: bp-dashboard
# Visibility: Private (or Public)

# 2. Push code
git remote add origin https://github.com/your-username/bp-dashboard.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

#### Step 3: Deploy to Vercel

```bash
# 1. Go to https://vercel.com
# 2. Sign up / Login (use GitHub account)
# 3. Click "New Project"
# 4. Import GitHub repository: bp-dashboard
# 5. Configure project:
#    Framework Preset: Next.js (auto-detected)
#    Root Directory: ./
#    Build Command: npm run build (auto-set)
#    Output Directory: .next (auto-set)

# 6. Add Environment Variables:
#    Click "Environment Variables"
#    Add:
#      DATABASE_URL = <your-planetscale-connection-string>
#      NEXTAUTH_SECRET = <generate-random-string>
#      NEXTAUTH_URL = https://your-app.vercel.app

# Generate NEXTAUTH_SECRET:
# Run di local terminal:
openssl rand -base64 32
# Copy output → paste as NEXTAUTH_SECRET

# 7. Click "Deploy"
# Wait 2-3 minutes...
# ✅ Done! App live at: https://bp-dashboard-xyz.vercel.app
```

#### Step 4: Run Database Migrations

```bash
# From your local machine:

# 1. Set production DATABASE_URL
export DATABASE_URL="<your-planetscale-connection-string>"

# 2. Run migrations
npx prisma migrate deploy

# 3. (Optional) Seed production database
npx prisma db seed

# Done! Database ready.
```

#### Step 5: Custom Domain (Optional)

```bash
# 1. In Vercel dashboard → Settings → Domains
# 2. Add custom domain: bp-dashboard.com
# 3. Update DNS records at your domain provider:
#    Type: CNAME
#    Name: @
#    Value: cname.vercel-dns.com

# Wait 5-10 minutes for DNS propagation
# ✅ App now accessible at: https://bp-dashboard.com
```

#### Deploying Updates

```bash
# Vercel auto-deploys on git push!

# 1. Make changes to code
# 2. Commit and push
git add .
git commit -m "Add new feature"
git push origin main

# 3. Vercel automatically:
#    - Detects push
#    - Builds project
#    - Deploys to production
#    - Shows deployment status in dashboard

# 4. Check deployment
# Go to Vercel dashboard → Deployments
# Click latest deployment → View

# That's it! 🚀
```

**Architecture:**
```
User → Vercel Edge Network → Next.js App → PlanetScale MySQL
       (Global CDN)          (Serverless)    (Serverless DB)
```

**Pros:**
- ✅ Zero server management
- ✅ Auto-scaling
- ✅ Global CDN
- ✅ Free SSL/HTTPS
- ✅ Auto CI/CD
- ✅ Free tier

**Cons:**
- ❌ Vendor lock-in (but easy to migrate)

---

### Strategy 2: Docker + VPS

**Best for:** Full control, specific requirements, cost optimization at scale
**Cost:** $5-20/month
**Setup Time:** 1-2 hours

#### Prerequisites

```bash
# 1. Get a VPS
# Options:
# - DigitalOcean ($6/month - 1GB RAM, 25GB SSD)
# - Linode ($5/month - 1GB RAM, 25GB SSD)
# - Vultr ($6/month - 1GB RAM, 25GB SSD)
# - AWS EC2 t3.micro ($8-10/month)

# 2. Get a domain name (optional)
# - Namecheap ($12/year)
# - Cloudflare ($10/year)
# - Niagahoster ($50k/year untuk .com)
```

#### Step 1: Setup VPS

```bash
# 1. SSH into your VPS
ssh root@your-server-ip

# 2. Update system
apt update && apt upgrade -y

# 3. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 4. Install Docker Compose
apt install docker-compose -y

# 5. Verify installation
docker --version
docker-compose --version

# 6. Create deploy user (security best practice)
adduser deploy
usermod -aG docker deploy
su - deploy
```

#### Step 2: Deploy Application

```bash
# 1. Clone repository
cd ~
git clone https://github.com/your-username/bp-dashboard.git
cd bp-dashboard

# 2. Setup environment variables
cp .env.example .env.production
nano .env.production

# Edit:
DATABASE_URL="mysql://admin:STRONG_PASSWORD@mysql:3306/bp_dashboard"
NEXTAUTH_SECRET="<generate-with-openssl-rand-base64-32>"
NEXTAUTH_URL="https://your-domain.com"

# 3. Create production docker-compose file
# (Already provided in repo: docker-compose.prod.yml)

# 4. Build and start
docker-compose -f docker-compose.prod.yml up -d --build

# 5. Check status
docker-compose -f docker-compose.prod.yml ps

# 6. Run migrations
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy

# 7. Verify app is running
curl http://localhost:3000
# Should return HTML
```

#### Step 3: Setup Nginx Reverse Proxy

```bash
# 1. Install Nginx
sudo apt install nginx -y

# 2. Create Nginx config
sudo nano /etc/nginx/sites-available/bp-dashboard

# Paste this:
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# 3. Enable site
sudo ln -s /etc/nginx/sites-available/bp-dashboard /etc/nginx/sites-enabled/

# 4. Test Nginx config
sudo nginx -t

# 5. Restart Nginx
sudo systemctl restart nginx

# 6. Enable Nginx on boot
sudo systemctl enable nginx
```

#### Step 4: Setup SSL with Let's Encrypt

```bash
# 1. Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# 2. Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose: Redirect HTTP to HTTPS (option 2)

# 3. Verify SSL
# Open browser: https://your-domain.com
# Should show 🔒 padlock

# 4. Auto-renewal test
sudo certbot renew --dry-run

# Certbot will auto-renew certificates every 60 days
```

#### Step 5: Setup Automatic Backups

```bash
# 1. Create backup script
nano ~/backup.sh

# Paste:
```

```bash
#!/bin/bash
# Backup MySQL database

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/deploy/backups"
mkdir -p $BACKUP_DIR

docker-compose -f /home/deploy/bp-dashboard/docker-compose.prod.yml \
  exec -T mysql mysqldump -u admin -padmin123 bp_dashboard \
  > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete

echo "Backup completed: backup_$DATE.sql"
```

```bash
# 2. Make executable
chmod +x ~/backup.sh

# 3. Add to crontab (daily at 2 AM)
crontab -e

# Add line:
0 2 * * * /home/deploy/backup.sh >> /home/deploy/backup.log 2>&1

# Done! Daily backups enabled.
```

#### Deploying Updates

```bash
# 1. SSH into server
ssh deploy@your-server-ip

# 2. Go to project directory
cd ~/bp-dashboard

# 3. Pull latest changes
git pull origin main

# 4. Rebuild containers
docker-compose -f docker-compose.prod.yml up -d --build

# 5. Run new migrations (if any)
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy

# 6. Verify deployment
curl https://your-domain.com
docker-compose -f docker-compose.prod.yml logs -f app

# Done! 🚀
```

**Architecture:**
```
User → Nginx (Port 80/443) → Next.js Container (Port 3000) → MySQL Container (Port 3306)
       (SSL, Reverse Proxy)   (Docker)                         (Docker, Data Volume)
```

**Pros:**
- ✅ Full control
- ✅ No vendor lock-in
- ✅ Cost-effective at scale
- ✅ Can add Redis, etc.

**Cons:**
- ❌ Manual server management
- ❌ Manual scaling
- ❌ Need monitoring setup

---

## 📋 Common Commands Reference

### Docker Compose Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose stop

# Stop and remove containers
docker-compose down

# View logs
docker-compose logs -f
docker-compose logs -f app
docker-compose logs -f mysql

# Restart a service
docker-compose restart app

# Rebuild containers
docker-compose up -d --build

# Execute command in container
docker-compose exec app <command>

# List running containers
docker-compose ps

# Remove all data (⚠️ careful!)
docker-compose down -v
```

### Prisma Commands

```bash
# Run in development (Docker)
docker-compose exec app npx prisma <command>

# Examples:

# Create migration
docker-compose exec app npx prisma migrate dev --name <name>

# Apply migrations (production)
docker-compose exec app npx prisma migrate deploy

# Generate Prisma Client
docker-compose exec app npx prisma generate

# Open Prisma Studio
docker-compose exec app npx prisma studio

# Reset database (⚠️ deletes all data!)
docker-compose exec app npx prisma migrate reset

# Seed database
docker-compose exec app npx prisma db seed

# Format schema file
docker-compose exec app npx prisma format
```

### Git Commands

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Merge branch
git merge feature/new-feature

# View commit history
git log --oneline
```

### NPM Commands (Inside Docker)

```bash
# Install package
docker-compose exec app npm install <package>

# Install dev dependency
docker-compose exec app npm install -D <package>

# Remove package
docker-compose exec app npm uninstall <package>

# Update package
docker-compose exec app npm update <package>

# Run script
docker-compose exec app npm run <script>

# Check outdated packages
docker-compose exec app npm outdated
```

---

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Error: Port 3000 is already allocated

# Solution 1: Kill process using port
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Solution 2: Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead
```

### MySQL Connection Failed

```bash
# Error: Can't connect to MySQL

# Solution: Wait for MySQL to be ready
docker-compose logs -f mysql
# Wait for: "ready for connections"

# Or restart MySQL
docker-compose restart mysql

# Check MySQL is running
docker-compose ps mysql
```

### Hot Reload Not Working

```bash
# Solution 1: Restart app container
docker-compose restart app

# Solution 2: Rebuild
docker-compose up -d --build

# Solution 3: Check volumes are mounted
docker-compose config
# Verify: - .:/app is present
```

### Database Schema Out of Sync

```bash
# Error: Prisma schema doesn't match database

# Solution: Reset and migrate
docker-compose exec app npx prisma migrate reset
docker-compose exec app npx prisma migrate dev
```

### Docker Disk Space Full

```bash
# Clean up Docker
docker system prune -a

# Remove unused volumes
docker volume prune

# Check disk usage
docker system df
```

---

## 📊 Summary: Dev vs Prod

| Aspect | Development | Production (Vercel) | Production (Docker) |
|--------|-------------|---------------------|---------------------|
| **Command** | `docker-compose up` | `git push` | `docker-compose -f prod.yml up` |
| **Database** | Docker MySQL | PlanetScale | Docker MySQL |
| **URL** | localhost:3000 | vercel.app | your-domain.com |
| **SSL** | None | Auto | Certbot |
| **Updates** | Auto reload | Auto deploy | Manual deploy |
| **Cost** | Free | Free | $5-20/month |
| **Maintenance** | None | None | Manual |

---

**Need Help?**
- Development issues: Check Docker logs
- Deployment issues: Check Vercel/VPS logs
- Database issues: Use Prisma Studio

Happy coding! 🚀

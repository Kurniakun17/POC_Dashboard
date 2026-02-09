# 🚀 Quick Start Guide - BP Dashboard

## ✅ Prerequisites

You already have:
- ✅ OrbStack running (Docker)
- ✅ Project files created

## 📦 Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 16
- NextAuth.js v5 (JWT-only)
- Prisma (MySQL ORM)
- bcryptjs (Password hashing)
- shadcn/ui components
- TailwindCSS v4
- Zod (Validation)

**Expected time:** 1-2 minutes

---

## 🐳 Step 2: Start Docker Containers

```bash
docker-compose up -d
```

This command will:
1. ✅ Pull MySQL 8.0 image (if not cached)
2. ✅ Build Next.js container
3. ✅ Start MySQL database (port 3306)
4. ✅ Start Next.js app (port 3000)
5. ✅ Create persistent volume for database

**Expected time:**
- First run: 3-5 minutes (download images + build)
- Subsequent runs: 10-30 seconds

### View Logs (Optional)

```bash
# Watch all logs
docker-compose logs -f

# Watch only app logs
docker-compose logs -f app

# Watch only MySQL logs
docker-compose logs -f mysql
```

**Wait for this message:**
```
bp-dashboard-mysql | ready for connections
bp-dashboard-app   | ▲ Next.js 16.1.6
bp-dashboard-app   | - Local: http://localhost:3000
```

---

## 🗄️ Step 3: Setup Database

```bash
# Run Prisma migrations (create tables)
docker-compose exec app npx prisma migrate dev --name init
```

This will:
1. ✅ Connect to MySQL database
2. ✅ Create `users` table
3. ✅ Generate Prisma Client

**Expected output:**
```
✔ Generated Prisma Client
✔ The migration has been created successfully
✔ Applied migration: init
```

---

## ✨ Step 4: Verify Everything Works

### Open the app in browser:
```bash
open http://localhost:3000
```

You should see the default Next.js page.

### Check database with Prisma Studio (Optional):
```bash
docker-compose exec app npx prisma studio
```

This opens a database GUI at `http://localhost:5555`

---

## 🎉 Done! Your Development Environment is Ready

### What's Running:

| Service | URL | Status |
|---------|-----|--------|
| **Next.js App** | http://localhost:3000 | ✅ Running |
| **MySQL Database** | localhost:3306 | ✅ Running |
| **Prisma Studio** | http://localhost:5555 | ⏸️ On demand |

### Architecture:

```
┌─────────────────────────────────────────────┐
│          Docker Compose                      │
│                                               │
│  ┌──────────────────┐  ┌─────────────────┐ │
│  │   Next.js App    │  │   MySQL 8.0     │ │
│  │   (Container)    │  │   (Container)   │ │
│  │                  │  │                  │ │
│  │ localhost:3000   │  │ localhost:3306  │ │
│  │                  │  │                  │ │
│  │ - Hot reload ✅  │  │ - Data persists │ │
│  │ - Auto restart   │  │ - Volume mount  │ │
│  └──────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Daily Development Workflow

### Start working:
```bash
cd bp-dashboard
docker-compose up -d
```

### Make code changes:
- Edit files in your editor
- Changes auto-reload ✨
- No need to restart Docker!

### Stop working:
```bash
docker-compose stop
```

### Reset database (⚠️ deletes all data):
```bash
docker-compose down -v
docker-compose up -d
docker-compose exec app npx prisma migrate dev
```

---

## 📋 Common Commands

### Docker Commands

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose stop

# Stop and remove containers (data persists)
docker-compose down

# View logs
docker-compose logs -f app

# Restart a service
docker-compose restart app

# Check status
docker-compose ps
```

### Prisma Commands

```bash
# All Prisma commands must run inside the container:
docker-compose exec app npx prisma <command>

# Examples:

# Create migration
docker-compose exec app npx prisma migrate dev --name <migration-name>

# Open Prisma Studio (Database GUI)
docker-compose exec app npx prisma studio

# Reset database (⚠️ deletes all data!)
docker-compose exec app npx prisma migrate reset

# Generate Prisma Client
docker-compose exec app npx prisma generate
```

### Install New Packages

```bash
# Install package
docker-compose exec app npm install <package-name>

# Install dev dependency
docker-compose exec app npm install -D <package-name>

# Example: Install a chart library
docker-compose exec app npm install recharts
```

---

## 🔍 Troubleshooting

### Port 3000 already in use

```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in docker-compose.yml:
ports:
  - "3001:3000"  # Use 3001 instead
```

### MySQL connection failed

```bash
# Wait for MySQL to be ready
docker-compose logs -f mysql

# Look for: "ready for connections"

# Or restart MySQL
docker-compose restart mysql
```

### Hot reload not working

```bash
# Restart app container
docker-compose restart app

# Or rebuild
docker-compose up -d --build
```

### Database schema out of sync

```bash
# Reset and recreate
docker-compose exec app npx prisma migrate reset
docker-compose exec app npx prisma migrate dev
```

### Clean slate (nuclear option)

```bash
# Remove everything and start fresh
docker-compose down -v
docker-compose down --rmi all
rm -rf node_modules package-lock.json
npm install
docker-compose up -d --build
docker-compose exec app npx prisma migrate dev
```

---

## 📖 Next Steps

Now that your environment is running:

1. ✅ **Read MVP Plan**: `docs/MVP_PLAN.md`
2. ✅ **Check Development Workflow**: `docs/DEVELOPMENT_WORKFLOW.md`
3. ✅ **Start building features!**

---

## 🆘 Need Help?

- Check logs: `docker-compose logs -f`
- Check container status: `docker-compose ps`
- Verify database: `docker-compose exec app npx prisma studio`
- Read full docs: `docs/` directory

---

**Happy coding! 🚀**

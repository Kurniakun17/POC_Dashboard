# MVP Plan - BP LNG Dashboard

## 📋 Project Overview
Dashboard untuk menampilkan hasil analisis dan cross-check data lapangan LNG untuk Company X.

## 🎯 MVP Scope

### Core Features (Phase 1 - MVP)
1. ✅ User Authentication (Login/Sign Up)
2. ✅ Protected Dashboard Layout dengan Sidebar
3. ✅ Dummy Dashboard Page (placeholder untuk charts & tables)

### Future Features (Post-MVP)
- Data upload functionality
- Real-time data visualization (charts & graphs)
- Data tables dengan filtering/sorting
- User roles & permissions
- Data export functionality

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Charts** (future): Recharts or Chart.js
- **Tables** (future): TanStack Table (React Table v8)

### Backend
- **API**: Next.js API Routes (App Router)
- **Authentication**: NextAuth.js v5 (JWT-only strategy)
- **ORM**: Prisma
- **Database**: MySQL 8.0

### Infrastructure

#### Development Environment
```yaml
Docker Compose Setup:
  - Next.js App (localhost:3000) with hot-reload
  - MySQL 8.0 (localhost:3306)

Why Docker?
  - Consistent environment untuk semua developer
  - Tidak perlu install MySQL lokal
  - Easy cleanup dan reset database
```

#### Production (Recommended)
- **App Hosting**: Vercel (Next.js optimized, NO DOCKER)
- **Database**: PlanetScale (MySQL serverless)
- **Alternative**: Docker + VPS (Full control)

**Cost:**
- Vercel + PlanetScale: **FREE** (hobby tier)
- Docker VPS: **$5-10/month**

## 📁 Project Structure

```
bp-dashboard/
├── app/
│   ├── (auth)/                    # Auth routes group
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── signup/
│   │       └── page.tsx          # Sign up page
│   ├── (dashboard)/              # Protected routes group
│   │   ├── layout.tsx            # Dashboard layout (sidebar)
│   │   └── dashboard/
│   │       └── page.tsx          # Main dashboard page
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/   # NextAuth API routes
│   │   │       └── route.ts
│   └── layout.tsx                # Root layout
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── auth/                     # Auth-related components
│   │   ├── LoginForm.tsx
│   │   └── SignUpForm.tsx
│   └── dashboard/
│       ├── Sidebar.tsx
│       ├── DashboardContent.tsx
│       └── DummyCharts.tsx
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── db.ts                     # Prisma client
│   └── utils.ts                  # Utility functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── docker-compose.yml            # Docker setup for dev
├── Dockerfile                    # Production Docker image
├── .env                          # Environment variables (gitignored)
└── .env.example                  # Template for environment variables
```

## 🗄️ Database Schema (MVP) - JWT-Only Strategy

```prisma
// prisma/schema.prisma

// JWT-only = Hanya butuh 1 table!
// Session disimpan di encrypted JWT cookie, bukan database

model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String   // Hashed dengan bcrypt
  image     String?
  role      String   @default("user") // user, admin
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ❌ TIDAK BUTUH table sessions
// ❌ TIDAK BUTUH table accounts
// ❌ TIDAK BUTUH table verification_tokens

// Session flow:
// 1. User login → verify password
// 2. Create JWT token dengan user data
// 3. JWT disimpan di cookie (encrypted)
// 4. Setiap request → verify JWT (no DB query!)
```

**Benefits JWT-Only:**
- ⚡ Faster (no DB query untuk session check)
- 🎯 Simpler (1 table vs 4 tables)
- 📈 Scalable (stateless)
- ✅ Perfect untuk MVP

## 🔐 Authentication Flow

### Sign Up Flow
1. User mengisi form (name, email, password)
2. Password di-hash dengan bcrypt
3. User data disimpan ke database
4. Redirect ke login page

### Login Flow
1. User mengisi credentials (email, password)
2. NextAuth verify credentials
3. Create session
4. Redirect ke dashboard

### Protected Routes
- Middleware check session
- Redirect ke login jika belum authenticated
- Allow access jika sudah authenticated

## 🎨 UI/UX Design

### Color Scheme (LNG/Energy Industry)
```css
Primary: Blue (#0066CC) - Trust, professionalism
Secondary: Green (#00AA66) - Energy, sustainability
Accent: Orange (#FF6600) - Alert, attention
Background: White (#FFFFFF)
Surface: Gray (#F5F5F5)
Text: Dark Gray (#333333)
```

### Layout Components

#### Sidebar
- Width: 256px (desktop)
- Collapsible on mobile
- Menu items:
  - Dashboard (active)
  - Data Analysis (disabled - future)
  - Reports (disabled - future)
  - Settings (disabled - future)

#### Dashboard Content Area
- Full height
- Responsive grid layout
- Placeholder cards untuk:
  - KPI Summary (4 cards)
  - Charts area (2 columns)
  - Recent data table (full width)

## 🚀 Development Workflow

### Phase 1: Setup (Days 1-2)
1. ✅ Environment setup (Docker Compose)
2. ✅ Database setup (Prisma + MySQL)
3. ✅ NextAuth configuration
4. ✅ Basic project structure

### Phase 2: Authentication (Days 3-4)
1. ✅ Database schema & migrations
2. ✅ Login page + functionality
3. ✅ Sign up page + functionality
4. ✅ Session management
5. ✅ Route protection middleware

### Phase 3: Dashboard UI (Days 5-6)
1. ✅ Dashboard layout component
2. ✅ Sidebar component
3. ✅ Dummy dashboard content
4. ✅ Responsive design
5. ✅ Navigation

### Phase 4: Testing & Documentation (Day 7)
1. ✅ End-to-end testing
2. ✅ Deployment documentation
3. ✅ Environment setup guide
4. ✅ README updates

## 📝 Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="mysql://user:password@localhost:3306/bp_dashboard"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl"

# NextAuth Providers (optional for MVP)
# GOOGLE_CLIENT_ID=""
# GOOGLE_CLIENT_SECRET=""
```

## 🐳 Docker Setup

### docker-compose.yml (Development)
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: bp_dashboard
      MYSQL_USER: admin
      MYSQL_PASSWORD: admin123
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: "mysql://admin:admin123@mysql:3306/bp_dashboard"
      NEXTAUTH_URL: "http://localhost:3000"
      NEXTAUTH_SECRET: "development-secret-key-change-in-production"
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      mysql:
        condition: service_healthy
    command: npm run dev

volumes:
  mysql_data:
```

## 🚢 Deployment Strategy

### Option 1: Vercel + PlanetScale (Recommended)
**Pros:**
- Zero config deployment
- Free tier available
- Auto-scaling
- Edge network
- Best Next.js performance

**Steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Create PlanetScale database
4. Add DATABASE_URL to Vercel env vars
5. Deploy

**Cost:** Free for hobby projects, ~$20/month for production

### Option 2: Railway (All-in-One)
**Pros:**
- Simple setup
- MySQL included
- Single platform for app + database

**Steps:**
1. Connect GitHub to Railway
2. Deploy project
3. Add MySQL service
4. Configure environment variables

**Cost:** ~$5-10/month

### Option 3: Docker + VPS (Full Control)
**Pros:**
- Complete control
- Cost-effective for scale
- Can use existing infrastructure

**Steps:**
1. Setup VPS (DigitalOcean, AWS, etc)
2. Install Docker + Docker Compose
3. Setup reverse proxy (Nginx)
4. Deploy containers
5. Setup SSL (Let's Encrypt)

**Cost:** ~$5-20/month depending on VPS

## ✅ MVP Acceptance Criteria

- [ ] User dapat sign up dengan email & password
- [ ] User dapat login dengan credentials
- [ ] Session persists setelah refresh
- [ ] User dapat logout
- [ ] Dashboard hanya accessible setelah login
- [ ] Sidebar menampilkan menu "Dashboard"
- [ ] Dashboard page memiliki placeholder untuk charts & tables
- [ ] Responsive design (desktop & mobile)
- [ ] Docker setup berjalan di local
- [ ] Documentation lengkap untuk deployment

## 📚 Next Steps (Post-MVP)

1. **Data Management**
   - Upload CSV/Excel files
   - Data validation & cleaning
   - Store field data in database

2. **Visualization**
   - Implement real charts dengan Recharts
   - Interactive data tables dengan TanStack Table
   - KPI cards dengan real data

3. **Analysis Features**
   - Cross-check algorithms
   - Anomaly detection
   - Report generation

4. **User Management**
   - Role-based access control (Admin, Analyst, Viewer)
   - User management dashboard
   - Activity logging

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js v5 Documentation](https://authjs.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TailwindCSS v4 Documentation](https://tailwindcss.com/docs)

---

**Last Updated:** 2026-02-08
**Version:** 1.0 (MVP)
**Status:** Planning Phase

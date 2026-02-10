# BP Dashboard

This project runs the BP dashboard app with a MySQL database seeded from BP project SQL data.

## What is included

- `database/mysql_insert.sql`: migrated from `BP_BE/database/mysql_insert.sql`
- Docker MySQL auto-import on first startup (`/docker-entrypoint-initdb.d`)
- Prisma migration for auth table (`users`) on app startup
- Default database name: `bp_project`

## Prerequisites

- Docker / Docker Compose
- Node.js 20+ (optional, only if running app outside Docker)

## Run with Docker (Development)

From `bp-dashboard/`:

```bash
docker-compose up -d --build
```

This does:

1. Starts MySQL with database `bp_project`
2. Imports `database/mysql_insert.sql` on first initialization
3. Starts app container
4. Runs `npx prisma migrate deploy` to create `users` table
5. Runs Next.js dev server

Open:

- App: `http://localhost:3000`
- MySQL: `localhost:3306`

## Verify BP Project Data

```bash
docker-compose exec mysql mysql -uroot -proot -e "USE bp_project; SHOW TABLES;"
```

Example checks:

```bash
docker-compose exec mysql mysql -uroot -proot -e "USE bp_project; SELECT COUNT(*) AS amendments FROM tb_m_amendment;"
docker-compose exec mysql mysql -uroot -proot -e "USE bp_project; SELECT COUNT(*) AS monthly_cost_rows FROM tb_t_monthly_cost;"
```

## Important: SQL import only runs on first DB init

MySQL init scripts in `/docker-entrypoint-initdb.d` run only when the data volume is empty.

If you need to re-import from SQL:

```bash
docker-compose down -v
docker-compose up -d --build
```

## Production Compose

`docker-compose.prod.yml` is also configured to:

- Use database `bp_project`
- Auto-import `database/mysql_insert.sql` on first MySQL init

Start production stack:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## Notes

- The BP project schema/data is sourced from `BP_BE` SQL.
- Prisma schema currently remains as-is; auth migration only creates `users`.
- If you later change BP table structures, update both:
  - `database/mysql_insert.sql`
  - `prisma/schema.prisma` (recommended to keep them aligned)

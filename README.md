# BP Dashboard

BP Dashboard runs with MySQL database `bp_project` and Next.js app in Docker.

## Goal

Load BP project data (from `database/mysql_insert.sql`) into MySQL, then run dashboard app on top of it.

## Prerequisites

- Docker Desktop or OrbStack
- Docker Compose v2 (`docker compose`)

## Project Files

- `database/mysql_insert.sql`: BP project schema + data
- `database/02-users.sql`: auth `users` table bootstrap
- `docker-compose.yml`: development stack
- `docker-compose.prod.yml`: production stack

## Development Setup (Correct Flow)

From `bp-dashboard/`:

1. Ensure SQL auto-import is enabled in `docker-compose.yml` under MySQL `volumes`.

It must contain this line:

```yaml
- ./database:/docker-entrypoint-initdb.d:ro
```

If this line is commented, MySQL will not import BP tables (and `users` bootstrap SQL also will not run).

2. Reset containers + volume (required if DB already initialized):

```bash
docker compose down -v
```

3. Start stack:

```bash
docker compose up -d --build
```

4. Check containers:

```bash
docker compose ps
```

5. Verify BP tables are loaded:

```bash
docker compose exec mysql mysql -uroot -proot -e "USE bp_project; SHOW TABLES;"
```

Expected: many `tb_m_*` and `tb_t_*` tables, including `users`.

## Why You Might See Only `users` and `_prisma_migrations`

This means SQL bootstrap did not run.

Common causes:

- SQL mount is commented in `docker-compose.yml`
- Existing MySQL volume reused (init scripts run only on first init)

Fix:

```bash
docker compose down -v
docker compose up -d --build
```

Then verify again with `SHOW TABLES;`.

## Useful Checks

Count rows from BP tables:

```bash
docker compose exec mysql mysql -uroot -proot -e "USE bp_project; SELECT COUNT(*) AS amendments FROM tb_m_amendment;"
docker compose exec mysql mysql -uroot -proot -e "USE bp_project; SELECT COUNT(*) AS monthly_cost_rows FROM tb_t_monthly_cost;"
```

Tail logs:

```bash
docker compose logs -f mysql
docker compose logs -f app
```

## Production

Production compose also points to `bp_project`.

Start:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

If you need SQL import on a fresh production DB, make sure the same SQL init mount is present and DB volume is new.

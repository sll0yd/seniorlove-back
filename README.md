# SENIOR LOVE BACKEND

Welcome to Senior Love Backend repository. 
Want to try our API out ? Let's start this journey together ! 💪

## First

```bash
# 1 - Clone the repository into your local environement
git clone git@github.com:O-clock-Quinoa/seniorlove-back.git
cd seniorlove-back/
code .
```

## Set up

```bash
# 1 - Install depedencies
npm i

# 2 - Configure .env
cp .env.example .env

# 3 - Launch server
npm run dev

# Does everything look good on PORT 3000 ?
# 👍 ? Congrats ! You can stop the server.
# 👎 ? Assure you tried to connect from your favorite browser on http://localhost:3000.
# Still stuck ? Assure the path in shell ends by /seniorlov-back. Reapeat from #1.
```

## Initialize DB in your local environment

```bash
# 1 - Connect to Postgres
psql postgres (MacOS) || sudo -u postgres psql (Linux)

# 2 - Create a new ROLE in PostgreSQL
CREATE ROLE <xxxx> WITH LOGIN PASSWORD 'yyyy';

# 3 - Create a new DATABASE in PostgreSQL
CREATE DATABASE <zzzz> OWNER <xxxx>;

# 4 - use \q to quit and return to the shell
```

## Create tables | Populate tables | Reset tables

```bash
## 1 - Create tables
npm run db:create

## 2 - Populate tables
npm run db:populate

## 3 - Or do both in a single command 😏
npm run db:reset
```

# SENIOR LOVE BACKEND

## Set up
### 1 - Install depedencies
```bash
npm i
```

### 2 - Configure .env
```bash
cp .env.example .env
```

### 3 - Launch server
```bash
npm run dev
```

## Initialize DB in your local environment


### 1 - Create a new ROLE in PostgreSQL :
```bash
CREATE ROLE <xxxx> WITH LOGIN PASSWORD 'xxxx';
```

### 2 - Create a new DATABASE in PostgreSQL :
```bash
CREATE DATABASE <yyyy> OWNER <xxxx>;
```

### 3 - Create tables
```bash
npm run db:create
```

### 4 - Populate tables
```bash
npm run db:populate
```

### 5 - Reset tables if required
```bash
npm run db:reset
```
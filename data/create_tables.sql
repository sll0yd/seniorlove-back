-- create_tables.sql --

BEGIN;

DROP TABLE IF EXISTS "users", "event", "tag", "message";

CREATE TABLE "users" (
  "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "userName" VARCHAR(255) NOT NULL,
  "gender" TEXT NOT NULL,
  "picture" VARCHAR(255),
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "age" INT NOT NULL,
  "hometown" VARCHAR(255),
  "bio" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "event" (
  "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "title" VARCHAR(255) NOT NULL,
  "picture" VARCHAR(255),
  "description" TEXT NOT NULL,
  "date" VARCHAR(255) NOT NULL,
  "location" VARCHAR(255) NOT NULL,
  "creator_id" INT NOT NULL REFERENCES "users"("id"),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tag" (
  "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "name" VARCHAR(255) NOT NULL,
  "color" VARCHAR(7) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "message" (
  "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "sender_id" INT NOT NULL,
  "receiver_id" INT NOT NULL,
  "content" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
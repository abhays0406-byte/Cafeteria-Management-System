CREATE TABLE "orders" (
	"id" serial PRIMARY KEY,
	"items" text NOT NULL,
	"total" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);

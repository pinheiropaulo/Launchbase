CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp with time zone DEFAULT (now()),
  "updated_at" timestamp with time zone DEFAULT (now())
);

-- CREATE TABLE public.products (
--     updated_at timestamp with time zone NULL,
--     created_at timestamp with time zone NULL,
--   status integer NULL,
--   quantity integer NULL,
--   price integer NOT NULL,
--   old_price integer NULL,
--   description text NOT NULL,
--   name text NOT NULL,
--   user_id integer NULL,
--   category_id integer NOT NULL,
--   id integer NOT NULL
-- );
-- ALTER TABLE
--   public.products
-- ADD
--   CONSTRAINT products_pkey PRIMARY KEY (id)

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int
);

INSERT INTO categories("name") VALUES('Informática');
INSERT INTO categories("name") VALUES('Comida');

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

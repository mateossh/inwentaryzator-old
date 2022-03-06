-- Your SQL goes here
CREATE TABLE products (
  code VARCHAR NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL,
  price DECIMAL NOT NULL,
  measure_unit VARCHAR NOT NULL
)

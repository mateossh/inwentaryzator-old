-- CreateTable
CREATE TABLE "Product" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "measureUnit" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Stock" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "Stock_code_fkey" FOREIGN KEY ("code") REFERENCES "Product" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_code_key" ON "Stock"("code");

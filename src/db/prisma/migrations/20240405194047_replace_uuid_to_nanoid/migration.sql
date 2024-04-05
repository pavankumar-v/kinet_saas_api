-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "id" SET DEFAULT nanoid(7, '0123456789');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nanoid(7, '0123456789');

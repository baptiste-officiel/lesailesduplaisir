-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "withPilot" TEXT,
ALTER COLUMN "activity" DROP NOT NULL;

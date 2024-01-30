-- CreateTable
CREATE TABLE "Plane" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "seats" TEXT,
    "vmax" TEXT,
    "weight" TEXT,

    CONSTRAINT "Plane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pin" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "ipfsHash" VARCHAR(255) NOT NULL,

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("id")
);

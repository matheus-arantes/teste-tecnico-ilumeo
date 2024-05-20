-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pontos" (
    "id" SERIAL NOT NULL,
    "entrada" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "totalTime" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "pontos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "pontos" ADD CONSTRAINT "pontos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

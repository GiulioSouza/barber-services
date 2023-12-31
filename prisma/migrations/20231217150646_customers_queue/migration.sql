-- CreateTable
CREATE TABLE "customersqueue" (
    "id" SERIAL NOT NULL,
    "queueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "isAwaiting" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "customersqueue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customersqueue" ADD CONSTRAINT "customersqueue_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "queues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

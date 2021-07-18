-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "taskId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "columnId" DROP NOT NULL;

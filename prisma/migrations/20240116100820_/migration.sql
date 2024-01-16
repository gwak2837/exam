-- DropIndex
DROP INDEX "Post_authorId_idx";

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post" USING HASH ("authorId");

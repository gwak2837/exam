-- CreateIndex
CREATE INDEX "OAuth_userId_idx" ON "OAuth" USING HASH ("userId");

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post" USING HASH ("authorId");

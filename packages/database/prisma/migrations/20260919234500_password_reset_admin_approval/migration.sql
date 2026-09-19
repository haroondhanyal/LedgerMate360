ALTER TABLE "PasswordResetToken"
ADD COLUMN "approvedAt" TIMESTAMP(3),
ADD COLUMN "approvedById" TEXT;

CREATE INDEX "PasswordResetToken_approvedAt_createdAt_idx"
ON "PasswordResetToken"("approvedAt", "createdAt");

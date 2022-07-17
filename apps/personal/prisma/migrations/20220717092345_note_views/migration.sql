-- AlterTable
ALTER TABLE "post_views" ALTER COLUMN "count" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "note_views" (
    "slug" VARCHAR(128) NOT NULL,
    "count" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "note_views_pkey" PRIMARY KEY ("slug")
);

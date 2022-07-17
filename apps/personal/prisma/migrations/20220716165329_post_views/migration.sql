-- CreateTable
CREATE TABLE "post_views" (
    "slug" VARCHAR(128) NOT NULL,
    "count" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "post_views_pkey" PRIMARY KEY ("slug")
);

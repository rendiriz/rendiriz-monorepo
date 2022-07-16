-- CreateTable
CREATE TABLE "post_most_view" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_post" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cover" TEXT,
    "total" BIGINT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_most_view_pkey" PRIMARY KEY ("id")
);

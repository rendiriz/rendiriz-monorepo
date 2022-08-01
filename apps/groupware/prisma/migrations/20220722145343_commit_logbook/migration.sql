-- CreateTable
CREATE TABLE "Commit" (
    "id" TEXT NOT NULL,
    "short_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_email" TEXT NOT NULL,
    "authored_date" TIMESTAMP(3) NOT NULL,
    "committer_name" TEXT NOT NULL,
    "committer_email" TEXT NOT NULL,
    "committed_date" TIMESTAMP(3) NOT NULL,
    "web_url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Commit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logbook" (
    "id" TEXT NOT NULL,
    "commitId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "nameTask" TEXT NOT NULL,
    "tupoksiJabatanId" TEXT NOT NULL,
    "dateTask" TIMESTAMP(3) NOT NULL,
    "difficultyTask" INTEGER NOT NULL,
    "evidenceTask" TEXT,
    "documentTask" TEXT NOT NULL,
    "workPlace" TEXT NOT NULL DEFAULT 'WFH',
    "organizerTask" TEXT NOT NULL DEFAULT 'JDS',
    "isMainTask" BOOLEAN,
    "isDocumentLink" BOOLEAN NOT NULL DEFAULT false,
    "isStatus" TEXT NOT NULL,

    CONSTRAINT "Logbook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logbook" ADD CONSTRAINT "Logbook_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

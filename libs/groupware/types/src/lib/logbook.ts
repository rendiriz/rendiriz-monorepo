import { z } from 'zod';

export const Logbook = z.object({
  id: z.string(),
  commitId: z.string(),
  projectId: z.string(),
  projectName: z.string(),
  nameTask: z.string(),
  tupoksiJabatanId: z.string(),
  dateTask: z.date(),
  dateSend: z.date().nullable(),
  difficultyTask: z.number(),
  evidenceTask: z.string().nullable(),
  documentTask: z.string(),
  workPlace: z.string(),
  organizerTask: z.string(),
  isMainTask: z.boolean().nullable(),
  isDocumentLink: z.boolean(),
  isStatus: z.string(),
});
export const Logbooks = z.array(Logbook);

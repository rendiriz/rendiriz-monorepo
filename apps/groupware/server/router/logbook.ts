import * as trpc from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';
import ImageKit from 'imagekit';
import { format, parseISO } from 'date-fns';
import { pagination } from '@rendiriz-ecosystem/shared/utils';
import { Logbook, Logbooks } from '@rendiriz-ecosystem/groupware/types';
import type { TPagination } from '@rendiriz-ecosystem/shared/types';

export type Logbook = z.infer<typeof Logbook>;
export type Logbooks = z.infer<typeof Logbooks>;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const logbookRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .query('getAll', {
    input: z.object({
      perPage: z.number(),
      page: z.number(),
      project: z.string().nullable(),
    }),
    async resolve({ ctx, input }) {
      const limit = input.perPage;
      const offset = limit * input.page - limit;
      const committerEmail = ctx.session?.user?.email || '';

      const where = {
        commit: {
          committer_email: committerEmail,
        },
      };

      if (input.project) {
        Object.assign(where, { projectId: input.project });
      }

      const result = await ctx.prisma.logbook.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          dateTask: 'desc',
        },
        where,
      });

      const count = await ctx.prisma.logbook.count({
        where,
      });

      let paging: TPagination = { empty: true };
      if (count > 0) {
        paging = {
          empty: false,
          ...pagination(count, offset, limit),
        };
      }

      return { logbooks: result, pagination: paging };
    },
  })
  .mutation('generateEvidence', {
    input: z.object({
      id: z.string(),
      documentTask: z.string(),
    }),
    async resolve({ ctx, input }) {
      const logbook = await ctx.prisma.logbook.findUnique({
        where: { id: input.id },
      });

      if (!logbook) {
        throw new trpc.TRPCError({ code: 'NOT_FOUND' });
      }

      // Generate Evidence
      const api = `https://gen-image.rendiriz.com/api/image.png`;
      const url = encodeURIComponent(input.documentTask);
      const generate = await fetch(`${api}?url=${url}`);
      const image = await generate.blob();

      // Blob to Buffer
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload Imagekit
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
        urlEndpoint: 'https://ik.imagekit.io/tlk1n6viqhs/',
      });

      const upload = imagekit.upload({
        file: buffer,
        fileName: `${input.id}.png`,
        folder: 'groupware_rendiriz_com',
      });

      const uploadResult = await Promise.resolve(upload);

      if (!uploadResult) {
        throw new trpc.TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }

      await delay(5000);

      // Update Logbook
      const updatedLogbook = await ctx.prisma.logbook.update({
        where: { id: input.id },
        data: {
          evidenceTask: uploadResult.url,
        },
      });

      return updatedLogbook;
    },
  })
  .mutation('updateLogbook', {
    input: z.object({
      bearer: z.string(),
      id: z.string(),
      projectId: z.string(),
      projectName: z.string(),
      nameTask: z.string(),
      tupoksiJabatanId: z.string(),
      dateTask: z.string(),
      dateSend: z.string(),
      difficultyTask: z.number(),
      documentTask: z.string(),
      workPlace: z.string(),
      organizerTask: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!input.bearer) {
        throw new trpc.TRPCError({ code: 'NOT_FOUND' });
      }

      const logbook = await ctx.prisma.logbook.findUnique({
        where: { id: input.id },
      });

      if (!logbook) {
        throw new trpc.TRPCError({ code: 'NOT_FOUND' });
      }

      // Update Logbook
      const dateSend = new Date(
        format(parseISO(input.dateSend), 'yyyy-MM-dd HH:mm:ss'),
      );
      const updatedLogbook = await ctx.prisma.logbook.update({
        where: { id: input.id },
        data: {
          dateSend,
          difficultyTask: input.difficultyTask,
          workPlace: input.workPlace,
          organizerTask: input.organizerTask,
          isStatus: 'send',
        },
      });

      return updatedLogbook;
    },
  });

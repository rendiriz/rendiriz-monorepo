import * as trpc from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';
import { Logbook, Logbooks } from '@rendiriz-ecosystem/groupware/types';

export type Logbook = z.infer<typeof Logbook>;
export type Logbooks = z.infer<typeof Logbooks>;

export const logbookRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .query('getAll', {
    input: z.object({
      page: z.number(),
    }),
    async resolve({ ctx, input }) {
      const perPage = 10;
      const currentPage = input.page + 1;
      const committerEmail = ctx.session?.user?.email || '';

      const result = await ctx.prisma.logbook.findMany({
        take: perPage,
        skip: perPage * currentPage - perPage,
        where: {
          commit: {
            committer_email: committerEmail,
          },
        },
      });

      const hasMore = await ctx.prisma.logbook.findMany({
        take: perPage,
        skip: perPage * (currentPage + 1) - perPage,
        where: {
          commit: {
            committer_email: committerEmail,
          },
        },
      });

      return { logbooks: result, hasMore: hasMore.length > 0 ? true : false };
    },
  });

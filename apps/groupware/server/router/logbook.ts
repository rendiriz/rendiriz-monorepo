import * as trpc from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';
import { pagination } from '@rendiriz-ecosystem/shared/utils';
import { Logbook, Logbooks } from '@rendiriz-ecosystem/groupware/types';
import type { TPagination } from '@rendiriz-ecosystem/shared/types';

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
      perPage: z.number(),
      page: z.number(),
    }),
    async resolve({ ctx, input }) {
      const limit = input.perPage;
      const offset = limit * input.page - limit;
      const committerEmail = ctx.session?.user?.email || '';

      const result = await ctx.prisma.logbook.findMany({
        take: limit,
        skip: offset,
        where: {
          commit: {
            committer_email: committerEmail,
          },
        },
      });

      const count = await ctx.prisma.logbook.count({
        where: {
          commit: {
            committer_email: committerEmail,
          },
        },
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
  });

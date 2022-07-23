// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { logbookRouter } from './logbook';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('logbook.', logbookRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

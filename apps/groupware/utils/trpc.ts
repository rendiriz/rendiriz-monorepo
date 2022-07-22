// src/utils/trpc.ts
import type { AppRouter } from '@rendiriz-ecosystem/groupware/server';
import { createReactQueryHooks } from '@trpc/react';

export const trpc = createReactQueryHooks<AppRouter>();

/**
 * Check out tRPC docs for Inference Helpers
 * https://trpc.io/docs/infer-types#inference-helpers
 */

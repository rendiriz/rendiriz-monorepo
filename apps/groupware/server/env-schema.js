const { z } = require('zod');

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url().optional(),
  GITLAB_CLIENT_ID: z.string(),
  GITLAB_CLIENT_SECRET: z.string(),
});

module.exports.envSchema = envSchema;

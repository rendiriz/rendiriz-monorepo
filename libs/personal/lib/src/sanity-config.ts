export const sanityConfig = {
  dataset: process.env.NX_SANITY_DATASET || 'production',
  projectId: process.env.NX_SANITY_PROJECT_ID || 'p6f8y3cm',
  useCdn: process.env.NODE_ENV !== 'production',
  apiVersion: '2021-03-25',
};

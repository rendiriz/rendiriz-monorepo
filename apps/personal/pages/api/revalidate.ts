// import type { NextApiRequest, NextApiResponse } from 'next';
// import { isValidRequest } from '@sanity/webhook';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import {
  sanityClient,
  noteUpdatedQuery,
} from '@rendiriz-ecosystem/personal/lib';

const token = process.env.SANITY_STUDIO_REVALIDATE_TOKEN;
const secret = process.env.SANITY_STUDIO_REVALIDATE_SECRET;

export default async function handler(req, res) {
  const signature = req.headers[SIGNATURE_HEADER_NAME];

  if (req.query.secret !== token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const body = await readBody(req);

  if (!isValidSignature(body, signature, secret)) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  // This isn't working yet - not sure why
  // if (!isValidRequest(req, process.env.SANITY_STUDIO_REVALIDATE_SECRET)) {
  //   return res.status(401).json({ message: 'Invalid request' });
  // }

  const { _id: id } = req.body;
  if (typeof id !== 'string' || !id) {
    return res.status(400).json({ message: 'Invalid _id' });
  }

  try {
    const slug = await sanityClient.fetch(noteUpdatedQuery, { id });
    await Promise.all([
      res.revalidate('/note'),
      res.revalidate(`/note/${slug}`),
    ]);
    return res.status(200).json({ message: `Updated ${slug}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

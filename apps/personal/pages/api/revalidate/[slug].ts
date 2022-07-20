import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import {
  sanityClient,
  postUpdatedQuery,
  noteUpdatedQuery,
} from '@rendiriz-ecosystem/personal/lib';

const token = process.env.SANITY_STUDIO_REVALIDATE_TOKEN;
const secret = process.env.SANITY_STUDIO_REVALIDATE_SECRET;

export default async function handler(req, res) {
  const type = req.query.slug.toString();
  const signature = req.headers[SIGNATURE_HEADER_NAME];

  if (req.query.secret !== token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const body = await readBody(req);

  if (!isValidSignature(body, signature, secret)) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  const jsonBody = JSON.parse(body);
  const { _id: id } = jsonBody;
  if (typeof id !== 'string' || !id) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  try {
    let slug;

    switch (type) {
      case 'blog':
        slug = await sanityClient.fetch(postUpdatedQuery, { id });
        break;
      case 'note':
        slug = await sanityClient.fetch(noteUpdatedQuery, { id });
        break;
      default:
        return res.status(400).json({ message: 'Invalid type' });
    }

    await Promise.all([
      res.unstable_revalidate(`/${type}`),
      res.unstable_revalidate(`/${type}/${slug}`),
    ]);
    return res.status(200).json({ message: `Updated ${type} - ${slug}` });
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

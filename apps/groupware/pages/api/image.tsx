import type { NextApiRequest, NextApiResponse } from 'next';

const getImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ error: 'Missing url' });
    return;
  }

  const image = await fetch(url as string);
  if (!image) {
    res.status(404).json({ error: 'Image not found' });
    return;
  }

  res.setHeader('Content-Type', 'image/png');
  res.send(image);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        return getImage(req, res);
      } catch (err: any) {
        return res.status(500).json({ message: err.message });
      }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

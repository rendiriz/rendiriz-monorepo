import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@rendiriz-ecosystem/personal/lib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const totalViews = await prisma.note_views.aggregate({
      _sum: {
        count: true,
      },
    });

    return res.status(200).json({ total: totalViews._sum.count.toString() });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

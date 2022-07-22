import type { NextApiRequest, NextApiResponse } from 'next';
import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

const getItem = async (req: NextApiRequest, res: NextApiResponse) => {
  const commit = '3d6dade007d30ae3877b3e42ee9897b3b17b802e';
  let result = null;
  let browser = null;

  if (process.env.AWS_EXECUTION_ENV) {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
  } else {
    browser = await puppeteer.launch({
      args: [],
      executablePath: '/usr/bin/google-chrome',
      headless: true,
    });
  }

  const page = await browser.newPage();

  await page.setViewport({
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
  });

  await page.goto(`https://gitlab.com/rendiriz/next-isr/-/commit/${commit}`, {
    timeout: 15 * 1000,
  });

  result = await page.screenshot({
    type: 'png',
  });

  if (browser !== null) {
    await browser.close();
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.setHeader('Content-Type', 'image/png');
  res.end(result);
};

const createItem = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).json({ message: `Success` });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        return getItem(req, res);
      } catch (err: any) {
        return res.status(500).json({ message: err.message });
      }
    case 'POST':
      createItem(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

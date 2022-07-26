import * as fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import formidable from 'formidable';
import FormData from 'form-data';

const createItem = async (req: NextApiRequest, res: NextApiResponse) => {
  const formData = new FormData();

  const promise = new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const form = promise.then(({ fields, files }: any) => {
    return { fields, files };
  });
  const data = await form;

  [
    'projectId',
    'projectName',
    'nameTask',
    'tupoksiJabatanId',
    'isMainTask',
    'dateTask',
    'difficultyTask',
    'isDocumentLink',
    'documentTask',
    'workPlace',
    'organizerTask',
    'evidenceTask',
  ].map((key) => {
    data.fields[key] && formData.append(key, data.fields[key]);
    data.files[key] &&
      formData.append(key, fs.createReadStream(data.files[key].filepath));
  });

  const config = {
    method: 'post',
    url: `https://groupware-api.digitalservice.id/logbook/`,
    headers: {
      ...formData.getHeaders(),
      Authorization: req.headers['authorization'] as string,
    },
    data: formData,
  };

  const groupware = await axios(config);
  return groupware;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const groupware = createItem(req, res);
        res.status(200).json(groupware);
      } catch (err: any) {
        return res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

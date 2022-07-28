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

    if (data.files[key]) {
      const newfilepath = '/tmp/' + data.files[key].originalFilename;
      fs.renameSync(data.files[key].filepath, newfilepath);
      const file = fs.createReadStream(newfilepath);
      formData.append(key, file);
    }
  });

  const { data: groupware } = await axios.post(
    `https://groupware-api.digitalservice.id/logbook/`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        Authorization: req.headers['authorization'] as string,
      },
    },
  );

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

        if (Object.entries(groupware).length > 0) {
          res.status(200).json({ status: 'success', data: groupware });
        }

        res.status(200).json({ status: 'error', data: groupware });
      } catch (err: any) {
        return res.status(500).json({ status: 'error', message: err });
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

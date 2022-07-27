import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../server/db/client';

const projectMap = new Map<number, { id: string; name: string; repo: string }>([
  [
    38023555,
    {
      id: '60170024fe6713001d100000',
      name: 'Next On-Demand ISR',
      repo: 'next-isr',
    },
  ],
  [
    14510167,
    {
      id: '60170024fe6713001d160167',
      name: 'Satu Data Jawa Barat',
      repo: 'satudata-frontend',
    },
  ],
  [
    36228579,
    {
      id: '602b9477621200001db91977',
      name: 'Portal Data Jabar',
      repo: 'replikasi-pdj-frontend',
    },
  ],
]);

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const difficulty = (task: string) => {
  const split = task.split(':');

  const build = split[0].includes('build') ? randomNumber(1, 2) : null;
  const chore = split[0].includes('chore') ? randomNumber(1, 3) : null;
  const ci = split[0].includes('ci') ? randomNumber(1, 2) : null;
  const docs = split[0].includes('docs') ? randomNumber(1, 2) : null;
  const feat = split[0].includes('feat') ? randomNumber(3, 5) : null;
  const fix = split[0].includes('fix') ? randomNumber(1, 2) : null;
  const perf = split[0].includes('perf') ? randomNumber(3, 5) : null;
  const refactor = split[0].includes('refactor') ? randomNumber(3, 5) : null;
  const revert = split[0].includes('revert') ? randomNumber(1, 2) : null;
  const style = split[0].includes('style') ? randomNumber(1, 3) : null;
  const test = split[0].includes('test') ? randomNumber(1, 3) : null;

  const result = [
    build,
    chore,
    ci,
    docs,
    feat,
    fix,
    perf,
    refactor,
    revert,
    style,
    test,
  ];

  return result.filter((n) => n)[0] || randomNumber(1, 5);
};

const getCommit = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers['x-gitlab-token'];

  if (process.env.GITLAB_TOKEN !== token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const body = req.body;
  const id = body.project_id || body.project.id;
  const username = body.user_username;

  if (!id) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  if (username !== 'rendiriz') {
    return res.status(400).json({ message: 'Invalid user' });
  }

  const commitBody: any[] = [];
  const logbookBody: any[] = [];
  body.commits.forEach(async (commit: any) => {
    // Get Gitlab Commit
    const gitlab = await fetch(
      `https://gitlab.com/api/v4/projects/${id}/repository/commits/${commit.id}`,
    );
    const gitlabData = await gitlab.json();

    commitBody.push({
      id: gitlabData.id,
      short_id: gitlabData.short_id,
      created_at: gitlabData.created_at,
      title: gitlabData.title,
      message: gitlabData.message,
      author_name: gitlabData.author_name,
      author_email: gitlabData.author_email,
      authored_date: gitlabData.authored_date,
      committer_name: gitlabData.committer_name,
      committer_email: gitlabData.committer_email,
      committed_date: gitlabData.committed_date,
      web_url: gitlabData.web_url,
      status: gitlabData.status,
      project_id: gitlabData.project_id,
    });

    logbookBody.push({
      id: uuidv4(),
      commitId: gitlabData.id,
      projectId: projectMap.get(gitlabData.project_id)?.id || '',
      projectName: projectMap.get(gitlabData.project_id)?.name || '',
      nameTask: gitlabData.title,
      tupoksiJabatanId: '62d6421d-be8d-4390-ba5c-252108818350',
      dateTask: gitlabData.created_at,
      difficultyTask: difficulty(gitlabData.title),
      evidenceTask: null,
      documentTask: gitlabData.web_url,
      workPlace: 'WFH',
      organizerTask: 'JDS',
      isMainTask: null,
      isDocumentLink: true,
      isStatus: 'draft',
    });
  });

  // Save to Table Commit
  const commit = await prisma.commit.createMany({
    data: commitBody,
  });

  // Save to Table Logbook
  const logbook = await prisma.logbook.createMany({
    data: logbookBody,
  });

  res.status(200).json({
    project_id: id,
    commit,
    logbook,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        return getCommit(req, res);
      } catch (err: any) {
        return res.status(500).json({ message: err.message });
      }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

import {
  sanityClient,
  postSlugsQuery,
  noteSlugsQuery,
} from '@rendiriz-ecosystem/personal/lib';
import { site } from '@rendiriz-ecosystem/personal/config';

const createSitemap = (slugs) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
          .map((slug) => {
            return `
                <url>
                    <loc>${`${site.siteUrl}/${slug}`}</loc>
                </url>
            `;
          })
          .join('')}
    </urlset>
`;

export async function getServerSideProps({ res }) {
  const allPosts = await sanityClient.fetch(postSlugsQuery);
  const allNotes = await sanityClient.fetch(noteSlugsQuery);

  const allPages = [
    ...allPosts.map((slug) => `blog/${slug}`),
    ...allNotes.map((slug) => `note/${slug}`),
    ...['', 'work', 'about', 'blog', 'note'],
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600',
  );
  res.write(createSitemap(allPages));
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}

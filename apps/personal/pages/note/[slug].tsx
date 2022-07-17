import { useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { NextSeo } from 'next-seo';
import classNames from 'classnames';
import { MDXRemote } from 'next-mdx-remote';
import { site } from '@rendiriz-ecosystem/personal/config';
import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import { DefaultContainer } from '@rendiriz-ecosystem/personal/templates';
import {
  NotePost,
  BlogFooter,
  Tweet,
  MDXComponents,
} from '@rendiriz-ecosystem/personal/components';
import {
  sanityClient,
  getClient,
  noteQuery,
  noteSlugsQuery,
  Note,
  getTweets,
  mdxToHtml,
  urlForImage,
} from '@rendiriz-ecosystem/personal/lib';

export function NoteDetail({ post }: { post: Note }) {
  const main = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useIsomorphicLayoutEffect(() => {
    setMounted(true);

    let scroll: any;
    import('locomotive-scroll').then((LocomotiveScroll) => {
      scroll = new LocomotiveScroll.default({
        el: main.current,
        smooth: false,
        smoothMobile: false,
      });
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const StaticTweet = ({ id }) => {
    const tweet = post.tweets.find((tweet) => tweet.id === id);
    return <Tweet {...tweet} />;
  };

  return (
    <>
      <NextSeo
        title={post.title}
        titleTemplate={`%s — ${site.title}`}
        description={post.excerpt}
        canonical={`${site.siteUrl}/note/${post.slug}`}
        noindex={site.noIndex}
        additionalLinkTags={site.favicon}
        openGraph={{
          title: post.title,
          description: post.excerpt,
          url: `${site.siteUrl}/note/${post.slug}`,
          type: 'article',
          article: {
            publishedTime: new Date(post.date).toISOString(),
          },
          images: [
            {
              url: urlForImage(post.coverImage).url(),
              width: 850,
              height: 650,
              alt: post.title,
            },
          ],
        }}
      />
      <main
        ref={main}
        className={classNames('content', 'w-full overflow-hidden opacity-100')}
      >
        <section
          data-scroll-section
          className={classNames('h-[200px] lg:h-[250px]')}
        />
        <div
          data-scroll-section
          className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16"
        >
          <NotePost post={post}>
            <MDXRemote
              {...post.content}
              components={
                {
                  ...MDXComponents,
                  StaticTweet,
                } as any
              }
            />
          </NotePost>
        </div>
        <BlogFooter theme={theme} setTheme={setTheme} />
      </main>
    </>
  );
}

NoteDetail.Layout = function getLayout(page) {
  return <DefaultContainer>{page}</DefaultContainer>;
};

export default NoteDetail;

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(noteSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, preview = false }) {
  const { note } = await getClient(preview).fetch(noteQuery, {
    slug: params.slug,
  });

  console.log(note);

  if (!note) {
    return { notFound: true };
  }

  const { html, tweetIDs, readingTime } = await mdxToHtml(note.content);
  const tweets = await getTweets(tweetIDs);

  return {
    props: {
      post: {
        ...note,
        content: html,
        tweets,
        readingTime,
      },
    },
  };
}

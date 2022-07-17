import { useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { NextSeo } from 'next-seo';
import classNames from 'classnames';
import { MDXRemote } from 'next-mdx-remote';
import { site } from '@rendiriz-ecosystem/personal/config';
import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import { DefaultContainer } from '@rendiriz-ecosystem/personal/templates';
import {
  BlogPost,
  BlogFooter,
  Tweet,
  MDXComponents,
} from '@rendiriz-ecosystem/personal/components';
import {
  sanityClient,
  getClient,
  postQuery,
  postSlugsQuery,
  Post,
  getTweets,
  mdxToHtml,
  urlForImage,
} from '@rendiriz-ecosystem/personal/lib';

export function BlogDetail({ post }: { post: Post }) {
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
        canonical={site.siteUrl}
        noindex={site.noIndex}
        additionalLinkTags={site.favicon}
        openGraph={{
          title: post.title,
          description: post.excerpt,
          url: `${site.siteUrl}/blog/${post.slug}`,
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
          <BlogPost post={post}>
            <MDXRemote
              {...post.content}
              components={
                {
                  ...MDXComponents,
                  StaticTweet,
                } as any
              }
            />
          </BlogPost>
        </div>
        <BlogFooter theme={theme} setTheme={setTheme} />
      </main>
    </>
  );
}

BlogDetail.Layout = function getLayout(page) {
  return <DefaultContainer>{page}</DefaultContainer>;
};

export default BlogDetail;

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, preview = false }) {
  const { post } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });

  if (!post) {
    return { notFound: true };
  }

  const { html, tweetIDs, readingTime } = await mdxToHtml(post.content);
  const tweets = await getTweets(tweetIDs);

  return {
    props: {
      post: {
        ...post,
        content: html,
        tweets,
        readingTime,
      },
    },
  };
}

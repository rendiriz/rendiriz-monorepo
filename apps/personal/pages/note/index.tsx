import { Suspense, useState, useRef } from 'react';
import { InferGetStaticPropsType } from 'next';
import { useTheme } from 'next-themes';
import { NextSeo } from 'next-seo';
import classNames from 'classnames';
import { site } from '@rendiriz-ecosystem/personal/config';
import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import { DefaultContainer } from '@rendiriz-ecosystem/personal/templates';
import {
  NotePostPreview,
  BlogFooter,
} from '@rendiriz-ecosystem/personal/components';
import {
  getClient,
  allNoteQuery,
  Note,
} from '@rendiriz-ecosystem/personal/lib';

export function Note({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const main = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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

  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <>
      <NextSeo
        title="Notes"
        titleTemplate={`%s — ${site.title}`}
        description={`${site.title}'s Note`}
        canonical={site.siteUrl}
        noindex={site.noIndex}
        additionalLinkTags={site.favicon}
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
          <h1 className="font-serif text-center text-3xl lg:text-5xl xl:text-6xl mb-8">
            NOTE
          </h1>
          <div className="relative w-full mb-10">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full px-4 py-2 text-stone-900 bg-stone-100 border border-stone-300 rounded-md dark:border-slate-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-slate-100"
            />
            <svg
              className="absolute w-5 h-5 text-stone-400 right-3 top-3 dark:text-slate-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Suspense fallback={null}>
            {!filteredBlogPosts.length && (
              <p className="mb-4 text-stone-600 dark:text-slate-400">
                No posts found.
              </p>
            )}
            {filteredBlogPosts.map((post) => (
              <NotePostPreview
                key={post.title}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
              />
            ))}
          </Suspense>
        </div>
        <BlogFooter theme={theme} setTheme={setTheme} />
      </main>
    </>
  );
}

Note.Layout = function getLayout(page) {
  return <DefaultContainer>{page}</DefaultContainer>;
};

export default Note;

export async function getStaticProps({ preview = false }) {
  const posts: Note[] = await getClient(preview).fetch(allNoteQuery);

  return { props: { posts } };
}

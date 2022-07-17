import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { PropsWithChildren, Suspense } from 'react';

import { NoteViewCounter } from '../note-view-counter/note-view-counter';
import { Post } from '@rendiriz-ecosystem/personal/lib';

export function NotePost({
  children,
  post,
}: PropsWithChildren<{ post: Post }>) {
  return (
    <>
      <Link href="/note">
        <a className="mb-6 hover:underline link-hover">cd..</a>
      </Link>
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16 px-6 md:px-0">
        <h1 className="mb-4 text-3xl font-bold tracking-tight !leading-[1.15] text-stone-800 md:text-5xl dark:text-slate-200">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <p className="text-sm text-stone-700 dark:text-slate-300">
              {'Rendi Riz / '}
              {format(parseISO(post.date), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="mt-2 text-sm text-stone-600 dark:text-slate-400 min-w-32 md:mt-0">
            {post.readingTime}
            {` • `}
            <NoteViewCounter slug={post.slug} />
          </p>
        </div>
        <Suspense fallback={null}>
          <div className="w-full mt-8 prose dark:prose-dark max-w-none">
            {children}
          </div>
        </Suspense>
      </article>
    </>
  );
}

export default NotePost;

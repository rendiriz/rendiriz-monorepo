import Link from 'next/link';
import useSWR from 'swr';

import { fetcher, NoteViews } from '@rendiriz-ecosystem/personal/lib';

export function NotePostPreview({
  slug,
  title,
  excerpt,
}: {
  slug: string;
  title: string;
  excerpt: string;
}) {
  const { data } = useSWR<NoteViews>(`/api/note-views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <Link href={`/note/${slug}`}>
      <a className="w-full">
        <div className="w-full mb-8">
          <div className="flex flex-col justify-between md:flex-row">
            <h4 className="w-full mb-2 text-xl font-medium text-stone-900 md:text-2xl dark:text-slate-100">
              {title}
            </h4>
            <p className="w-32 mb-4 text-left text-stone-500 dark:text-slate-500 md:text-right md:mb-0">
              {`${views ? new Number(views).toLocaleString() : '–––'} views`}
            </p>
          </div>
          <p className="text-stone-600 dark:text-slate-400">{excerpt}</p>
        </div>
      </a>
    </Link>
  );
}

export default NotePostPreview;

import { useEffect } from 'react';
import useSWR from 'swr';

import { fetcher, PostViews } from '@rendiriz-ecosystem/personal/lib';

export function NoteViewCounter({ slug }: any) {
  const { data } = useSWR<PostViews>(`/api/note-views/${slug}`, fetcher);
  const views = new Number(data?.total);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/note-views/${slug}`, {
        method: 'POST',
      });

    registerView();
  }, [slug]);

  return <span>{`${views > 0 ? views.toLocaleString() : '–––'} views`}</span>;
}

export default NoteViewCounter;

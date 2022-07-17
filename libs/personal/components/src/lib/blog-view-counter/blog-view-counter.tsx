import { useEffect } from 'react';
import useSWR from 'swr';

import { fetcher, PostViews } from '@rendiriz-ecosystem/personal/lib';

export function BlogViewCounter({ slug }: any) {
  const { data } = useSWR<PostViews>(`/api/post-views/${slug}`, fetcher);
  const views = new Number(data?.total);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/post-views/${slug}`, {
        method: 'POST',
      });

    registerView();
  }, [slug]);

  return <span>{`${views > 0 ? views.toLocaleString() : '–––'} views`}</span>;
}

export default BlogViewCounter;

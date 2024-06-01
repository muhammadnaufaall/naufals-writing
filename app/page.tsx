import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

import { Icons } from '@/components/icons';
import PostCard from '@/components/post-card';
import PostList from '@/components/post-list';

export const metadata = {
  title: 'NaufalIsWriting',
};

export default async function BlogPage() {
  const latestPosts = allPosts
    .filter((post) => post.enabled)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  const pinnedPosts = allPosts
    .filter((post) => post.pinned && post.enabled)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="container max-w-3xl py-6 lg:py-10">
      <h2 className="text-3xl lg:text-5xl font-bold text-left">
        I write about life, sometimes self improvement and barely software
        engineering.
      </h2>
      <p className="italic text-left mt-2 text-muted-foreground mb-5 lg:mb-20">
        Truly hope you enjoy it.
      </p>
      <hr className="mb-5" />
      {pinnedPosts?.length !== 0 && (
        <div className="mb-10">
          <div className="flex gap-2 items-center justify-end text-primary">
            <Icons.pin className="w-3 h-3 lg:h-4 lg:w-4 text-muted-foreground" />
            <p className="text-xs lg:text-sm text-muted-foreground underline">
              Pinned posts
            </p>
          </div>
          <PostList posts={pinnedPosts} />
          <hr className="mt-5" />
        </div>
      )}

      <div className="flex gap-2 items-center justify-end">
        <Icons.clock className="w-3 h-3 lg:h-4 lg:w-4 text-muted-foreground" />
        <p className="text-xs lg:text-sm text-muted-foreground underline">
          Latest posts
        </p>
      </div>
      <PostList posts={latestPosts} />
    </div>
  );
}

'use client';

import { Post } from '@/.contentlayer/generated';
import React, { useState } from 'react';
import PostCard from './post-card';
import { Button } from './ui/button';
import { Icons } from './icons';

interface PostListProps {
  posts: Post[];
}

function PostList(props: PostListProps) {
  const { posts } = props;

  const [currPage, setCurrPage] = useState<number>(1);

  const perPage = 5;

  const filteredPosts = posts.slice(
    (currPage - 1) * perPage,
    currPage * perPage
  );

  const hasPosts = posts.length !== 0;
  const showPagination = posts.length > 5;

  const disabledPrev = currPage === 1;
  const disabledNext = currPage === Math.ceil(posts.length / perPage);

  function handlePrevPage() {
    setCurrPage(currPage - 1);
  }

  function handleNextPage() {
    setCurrPage(currPage + 1);
  }

  return hasPosts ? (
    <div className="flex flex-col gap-10 mt-5">
      {filteredPosts.map((post, index) => {
        const lastPost = index === filteredPosts.length - 1;
        return <PostCard key={post._id} post={post} showDivider={!lastPost} />;
      })}
      {/* pagiantion start */}
      {showPagination && (
        <div className="flex justify-end mt-5">
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={handlePrevPage}
              disabled={disabledPrev}
            >
              <Icons.chevronLeft className="text-primary mr-2" /> Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleNextPage}
              disabled={disabledNext}
            >
              Next <Icons.chevronRight className="text-primary ml-2" />
            </Button>
          </div>
        </div>
      )}
      {/* pagination end */}
    </div>
  ) : (
    <p className="text-center text-muted-foreground mt-20">
      No posts published.
    </p>
  );
}

export default PostList;

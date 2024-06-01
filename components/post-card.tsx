import React from 'react';

import Image from 'next/image';
import { Post } from 'contentlayer/generated';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  showDivider?: boolean;
}

function PostCard(props: PostCardProps) {
  const { post, showDivider = true } = props;
  return (
    <article key={post._id} className="group relative flex flex-col">
      <div className="flex items-center space-x-2 text-sm">
        <Image
          src={post.avatar}
          alt={post.author}
          width={32}
          height={32}
          className="bg-white rounded-full w-[32px] h-[32px]"
        />
        <div className="text-left">
          <p className="font-medium">{post.author}</p>
        </div>
      </div>

      <div className="mt-3">
        <h2 className="text-xl lg:text-2xl font-bold leading-tight">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-muted-foreground text-xs lg:text-sm mt-1">
            {post.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="text-xs text-muted-foreground flex items-center">
          {post.minutesToRead} min read
        </p>
        <time
          dateTime={post.date}
          className="block text-xs text-muted-foreground text-right"
        >
          Published on {formatDate(post.date)}
        </time>
      </div>

      {showDivider && <hr className="mt-5" />}

      <Link href={post.slug} className="absolute inset-0">
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
}

export default PostCard;

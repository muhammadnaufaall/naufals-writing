import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { Mdx } from '@/components/mdx-components';

import '@/styles/mdx.css';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import ShareButton from '@/components/share-button';
import { buttonVariants } from '@/components/ui/button';
import { absoluteUrl, cn, formatDate } from '@/lib/utils';

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug;

  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}${post.image}`);
  ogUrl.searchParams.set('heading', post.title);
  ogUrl.searchParams.set('type', 'Blog Post');
  ogUrl.searchParams.set('mode', 'dark');

  return {
    title: post.title,
    description: post.description,
    other: {
      thumbnail: ogUrl.toString(),
    },

    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-[-200px] top-[4.5rem] hidden xl:inline-flex'
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        <time
          dateTime={post.date}
          className="block text-[12px] text-muted-foreground ml-1 lg:text-sm"
        >
          Published on {formatDate(post.date)}
        </time>
        <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight inline-block !leading-tight lg:text-5xl">
          {post.title}
        </h1>
        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center space-x-2 text-sm">
            <Image
              src={post.avatar}
              alt={post.author}
              width={32}
              height={32}
              className="bg-white rounded-full w-[32px] h-[32px]"
            />

            <div className="flex flex-col gap-1 text-left leading-tight">
              <p className="font-medium">{post.author}</p>
              <p className="text-[12px] text-muted-foreground flex items-center">
                {post.minutesToRead} min read
              </p>
            </div>
          </div>
          <ShareButton />
        </div>
      </div>
      {post.image && (
        <div className="my-8">
          <Image
            src={post.image}
            alt={post.title}
            width={720}
            height={405}
            className="bg-muted transition-colors"
            priority
          />
          <p className="text-[12px] text-muted-foreground mt-3 text-center">
            {post.imageAlt}
          </p>
        </div>
      )}
      <Mdx code={post.body.code} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }))}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
}

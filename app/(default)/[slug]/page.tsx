import { notFound } from 'next/navigation';
import { getPost, getCategory } from '@/lib/api';
import type { Post, GetPostResponse } from '@/src/components/PostView/types';
import { PostView } from '@/src/components/PostView';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import styles from './page.module.css';

export type PostProps = {
  params: {
    slug: string;
  };
}

// Helper: Pick which category to use for navigation
// Strategy: use the first category, fallback to null if none
function getPrimaryCategorySlug(post: Post | null): string | null {
  const categories = post?.categories?.nodes ?? [];
  return categories.length > 0 ? categories[0].slug : null;
}

// Helper: Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default async function Post({ params }: PostProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  const rawPostData: GetPostResponse = await getPost(slug);
  const post = rawPostData?.post ?? null;

  if (!post) {
    notFound();
  }

  // Get the primary category for navigation
  const categorySlug = getPrimaryCategorySlug(post);

  if (!categorySlug) {
    return <PostView post={post} />;
  }

  // Fetch all posts in the category
  const categoryData = await getCategory(categorySlug, 1000);
  const categoryPosts: Post[] = categoryData?.category?.posts?.nodes ?? [];

  if (categoryPosts.length === 0) {
    return <PostView post={post} />;
  }

  // Find current post in the category list
  const currentIndex = categoryPosts.findIndex(p => p.slug === slug);

  if (currentIndex === -1) {
    // Current post not found in category (shouldn't happen, but handle it)
    return <PostView post={post} />;
  }

  // Compute prev/next
  // posts[0] is newest, posts[length-1] is oldest
  // So index-1 is newer, index+1 is older
  const prevPost = currentIndex > 0 ? categoryPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < categoryPosts.length - 1 ? categoryPosts[currentIndex + 1] : null;

  // Get random posts (excluding current)
  const candidates = categoryPosts.filter(p => p.slug !== slug);
  const randomPosts = shuffleArray(candidates).slice(0, 20);

  return (
    <>
      <Header customClassName={styles['header-alt']} />
      <PostView 
        post={post} 
        prevPost={prevPost}
        nextPost={nextPost}
        randomPosts={randomPosts}
        categorySlug={categorySlug}
      />
      <Footer mode='light' />
    </>
  );
}

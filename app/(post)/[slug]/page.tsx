import { notFound } from 'next/navigation';
import { getPost, getCategory, getAdjacentPostsInCategory } from '@/lib/api';
import type { Post, GetPostResponse } from '@/src/components/PostView/types';
import { generatePageMetadata } from '@/src/components/_utils/MetaDataUtil/MetaDataUtil';
import { PostView } from '@/src/components/PostView';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import styles from './page.module.css';
import { SchemaOrgPost } from "@/src/components/seo/SchemaOrgPost";

export async function generateMetadata({ params }: PostProps) {
  const { slug } = await params;
  return await generatePageMetadata(slug);
}

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

  const [categoryData, adjacentPosts] = await Promise.all([
    getCategory(categorySlug, 30),
    getAdjacentPostsInCategory(categorySlug, slug),
  ]);
  const categoryPosts: Post[] = categoryData?.category?.posts?.nodes ?? [];
  const prevPost = adjacentPosts.prevPost;
  const nextPost = adjacentPosts.nextPost;

  // Get random posts (excluding current)
  const candidates = categoryPosts.filter(p => p.slug !== slug);
  const randomPosts = shuffleArray(candidates).slice(0, 9);

  return (
    <>
      <SchemaOrgPost post={post} />
      <div className={styles.stage}>
        <Header customClassName={styles['header-alt']} />
        <PostView 
          post={post} 
          prevPost={prevPost}
          nextPost={nextPost}
          randomPosts={randomPosts}
          categorySlug={categorySlug}
        />
        <Footer mode='light' />
      </div>
    </>
  );
}

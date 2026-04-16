import { notFound } from 'next/navigation';
import { getPost } from '@/lib/api';
import type { PostProps, GetPostResponse } from './types';

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

  return (
    <>......</>
  );
}

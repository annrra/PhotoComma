'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './cv.module.css';
import type { Category } from './types';
import { getCategory } from '@/lib/api';

const CategoryView = ({ category }: { category: Category }) => {
  const [posts, setPosts] = useState(category.posts.nodes);
  const [cursor, setCursor] = useState(category.posts.pageInfo.endCursor);
  const [hasNext, setHasNext] = useState(category.posts.pageInfo.hasNextPage);
  const [loading, setLoading] = useState(false);

  const sentinelRef = useRef(null);
  
  const loadMore = useCallback(async () => {
    if (!hasNext || loading) return;

    setLoading(true);

    const res = await getCategory(category.slug, 6, cursor);

    const newPosts = res.category.posts.nodes;

    setPosts(prev => [...prev, ...newPosts]);
    setCursor(res.category.posts.pageInfo.endCursor);
    setHasNext(res.category.posts.pageInfo.hasNextPage);

    setLoading(false);
  }, [cursor, hasNext, loading, category.slug]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, {
      rootMargin: "200px"
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [loadMore]);

  const handleImageLoad = (img: HTMLImageElement) => {
    img.classList.add(styles.loaded);
  };

  return (
    <div className={styles.panel}>
      <h1 className={styles.heading}>{category?.description}</h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post?.databaseId} className={styles.frame}>
            {post?.featuredImage?.node && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || ""}
                fill
                className={styles.snapshot}
                onLoadingComplete={handleImageLoad}
              />
            )}
          </div>
        ))}
      </div>

      <div ref={sentinelRef} />
    </div>
  )
}

export default CategoryView;

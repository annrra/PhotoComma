'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './pv.module.css';
import classNames from 'classnames';
import type { PostViewProps } from './types';
import { ViewControls } from '@/src/components/ViewControls';
import RelatedItems from './RelatedItems';
import Spinner from './Spinner';
import { useView } from '@/src/context/ViewContext/ViewContext';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, animate } from "framer-motion";

const PostView = ({ 
  post,
  prevPost,
  nextPost,
  randomPosts,
  categorySlug, 
}: PostViewProps) => {
  const postImage = post?.featuredImage?.node;
  const { isFullscreen, setIsFullscreen } = useView();
  const [imgLoading, setImgLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const imageRef = useRef<HTMLDivElement | null>(null);

  const width = postImage?.mediaDetails?.width;
  const height = postImage?.mediaDetails?.height;
  const aspectRatio = width && height ? width / height : 1;
  const imageKey = post.databaseId;

  const x = useMotionValue(0);

  const goPrev = useCallback(() => {
    if (prevPost?.slug) router.push(`/${prevPost.slug}`);
  }, [prevPost, router]);

  const goNext = useCallback(() => {
    if (nextPost?.slug) router.push(`/${nextPost.slug}`);
  }, [nextPost, router]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (imgLoading) {
      timeout = setTimeout(() => {
        setShowSpinner(true);
      }, 120);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSpinner(false);
    }

    return () => {
      clearTimeout(timeout);
      setShowSpinner(false); // ensures no stale spinner state
    };
  }, [imgLoading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  useEffect(() => {
    if (!isFullscreen) return;
    if (!imageRef.current) return;

    let startX = 0;
    let endX = 0;

    const threshold = 60;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;

      const diff = startX - endX;

      if (Math.abs(diff) < threshold) return;

      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    };

    const el = imageRef.current;

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [isFullscreen, goPrev, goNext]);

  useEffect(() => {
    if (!isFullscreen || !imageRef.current) return;

    const el = imageRef.current;

    let startX = 0;
    let isDragging = false;

    const threshold = 60;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const diff = e.touches[0].clientX - startX;
      x.set(diff * 0.6);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      isDragging = false;

      const diff = e.changedTouches[0].clientX - startX;

      if (Math.abs(diff) > threshold) {
        if (diff < 0) {
          goNext();
        } else {
          goPrev();
        }
      }

      animate(x, 0, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isFullscreen, goPrev, goNext, x]);

  return (
    <>
      <ViewControls 
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        hasExpandFullscreen
      />
      <div className={classNames(styles.panel, {[styles.full]: isFullscreen})}>
        <div className={classNames(styles.scene, {[styles.fullscreen]: isFullscreen})}>
          <div className={styles.canvas}>

            <Link 
              className={classNames(styles['nav-prev'], styles.nav, {[styles.idle]: prevPost == null})} 
              href={prevPost?.slug ? `/${prevPost.slug}` : '#'}
            >
              <svg
                width={45}
                height={8}
                viewBox="0 0 45 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="prev"
                  d="M0.146446 3.32845C-0.0488167 3.52371 -0.0488167 3.84029 0.146446 4.03556L3.32843 7.21754C3.52369 7.4128 3.84027 7.4128 4.03553 7.21754C4.2308 7.02228 4.2308 6.70569 4.03553 6.51043L1.20711 3.682L4.03553 0.853576C4.2308 0.658314 4.2308 0.341732 4.03553 0.146469C3.84027 -0.0487928 3.52369 -0.0487928 3.32843 0.146469L0.146446 3.32845ZM44.5 3.68201L44.5 3.18201L0.5 3.182L0.5 3.682L0.5 4.182L44.5 4.18201L44.5 3.68201Z"
                  className={styles['fill-paginate']}
                />
              </svg>
              <span>{prevPost ? prevPost.title : 'prev'}</span>
            </Link>

            <Link 
              className={classNames(styles['nav-next'], styles.nav, {[styles.idle]: nextPost == null})} 
              href={nextPost?.slug ? `/${nextPost.slug}` : '#'}
            >
              <span>{nextPost ? nextPost.title : 'next'}</span>
              <svg
                width={45}
                height={8}
                viewBox="0 0 45 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="next"
                  d="M44.3536 3.32845C44.5488 3.52371 44.5488 3.84029 44.3536 4.03556L41.1716 7.21754C40.9763 7.4128 40.6597 7.4128 40.4645 7.21754C40.2692 7.02228 40.2692 6.70569 40.4645 6.51043L43.2929 3.682L40.4645 0.853576C40.2692 0.658314 40.2692 0.341732 40.4645 0.146469C40.6597 -0.0487928 40.9763 -0.0487928 41.1716 0.146469L44.3536 3.32845ZM0 3.68201L-4.37114e-08 3.18201L44 3.182L44 3.682L44 4.182L4.37114e-08 4.18201L0 3.68201Z"
                  className={styles['fill-paginate']}
                />
              </svg>
            </Link>

            <div className={styles.piece}>
              <motion.div 
                ref={imageRef}
                className={styles.snapper} 
                style={{ x, aspectRatio: aspectRatio }}
              >
                {postImage?.sourceUrl && (
                  <>
                    {showSpinner && <Spinner />}

                    <Image
                      key={imageKey}
                      src={postImage?.sourceUrl}
                      alt={postImage?.altText || ""}
                      width={0}
                      height={0}
                      sizes="100vw"
                      priority
                      className={styles.snap}
                      onLoad={() => setImgLoading(false)}
                    />
                  </>
                )}
              </motion.div>
            </div>

          </div>

          <div className={styles.caption}>          
            <h1>
              {post?.excerpt?.replace(/<[^>]+>/g, '').trim() || ''}
            </h1>
          </div>

        </div>

        {!isFullscreen && <RelatedItems items={randomPosts} categorySlug={categorySlug} customClassName={styles.related} />}
      </div>
    </>
  )
}

export default PostView;

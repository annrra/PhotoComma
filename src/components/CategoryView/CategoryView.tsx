'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './cv.module.css';
import classNames from 'classnames';
import type { Category } from './types';
import { getCategory } from '@/lib/api';
import { motion, Variants } from 'framer-motion';

const CategoryView = ({ category }: { category: Category }) => {
  const [posts, setPosts] = useState(category.posts.nodes);
  const [cursor, setCursor] = useState(category.posts.pageInfo.endCursor);
  const [hasNext, setHasNext] = useState(category.posts.pageInfo.hasNextPage);
  const [loading, setLoading] = useState(false);
  
  const loadMore = async () => {
    if (!hasNext || loading) return;

    setLoading(true);

    const res = await getCategory(category.slug, 6, cursor);

    const newPosts = res.category.posts.nodes;

    setPosts(prev => [...prev, ...newPosts]);
    setCursor(res.category.posts.pageInfo.endCursor);
    setHasNext(res.category.posts.pageInfo.hasNextPage);

    setLoading(false);
  };

  /* const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.classList.add(styles.loaded);
  }; */

  const circleVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.25,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <div className={styles.panel}>
      <h1 className={styles.heading}>
        {category?.description}
      </h1>
      <div className={styles.grid}>
        {posts.map((post, index) => (
          <div className={styles.node} key={post?.databaseId}>
            <div className={styles.frame}>
              {post?.featuredImage?.node && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || ""}
                  fill
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.snapshot}
                  /* onLoad={handleImageLoad} */
                  priority={index < 3}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.loader}>
        <motion.button 
          className={classNames(styles['load-btn'], { [styles.loading]: loading }, {[styles.end]: hasNext === false })}
          onClick={loadMore}
          disabled={loading}
          initial="initial"
          whileHover="hover"
        >
          <span>{loading ? 'loading ...' : 'load more ...'}</span>
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles['load-icon']}
          >
            <g id="btn-arr">
              <motion.circle 
                id="ellipse" 
                cx={12} 
                cy={12} 
                r={12} 
                className={styles['fill-accent']} 
                variants={circleVariants}
              />
              <path
                id="arr"
                d="M14.8588 12.0381C14.8688 11.9197 14.8313 11.7976 14.7426 11.7051L11.5219 8.34766C11.358 8.17686 11.0873 8.17112 10.9164 8.33497C10.7456 8.49881 10.7399 8.76956 10.9037 8.94044L13.4301 11.5762H9.50234C9.25418 11.5762 9.05309 11.7772 9.05312 12.0254C9.05316 12.2735 9.25424 12.4746 9.50234 12.4746H13.4555L10.9037 15.1348C10.7398 15.3057 10.7455 15.5773 10.9164 15.7412C11.0872 15.9049 11.358 15.8992 11.5219 15.7285L14.7426 12.3701C14.8311 12.2777 14.8687 12.1564 14.8588 12.0381Z"
                className={classNames(styles['fill-dark'], styles['arr-icon'])}
              />
              <motion.path
                id="s"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.9425 12.8751C13.9425 12.8751 11.1585 13.3621 10.5253 11.6672C10.0943 10.5138 10.9877 9.21776 12.3742 8.83407C13.7612 8.4499 15.0172 8.43948 15.6837 11.2703C16.3502 14.1011 14.9423 15.948 12.6825 16.5003C10.5099 17.0313 8.33777 15.6533 7.28935 12.0007C5.33221 5.17811 11.4322 5 11.4322 5C11.4322 5 4.09417 8.46127 5.09354 12.4682C5.99262 16.0735 9.33013 19.3098 12.9716 18.9763C16.1707 18.6831 19.5459 14.7808 18.9257 11.7335C18.4059 9.18081 14.0944 5.8498 12.0821 6.36755C9.86353 6.93788 8.85497 8.8478 9.30736 11.7776C9.43698 12.6151 9.68529 14.3114 10.8134 14.4554C11.9415 14.5994 13.9425 12.8751 13.9425 12.8751Z"
                className={classNames(styles['fill-dark'], styles.spinner)}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </g>
          </svg>
        </motion.button>
      </div>
    </div>
  )
}

export default CategoryView;

import Image from 'next/image';
import Link from 'next/link';
import styles from './pv.module.css';
import classNames from 'classnames';
import type { PostViewProps } from './types';
import ViewControls from './ViewControls';
import RelatedItems from './RelatedItems';

const PostView = ({ 
  post,
  prevPost,
  nextPost,
  randomPosts,
  categorySlug, 
}: PostViewProps) => {
  const postImage = post?.featuredImage?.node;

  return (
    <>
      <ViewControls />
      <div className={styles.panel}>
        <div className={styles.scene}>
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
            {postImage?.sourceUrl && (
              <Image
                src={postImage?.sourceUrl}
                alt={postImage?.altText || ""}
                width={0}
                height={0}
                sizes="100vw"
                priority
                className={styles.snap}
              />
            )}
            <div className={styles.caption}>          
              <h1
                dangerouslySetInnerHTML={{ __html: post?.excerpt || '' }}
              />
            </div>
          </div>
        </div>

        <RelatedItems items={randomPosts} categorySlug={categorySlug} />
      </div>
    </>
  )
}

export default PostView;

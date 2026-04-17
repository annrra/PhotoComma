import Image from 'next/image';
import styles from './pv.module.css';
import type { PostViewProps } from './types';

const PostView = ({ 
  post,
  prevPost,
  nextPost,
  randomPosts,
  categorySlug, 
}: PostViewProps) => {
  console.log(JSON.stringify(categorySlug, null, 2));
  const postImage = post?.featuredImage?.node;
  

  return (
    <div className={styles.panel}>
      {postImage?.sourceUrl && (
        <Image
          src={postImage?.sourceUrl}
          alt={postImage?.altText || ""}
          fill
          className={styles.image}
        />
      )}
    </div>
  )
}

export default PostView;

import Image from 'next/image';
import type { PostViewProps } from './types';

const AboutView = ({ 
  page 
}: PostViewProps) => {
  const { nextAboutFeaturedMedia } = page;
  const image = nextAboutFeaturedMedia.node;

  return (
    <>
      <Image 
        src={image.sourceUrl} 
        alt={image.altText}
        width={0}
        height={0} 
      />
    </>
  )
}

export default AboutView;

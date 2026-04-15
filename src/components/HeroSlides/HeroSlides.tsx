import styles from './hs.module.css';
import { getHeroSlides } from '@/lib/api';
import Image from 'next/image';

type SlideNode = {
  title: string;
  uri: string;
  slug: string;
  content: string;
  isFrontPage: boolean;
  featuredImage?: {
    node?: {
      altText?: string;
      file?: string;
      fileSize?: number;
      sourceUrl?: string;
      filePath?: string;
    };
  };
};

const HeroSlides = async () => {
  const slidesRaw = await getHeroSlides();
  const slides: SlideNode[] = slidesRaw?.posts?.nodes ?? [];
  console.log(JSON.stringify(slides, null, 2));

  return (
    <div className={styles.backdrop}>
      {slides.map((slide, index) => (
        <div key={index} className={styles.slide}>
          {slide.featuredImage?.node?.file && (
            <Image
              src={slide.featuredImage.node.sourceUrl ?? ""}
              alt={slide.featuredImage.node.altText ?? slide.title}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default HeroSlides;

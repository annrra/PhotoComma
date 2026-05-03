'use client';

import styles from './hs.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export type SlideNode = {
  title: string;
  uri: string;
  slug: string;
  content: string;
  isFrontPage: boolean;
  featuredImage?: {
    node?: {
      altText?: string;
      file?: string;
      sourceUrl?: string;
      mediaDetails: {
        sizes: [{
          sourceUrl: string
        }]
      }
    };
  };
  nextHeroslidePosition: {
    hersoSlidePosition: 'center' | 'top' | 'bottom';
    heroSlideTextColor: 'light' | 'dark';
    heroSlidePostUrl?: string;
  };
};

export type HeroSlidesProps = {
  slides: SlideNode[];
  currentSlide: number;
}

const HeroSlides = ({ slides, currentSlide }: HeroSlidesProps) => {
  const slide = slides[currentSlide];

  return (
    <div className={styles.backdrop}>
      <AnimatePresence mode="wait">
        {slide && (
          <motion.div
            key={currentSlide}
            className={styles.slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {slide.featuredImage?.node?.file && (
              <Image
                src={slide.featuredImage.node.sourceUrl ?? ""}
                alt={slide.featuredImage.node.altText ?? slide.title}
                fill
                style={{ objectFit: 'cover', objectPosition: slide.nextHeroslidePosition.hersoSlidePosition }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeroSlides;

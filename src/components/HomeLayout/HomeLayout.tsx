'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './hl.module.css';
import { Header } from '@/src/components/Header';
import { HeroSlides } from '@/src/components/HeroSlides';
import Intro from './Intro';
import { Footer } from '@/src/components/Footer';

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

interface HomeLayoutProps {
  introContent: string;
  slides: SlideNode[];
}

const PAUSE_AFTER_INTERACTION = 5000;

const HomeLayout = ({ introContent, slides }: HomeLayoutProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimer = useRef<number | null>(null);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [slides.length, isPaused]);

  useEffect(() => {
    return () => {
      if (pauseTimer.current) {
        window.clearTimeout(pauseTimer.current);
      }
    };
  }, []);

  const pauseAutoRotate = () => {
    setIsPaused(true);
    if (pauseTimer.current) {
      window.clearTimeout(pauseTimer.current);
    }
    pauseTimer.current = window.setTimeout(() => {
      setIsPaused(false);
      pauseTimer.current = null;
    }, PAUSE_AFTER_INTERACTION);
  };

  const nextSlide = () => {
    if (slides.length <= 1) return;
    pauseAutoRotate();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length <= 1) return;
    pauseAutoRotate();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles.stage}>
      <HeroSlides slides={slides} currentSlide={currentSlide} />
      <div className={styles.overlay}>
        <Header />
        <div className={styles.layout}>
          <Intro content={introContent} />
          <div className={styles.chrome}>
            <div className={styles.nav}></div>
            <Footer onPrev={prevSlide} onNext={nextSlide} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeLayout;

'use client';
import type { PostViewProps } from './types';
import { SeparatorDecorator } from '@/src/components/ui/SeparatorDecorator';
import styles from './pp.module.css';
import { ViewControls } from '@/src/components/ViewControls';
import { useMemo } from 'react';
import DOMPurify from 'dompurify';

const PrivacyPolicy = ({ page }: PostViewProps) => {
  const cleanHtml = useMemo(() => {
    if (typeof window === 'undefined') return page.content;

    return DOMPurify.sanitize(page.content);
  }, [page.content]);

  return (
    <>
      <ViewControls />

      <div className={styles.pane}>
        <div className={styles.panel}>
          <h1 className={styles.sronly}>{page.title}</h1>

          <div className={styles.segment}>
            <SeparatorDecorator />
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
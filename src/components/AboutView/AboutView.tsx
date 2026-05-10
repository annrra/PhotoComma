'use client';
import Image from 'next/image';
import type { PostViewProps } from './types';
import { SeparatorDecorator } from '@/src/components/ui/SeparatorDecorator';
import styles from './av.module.css';
import classNames from 'classnames';
import { EmailLink } from '@/src/components/_utils/EmailLink';
import { ViewControls } from '@/src/components/ViewControls';

const AboutView = ({ 
  page 
}: PostViewProps) => {
  const { nextAboutFeaturedMedia } = page;
  const image = nextAboutFeaturedMedia.node;

  const mediumImage =
    image?.mediaDetails?.sizes?.find(
      (size) => size.name === "medium"
    )?.sourceUrl || image?.sourceUrl;

  return (
    <>
      <ViewControls />
      <div className={styles.pane}>
        <div className={styles.panel}>
          <h1 className={styles.sronly}>About photocomma and a way of seeing</h1>
          <div className={classNames(styles.segment, styles['segment-intro'])}>
            <SeparatorDecorator />
            {page.nextAboutSectionOne}
          </div>
          {mediumImage && (
            <Image
              src={mediumImage}
              alt={image.altText}
              sizes="100vw"
              unoptimized
              className={styles.figure}
              width={1200}
              height={800}
            />
          )}
          <div className={classNames(styles.segment, styles['segment-outro'])}>
            <div className={styles.inline}>
              <span>{page.nextAboutSectionTwo}{' '}</span>
              <span>You can reach out to me at <EmailLink showEmail className={styles.mailto} /> whatever the reason is.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutView;

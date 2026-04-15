import styles from './hl.module.css';
import { getHomePage } from '@/lib/api';

type IntroItem = {
  id: string;
  title: string;
  slug: string;
  uri: string;
  content: string;
  isFrontPage: boolean;
  meta?: {
    metaDescription?: string;
  };
};

const Intro = async () => {
  const introData = await getHomePage();
  const intro: IntroItem | null = introData?.nodeByUri ?? {};
  const content = intro?.content || '';

  return (
    <div
      className={styles.intro}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  )
}

export default Intro;

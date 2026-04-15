import styles from './hl.module.css';
import { Header } from '@/src/components/Header';
import { HeroSlides } from '@/src/components/HeroSlides';
import Intro from './Intro';
import { Footer } from '@/src/components/Footer';

const HomeLayout = () => {

  return (
    <div className={styles.stage}>
      <HeroSlides />
      <div className={styles.overlay}>
        <Header />
        <div className={styles.layout}>
          <Intro />
          <div className={styles.chrome}>
            <div className={styles.nav}></div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeLayout;

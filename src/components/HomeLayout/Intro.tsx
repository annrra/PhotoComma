import styles from './hl.module.css';
import classNames from 'classnames';

type IntroProps = {
  content: string;
  textColor: 'light' | 'dark';
}

const Intro = ({ content, textColor = 'light' }: IntroProps) => {
  return (
    <>
      <h1 className={styles.sronly}>Photocomma documentary and thematic photography portfolio</h1>
      <div
        className={classNames(styles.intro, {[styles.dark]: textColor === 'dark'})}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </>
  )
}

export default Intro;

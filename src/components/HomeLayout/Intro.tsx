import styles from './hl.module.css';

const Intro = ({ content }: { content: string }) => {
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

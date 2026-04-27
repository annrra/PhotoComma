import styles from './hl.module.css';
import classNames from 'classnames';

type IntroProps = {
  content: string;
  textColor: 'light' | 'dark';
}

const Intro = ({ content, textColor = 'light' }: IntroProps) => {
  return (
    <div
      className={classNames(styles.intro, {[styles.dark]: textColor === 'dark'})}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  )
}

export default Intro;

import Link from 'next/link';
import styles from './f.module.css';

const Footer = () => {

  return (
    <div className={styles.footer}>
      <div className={styles.nav}>
        <svg
          width={62}
          height={17}
          viewBox="0 0 62 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="fish">
            <path
              id="prev"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 8.72351C0 8.47873 6.81624 2.59198 7.13227 2.48975C7.28098 3.21163 5.30737 9.49652 9.0687 12.2989C10.7402 13.5429 0 8.96828 0 8.72351Z"
              className={styles.fillshade}
            />
            <path
              id="next"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M53.8574 2.24036C54.3748 2.35964 61.9656 8.94351 61.9997 9.38347C62.0338 9.82343 55.0642 13.7552 55.6792 12.2711C57.5599 7.73518 53.8574 2.90184 53.8574 2.24036Z"
              className={styles.fillshade}
            />
            <g id="bones">
              <path
                id="bone1"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.167 5.83899C16.167 5.83899 27.6152 9.43765 33.1472 8.49113C38.6807 7.54305 48.9841 6.78551 48.9841 6.78551C48.9841 6.78551 35.8179 9.6282 30.667 10.5747C25.5161 11.5228 16.167 5.83899 16.167 5.83899Z"
                className={styles.fillshade}
              />
              <path
                id="bone2"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.8274 0.268317C21.4556 0.500689 22.1527 4.8383 21.8274 5.86693C21.502 6.89557 18.6672 12.3517 18.726 12.866C18.7849 13.3803 19.9498 15.1649 20.2767 15.3849C20.6036 15.6049 20.7894 11.2796 21.1225 9.64684C21.4556 8.01404 21.8274 6.8367 22.5323 6.14733C23.2371 5.45795 24.0892 0.733055 24.0829 0.268317C24.0767 -0.19642 22.1992 0.0359454 21.8274 0.268317Z"
                className={styles.fillshade}
              />
              <path
                id="bone3"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.7465 2.92815C27.4537 3.03193 28.3104 6.77469 28.1695 7.40673C28.0285 8.03878 23.9279 15.8806 25.209 15.6652C26.4902 15.4499 30.0625 17.3089 29.4382 16.2245C28.8139 15.1401 28.2717 12.8752 28.3104 11.6065C28.3492 10.3377 30.2856 4.52843 30.8479 3.76779C31.4103 3.00716 28.0393 2.82437 27.7465 2.92815Z"
                className={styles.fillshade}
              />
              <path
                id="bone4"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.3706 3.20706C34.3706 3.90882 34.9516 6.06834 35.6394 6.84755C36.3272 7.62677 36.7702 9.57871 36.6262 10.3455C36.4821 11.1123 36.0948 14.0557 36.0623 14.2649C36.0298 14.474 37.3001 15.1123 37.472 14.5453C37.6439 13.9783 37.7539 10.6259 37.7539 10.6259C37.7539 10.6259 37.7539 8.01406 37.472 6.84755C37.1901 5.68105 36.4046 0.113414 36.0623 0.548733C35.7199 0.984052 34.3706 2.5053 34.3706 3.20706Z"
                className={styles.fillshade}
              />
            </g>
          </g>
        </svg>
      </div>
      <div className={styles.credit}><span className={styles.spacer}>credit to:</span> <Link href="https://bettermonday.org" target='_blank' rel="noopener noreferrer">bettermonday.org</Link> <span className={styles.spacer}>|</span> <Link href="mailto:annrra@gmail.com">annrra@gmail.com</Link></div>
      <div className={styles.collapse}>
        <svg
          width={8}
          height={5}
          viewBox="0 0 8 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="arr"
            d="M3.82226 0.00156595C3.94066 -0.00839971 4.06277 0.0290676 4.15527 0.117777L7.51269 3.33848C7.68349 3.50237 7.68924 3.7731 7.52538 3.94395C7.36154 4.11477 7.09079 4.1204 6.91991 3.95664L4.28417 1.43028V3.35801C4.28414 3.60617 4.08311 3.80727 3.83495 3.80723C3.58684 3.80719 3.38577 3.60611 3.38573 3.35801V1.40489L0.725579 3.95664C0.554697 4.12052 0.283012 4.11483 0.119133 3.94395C-0.0445847 3.77313 -0.0388144 3.50235 0.131829 3.33848L3.49023 0.117777C3.58265 0.0292277 3.70399 -0.00832055 3.82226 0.00156595Z"
            className={styles.filler}
          />
        </svg>
      </div>
    </div>
  )
}

export default Footer;

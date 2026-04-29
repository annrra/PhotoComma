import styles from './pv.module.css';
import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className={styles.skeleton}>
      <svg
        width={56}
        height={56}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.spin}
      >
        <g id="spin">
          <rect width={56} height={56} className={styles.spinframe} />
          <motion.path
            id="spinner"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M34.9374 31.1255C34.9374 31.1255 24.9947 32.8646 22.733 26.8115C21.194 22.6921 24.3847 18.0634 29.3365 16.6931C34.2899 15.3211 38.7756 15.2839 41.1561 25.3938C43.5366 35.5038 38.5081 42.0999 30.4376 44.0725C22.6783 45.969 14.9206 41.0477 11.1762 28.0025C4.18648 3.6361 25.9722 3 25.9722 3C25.9722 3 -0.235106 15.3617 3.33407 29.6723C6.54507 42.5483 18.4647 54.1063 31.4699 52.9153C42.8953 51.8682 54.9495 37.9314 52.7348 27.0484C50.8782 17.9315 35.4801 6.03502 28.2933 7.88411C20.3698 9.92099 16.7677 16.7422 18.3834 27.2057C18.8464 30.1967 19.7332 36.2549 23.7622 36.7692C27.7912 37.2835 34.9374 31.1255 34.9374 31.1255Z"
            className={styles.spinner}
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </g>
      </svg>
    </div>
  )
}

export default Spinner;
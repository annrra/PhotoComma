import styles from './vc.module.css';
import classNames from 'classnames';
import { motion } from 'framer-motion';

type ViewControlsProps = {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const ViewControls = ({
  isFullscreen,
  onToggleFullscreen,
}: ViewControlsProps) => {

  const circleVariants = {
    rest: {
      scale: 1,
      fill: '#111111',
    },
    hover: {
      scale: 1.18,
      fill: '#333333',
    },
  };

  const squareVariants = {
    rest: {
      scale: 1,
      fill: 'var(--pc-light-60)',
    },
    hover: {
      scale: 0.90,
      fill: 'var(--pc-light-100)',
    },
  };

  return (
    <div className={classNames(styles.ctrls, {[styles.full]: isFullscreen})}>
      <motion.button 
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? 'Exit fullscreen view' : 'Enter fullscreen view'}
        className={styles['btn-ctrl']}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <motion.svg
          width={40}
          height={40}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.expand}
          style={{ overflow: 'visible' }}
        >
          <g id="expand">
            <motion.circle 
              id="Ellipse" 
              cx={20} cy={20} r={20}
              fill="#111111"
              className={styles['expand-circle']}
              variants={circleVariants}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
              }}
            />
            <motion.g 
              id="square"
              variants={squareVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
              }}
            >
              <rect
                id="l8"
                x={11}
                y={22}
                width={2}
                height={7}
                rx={1}
                className={styles['expand-icon-fill']}
              />
              <rect
                id="l7"
                x={11}
                y={29}
                width={2}
                height={7}
                rx={1}
                transform="rotate(-90 11 29)"
                className={styles['expand-icon-fill']}
              />
              <rect
                id="l6"
                width={2}
                height={7}
                rx={1}
                transform="matrix(-1 0 0 1 29 22)"
                className={styles['expand-icon-fill']}
              />
              <rect
                id="l5"
                width={2}
                height={7}
                rx={1}
                transform="matrix(0 -1 -1 0 29 29)"
                className={styles['expand-icon-fill']}
              />
              <rect
                id="l4"
                width={2}
                height={7}
                rx={1}
                transform="matrix(1 0 0 -1 11 18)"
                className={styles['expand-icon-fill']}
              />
              <rect
                id="l3"
                width={2}
                height={7}
                rx={1}
                transform="matrix(0 1 1 0 11 11)"
                className={styles['expand-icon-fill']}
              />
              <rect
                id="l2"
                x={29}
                y={18}
                width={2}
                height={7}
                rx={1}
                transform="rotate(180 29 18)"
                className={styles['expand-icon-fill']}
              />
              <rect
                id="l1"
                x={29}
                y={11}
                width={2}
                height={7}
                rx={1}
                transform="rotate(90 29 11)"
                className={styles['expand-icon-fill']}
              />
            </motion.g>
          </g>
          <defs>
            <clipPath id="clip0_1411_44">
              <rect width={40} height={40} fill="white" />
            </clipPath>
          </defs>
        </motion.svg>
      </motion.button>

      <svg
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="sun-icon">
          <circle id="Ellipse-sun" cx={20} cy={20} r={20} fill="#111111" />
          <g id="sung">
            <path
              id="sun"
              d="M20 10C19.5752 10 19.2308 10.3444 19.2308 10.7692V13.2867C19.2308 13.7115 19.5752 14.0559 20 14.0559C20.4248 14.0559 20.7692 13.7115 20.7692 13.2867V10.7692C20.7692 10.3444 20.4248 10 20 10ZM20 17.3427C21.4675 17.3427 22.6573 18.5326 22.6573 20.0001C22.6573 21.4676 21.4675 22.6574 20 22.6574C18.5326 22.6574 17.3427 21.4676 17.3427 20.0001C17.3427 18.5326 18.5326 17.3427 20 17.3427ZM20 15.8043C17.6829 15.8043 15.8042 17.683 15.8042 20.0001C15.8042 22.3172 17.6829 24.1959 20 24.1959C22.3171 24.1959 24.1958 22.3172 24.1958 20.0001C24.1958 17.683 22.3171 15.8043 20 15.8043ZM26.181 14.9069C26.4814 14.6065 26.4814 14.1195 26.181 13.8191C25.8806 13.5186 25.3935 13.5186 25.0931 13.8191L24.2028 14.7094C23.9024 15.0098 23.9024 15.4969 24.2028 15.7973C24.5032 16.0977 24.9903 16.0977 25.2907 15.7973L26.181 14.9069ZM24.2028 24.2027C23.9024 24.5031 23.9024 24.9902 24.2028 25.2906L25.0931 26.1809C25.3935 26.4812 25.8806 26.4812 26.181 26.1809C26.4814 25.8805 26.4814 25.3934 26.181 25.093L25.2907 24.2027C24.9903 23.9023 24.5032 23.9023 24.2028 24.2027ZM15.7972 25.2906C16.0976 24.9902 16.0976 24.5031 15.7972 24.2027C15.4968 23.9023 15.0097 23.9023 14.7093 24.2027L13.819 25.093C13.5186 25.3934 13.5186 25.8805 13.819 26.1809C14.1194 26.4812 14.6064 26.4812 14.9069 26.1809L15.7972 25.2906ZM13.819 13.8191C13.5186 14.1195 13.5186 14.6065 13.819 14.9069L14.7093 15.7973C15.0097 16.0977 15.4968 16.0977 15.7972 15.7973C16.0976 15.4969 16.0976 15.0098 15.7972 14.7094L14.9069 13.8191C14.6064 13.5186 14.1194 13.5186 13.819 13.8191ZM26.7133 19.2308H29.2308C29.6556 19.2308 30 19.5752 30 20C30 20.4248 29.6556 20.7692 29.2308 20.7692H26.7133C26.2885 20.7692 25.9441 20.4248 25.9441 20C25.9441 19.5752 26.2885 19.2308 26.7133 19.2308ZM20 25.944C19.5752 25.944 19.2308 26.2884 19.2308 26.7132V29.2308C19.2308 29.6556 19.5752 30 20 30C20.4248 30 20.7692 29.6556 20.7692 29.2308V26.7132C20.7692 26.2884 20.4248 25.944 20 25.944ZM10.7692 19.2308C10.3444 19.2308 10 19.5752 10 20C10 20.4248 10.3444 20.7692 10.7692 20.7692H13.2867C13.7115 20.7692 14.0559 20.4248 14.0559 20C14.0559 19.5752 13.7115 19.2308 13.2867 19.2308H10.7692Z"
              fill="white"
              fillOpacity={0.6}
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default ViewControls;

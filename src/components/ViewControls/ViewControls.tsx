import styles from './vc.module.css';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTheme } from '@/src/context/ThemeContext/ThemeContext';
import { useCart } from '@/src/context/CartContext/CartContext';
import { CartDrawer } from '@/src/components/CartDrawer';

type ViewControlsProps = {
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  hasExpandFullscreen?: boolean;
}

const ViewControls = ({
  isFullscreen,
  onToggleFullscreen,
  hasExpandFullscreen = false,
}: ViewControlsProps) => {
  const { toggleTheme } = useTheme();
  const { totalItems, openCart } = useCart();

  const circleVariants = {
    rest: {
      scale: 1,
    },
    hover: {
      scale: 1.18,
    },
  };

  const squareVariants = {
    rest: {
      scale: 1,
    },
    hover: {
      scale: 0.90,
    },
  };

  return (
    <>
      <CartDrawer />
      <div className={classNames(styles.ctrls, {[styles.full]: isFullscreen})}>
        <motion.button
          className={classNames(styles['btn-ctrl'], {[styles.active]: totalItems > 0})}
          initial="rest"
          animate="rest"
          whileHover="hover"
          aria-label="Cart"
          onClick={openCart}
        >
          <div style={{ position: 'relative' }}>
            <svg
              width={40}
              height={40}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <g id="cart-icon">
                <motion.circle 
                  id="Ellipse-cart" 
                  cx={20} cy={20} 
                  r={20}
                  className={styles['cart-circle']}
                  variants={circleVariants}
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                  }} 
                />
                <g id="shopping-cart">
                  <path
                    id="cart"
                    d="M12.958 11.6667C12.6128 11.6667 12.333 11.9465 12.333 12.2917C12.333 12.6369 12.6128 12.9167 12.958 12.9167H14.3785V21.6856C14.3785 22.491 15.0314 23.1439 15.8368 23.1439H25.458C25.8032 23.1439 26.083 22.8641 26.083 22.5189C26.083 22.1738 25.8032 21.8939 25.458 21.8939H15.8368C15.7217 21.8939 15.6285 21.8007 15.6285 21.6856V20.4739H24.5627C24.9533 20.4739 25.2914 20.2027 25.3762 19.8214L26.3694 15.3517C26.4851 14.8313 26.0891 14.3376 25.556 14.3376H15.6285V12.2917C15.6285 11.9465 15.3486 11.6667 15.0035 11.6667H12.958ZM15.6285 15.5876H25.0365L24.2284 19.2239H15.6285V15.5876ZM15.8747 26.875C15.8747 26.4144 16.2473 26.0417 16.708 26.0417C17.1687 26.0417 17.5413 26.4144 17.5413 26.875C17.5413 27.3357 17.1687 27.7084 16.708 27.7084C16.2473 27.7084 15.8747 27.3357 15.8747 26.875ZM14.6247 26.875C14.6247 28.0261 15.557 28.9584 16.708 28.9584C17.859 28.9584 18.7913 28.0261 18.7913 26.875C18.7913 25.7239 17.859 24.7917 16.708 24.7917C15.557 24.7917 14.6247 25.7239 14.6247 26.875ZM24.208 26.0417C24.6687 26.0417 25.0413 26.4144 25.0413 26.875C25.0413 27.3357 24.6687 27.7084 24.208 27.7084C23.7473 27.7084 23.3747 27.3357 23.3747 26.875C23.3747 26.4144 23.7473 26.0417 24.208 26.0417ZM24.208 24.7917C23.0569 24.7917 22.1247 25.7239 22.1247 26.875C22.1247 28.0261 23.0569 28.9584 24.208 28.9584C25.3591 28.9584 26.2913 28.0261 26.2913 26.875C26.2913 25.7239 25.3591 24.7917 24.208 24.7917Z"
                    className={styles['cart-icon-fill']}
                  />
                </g>
              </g>
            </svg>

            {totalItems > 0 && (
              <div className={styles['cart-badge']}>
                {totalItems}
              </div>
            )}
          </div>
        </motion.button>

        <motion.button 
          onClick={toggleTheme}
          className={styles['btn-ctrl']}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <g id="sun-icon">
              <motion.circle 
                id="Ellipse-sun" 
                cx={20} cy={20} 
                r={20}
                className={styles['theme-circle']}
                variants={circleVariants}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                }} 
              />
              <g id="sung">
                <path
                  id="moon"
                  d="M16.9594 12.8926C16.9112 13.2575 16.8852 13.6317 16.8852 14.0142C16.8852 16.4674 17.8813 18.6907 19.4875 20.297C21.0938 21.9032 23.3171 22.8993 25.7703 22.8993C26.1527 22.8993 26.5268 22.8733 26.8917 22.8251C26.3748 23.9819 25.5751 24.9858 24.5791 25.7468C23.3161 26.7118 21.7413 27.2845 20.0263 27.2845C17.9475 27.2845 16.068 26.4437 14.7044 25.0801C13.3407 23.7165 12.5 21.837 12.5 19.7582C12.5 18.0431 13.0728 16.468 14.0378 15.2049C14.7989 14.2088 15.8028 13.4092 16.9594 12.8926ZM18.654 12.0668C18.8124 11.4876 18.3643 10.8736 17.7827 11.0226C17.7372 11.0343 17.6917 11.0463 17.6463 11.0587C15.7096 11.5875 14.0313 12.7427 12.8459 14.2942C11.6882 15.8095 11 17.7024 11 19.7582C11 22.2508 12.0103 24.5074 13.6437 26.1408C15.2771 27.7742 17.5337 28.7845 20.0263 28.7845C22.082 28.7845 23.9746 28.0964 25.4898 26.9388C27.0412 25.7534 28.1964 24.0751 28.7257 22.1384C28.7381 22.093 28.7501 22.0476 28.7618 22.0022C28.911 21.4204 28.2971 20.9721 27.7177 21.1305C27.0966 21.3004 26.4454 21.3993 25.7703 21.3993C23.7309 21.3993 21.8846 20.5728 20.5482 19.2363C19.2117 17.8999 18.3852 16.0536 18.3852 14.0142C18.3852 13.3391 18.4841 12.6879 18.654 12.0668Z"
                  className={classNames(styles['theme-icon-fill'], styles['theme-icon-moon'])}
                />
                <path
                  id="sun"
                  d="M20 10C19.5752 10 19.2308 10.3444 19.2308 10.7692V13.2867C19.2308 13.7115 19.5752 14.0559 20 14.0559C20.4248 14.0559 20.7692 13.7115 20.7692 13.2867V10.7692C20.7692 10.3444 20.4248 10 20 10ZM20 17.3427C21.4675 17.3427 22.6573 18.5326 22.6573 20.0001C22.6573 21.4676 21.4675 22.6574 20 22.6574C18.5326 22.6574 17.3427 21.4676 17.3427 20.0001C17.3427 18.5326 18.5326 17.3427 20 17.3427ZM20 15.8043C17.6829 15.8043 15.8042 17.683 15.8042 20.0001C15.8042 22.3172 17.6829 24.1959 20 24.1959C22.3171 24.1959 24.1958 22.3172 24.1958 20.0001C24.1958 17.683 22.3171 15.8043 20 15.8043ZM26.181 14.9069C26.4814 14.6065 26.4814 14.1195 26.181 13.8191C25.8806 13.5186 25.3935 13.5186 25.0931 13.8191L24.2028 14.7094C23.9024 15.0098 23.9024 15.4969 24.2028 15.7973C24.5032 16.0977 24.9903 16.0977 25.2907 15.7973L26.181 14.9069ZM24.2028 24.2027C23.9024 24.5031 23.9024 24.9902 24.2028 25.2906L25.0931 26.1809C25.3935 26.4812 25.8806 26.4812 26.181 26.1809C26.4814 25.8805 26.4814 25.3934 26.181 25.093L25.2907 24.2027C24.9903 23.9023 24.5032 23.9023 24.2028 24.2027ZM15.7972 25.2906C16.0976 24.9902 16.0976 24.5031 15.7972 24.2027C15.4968 23.9023 15.0097 23.9023 14.7093 24.2027L13.819 25.093C13.5186 25.3934 13.5186 25.8805 13.819 26.1809C14.1194 26.4812 14.6064 26.4812 14.9069 26.1809L15.7972 25.2906ZM13.819 13.8191C13.5186 14.1195 13.5186 14.6065 13.819 14.9069L14.7093 15.7973C15.0097 16.0977 15.4968 16.0977 15.7972 15.7973C16.0976 15.4969 16.0976 15.0098 15.7972 14.7094L14.9069 13.8191C14.6064 13.5186 14.1194 13.5186 13.819 13.8191ZM26.7133 19.2308H29.2308C29.6556 19.2308 30 19.5752 30 20C30 20.4248 29.6556 20.7692 29.2308 20.7692H26.7133C26.2885 20.7692 25.9441 20.4248 25.9441 20C25.9441 19.5752 26.2885 19.2308 26.7133 19.2308ZM20 25.944C19.5752 25.944 19.2308 26.2884 19.2308 26.7132V29.2308C19.2308 29.6556 19.5752 30 20 30C20.4248 30 20.7692 29.6556 20.7692 29.2308V26.7132C20.7692 26.2884 20.4248 25.944 20 25.944ZM10.7692 19.2308C10.3444 19.2308 10 19.5752 10 20C10 20.4248 10.3444 20.7692 10.7692 20.7692H13.2867C13.7115 20.7692 14.0559 20.4248 14.0559 20C14.0559 19.5752 13.7115 19.2308 13.2867 19.2308H10.7692Z"
                  className={classNames(styles['theme-icon-fill'], styles['theme-icon-sun'])}
                />
              </g>
            </g>
          </svg>
        </motion.button>

        {hasExpandFullscreen && (
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
        )}
      </div>
    </>
  )
}

export default ViewControls;

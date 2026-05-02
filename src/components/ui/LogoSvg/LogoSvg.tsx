'use client';
import styles from './ls.module.css';
import classNames from 'classnames';
import { motion } from 'framer-motion';

type LogoSvgProps = {
  spin?: boolean;
};

const LogoSvg = ({ spin = false }: LogoSvgProps) => {

  return (
    <svg
      width={84}
      height={84}
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(styles.logo, {[styles.spin]: spin})}
    >
      <g id="logo">
        <path
          id="circle"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M41.9992 84C18.7747 84 0 65.2253 0 42.0008C0 18.7747 18.7747 0 41.9992 0C65.2253 0 84 18.7747 84 42.0008C84 65.2253 65.2253 84 41.9992 84Z"
          className={styles.fillaccent}
        />
        <motion.path
          id="spiral"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M49.4924 45.3755C49.4924 45.3755 38.7542 47.2538 36.3117 40.7164C34.6495 36.2674 38.0955 31.2685 43.4434 29.7885C48.793 28.3068 53.6376 28.2666 56.2085 39.1853C58.7795 50.1041 53.3488 57.2279 44.6326 59.3583C36.2526 61.4065 27.8742 56.0915 23.8303 42.0027C16.2814 15.687 39.81 15 39.81 15C39.81 15 11.5061 28.3506 15.3608 43.8061C18.8287 57.7121 31.7019 70.1949 45.7475 68.9086C58.0869 67.7776 71.1054 52.726 68.7135 40.9722C66.7085 31.126 50.0785 18.2778 42.3167 20.2748C33.7593 22.4747 29.8692 29.8415 31.6141 41.1421C32.1141 44.3725 33.0718 50.9153 37.4232 51.4707C41.7745 52.0262 49.4924 45.3755 49.4924 45.3755Z"
          className={styles.filler}
          animate={spin ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
        />
      </g>
    </svg>
  );
};

export default LogoSvg;

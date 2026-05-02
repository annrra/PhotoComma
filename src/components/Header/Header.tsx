import Link from 'next/link';
import styles from './h.module.css';
import classNames from 'classnames';
import { LogoSvg } from '@/src/components/ui/LogoSvg';

type HeaderProps = {
  customClassName?: string;
}

const Header = ({ customClassName }: HeaderProps) => {

  return (
    <div className={classNames(styles.header, customClassName)}>
      <div className={styles.logo}>
        <Link href="/">
          <LogoSvg />
        </Link>
      </div>
    </div>
  )
}

export default Header;

import styles from './nav.module.css';
import Link from 'next/link';
import classNames from 'classnames';

export type NavNode = {
  url: string;
  uri: string;
  menuItemId: number;
  label: string;
};

type NavProps = {
  navigation: NavNode[];
  collapsed?: boolean;
}

const Nav = ({ navigation, collapsed = false }: NavProps) => {
  
  return (
    <div className={classNames(styles.nav, {[styles.collapsed]: collapsed})}>
      <ul>
        {navigation.map((item) => (    
          <li key={item.menuItemId} className={classNames(styles.navitem, {[styles.navalt]: item.label === 'about'})}>
            <Link href={item.uri} className={styles.link}>
              <span className={styles.navlabel}>{item.label}</span>
              <span className={styles.separator}></span>
              <span className={styles.marker}>
                <svg
                  width={11}
                  height={11}
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x={5} width={1} height={11} className={styles.markerfill} />
                  <rect y={5} width={11} height={1} className={styles.markerfill} />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Nav;

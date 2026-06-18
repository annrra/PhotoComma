import { SeparatorDecorator } from '@/src/components/ui/SeparatorDecorator';
import styles from './pv.module.css';
import { EmailLink } from '@/src/components/_utils/EmailLink';
import Link from 'next/link';

const PrintsInfoPanel = () => {

  return (
    <div className={styles.segment}>
      <SeparatorDecorator />
      <h1 className={styles.sronly}>Photography Prints and Small Publications Store | PhotoComma</h1>
      All photographs are available as unframed fine art prints.<br />
      Printed and packed with care.<br />
      Available in a selection of sizes.<br />
      Shipping worldwide.<br /><br />

      Other prints available on request: <EmailLink showEmail className={styles.mailto} />
    </div>
  )
}

export default PrintsInfoPanel;

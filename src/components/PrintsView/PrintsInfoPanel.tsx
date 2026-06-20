import { SeparatorDecorator } from '@/src/components/ui/SeparatorDecorator';
import styles from './pv.module.css';
import { EmailLink } from '@/src/components/_utils/EmailLink';

const PrintsInfoPanel = () => {

  return (
    <div className={styles.segment}>
      <SeparatorDecorator />
      <h1 className={styles.sronly}>Photography Prints and Small Publications Store | PhotoComma</h1>
      All photographs are available as unframed fine art prints.<br />
      Printed and packed with care.<br />
      Available in a selection of sizes.<br />
      Shipping worldwide.<br /><br />

      For other prints or framing queries, please contact: <EmailLink showEmail className={styles.mailto} />
    </div>
  )
}

export default PrintsInfoPanel;

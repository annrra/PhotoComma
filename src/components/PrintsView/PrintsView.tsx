import { SeparatorDecorator } from '@/src/components/ui/SeparatorDecorator';
import styles from './pv.module.css';
import { EmailLink } from '@/src/components/_utils/EmailLink';

const PrintsView = () => {

  return (
    <div className={styles.panel}>
      <div className={styles.segment}>
        <SeparatorDecorator />
        Each photograph is available to be purchased as a print<br />
        Printed with care<br />
        Shipping worldwide<br /><br />

        For print requests: <EmailLink showEmail className={styles.mailto} />
      </div>
    </div>
  )
}

export default PrintsView;

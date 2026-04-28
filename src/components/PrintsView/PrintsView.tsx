'use client';
import { SeparatorDecorator } from '@/src/components/ui/SeparatorDecorator';
import styles from './pv.module.css';
import { EmailLink } from '@/src/components/_utils/EmailLink';
import { ViewControls } from '@/src/components/ViewControls';

const PrintsView = () => {

  return (
    <>
      <ViewControls />
      <div className={styles.pane}>
        <div className={styles.panel}>
          <div className={styles.segment}>
            <SeparatorDecorator />
            <h1 className={styles.sronly}>Prints and shipping information at PhotoComma</h1>
            Each photograph is available to be purchased as a print<br />
            Printed with care<br />
            Shipping worldwide<br /><br />

            For print requests: <EmailLink showEmail className={styles.mailto} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PrintsView;

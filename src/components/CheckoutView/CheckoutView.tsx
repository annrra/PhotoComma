'use client';
import { useCheckout } from './useCheckout';
import { CheckoutForm } from './CheckoutForm';
import { CheckoutSummary } from './CheckoutSummary';
import styles from './cv.module.css';
import classNames from 'classnames';
import Link from 'next/link';

const CheckoutView = () => {
  const { state, dispatch, submit, items, cartReady } = useCheckout();

  if (state.step === 'SUCCESS') {
    return (
      <div>
        <h1>Order confirmed 🎉</h1>
        <p>Order #{state.order?.orderNumber}</p>
      </div>
    );
  }

  if (state.step === 'PROCESSING') {
    return <p>Processing payment...</p>;
  }

  if (state.step === 'ERROR') {
    return (
      <div>
        <p>Error: {state.error}</p>
        <button onClick={() => dispatch({ type: 'STEP', step: 'FORM' })}>
          Try again
        </button>
      </div>
    );
  }

  if (!cartReady) {
    return (
      <div className={styles.panel}>
        <div className={classNames(styles.scene, styles['scene-empty'])}>
          <h2 className={styles.heading}>Loading checkout...</h2>
        </div>
      </div>
    );
  }

  if (cartReady && (!items || items.length === 0)) {
    return (
      <div className={classNames(styles.panel, styles['scene-empty'])}>
        <div className={styles.scene}>
          <h2 className={styles.heading}>Your cart is empty</h2>
          <div className={styles['empty-cta']}><Link href={'/prints'}>Add items</Link> before checkout.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.scene}>
        <CheckoutForm state={state} dispatch={dispatch} onSubmit={submit} />
        <CheckoutSummary items={items} />
      </div>
    </div>
  );
}

export default CheckoutView;
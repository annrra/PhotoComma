'use client';
import { useCheckout } from './useCheckout';
import { CheckoutForm } from './CheckoutForm';
import { CheckoutSummary } from './CheckoutSummary';
import styles from './cv.module.css';

const CheckoutView = () => {
  const { state, dispatch, submit, items } = useCheckout();

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
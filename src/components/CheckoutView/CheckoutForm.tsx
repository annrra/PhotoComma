import styles from './cf.module.css';
import classNames from 'classnames';
import { CheckoutState, CheckoutAction, PaymentMethod } from './checkoutTypes';

type Props = {
  state: CheckoutState;
  dispatch: React.Dispatch<CheckoutAction>;
  onSubmit: () => void;
};

export function CheckoutForm({ state, dispatch, onSubmit }: Props) {
  return (
    <div className={styles['checkout-form']}>
      <h2>Checkout</h2>

      <div className={styles['form-field']}>
        <input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            dispatch({
              type: 'SET',
              payload: { email: e.target.value },
            })
          }
        />
      </div>
        
      <div className={classNames(styles['form-field'], styles['form-field-double'])}>
        <input
          type="text"
          placeholder="First name"
          value={state.shipping.firstName}
          onChange={(e) =>
            dispatch({
              type: 'SET',
              payload: {
                shipping: {
                  ...state.shipping,
                  firstName: e.target.value,
                },
              },
            })
          }
        />

        <input
          type="text"
          placeholder="Last name"
          value={state.shipping.lastName}
          onChange={(e) =>
            dispatch({
              type: 'SET',
              payload: {
                shipping: {
                  ...state.shipping,
                  lastName: e.target.value,
                },
              },
            })
          }
        />
      </div>
      
      <div className={styles['form-field']}>
        <input
          type="text"
          placeholder="Address"
          value={state.shipping.address1}
          onChange={(e) =>
            dispatch({
              type: 'SET',
              payload: {
                shipping: {
                  ...state.shipping,
                  address1: e.target.value,
                },
              },
            })
          }
        />
      </div>

      <div className={styles['form-field']}>
        <input
          type="text"
          placeholder="City"
          value={state.shipping.city}
          onChange={(e) =>
            dispatch({
              type: 'SET',
              payload: {
                shipping: {
                  ...state.shipping,
                  city: e.target.value,
                },
              },
            })
          }
        />
      </div>

      <div className={styles['form-field']}>
        <input
          type="text"
          placeholder="Postcode"
          value={state.shipping.postcode}
          onChange={(e) =>
            dispatch({
              type: 'SET',
              payload: {
                shipping: {
                  ...state.shipping,
                  postcode: e.target.value,
                },
              },
            })
          }
        />
      </div>

      <div className={styles['form-field']}>
        <select
          value={state.shipping.country}
          onChange={(e) =>
            dispatch({
              type: 'SET',
              payload: {
                shipping: {
                  ...state.shipping,
                  country: e.target.value,
                },
              },
            })
          }
        >
          <option value="">Select country</option>
          <option value="BG">Bulgaria</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="US">United States</option>
        </select>
      </div>

      <div className={styles['form-field']}>
        <select
          value={state.paymentMethod}
          onChange={(e) =>
            dispatch({
              type: 'SET',
              payload: { paymentMethod: e.target.value as PaymentMethod },
            })
          }
        >
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
          <option value="bacs">Bank Transfer</option>
        </select>
      </div>

      <div className={styles['form-field']}>
        <button className={styles.submit} onClick={onSubmit}>
          Pay now
        </button>
      </div>
    </div>
  );
}
import styles from './cf.module.css';
import classNames from 'classnames';

export function CheckoutForm({ state, dispatch, onSubmit }: any) {
  return (
    <div className={styles['checkout-form']}>
      <h2>Checkout</h2>

      <div className={styles['form-field']}>
        <input
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
        <select
          value={state.paymentMethod}
          onChange={(e) =>
            dispatch({
              type: 'SET',
              payload: { paymentMethod: e.target.value },
            })
          }
        >
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      <button onClick={onSubmit}>
        Pay now
      </button>
    </div>
  );
}
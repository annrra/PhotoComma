'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/src/context/CartContext/CartContext';
import styles from './cd.module.css';

const CHECKOUT_MESSAGES = {
  preparing: 'Preparing checkout…',
  error: 'Checkout failed. Please try again.',
};

const CartDrawer = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    isCartOpen,
    closeCart,
    setCheckoutTransition,
    setCheckoutStatus,
    checkoutTransition,
  } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setCheckoutTransition(true);
    setCheckoutStatus(CHECKOUT_MESSAGES.preparing);

    try {
      const res = await fetch('/api/checkout/handoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.productId,
            variationId: item.variationId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {
        setCheckoutStatus(CHECKOUT_MESSAGES.error);
        setTimeout(() => setCheckoutTransition(false), 2000);
        return;
      }

      // small UX delay for smoother transition
      setTimeout(() => {
        closeCart();
        window.location.href = data.checkoutUrl;
      }, 600);

    } catch {
      setCheckoutStatus(CHECKOUT_MESSAGES.error);
      setTimeout(() => setCheckoutTransition(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className={styles.overlay}
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <div className={styles.header}>
              <h2>Cart</h2>
              <button onClick={closeCart} className={styles.close}>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.96381 8.02502L10.8114 11.8727L6.96443 15.7197C6.67153 16.0126 6.67153 16.4874 6.96443 16.7803C7.25732 17.0732 7.73219 17.0732 8.02509 16.7803L11.8721 12.9333L15.7191 16.7803C16.012 17.0732 16.4869 17.0732 16.7798 16.7803C17.0727 16.4874 17.0727 16.0126 16.7798 15.7197L12.9328 11.8727L16.7804 8.02502C17.0733 7.73213 17.0733 7.25725 16.7804 6.96436C16.4875 6.67147 16.0126 6.67147 15.7197 6.96436L11.8721 10.812L8.02447 6.96436C7.73158 6.67147 7.2567 6.67147 6.96381 6.96436C6.67092 7.25725 6.67092 7.73213 6.96381 8.02502Z"
                    fill="black"
                    className={styles['fill-x']}
                  />
                </svg>
              </button>
            </div>

            <div className={styles.items}>
              {items.length === 0 ? (
                <div className={styles.empty}>
                  Your cart is empty
                  <img src="/cart/empty.webp" alt="Empty cart" className={styles['empty-image']} />
                </div>
              ) : (
                items.map(item => (
                  <div key={item.variationId} className={styles.item}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} className={styles.preview} />
                    ) : null}

                    <div className={styles.info}>
                      <h4>{item.title}</h4>
                      <div className={styles.atts}>{item.size}</div>

                      <div className={styles.controls}>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.variationId,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className={styles['btn-stepper']}
                          disabled={checkoutTransition}
                        >
                          -
                        </button>

                        <span className={styles.quantity}>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.variationId,
                              item.quantity + 1
                            )
                          }
                          className={styles['btn-stepper']}
                          disabled={checkoutTransition}
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeItem(item.variationId)}
                          className={styles['btn-remove']}
                          disabled={checkoutTransition}
                        >
                          remove
                        </button>
                      </div>
                    </div>

                    <div className={styles.price}>
                      {(item.price * item.quantity).toFixed(2)} <span className={styles['price-currency']}>EUR</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span className={styles['total-label']}>Total:</span> {total.toFixed(2)} <span className={styles['total-currency']}>EUR</span>
              </div>

              <button
                className={styles.checkout}
                onClick={handleCheckout}
                disabled={items.length === 0}
              >
                Checkout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

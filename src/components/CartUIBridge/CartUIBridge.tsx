'use client';
import { useCart } from '@/src/context/CartContext/CartContext';
import { CheckoutTransition } from '@/src/components/CheckoutTransition';

export default function CartUIBridge({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkoutTransition, checkoutStatus } = useCart();

  return (
    <>
      {children}

      <CheckoutTransition
        open={checkoutTransition}
        status={checkoutStatus}
      />
    </>
  );
}
import { Suspense } from 'react';
import { CheckoutSuccess } from '@/src/components/CheckoutSuccess';

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccess />
    </Suspense>
  );
}
import { Suspense } from 'react';
import CheckoutSuccessClient from './CheckoutSuccessClient';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}
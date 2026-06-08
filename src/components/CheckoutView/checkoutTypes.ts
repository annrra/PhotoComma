export type PaymentMethod = 'stripe' | 'paypal' | 'bacs';

export type CheckoutState = {
  email: string;

  shipping: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    postcode: string;
    country: string;
  };

  paymentMethod: PaymentMethod;

  step: 'FORM' | 'PROCESSING' | 'SUCCESS' | 'ERROR';

  error?: string;

  order?: {
    id: string;
    orderNumber: string;
  };
};
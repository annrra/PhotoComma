export type PaymentMethod = 'stripe' | 'paypal' | 'bacs';

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postcode: string;
  country: string;
};

export type CheckoutState = {
  email: string;
  shipping: ShippingAddress;
  paymentMethod: PaymentMethod;
  step: 'FORM' | 'PROCESSING' | 'SUCCESS' | 'ERROR';
  error?: string;
  order?: {
    id: string;
    orderNumber: string;
  };
};

export type CheckoutAction =
  | {
      type: 'SET';
      payload: Partial<
        Pick<CheckoutState, 'email' | 'paymentMethod'> & {
          shipping: Partial<CheckoutState['shipping']>;
        }
      >;
    }
  | { type: 'STEP'; step: CheckoutState['step'] }
  | { type: 'ERROR'; error: string }
  | {
      type: 'SUCCESS';
      order: NonNullable<CheckoutState['order']>;
    };

export type CheckoutItem = {
  key: string;
  title: string;
  price: number;
  quantity: number;
};
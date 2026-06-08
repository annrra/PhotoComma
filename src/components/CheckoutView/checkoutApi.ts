import { graphqlRequest } from '@/lib/woocommerce/cart';
import { CheckoutState } from './checkoutTypes';

export type CheckoutInput = {
  clientMutationId: string;
  email: string;
  paymentMethod: CheckoutState['paymentMethod'];
  shipping: CheckoutState['shipping'];
};

export async function checkout(input: CheckoutInput) {
  return graphqlRequest<{
    checkout: {
      result: string;
      redirect?: string;
      order?: {
        id: string;
        orderNumber: string;
        status: string;
      };
      notices?: Array<{
        type: string;
        message: string;
      }>;
    };
  }>(
    `
      mutation Checkout($input: CheckoutInput!) {
        checkout(input: $input) {
          result
          redirect

          order {
            databaseId
            orderNumber
            status
          }

          notices {
            message
            type
          }
        }
      }
    `,
    { input }
  );
}
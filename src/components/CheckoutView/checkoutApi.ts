import { graphqlRequest } from '@/lib/woocommerce/cart';

export async function checkout(input: any) {
  return graphqlRequest<{
    checkout: {
      result: string;
      redirect?: string;
      order?: {
        id: string;
        orderNumber: string;
        status: string;
      };
    };
  }>(
    `
      mutation Checkout($input: CheckoutInput!) {
        checkout(input: $input) {
          result
          redirect
          order {
            id
            orderNumber
            status
          }
        }
      }
    `,
    { input }
  );
}
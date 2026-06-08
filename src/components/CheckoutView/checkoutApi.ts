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
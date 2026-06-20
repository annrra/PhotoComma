const SHOP_API = process.env.NEXT_PUBLIC_SHOP_API_URL;

type GraphQLError = { message: string };

export type GraphQLResponse<T> = {
  data: T | null;
  errors?: GraphQLError[];
  sessionToken: string | null;
};

function normalizeSessionToken(header: string | null): string | null {
  if (!header || header === 'false') return null;
  return header.startsWith('Session ') ? header.slice('Session '.length) : header;
}

export class WooSessionClient {
  private sessionToken: string | null = null;

  getSessionToken(): string | null {
    return this.sessionToken;
  }

  async request<T>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<GraphQLResponse<T>> {
    if (!SHOP_API) {
      return {
        data: null,
        errors: [{ message: 'NEXT_PUBLIC_SHOP_API_URL is not configured' }],
        sessionToken: this.sessionToken,
      };
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.sessionToken) {
      headers['woocommerce-session'] = `Session ${this.sessionToken}`;
    }

    let res: Response;

    try {
      res = await fetch(SHOP_API, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables }),
        cache: 'no-store',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error';
      return {
        data: null,
        errors: [{ message }],
        sessionToken: this.sessionToken,
      };
    }

    const nextToken = normalizeSessionToken(res.headers.get('woocommerce-session'));
    if (nextToken) {
      this.sessionToken = nextToken;
    }

    if (!res.ok) {
      return {
        data: null,
        errors: [{ message: `WooGraphQL HTTP ${res.status}` }],
        sessionToken: this.sessionToken,
      };
    }

    const json = (await res.json()) as { data?: T; errors?: GraphQLError[] };

    return {
      data: json.data ?? null,
      errors: json.errors,
      sessionToken: this.sessionToken,
    };
  }
}

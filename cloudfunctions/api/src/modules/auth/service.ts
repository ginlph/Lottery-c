export const authService = {
  async verifyOrder(payload: Record<string, unknown>) {
    return {
      todo: 'verify-order business is not implemented yet',
      received: payload
    };
  },
  async refreshToken(payload: Record<string, unknown>) {
    return {
      todo: 'refresh-token business is not implemented yet',
      received: payload
    };
  }
};

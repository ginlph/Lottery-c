export const lotteryService = {
  async draw(payload: Record<string, unknown>) {
    return {
      todo: 'draw business is not implemented yet',
      received: payload
    };
  },
  async myPrize() {
    return { todo: 'my-prize business is not implemented yet' };
  },
  async myChances() {
    return { todo: 'my-chances business is not implemented yet' };
  },
  async claimPhysicalGift(payload: Record<string, unknown>) {
    return {
      todo: 'claim-physical-gift business is not implemented yet',
      received: payload
    };
  }
};

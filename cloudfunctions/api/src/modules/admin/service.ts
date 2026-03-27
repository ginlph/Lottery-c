export const adminService = {
  async getActivityOverview() {
    return { todo: 'admin activity overview is not implemented yet' };
  },
  async getPrizes() {
    return { todo: 'admin prizes is not implemented yet' };
  },
  async getDrawRecords() {
    return { todo: 'admin draw records is not implemented yet' };
  },
  async getCoupons() {
    return { todo: 'admin coupons is not implemented yet' };
  },
  async updateActivityStatus(payload: Record<string, unknown>) {
    return { todo: 'admin activity status update is not implemented yet', received: payload };
  },
  async updatePrize(payload: Record<string, unknown>) {
    return { todo: 'admin prize update is not implemented yet', received: payload };
  }
};

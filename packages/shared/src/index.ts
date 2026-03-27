export type PrizeType = 'retry' | 'discount_coupon' | 'physical_gift' | 'none';

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
  trace_id?: string;
  server_time: string;
}

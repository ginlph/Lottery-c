/**
 * 统一接口响应结构
 */
export interface ApiResponse<T = unknown> {
  /** 业务状态码 */
  code: number;
  /** 可读消息 */
  message: string;
  /** 业务数据 */
  data?: T;
  /** 链路追踪 ID */
  trace_id?: string;
  /** 服务端时间（ISO 8601） */
  server_time: string;
}

/**
 * 通用分页查询参数
 */
export interface PaginationQuery {
  /** 页码（从 1 开始） */
  page: number;
  /** 每页条数 */
  page_size: number;
}

/**
 * 通用分页响应
 */
export interface PaginationResult<T> {
  /** 当前页数据 */
  list: T[];
  /** 当前页码 */
  page: number;
  /** 每页条数 */
  page_size: number;
  /** 总条数 */
  total: number;
}

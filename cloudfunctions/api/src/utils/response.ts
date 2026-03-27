import { ERROR_CODES, type ErrorCode } from '../enums/error-codes';

export interface ApiResponse<T = unknown> {
  code: ErrorCode;
  message: string;
  data?: T;
  trace_id?: string;
  server_time: string;
}

interface ResponseMeta {
  traceId?: string;
}

export function success<T>(data: T, message = 'ok', meta?: ResponseMeta): ApiResponse<T> {
  return {
    code: ERROR_CODES.SUCCESS,
    message,
    data,
    trace_id: meta?.traceId,
    server_time: new Date().toISOString()
  };
}

export function failure(code: ErrorCode, message: string, meta?: ResponseMeta, data?: unknown): ApiResponse {
  return {
    code,
    message,
    data,
    trace_id: meta?.traceId,
    server_time: new Date().toISOString()
  };
}

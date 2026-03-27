import { ERROR_CODES } from '../enums/error-codes';
import { AppError } from '../utils/app-error';

function ensureObject(payload: unknown): Record<string, unknown> {
  if (!payload || typeof payload !== 'object') {
    throw new AppError(ERROR_CODES.BAD_REQUEST, 'payload must be an object');
  }

  return payload as Record<string, unknown>;
}

export function validateVerifyOrderPayload(payload: unknown) {
  const body = ensureObject(payload);
  const activityId = body.activity_id;
  const orderNo = body.order_no;

  if (!activityId || !orderNo) {
    throw new AppError(ERROR_CODES.BAD_REQUEST, 'activity_id and order_no are required');
  }

  return body;
}

export function validateRequestIdPayload(payload: unknown) {
  const body = ensureObject(payload);
  const requestId = body.request_id;

  if (!requestId || typeof requestId !== 'string') {
    throw new AppError(ERROR_CODES.LOTTERY_REQUEST_INVALID, 'request_id is required');
  }

  return body;
}

export function passThroughObject(payload: unknown) {
  return ensureObject(payload);
}

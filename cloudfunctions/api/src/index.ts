import { handleApiRequest } from './routes';

interface CloudbaseContext {
  requestId?: string;
}

interface CloudbaseEvent {
  path?: string;
  httpMethod?: string;
  body?: string;
}

export async function main(event: CloudbaseEvent, context: CloudbaseContext) {
  return handleApiRequest(event, context);
}

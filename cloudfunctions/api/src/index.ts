import { handleApiRequest } from './app/routes';
import type { CloudbaseContext, CloudbaseEvent } from './app/types';

export async function main(event: CloudbaseEvent, context: CloudbaseContext) {
  return handleApiRequest(event, context);
}

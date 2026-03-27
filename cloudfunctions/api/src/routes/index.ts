export async function handleApiRequest(event: unknown, context: unknown) {
  return {
    code: 1000,
    message: 'api skeleton ready',
    data: {
      event,
      context
    },
    server_time: new Date().toISOString()
  };
}

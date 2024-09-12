export function createResponse<T>({
  data,
  message,
  status,
}: {
  data: T;
  message: string;
  status?: number;
}) {
  return {
    data,
    message,
    status: status || 200,
  };
}

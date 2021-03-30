function createResponse<T>({
  status = 200,
  error = null,
  data,
}: {
  status?: number;
  error?: string | null;
  data: T;
}): { data: T; error: string | null; status: number } {
  return { status, error, data };
}

export { createResponse };

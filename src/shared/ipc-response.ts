export type IpcResponse<T> =
  | { data: T; errorCode?: never }
  | { errorCode: 'REFERENCED_BY_ENTITY' | 'UNKNOWN_ERROR'; message: string; data?: never };

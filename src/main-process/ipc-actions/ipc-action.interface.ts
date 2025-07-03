export interface IpcAction<TInput, TResponse> {
  channel: string;
  handler: (input: TInput) => Promise<TResponse>;
}

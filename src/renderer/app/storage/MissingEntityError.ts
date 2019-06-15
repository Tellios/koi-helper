export class MissingEntityError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MissingEntityError.prototype);
  }
}

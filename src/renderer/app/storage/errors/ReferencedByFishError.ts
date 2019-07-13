export class ReferencedByFishError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ReferencedByFishError.prototype);
  }
}

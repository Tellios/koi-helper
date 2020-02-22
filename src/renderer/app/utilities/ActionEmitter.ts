import { logger } from "app/logger";

export type ActionCallback = () => void;

export class ActionEmitter {
  private listeners: Map<string, ActionCallback> = new Map();

  public onAction(action: string, callback: ActionCallback) {
    if (this.listeners.has(action)) {
      logger.error(
        `Tried to register action callback for '${action}', but it was already registered`
      );
    }

    this.listeners.set(action, callback);

    return () => {
      this.listeners.delete(action);
    };
  }

  public emit(action: string) {
    if (!this.listeners.has(action)) {
      logger.error(
        `Tried to emit action '${action}' but no callback was registered`
      );
      return;
    }

    const callback = this.listeners.get(action)!;
    callback();
  }
}

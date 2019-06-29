export function SingleInstance(): ClassDecorator {
  return (target: Function) => {
    (target as any).__isSingleInstance = true;
  };
}

import { Container, Newable } from 'inversify';

type ServiceIdentifierPrimitive = string | symbol;
type ServiceIdentifier<T> = Newable<T>;

export class ServiceLocator {
  private static container: Container;

  public static setContainerInstance(container: Container) {
    this.container = container;
  }

  public static get<T>(serviceIdentifier: ServiceIdentifierPrimitive | ServiceIdentifier<T>): T {
    return this.container.get(serviceIdentifier);
  }
}

import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import pLimit from "p-limit";
import { ConnectionService } from "./ConnectionService";
import { SingleInstance } from "app/ioc";

@SingleInstance()
@injectable()
export class TransactionService {
  private limit = pLimit(1);

  public constructor(private connectionService: ConnectionService) {}

  public async useTransaction<T>(
    func: (entityManager: EntityManager) => Promise<T>
  ): Promise<T> {
    if (func === undefined) {
      throw Error("Transaction function undefined");
    }

    return this.limit(() => {
      const connection = this.connectionService.getActiveConnection();
      return connection.transaction(async entityManager => {
        return await func(entityManager);
      });
    });
  }
}

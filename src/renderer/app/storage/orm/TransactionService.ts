import { injectable } from "inversify";
import { ConnectionService } from "./ConnectionService";
import { EntityManager } from "typeorm";

@injectable()
export class TransactionService {
  public constructor(private connectionService: ConnectionService) {}

  public async useTransaction<T>(
    func: (entityManager: EntityManager) => Promise<T>
  ): Promise<T> {
    const connection = this.connectionService.getActiveConnection();
    return await connection.transaction(func);
  }
}

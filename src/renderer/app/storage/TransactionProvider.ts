import { ServiceLocator } from "app/ioc";
import { EntityManager } from "typeorm";
import { TransactionService } from "./orm";
import { LogFunction } from "app/logger";

export class TransactionProvider {
  @LogFunction()
  public static async provide<T>(
    func: (entityManager: EntityManager) => Promise<T>
  ): Promise<T> {
    const transactionService = ServiceLocator.get(TransactionService);
    return await transactionService.useTransaction(func);
  }
}

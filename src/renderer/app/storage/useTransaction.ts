import { ServiceLocator } from "app/ioc";
import { EntityManager } from "typeorm";
import { TransactionService } from "./orm";

export async function useTransaction<T>(
  func: (entityManager: EntityManager) => Promise<T>
): Promise<T> {
  const transactionService = ServiceLocator.get(TransactionService);
  return await transactionService.useTransaction(func);
}

import { ServiceLocator } from '@main-process/ioc';
import { EntityManager } from 'typeorm';
import { TransactionService } from './orm';
import { LogFunction } from '@shared/logger';

export class TransactionProvider {
  @LogFunction()
  public static async provide<T>(func: (entityManager: EntityManager) => Promise<T>): Promise<T> {
    const transactionService = ServiceLocator.get(TransactionService);
    return await transactionService.useTransaction(func);
  }
}

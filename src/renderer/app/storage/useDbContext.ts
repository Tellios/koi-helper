import { ServiceLocator } from "app/ioc";
import { IDbContext } from "./IDbContext";
import { PondRepository } from "app/repositories";
import { SqliteDatabaseService } from "./SqliteDatabaseService";

type ContextParams = {
  context: IDbContext;
  pondRepository: PondRepository;
};

export async function useDbContext<T>(
  func: (params: ContextParams) => Promise<T>
): Promise<T> {
  const dbService = ServiceLocator.get(SqliteDatabaseService);
  const context = await dbService.openDatabase("/home/sonny/test-sqlite.db");

  const params: ContextParams = {
    context,
    pondRepository: ServiceLocator.get(PondRepository)
  };

  return await func(params);
}

import { IDbContext } from "./IDbContext";
import { MissingEntityError } from "./MissingEntityError";
import { RunResult } from "sqlite3";
import { Id } from "../repositories/entities";
import { injectable } from "inversify";

@injectable()
export class QueryService {
  public queryFirst<T>(
    context: IDbContext,
    query: string,
    params: any
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      context.db.get(query, params, (err, row) => {
        if (err !== null) {
          return reject(err);
        }

        if (row === undefined) {
          return reject(new MissingEntityError("Unable to find entity"));
        }

        resolve(row);
      });
    });
  }

  public insert(context: IDbContext, query: string, params: any): Promise<Id> {
    return new Promise((resolve, reject) => {
      context.db.run(query, params, function(
        this: RunResult,
        err: Error | null
      ) {
        if (err !== null) {
          return reject(err);
        }

        resolve(this.lastID);
      });
    });
  }

  public update(
    context: IDbContext,
    query: string,
    params: any
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      context.db.run(query, params, (err: Error | null) => {
        if (err !== null) {
          return reject(err);
        }

        resolve();
      });
    });
  }
}

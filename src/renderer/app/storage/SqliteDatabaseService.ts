import { Database, OPEN_READWRITE, OPEN_CREATE } from "sqlite3";
import { readFile } from "fs-extra";
import * as path from "path";
import { IDbContext } from "./IDbContext";
import { injectable } from "inversify";

@injectable()
export class SqliteDatabaseService {
  public async createDatabase(filename: string): Promise<IDbContext> {
    const db = await this.openDatabaseInternal(
      filename,
      OPEN_READWRITE | OPEN_CREATE
    );

    await this.setupDatabase(db);

    return this.createContext(db);
  }

  public async openDatabase(filename: string): Promise<IDbContext> {
    const db = await this.openDatabaseInternal(filename, OPEN_READWRITE);
    return this.createContext(db);
  }

  private openDatabaseInternal(
    filename: string,
    mode: number
  ): Promise<Database> {
    return new Promise((resolve, reject) => {
      const db = new Database(filename, mode, err => {
        if (err !== null) {
          return reject(err);
        }

        resolve(db);
      });
    });
  }

  private async setupDatabase(db: Database): Promise<void> {
    const setupSqlPath = path.join(__static, "db", "setup.sql");
    const setupSql = await readFile(setupSqlPath, "utf8");

    return new Promise((resolve, reject) => {
      db.exec(setupSql, err => {
        if (err !== null) {
          return reject(err);
        }

        resolve();
      });
    });
  }

  private createContext(db: Database): IDbContext {
    return {
      db
    };
  }
}

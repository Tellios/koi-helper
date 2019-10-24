import { injectable } from "inversify";
import { pathExists } from "fs-extra";
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import {
  DiseaseEntity,
  FishEntity,
  MeasurementEntity,
  ImageEntity,
  PondEntity,
  TreatmentCommentEntity,
  TreatmentEntity,
  VarietyEntity
} from "./entities";
import { SingleInstance } from "app/ioc";
import { LogFunction } from "app/logger";
import { ConnectionError } from "../errors";
import { t } from "app/i18n";

@injectable()
@SingleInstance()
export class ConnectionService {
  private activeConnection: Connection | null = null;

  @LogFunction()
  public getActiveConnection(): Connection {
    if (this.activeConnection === null) {
      throw Error(`No active connection available`);
    }

    return this.activeConnection;
  }

  @LogFunction()
  public async newFile(filename: string): Promise<void> {
    const dbExists = await pathExists(filename);

    if (dbExists) {
      throw new ConnectionError(t.file.errors.alreadyExist);
    }

    const connection = await createConnection(
      this.getConnectionSettings(filename)
    );

    await connection.synchronize();

    this.activeConnection = connection;
  }

  @LogFunction()
  public async openFile(filename: string): Promise<void> {
    await this.closeActiveConnectionIfOpen();

    const dbExists = await pathExists(filename);

    if (!dbExists) {
      throw new ConnectionError(t.file.errors.doesNotExist);
    }

    const connection = await createConnection(
      this.getConnectionSettings(filename)
    );

    await this.migrateAndVacuumDatabase(connection);

    this.activeConnection = connection;
  }

  @LogFunction()
  private async closeActiveConnectionIfOpen() {
    if (this.activeConnection !== null) {
      await this.activeConnection.close();
      this.activeConnection = null;
    }
  }

  @LogFunction()
  private async migrateAndVacuumDatabase(connection: Connection) {
    await connection.runMigrations({ transaction: "all" });
    await connection.query("VACUUM;");
  }

  @LogFunction()
  private getConnectionSettings(filename: string): ConnectionOptions {
    return {
      name: `activeConnection-${filename}`,
      type: "sqlite",
      database: filename,
      entities: [
        DiseaseEntity,
        MeasurementEntity,
        ImageEntity,
        PondEntity,
        FishEntity,
        TreatmentCommentEntity,
        TreatmentEntity,
        VarietyEntity
      ],
      migrations: []
    };
  }
}

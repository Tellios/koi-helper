import { injectable } from "inversify";
import { pathExists } from "fs-extra";
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import {
  DiseaseEntity,
  FishEntity,
  MeasurementEntity,
  PhotoEntity,
  PondEntity,
  TreatmentCommentEntity,
  TreatmentEntity,
  VarietyEntity
} from "./entities";

@injectable()
export class ConnectionService {
  private activeConnection: Connection | null = null;

  public getActiveConnection(): Connection {
    if (this.activeConnection === null) {
      throw Error(`No active connection available`);
    }

    return this.activeConnection;
  }

  public async connect(filename: string): Promise<void> {
    if (this.activeConnection !== null) {
      await this.activeConnection.close();
      this.activeConnection = null;
    }

    const dbExists = await pathExists(filename);

    const connection = await createConnection(
      this.getConnectionSettings(filename)
    );

    if (!dbExists) {
      await connection.synchronize();
    }

    await connection.runMigrations({ transaction: true });
    await connection.query("VACUUM;");

    this.activeConnection = connection;
  }

  private getConnectionSettings(filename: string): ConnectionOptions {
    return {
      name: "activeConnection",
      type: "sqlite",
      database: filename,
      entities: [
        DiseaseEntity,
        FishEntity,
        MeasurementEntity,
        PhotoEntity,
        PondEntity,
        TreatmentCommentEntity,
        TreatmentEntity,
        VarietyEntity
      ],
      migrations: []
    };
  }
}

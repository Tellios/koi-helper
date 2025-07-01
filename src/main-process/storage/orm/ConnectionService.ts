import { t } from '@app/i18n';
import { SingleInstance } from '@main-process/ioc';
import { LogFunction } from '@shared/logger';
import { pathExists } from 'fs-extra';
import { injectable } from 'inversify';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import sqlite from 'sqlite3';
import { ConnectionError } from '../errors';
import {
  DiseaseEntity,
  FileEntity,
  FishEntity,
  ImageEntity,
  MeasurementEntity,
  PondEntity,
  TreatmentCommentEntity,
  TreatmentEntity,
  VarietyEntity,
} from './entities';
import { V1_1579357365101 } from './migrations';

@injectable()
@SingleInstance()
export class ConnectionService {
  private activeConnection: DataSource | null = null;

  @LogFunction()
  public getActiveConnection(): DataSource {
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

    const connectionSettings = this.getConnectionSettings(filename);
    const connection = new DataSource(connectionSettings);
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

    const connectionSettings = this.getConnectionSettings(filename);
    const connection = new DataSource(connectionSettings);
    await this.migrateAndVacuumDatabase(connection);

    this.activeConnection = connection;
  }

  @LogFunction()
  private async closeActiveConnectionIfOpen() {
    if (this.activeConnection !== null) {
      await this.activeConnection.destroy();
      this.activeConnection = null;
    }
  }

  @LogFunction()
  private async migrateAndVacuumDatabase(connection: DataSource) {
    await connection.runMigrations({ transaction: 'all' });
    await connection.query('VACUUM;');
  }

  @LogFunction()
  private getConnectionSettings(filename: string): DataSourceOptions {
    return {
      name: `activeConnection-${filename}`,
      type: 'sqlite',
      driver: sqlite,
      database: filename,
      entities: [
        DiseaseEntity,
        MeasurementEntity,
        ImageEntity,
        PondEntity,
        FileEntity,
        FishEntity,
        TreatmentCommentEntity,
        TreatmentEntity,
        VarietyEntity,
      ],
      migrations: [V1_1579357365101],
    };
  }
}

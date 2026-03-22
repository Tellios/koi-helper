import { SingleInstance } from '@main-process/ioc';
import { t } from '@shared/i18n';
import { LogFunction, logger } from '@shared/logger';
import { pathExists } from 'fs-extra';
import { injectable } from 'inversify';
import sqlite from 'sqlite3';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import { ConnectionError } from '../errors';
import {
  DiseaseEntity,
  FileEntity,
  FishEntity,
  ImageEntity,
  KeyValueEntity,
  MeasurementEntity,
  PondEntity,
  TreatmentCommentEntity,
  TreatmentEntity,
  VarietyEntity,
} from './entities';
import { V1_1579357365101, V2_1774040096184 } from './migrations';

const migrations = [V1_1579357365101, V2_1774040096184];

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
    await connection.initialize();
    await connection.runMigrations({ transaction: 'all' });

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

    logger.verbose(`Opening database file: ${filename}`);
    const connection = new DataSource(connectionSettings);
    await connection.initialize();

    await this.migrateAndVacuumDatabase(connection);

    this.activeConnection = connection;
  }

  @LogFunction()
  private async closeActiveConnectionIfOpen() {
    if (this.activeConnection !== null) {
      logger.verbose('Closing already active database connection');
      await this.activeConnection.destroy();
      this.activeConnection = null;
    }
  }

  @LogFunction()
  private async migrateAndVacuumDatabase(connection: DataSource) {
    if (await connection.showMigrations()) {
      logger.verbose('Running database migrations if available');
      await connection.runMigrations({ transaction: 'all' });
    } else {
      logger.verbose('No pending migrations continuing without running migrations');
    }

    const keyValueRepository = connection.getRepository(KeyValueEntity);
    const vacuumStamp = await keyValueRepository.findOne({ where: { id: 'vacuum-stamp' } });

    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const lastVacuum = vacuumStamp ? new Date(vacuumStamp.value) : null;

    if (lastVacuum && now.getTime() - lastVacuum.getTime() < oneWeekInMs) {
      logger.verbose('Vacuum not needed, last vacuum was less than a week ago');
      return;
    }

    logger.verbose('Vacuuming database');
    await connection.query('VACUUM;');

    await keyValueRepository.upsert(
      {
        id: 'vacuum-stamp',
        value: now.toISOString(),
        created: vacuumStamp ? vacuumStamp.created : now,
        updated: now,
      },
      ['id'],
    );
  }

  @LogFunction()
  private getConnectionSettings(filename: string): DataSourceOptions {
    return {
      name: `activeConnection-${filename}`,
      type: 'sqlite',
      driver: sqlite,
      database: filename,
      busyErrorRetry: 20000,
      busyTimeout: 500,
      entities: [
        DiseaseEntity,
        MeasurementEntity,
        ImageEntity,
        PondEntity,
        FileEntity,
        FishEntity,
        KeyValueEntity,
        TreatmentCommentEntity,
        TreatmentEntity,
        VarietyEntity,
      ],
      migrations,
    };
  }
}

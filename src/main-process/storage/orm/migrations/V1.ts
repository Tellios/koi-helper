import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class V1_1579357365101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pond_entity" (
        "id" varchar PRIMARY KEY NOT NULL, 
        "created" datetime NOT NULL DEFAULT (datetime('now')), 
        "updated" datetime NOT NULL DEFAULT (datetime('now')), 
        "name" text NOT NULL, 
        "length" double NOT NULL, 
        "width" double NOT NULL, 
        "depth" double NOT NULL, 
        "volume" double NOT NULL, 
        "archived" boolean NOT NULL
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "disease_entity" (
        "id" varchar PRIMARY KEY NOT NULL, 
        "created" datetime NOT NULL DEFAULT (datetime('now')), 
        "updated" datetime NOT NULL DEFAULT (datetime('now')), 
        "name" text NOT NULL, 
        "description" text NOT NULL, 
        "medication" text NOT NULL
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "variety_entity" (
        "id" varchar PRIMARY KEY NOT NULL, 
        "created" datetime NOT NULL DEFAULT (datetime('now')), 
        "updated" datetime NOT NULL DEFAULT (datetime('now')), 
        "name" text NOT NULL, 
        "description" text NOT NULL
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "fish_entity" (
        "id" varchar PRIMARY KEY NOT NULL, 
        "created" datetime NOT NULL DEFAULT (datetime('now')), 
        "updated" datetime NOT NULL DEFAULT (datetime('now')), 
        "born" date NOT NULL, 
        "sex" text NOT NULL, 
        "origin" text NOT NULL, 
        "value" real NOT NULL, 
        "breeder" text NOT NULL, 
        "name" text NOT NULL, 
        "varietyId" text NOT NULL, 
        "pondId" varchar, 
        CONSTRAINT "FK_7dfd680b8999e4560bec39d7ec4" FOREIGN KEY ("pondId") REFERENCES "pond_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "image_entity" (
        "id" text NOT NULL, 
        "isThumbnail" boolean NOT NULL, 
        "created" datetime NOT NULL DEFAULT (datetime('now')), 
        "updated" datetime NOT NULL DEFAULT (datetime('now')), 
        "reference" text NOT NULL, 
        "name" text NOT NULL, 
        "data" text NOT NULL, 
        PRIMARY KEY ("id", "isThumbnail")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "measurement_entity" (
        "id" varchar PRIMARY KEY NOT NULL, 
        "created" datetime NOT NULL DEFAULT (datetime('now')), 
        "updated" datetime NOT NULL DEFAULT (datetime('now')), 
        "date" date NOT NULL, 
        "length" double NOT NULL, 
        "weight" double NOT NULL, 
        "comment" text NOT NULL, 
        "fishId" varchar, 
        CONSTRAINT "FK_aa7e307699f2cb1aa65ba87b226" FOREIGN KEY ("fishId") REFERENCES "fish_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "treatment_entity" (
        "id" varchar PRIMARY KEY NOT NULL, 
        "created" datetime NOT NULL DEFAULT (datetime('now')), 
        "updated" datetime NOT NULL DEFAULT (datetime('now')), 
        "reference" varchar NOT NULL, 
        "ended" date NOT NULL, 
        "finished" boolean NOT NULL, 
        "diseaseId" varchar, 
        CONSTRAINT "REL_38031e9be9133efa5b88293651" UNIQUE ("diseaseId"), 
        CONSTRAINT "FK_38031e9be9133efa5b88293651e" FOREIGN KEY ("diseaseId") REFERENCES "disease_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "treatment_comment_entity" (
        "id" varchar PRIMARY KEY NOT NULL, 
        "created" datetime NOT NULL DEFAULT (datetime('now')), 
        "updated" datetime NOT NULL DEFAULT (datetime('now')), 
        "comment" text NOT NULL, 
        "category" text NOT NULL, 
        "treatmentId" varchar, 
        CONSTRAINT "FK_4624106cb03ab8e2971faf7ae49" FOREIGN KEY ("treatmentId") REFERENCES "treatment_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'file_entity',
        columns: [
          {
            name: 'id',
            type: 'TEXT',
            isPrimary: true,
          },
          {
            name: 'created',
            type: 'DATE',
            isNullable: false,
          },
          {
            name: 'updated',
            type: 'DATE',
            isNullable: false,
          },
          {
            name: 'reference',
            type: 'TEXT',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'TEXT',
            isNullable: false,
          },
          {
            name: 'extension',
            type: 'TEXT',
            isNullable: false,
          },
          {
            name: 'data',
            type: 'TEXT',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    const table = await queryRunner.getTable('file_entity');
    const indexExists = table?.indices.some((i) => i.name === 'IDX_FILE_REFERENCE_ID');
    if (!indexExists) {
      await queryRunner.createIndex(
        'file_entity',
        new TableIndex({
          name: 'IDX_FILE_REFERENCE_ID',
          columnNames: ['reference'],
        }),
      );
    }
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('file_entity', 'IDX_FILE_REFERENCE_ID');
    await queryRunner.dropTable('file_entity');
  }
}

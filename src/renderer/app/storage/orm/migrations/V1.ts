import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class V1_1579357365101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "file_entity",
        columns: [
          {
            name: "id",
            type: "TEXT",
            isPrimary: true
          },
          {
            name: "created",
            type: "DATE",
            isNullable: false
          },
          {
            name: "updated",
            type: "DATE",
            isNullable: false
          },
          {
            name: "reference",
            type: "TEXT",
            isNullable: false
          },
          {
            name: "name",
            type: "TEXT",
            isNullable: false
          },
          {
            name: "extension",
            type: "TEXT",
            isNullable: false
          },
          {
            name: "data",
            type: "TEXT",
            isNullable: false
          }
        ]
      }),
      true
    );

    await queryRunner.createIndex(
      "file_entity",
      new TableIndex({
        name: "IDX_FILE_REFERENCE_ID",
        columnNames: ["referenceId"]
      })
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex("file_entity", "IDX_FILE_REFERENCE_ID");
    await queryRunner.dropTable("file_entity");
  }
}

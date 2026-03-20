import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class V2_1774040096184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'key_value_entity',
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
            name: 'value',
            type: 'TEXT',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('key_value_entity');
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddApvdToOrphanages1603409379106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orphanages',
      new TableColumn({
        name: 'approved',
        type: 'boolean',
        isNullable: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'approved')
  }
}

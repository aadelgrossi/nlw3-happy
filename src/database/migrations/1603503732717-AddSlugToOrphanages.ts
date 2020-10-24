import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddSlugToOrphanages1603503732717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orphanages',
      new TableColumn({
        name: 'slug',
        type: 'varchar'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'slug')
  }
}

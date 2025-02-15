import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'paiement_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_paiement_type').primary()
      table.string('label').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
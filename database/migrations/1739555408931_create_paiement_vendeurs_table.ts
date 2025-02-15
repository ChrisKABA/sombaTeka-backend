import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'paiement_vendeurs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_paiement_type').notNullable()
      table.integer('id_seller').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.primary(['id_paiement_type', 'id_seller'])
      table.foreign('id_paiement_type').references('id_paiement_type').inTable('paiement_types').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('id_seller').references('id_seller').inTable('sellers').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
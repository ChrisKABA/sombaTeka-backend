import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sellers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_seller').primary()
      table.string('description')
      table.string('note_vendeur')
      table.string('name_boutique')


      table.foreign('id_seller').references('id_client').inTable('clients').onDelete('CASCADE').onUpdate('CASCADE')


      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
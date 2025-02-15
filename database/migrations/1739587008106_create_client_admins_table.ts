import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'client_admins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_admin').notNullable()
      table.increments('id_client').notNullable()
      table.string('statut_client').notNullable()
      
      table.primary(['id_admin', 'id_client'])
      table.foreign('id_admin').references('id_admin').inTable('admins').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('id_client').references('id_client').inTable('clients').onDelete('CASCADE').onUpdate('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
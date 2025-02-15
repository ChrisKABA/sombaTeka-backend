import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'point_ventes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_point_vente').primary()
      table.string('name_point_vente').notNullable()
      table.string('adresse_point_ventet').notNullable()
      table.integer('id_vendeur').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('id_vendeur').references('id_seller').inTable('sellers').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
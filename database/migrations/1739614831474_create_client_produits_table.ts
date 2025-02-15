import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'client_produits'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_client').notNullable()
      table.increments('id_produit').notNullable()
      table.integer('quantite').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at')

      table.primary(['id_client', 'id_produit'])
      table.foreign('id_client').references('id_client').inTable('clients').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('id_produit').references('id_produit').inTable('produits').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}


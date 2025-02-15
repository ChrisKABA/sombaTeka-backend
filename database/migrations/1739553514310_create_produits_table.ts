import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'produits'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_produit').primary()
      table.string('name_produit').notNullable()
      table.string('note_produit')
      table.string('currentPrice').notNullable()
      table.string('oldPrice')
      table.string('image')
      table.string('description')
      table.string('status')
      table.string('stock')
      table.string('weight')
      table.string('supplier')
      table.integer('id_category_produit').notNullable()
      table.integer('id_seller').notNullable()

      table.foreign('id_category_produit').references('id_category_produit').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('id_seller').references('id_seller').inTable('sellers').onDelete('CASCADE').onUpdate('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
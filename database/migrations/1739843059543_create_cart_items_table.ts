import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cart_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_cart_item').primary()
      table.integer('id_user').notNullable()
      table.integer('id_produit').notNullable()
      table.integer('quantity').notNullable().defaultTo(1)
      table.boolean('is_selected').notNullable().defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.foreign('id_user').references('id_user').inTable('users').onDelete('CASCADE')
      table.foreign('id_produit').references('id_produit').inTable('produits').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
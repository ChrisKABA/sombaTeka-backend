import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Produit extends BaseModel {
  @column({ isPrimary: true })
  declare id_produit: number

  @column()
  declare name_produit: string

  @column()
  declare note_produit: number

  @column()
  declare stock: number

  @column()
  declare currentPrice: number
  
  @column()
  declare oldPrice: number
  
  @column()
  declare image: string

  @column()
  declare description: string

  @column()
  declare status: string

  @column()
  declare weight: string

  @column()
  declare supplier: string

  @column()
  declare id_category_produit: number

  @column()
  declare id_seller: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Seller extends BaseModel {
  @column({ isPrimary: true })
  declare id_seller: number

  @column()
  declare description?: string

  @column()
  declare rating: number

  @column()
  declare note_vendeur?: string

  @column()
  declare name_boutique?: string

  @column()
  declare profile_image: string

  @column()
  declare total_sales: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
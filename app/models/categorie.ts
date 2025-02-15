import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Categorie extends BaseModel {
  @column({ isPrimary: true })
  declare id_category_produit: number

  @column()
  declare name_categorie_produit: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
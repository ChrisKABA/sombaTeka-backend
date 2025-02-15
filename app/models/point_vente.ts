import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PointVente extends BaseModel {
  @column({ isPrimary: true })
  declare id_point_vente: number

  @column()
  declare name_point_ventet: string

  @column()
  declare adresse_point_ventet: string

  @column()
  declare id_seller: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
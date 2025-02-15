import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ClientAdmin extends BaseModel {
  @column({ isPrimary: true })
  declare id_admin: number

  @column({ isPrimary: true })
  declare id_client: number

  @column()
  declare statut_client: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
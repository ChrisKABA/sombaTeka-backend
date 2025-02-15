import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PaiementVendeur extends BaseModel {
  
  @column({ isPrimary: true })
  declare id_paiement_type: number

  @column({ isPrimary: true })
  declare id_seller: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
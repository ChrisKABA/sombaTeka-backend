import { DateTime } from 'luxon'
import { BaseModel, column} from '@adonisjs/lucid/orm'

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  declare id_cart_item: number

  @column()
  declare id_user: number

  @column()
  declare id_produit: number

  @column()
  declare quantity: number

  @column()
  declare isSelected: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
import type { HttpContext } from '@adonisjs/core/http'
import CartItem from '#models/cart_item'

export default class CartController {
  public async index({ auth, response }: HttpContext) {
    try {
      if (!auth.user) {
        return response.status(401).json({
          message: 'Vous devez être connecté pour accéder au panier'
        })
      }

      const cartItems = await CartItem.query()
        .where('id_user', auth.user.id_user)
        .orderBy('createdAt', 'desc')

      return response.json({
        items: cartItems
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Une erreur est survenue lors de la récupération du panier'
      })
    }
  }

  public async store({ request, auth, response }: HttpContext) {
    try {
      if (!auth.user) {
        return response.status(401).json({
          message: 'Vous devez être connecté pour ajouter des articles au panier'
        })
      }

      const { id_produit, quantity } = request.only(['id_produit', 'quantity'])

      const existingItem = await CartItem.query()
        .where('id_user', auth.user.id_user)
        .where('id_produit', id_produit)
        .first()

      if (existingItem) {
        existingItem.quantity += quantity
        await existingItem.save()
        return response.json(existingItem)
      }

      const cartItem = await CartItem.create({
        id_user: auth.user.id_user,
        id_produit,
        quantity,
        isSelected: true
      })

      return response.status(201).json(cartItem)
    } catch (error) {
      return response.status(500).json({
        message: 'Une erreur est survenue lors de l\'ajout au panier'
      })
    }
  }

  public async update({ params, request, auth, response }: HttpContext) {
    try {
      if (!auth.user) {
        return response.status(401).json({
          message: 'Vous devez être connecté pour modifier le panier'
        })
      }

      const { quantity } = request.only(['quantity'])
      const cartItem = await CartItem.query()
        .where('id_user', auth.user.id_user)
        .where('id_produit', params.id)
        .firstOrFail()

      cartItem.quantity = quantity
      await cartItem.save()

      return response.json(cartItem)
    } catch (error) {
      return response.status(500).json({
        message: 'Une erreur est survenue lors de la mise à jour du panier'
      })
    }
  }

  public async destroy({ params, auth, response }: HttpContext) {
    try {
      if (!auth.user) {
        return response.status(401).json({
          message: 'Vous devez être connecté pour supprimer des articles du panier'
        })
      }

      const cartItem = await CartItem.query()
        .where('id_user', auth.user.id_user)
        .where('id_produit', params.id)
        .firstOrFail()

      await cartItem.delete()

      return response.json({
        message: 'Article supprimé du panier'
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Une erreur est survenue lors de la suppression de l\'article'
      })
    }
  }

  public async clear({ auth, response }: HttpContext) {
    try {
      if (!auth.user) {
        return response.status(401).json({
          message: 'Vous devez être connecté pour vider le panier'
        })
      }

      await CartItem.query()
        .where('id_user', auth.user.id_user)
        .delete()

      return response.json({
        message: 'Panier vidé avec succès'
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Une erreur est survenue lors du vidage du panier'
      })
    }
  }
}
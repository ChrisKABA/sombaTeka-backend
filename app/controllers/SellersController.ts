import type { HttpContext } from '@adonisjs/core/http'
import Seller from '#models/seller'
import Client from '#models/client'

export default class SellersController {
  public async register({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({
          message: 'Vous devez être connecté pour devenir vendeur'
        })
      }

      // Vérifier si l'utilisateur est déjà un client
      let client = await Client.findBy('id_client', user.id_user)
      
      // Si l'utilisateur n'est pas encore client, le créer
      if (!client) {
        const { phone, address } = request.only(['phone', 'address'])
        client = await Client.create({
          id_client: user.id_user,
          phone,
          address
        })
      }

      // Vérifier si le client est déjà vendeur
      const existingSeller = await Seller.findBy('id_seller', client.id_client)
      if (existingSeller) {
        return response.status(400).json({
          message: 'Vous êtes déjà enregistré comme vendeur'
        })
      }

      const {
        description,
        name_boutique,
        profile_image
      } = request.only(['description', 'name_boutique', 'profile_image'])

      const seller = await Seller.create({
        id_seller: client.id_client,
        description,
        name_boutique,
        profile_image,
        rating: 0,
        total_sales: 0
      })

      return response.status(201).json({
        message: 'Inscription réussie en tant que vendeur',
        seller
      })
    } catch (error) {
      console.error('Seller registration error:', error)
      return response.status(400).json({
        message: 'Une erreur est survenue lors de l\'inscription',
        error: error.message
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const seller = await Seller.findOrFail(params.id)
      return response.json(seller)
    } catch (error) {
      return response.status(404).json({
        message: 'Vendeur non trouvé'
      })
    }
  }

  public async update({ params, request, response, auth }: HttpContext) {
    try {
      const seller = await Seller.findOrFail(params.id)
      
      // Vérifier que le vendeur modifie son propre profil
      if (seller.id_seller !== auth.user?.id_user) {
        return response.status(403).json({
          message: 'Non autorisé à modifier ce profil'
        })
      }

      const data = request.only([
        'description',
        'name_boutique',
        'profile_image'
      ])

      seller.merge(data)
      await seller.save()

      return response.json(seller)
    } catch (error) {
      return response.status(400).json({
        message: 'Erreur lors de la mise à jour du profil',
        error: error.message
      })
    }
  }
}
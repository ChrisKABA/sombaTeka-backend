import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/produit.js'

export default class HomeController {
  public async index({ response }: HttpContext) {
    try {
      // Récupérer les produits pour la page d'accueil
      const products = await Product.query()
        .orderBy('created_at', 'desc')
        .limit(10)

      return response.json({
        products,
        message: 'Bienvenue sur SombaTeka'
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Une erreur est survenue lors de la récupération des données'
      })
    }
  }
}
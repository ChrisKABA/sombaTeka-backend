import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
// import bcrypt from 'bcrypt';
// const saltRounds = 10

export default class AuthController {
  public async register({ request, response, auth, session }: HttpContext) {
    try {
      const data = request.only(['email', 'password', 'fullName'])

      // Validation des données
      if (!data.email || !data.password || !data.fullName) {
        return response.status(400).json({
          message: 'Tous les champs sont obligatoires'
        })
      }

      // Validation du format de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        return response.status(400).json({
          message: 'Format d\'email invalide'
        })
      }

      // Validation du mot de passe (minimum 6 caractères)
      if (data.password.length < 3) {
        return response.status(400).json({
          message: 'Le mot de passe doit contenir au moins 6 caractères'
        })
      }

      // Vérifier si l'email existe déjà
      const existingUser = await User.findBy('email', data.email.toLowerCase())
      if (existingUser) {
        return response.status(400).json({
          message: 'Cet email est déjà utilisé'
        })
      }

      // Générer les initiales du nom complet
      const initials = data.fullName
        .split(' ')
        .map((word: string) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

      // Créer le SVG pour l'avatar
      const svg = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><circle cx='20' cy='20' r='20' fill='%234267B2'/><text x='20' y='25' font-family='Arial' font-size='16' fill='white' text-anchor='middle'>${initials}</text></svg>`

      try {
        // Hachage du mot de passe avec bcrypt
        // const hashedPassword = await bcrypt.hash(data.password, saltRounds)

        // Créer l'utilisateur
        const user = await User.create({
          email: data.email.toLowerCase(),
          password: data.password,
          fullName: data.fullName,
          image: svg
        })

        // Connexion de l'utilisateur
        await auth.use('web').login(user)
        session.put('user', {
          id_user: user.id_user,
          email: user.email,
          fullName: user.fullName,
          image: user.image
        })

        return response.status(201).json({
          message: 'Inscription réussie',
          user: {
            id_user: user.id_user,
            email: user.email,
            fullName: user.fullName,
            image: user.image
          }
        })
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error)
        return response.status(500).json({
          message: 'Une erreur est survenue lors de la création de l\'utilisateur'
        })
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      return response.status(500).json({
        message: 'Une erreur est survenue lors de l\'inscription',
        error: error.message
      })
    }
  }

  public async login({ request, response, auth, session }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // Validation des champs
      if (!email || !password) {
        return response.status(400).json({
          message: 'Email et mot de passe requis'
        })
      }

      // Recherche de l'utilisateur
      const user = await User.findBy('email', email.toLowerCase())
      if (!user) {
        return response.status(401).json({
          message: 'Email ou mot de passe incorrect'
        })
      }

      try {
        // Vérification du mot de passe avec bcrypt
        // const isValidPassword = await bcrypt.compare(password, user.password)
        const isValidPassword = (password === user.password)

        if (isValidPassword) {
          return response.status(401).json({
            message: 'mot de passe incorrect'
          })
        }

        // Connexion de l'utilisateur
        await auth.use('web').login(user)
        session.put('user', {
          id_user: user.id_user,
          email: user.email,
          fullName: user.fullName,
          image: user.image
        })

        return response.json({
          message: 'Connexion réussie',
          user: {
            id_user: user.id_user,
            email: user.email,
            fullName: user.fullName,
            image: user.image
          }
        })
      } catch (error) {
        console.error('Erreur de vérification du mot de passe:', error)
        return response.status(500).json({
          message: 'Une erreur est survenue lors de la vérification du mot de passe'
        })
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return response.status(500).json({
        message: 'Une erreur est survenue lors de la connexion'
      })
    }
  }

  public async logout({ auth, response, session }: HttpContext) {
    try {
      await auth.use('web').logout()
      session.forget('user')
      return response.json({
        message: 'Déconnexion réussie'
      })
    } catch (error) {
      console.error('Erreur de déconnexion:', error)
      return response.status(500).json({
        message: 'Une erreur est survenue lors de la déconnexion'
      })
    }
  }

  public async me({ auth, response, session }: HttpContext) {
    try {
      const user = session.get('user') || auth.use('web').user
      if (!user) {
        return response.status(401).json({
          message: 'Non authentifié'
        })
      }
      return response.json({
        user: {
          id_user: user.id_user,
          email: user.email,
          fullName: user.fullName,
          image: user.image
        }
      })
    } catch (error) {
      console.error('Erreur de récupération de l\'utilisateur:', error)
      return response.status(401).json({
        message: 'Non authentifié'
      })
    }
  }
}
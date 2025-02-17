import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async register({ request, response, auth, session }: HttpContext) {
    try {
      const data = request.only(['email', 'password', 'fullName', 'image'])
      
      // Vérifier si l'email existe déjà
      const existingUser = await User.findBy('email', data.email)
      if (existingUser) {
        session.flash('error', 'Cet email est déjà utilisé')
        return response.status(400).json({
          message: 'Cet email est déjà utilisé'
        })
      }

      const user = await User.create({
        email: data.email,
        password: await hash.make(data.password),
        fullName: data.fullName,
        image: data.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop'
      })

      // Connecter l'utilisateur après l'inscription
      await auth.use('web').login(user)
      session.put('user', user)

      return response.status(201).json({
        user: {
          id: user.id_user,
          email: user.email,
          fullName: user.fullName,
          image: user.image
        }
      })
    } catch (error) {
      console.error('Registration error:', error)
      session.flash('error', 'Une erreur est survenue lors de l\'inscription')
      return response.status(400).json({
        message: 'Une erreur est survenue lors de l\'inscription',
        error: error.message
      })
    }
  }

  public async login({ request, response, auth, session }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const user = await User.findBy('email', email)

      if (!user) {
        session.flash('error', 'Identifiants invalides')
        return response.status(401).json({
          message: 'Identifiants invalides'
        })
      }

      try {
        await hash.verify(user.password, password)
        await auth.use('web').login(user)
        session.put('user', user)
        return response.json({ user })
      } catch {
        session.flash('error', 'Identifiants invalides')
        return response.status(401).json({
          message: 'Identifiants invalides'
        })
      }
    } catch (error) {
      session.flash('error', 'Identifiants invalides')
      return response.status(401).json({
        message: 'Identifiants invalides'
      })
    }
  }

  public async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.forget('user')
    return response.json({
      message: 'Déconnexion réussie'
    })
  }

  public async me({ auth, response, session }: HttpContext) {
    const user = session.get('user') || auth.use('web').user
    if (!user) {
      return response.status(401).json({
        message: 'Non authentifié'
      })
    }
    return response.json(user)
  }
}
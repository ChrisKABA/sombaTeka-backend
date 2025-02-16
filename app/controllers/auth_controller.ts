import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
    public async register({ request, response, auth }: HttpContext) {
        try {
            const data = request.only(['email', 'password', 'fullName', 'image'])
          
          const user = await User.create({
            email: data.email,
            password: await hash.make(data.password),
            fullName: data.fullName,
            image: data.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop'
          })
    
          const token = await auth.use('web').login(user)
    
          return response.status(201).json({
            user,
            token: token
          })
        } catch (error) {
          return response.status(400).json({
            message: 'Une erreur est survenue lors de l\'inscription'
          })
        }
      }
    
      public async login({ request, response, auth, session }: HttpContext) {
        try {
          const { email, password } = request.only(['email', 'password'])
          const user = await User.findBy('email', email)
    
          if (!user) {
            session.flash('error', 'Identifiants invalides')
            return response.redirect().back()
          }
    
          try {
            await hash.verify(user.password, password)
            await auth.use('web').login(user)
            session.flash('success', 'Connexion réussie')
            return response.redirect('/home')
          } catch (error) {
            session.flash('error', 'Identifiants invalides')
            return response.redirect().back()
          }
        } catch (error) {
          session.flash('error', 'Identifiants invalides')
          return response.redirect().back()
        }
      }
    
      public async logout({ auth, response }: HttpContext) {
        await auth.use('web').logout()
        return response.json({
          message: 'Déconnexion réussie'
        })
      }
    
      public async me({ auth, response }: HttpContext) {
        const user = auth.use('web').user
        if (!user) {
          return response.status(401).json({
            message: 'Non authentifié'
          })
        }
        return response.json(user)
      }
}
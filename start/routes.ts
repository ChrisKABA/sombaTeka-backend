/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// router.get('/', async () => {
//   return {
//     hello: 'world',
//   }
// })

const AuthController = () => import('../app/controllers/auth_controller.js')
const HomeController = () => import('../app/controllers/home_controller.js')
const SellersController = () => import('../app/controllers/SellersController.js')
const CartController = () => import('../app/controllers/carts_controller.js')

// Routes d'authentification
router.post('/signup', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
router.get('/me', [AuthController, 'me']).use(middleware.auth())

// Route de la page d'accueil
router.get('/', [HomeController, 'index'])

// Routes pour les vendeurs (protégées)
router.group(() => {
  router.post('/sellers/register', [SellersController, 'register'])
  router.get('/sellers/:id', [SellersController, 'show'])
  router.put('/sellers/:id', [SellersController, 'update'])
}).use(middleware.auth())

// Routes pour le panier (protégées)
router.group(() => {
  router.get('/cart', [CartController, 'index'])
  router.post('/cart/items', [CartController, 'store'])
  router.put('/cart/items/:id', [CartController, 'update'])
  router.delete('/cart/items/:id', [CartController, 'destroy'])
  router.delete('/cart', [CartController, 'clear'])
}).use(middleware.auth())

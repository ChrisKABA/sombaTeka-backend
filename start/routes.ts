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

router.post('/signup', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
router.get('/me', [AuthController, 'me']).use(middleware.auth())

// Route de la page d'accueil
router.get('/', [HomeController, 'index'])

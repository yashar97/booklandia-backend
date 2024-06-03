import { Router } from 'express'
import { registro, login, confirmar, cambiarPassword, actualizarPassword, perfil } from '../controllers/userController.js'
import { checkAuth } from '../middleware/checkAuth.js';

const router = Router();

// rutas publicas 
router.post('/registro', registro);
router.post('/login', login);
router.get('/confirmar/:token', confirmar);
router.post('/recuperar-password', cambiarPassword);
router.put('/actualizar-password', actualizarPassword);

// rutas protegidas
router.get('/perfil', checkAuth, perfil);




export default router;
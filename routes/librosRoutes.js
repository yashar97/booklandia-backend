import { Router } from 'express'
import { agregarLibro, obtenerLibros, obtenerLibroId } from '../controllers/librosController.js'

const router = Router();

router.post('/', agregarLibro);
router.get('/', obtenerLibros);
router.get('/:id', obtenerLibroId);


export default router;
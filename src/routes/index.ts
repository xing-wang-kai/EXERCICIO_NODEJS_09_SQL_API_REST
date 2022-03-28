import { Router } from 'express';
import Home, * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', Home.home);
router.post('/novousuario', Home.criarUsers);
router.get('/usuarios/:id/mais', Home.maisIdade);
router.get('/usuarios/:id/menos', Home.menosIdade);
router.get('/usuarios/:id/excluir', Home.deleteUser);

router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

router.get('/nome', UserController.nome);
router.get('/idade', UserController.idadeForm);
router.post('/idade-resultado', UserController.idadeAction);

export default router;
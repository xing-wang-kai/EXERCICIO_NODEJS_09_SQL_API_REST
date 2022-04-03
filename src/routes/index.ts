import { Router } from 'express';
import Home, * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';
import Login from '../controllers/loginController';
import Auth from '../middlewares/auth';

const router = Router();

router.get('/', Home.home);
router.get('/localizar', Auth.authorizationkey , Home.findAll);
router.post('/novousuario', Home.criarUsers);
router.get('/usuarios/:id/mais', Home.maisIdade);
router.get('/usuarios/:id/menos', Home.menosIdade);
router.get('/usuarios/:id/excluir', Home.deleteUser);

router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

router.get('/nome', UserController.nome);
router.get('/idade', UserController.idadeForm);
router.post('/idade-resultado', UserController.idadeAction);

router.post('/login/log', Login.logar );
router.get('/login', Login.acesso)

export default router;
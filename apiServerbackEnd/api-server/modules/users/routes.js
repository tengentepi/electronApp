import { Router } from 'express'; // Un import ici
import * as User from './controller';

const routes = new Router();

//LOGIN & SIGNUP 

const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/auth-admin');
const multer = require('../../middleware/multer-config');





routes.post('/signup', multer, User.signup);
routes.post('/login', User.login);
routes.put('/modify/1/:id', adminAuth, multer, User.modifyUser1);
routes.put('/modify/2/:id', auth, multer, User.modifyUser2);



export default routes; // Un export ici, pourquoi: c'est une exportation des routes afin que l'on puisse les utiliser ailleurs
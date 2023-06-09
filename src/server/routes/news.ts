import express, { Router } from 'express';
import newsController from '../controllers/NewsController';

const router: Router = express.Router(); 

router.get('/:slug', newsController.detail)

router.get('/', newsController.index)


export default router
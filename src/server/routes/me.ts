import { Router } from 'express';
import MeController from '../controllers/MeController';

const router: Router = Router()

router.post('/courses/handle-with-actions', MeController.handleWithActions)

router.patch('/courses/trash/restore/:id', MeController.restoreTrash)

router.delete('/courses/trash/delete/:id', MeController.deleteTrash)

router.get('/courses/trash', MeController.getTrash)

router.route('/courses')
    .get(MeController.getCourses)


router.get('/', MeController.getMe)

export default router
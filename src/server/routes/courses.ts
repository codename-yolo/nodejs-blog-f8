import express, { Router } from 'express';
import coursesController from '../controllers/CoursesController';

const router: Router = express.Router(); 

router.route('/create')
    .get(coursesController.getCreate)
    .post(coursesController.create)

router.route('/edit/:id')
    .get(coursesController.getUpdate)
    .put(coursesController.update)

router.delete('/delete/:id', coursesController.delete)

// Tất cả các path nhập sau main path sẽ vào đấy và nhận qua params
router.get('/:slug', coursesController.detail)

router.get('/', coursesController.index)

export default router
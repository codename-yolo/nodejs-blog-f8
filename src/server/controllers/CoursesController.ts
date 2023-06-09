import CoursesModel from '../models/courses'
import { RequestType, ResponseType, NextType } from '../type';
import { convertMongodbObject, pageNotPoundValue } from '../utils'

class CoursesController {
    
    // [GET] courses
    async index(req: RequestType, res: ResponseType, next: NextType) {
        try {            
            const courses = await CoursesModel.find({});
            res.render('courses/list', { courses: convertMongodbObject('more', courses)})
        } catch (error) {
            next(error)
        }
    }

    // [GET] course detail
    async detail(req: RequestType, res: ResponseType, next: NextType) {
        const slug = req.params.slug

        try {            
            const course = await CoursesModel.findOne({ slug });
            if (!course) {
                res.status(404).render('404', pageNotPoundValue);
                return;
            }
            res.render('courses/detail', { course: convertMongodbObject('one', course)})
        } catch (error) {
            next(error)
        }
    }

    // [GET] create course
    getCreate(req: RequestType, res: ResponseType) {
        res.render('courses/create')
    }

    // [POST] create course
    async create(req: RequestType, res: ResponseType) {
        try {
            await CoursesModel.create(req.body);
            res.redirect('/courses')
        } catch (error) {
            console.log('error', error);
        }
    }

    // [GET] edit course
    async getUpdate(req: RequestType, res: ResponseType, next: NextType) {
        const _id = req.params.id;

        try {
            const course = await CoursesModel.findOne({ _id })
            res.render('courses/create', {
                titlePage: 'Edit course',
                textBtn:'Edit',
                action: req?.originalUrl + '?_method=PUT',
                ...convertMongodbObject('one',course)
            })
        } catch (error) {
            next(error);
        }

        
    }

     // [PUT] edit course
    async update(req: RequestType, res: ResponseType, next: NextType) {
        const _id = req.params.id;
        const dataUpdate = req.body

        try {
            await CoursesModel.updateOne({ _id }, dataUpdate);
            res.redirect('/me/courses')
        } catch (error) {
            next(error)
        }
    }
    
     // [DELETE] delete course
    async delete(req: RequestType, res: ResponseType, next: NextType) {
        const _id = req.params.id;
        try {
            await CoursesModel.delete({ _id });
            res.redirect('/me/courses')
        } catch (error) {
            next(error)
        }
    }

}

export default new CoursesController;
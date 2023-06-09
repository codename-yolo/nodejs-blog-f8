import sortByColumn from '../helper/sortTable';
import CoursesModel from '../models/courses';
import { RequestType, ResponseType, NextType } from '../type';
import { convertMongodbObject } from '../utils';
import { ACTIONS } from './const';

class MeController {
   // [GET] /me
   getMe(req: RequestType, res: ResponseType, next: NextType) {
      res.render('me/detail');
   }

   // [GET] /me/courses
   async getCourses(req: RequestType, res: ResponseType, next: NextType) {
      try {
         // const so = await CoursesModel.sortable(req);
         // console.log(so);
         let findBySort = CoursesModel.find();

         if ('sort' in res.locals) {
            sortByColumn(findBySort, res.locals.sort)
         }

         const courses = await findBySort;
         const deleteCount = await CoursesModel.countDeleted();

         res.render('me/courses', {
            courses: convertMongodbObject('more', courses || []),
            deleteCount
         });
      } catch (error) {
         next(error);
      }
   }

   // [GET] /me/courses/trash
   async getTrash(req: RequestType, res: ResponseType, next: NextType) {
      try {
         const courses = await CoursesModel.findDeleted();
         res.render('me/trash-courses', {
            courses: convertMongodbObject('more', courses),
         })
      } catch (error) {
         next(error);
      }
     
   }

   // [PATCH] /me/courses/trash/restore/:id
   async restoreTrash(req: RequestType, res: ResponseType, next: NextType) {
      const _id = req.params.id
      try {
         await CoursesModel.restore({ _id });
         res.redirect('back');
      } catch (error) {
         next(error);
      }
   }

   // [DELETE] /me/courses/trash/delete/:id
   async deleteTrash(req: RequestType, res: ResponseType, next: NextType) {
      const _id = req.params.id
      try {
         await CoursesModel.deleteOne({ _id });
         res.redirect('back');
      } catch (error) {
         next(error);
      }
   }

    // [POST] /me/courses/handle-with-actions
    async handleWithActions(req: RequestType, res: ResponseType, next: NextType) {
      const courseIds = req.body.courseIds;

      switch (req.body.action) {
         case ACTIONS.RESTORE:
            await CoursesModel.restore({_id: { $in: courseIds }});
            res.redirect('back')
            break;
         case ACTIONS.DELETE:
            await CoursesModel.delete({_id: { $in: courseIds }})
            res.redirect('back');
            break;
         case ACTIONS.DESTROY:
            await CoursesModel.deleteMany({_id: { $in: courseIds }} )
            res.redirect('back')
            break;
         default:
            res.json({message: 'invalid action !'})
            break;
      }
   }
}

export default new MeController();

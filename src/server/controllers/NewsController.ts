import { RequestType, ResponseType } from '../type';

class NewsController {
    
    // [GET] news
    index(req: RequestType, res: ResponseType) {
        res.render('news')
    }

    // [GET] detail
    detail(req: RequestType, res: ResponseType) {
        res.send('Detail')
    }
}

export default new NewsController;
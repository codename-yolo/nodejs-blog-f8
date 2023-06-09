import { RequestType, ResponseType } from '../type';

class SiteController {
    
    // [GET] /
    home(req: RequestType, res: ResponseType) {
        res.render('home')
    }

    // [GET] /search
    search(req: RequestType, res: ResponseType) {
        res.render('search')
    }

    // [GET] /contact
    contact(req: RequestType, res: ResponseType) {
        res.send('Contact page')
    }
}

export default new SiteController;
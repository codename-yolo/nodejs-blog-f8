import express, { Router } from 'express';
import siteController from '../controllers/SiteController';
import { pageNotPoundValue } from '../utils';

const router: Router = express.Router(); 

// Xử lý khi nhập path '/' hoặc '/home' thì đểu vào trang home
router.use((req, res, next) => {
    if (req.path === '/') {
        return siteController.home(req, res);
    }
    next();
});

// Home [/home | /]
router.use('/home', siteController.home)

// Search [/search]
router.route('/search')
    .get(siteController.search)
    .post(siteController.search)

// Contact [/contact]
router.use('/contact', siteController.contact)

// All [/*]
router.use('/*', (req, res) => {
    // Xử lý yêu cầu không hợp lệ
    res.status(404).render('404', pageNotPoundValue);
});


export default router
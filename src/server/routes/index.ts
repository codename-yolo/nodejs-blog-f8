import { ExpressType, RequestType, ResponseType } from '../type';
const path = require('path');
import newsRouter from './news';
import siteRouter from './site';
import coursesRouter from './courses';
import meRouter from './me';

const route = (app: ExpressType) => {
    // Mỗi khi ng dùng nhập path thì nó sẽ đi vào đây để kiểm tra router trùng khớp

    // New page
    app.use('/news', newsRouter);

    // Courses page
    app.use('/courses', coursesRouter);

    // Me page
    app.use('/me', meRouter);

    // Site page (home, search, contact)
    app.use(
        '/',
        (req, res, next) => {
            const staticPaths = ['/styles', '/img', '/icons'];

            if (staticPaths.some((path) => req.url.startsWith(path))) {
                const staticFilePath = path.join(process.cwd(), 'public', req.url);
                res.sendFile(staticFilePath);
            } else {
                next();
            }
        },
        siteRouter,
    );
};

export default route;

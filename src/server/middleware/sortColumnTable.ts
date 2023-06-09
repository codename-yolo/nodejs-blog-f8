import { NextType, RequestType, ResponseType } from "../type";

const sortColumn = (req: RequestType, res: ResponseType, next: NextType) => {
    if (req.query.hasOwnProperty('_sort')) {
        res.locals.sort = {
            sortType: req.query.type,
            sortColumnName: req.query.column
        };
    }
    
    next()
}

export default sortColumn;
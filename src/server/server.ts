import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import path from 'path';
import route from './routes';
import { connect } from '../config/db';
import sortColumn from './middleware/sortColumnTable';

const app: Express = express();
const port = 3000;

// Middleware handle body data post method
// lib: qs, body-parser

// Handle for form html
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Handle for js (axios, fetch, ..)
app.use(express.json());

// Override method form
app.use(methodOverride('_method'));

//Connect to DB
connect();

// Config file static (image, icons, css) only using '/' === '/public'
app.use(express.static(path.join(process.cwd() + '/public')));

// Apply middleware
app.use(sortColumn);

// Routes init
route(app);

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            increase(idx: number) {
                return idx + 1;
            },
            sortTableRender(
                columName: string,
                sortData: { sortType: string, sortColumnName: string } = { sortType: '', sortColumnName: '' },
                text: string
            ) {
                const {sortColumnName, sortType } = sortData;
                const icons: Record<string, string> = {
                    default: '/icons/sort.svg',
                    asc: '/icons/asc.svg',
                    desc: '/icons/desc.svg',
                };

                const types: Record<string, string> = {
                    default: 'asc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const iconUrl = sortColumnName === columName ? sortType && icons[sortType] : icons.default
                const type = sortColumnName === columName ? sortType && types[sortType] : types.default
                
                return `
                <div class="d-flex align-items-center">
                    <span>${text}</span>
                    <a class="d-flex align-items-center ms-1" href="?_sort&column=${columName}&type=${type}">
                        <img src=${iconUrl} alt="">
                    </a>
                </div>
                `;
            },
        },
    }),
);

app.set('view engine', 'hbs');

// Set path to views folder
app.set('views', path.join(process.cwd() + '/src/server/resources/views'));

// Listen app
app.listen(port, () => {
    console.log('Welcome to localhost' + ' ' + port);
});

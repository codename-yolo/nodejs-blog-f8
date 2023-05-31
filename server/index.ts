import express = require('express');
import { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/home', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const sum = (a: number, b: number) => a + b;

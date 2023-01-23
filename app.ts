import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


export default app;
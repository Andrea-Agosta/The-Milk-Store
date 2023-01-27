import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import milk from './api/milk';

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/milk', milk);

export default app;
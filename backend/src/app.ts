import express, { Request, Response } from 'express';
import cors from 'cors';
import documentRouter from './interfaces/DocumentController';
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hola Mundo en express!');
});

app.use('/documents', documentRouter);

app.all('/{*any}', (req, res, next) => {})

app.listen(port, '0.0.0.0')
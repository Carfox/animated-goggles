import express, { Request, Response } from 'express';
import documentRouter from './interfaces/DocumentController';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hola Mundo en express!');
});

app.use('/documents', documentRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
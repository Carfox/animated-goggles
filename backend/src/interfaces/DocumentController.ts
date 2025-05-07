import { Router, Request, Response, NextFunction } from 'express';
import { DocumentService } from '../application/DocumentService';
import { DocumentRepositoryInMemory } from '../infrastructure/DocumentRepositoryInMemory';

const documentRouter = Router();
const repository = new DocumentRepositoryInMemory();
const service = new DocumentService(repository);


documentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const docs = await service.getAll();
        res.json(docs);
    } catch (err) {
        next(err);
    }
});

/**
 * GET /documents/:id
 * Obtener un documento por ID
 */
documentRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const doc = await service.getById(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(doc);
    } catch (err) {
        next(err);
    }
});

/**
 * POST /documents/
 * Crear un nuevo documento
 */
documentRouter.post('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { title, content } = req.body;

        // Validar input simple
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newDoc = await service.create({ title, content });
        res.status(201).json(newDoc);
    } catch (err) {
        next(err);
    }
});

export default documentRouter;


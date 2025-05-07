"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DocumentService_1 = require("../application/DocumentService");
const DocumentRepositoryInMemory_1 = require("../infrastructure/DocumentRepositoryInMemory");
const documentRouter = (0, express_1.Router)();
const repository = new DocumentRepositoryInMemory_1.DocumentRepositoryInMemory();
const service = new DocumentService_1.DocumentService(repository);
documentRouter.get('/', async (req, res, next) => {
    try {
        const docs = await service.getAll();
        res.json(docs);
    }
    catch (err) {
        next(err);
    }
});
/**
 * GET /documents/:id
 * Obtener un documento por ID
 */
documentRouter.get('/:id', async (req, res, next) => {
    try {
        const doc = await service.getById(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(doc);
    }
    catch (err) {
        next(err);
    }
});
/**
 * POST /documents/
 * Crear un nuevo documento
 */
documentRouter.post('/', async (req, res, next) => {
    try {
        const { title, content } = req.body;
        // Validar input simple
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }
        const newDoc = await service.create({ title, content });
        res.status(201).json(newDoc);
    }
    catch (err) {
        next(err);
    }
});
exports.default = documentRouter;

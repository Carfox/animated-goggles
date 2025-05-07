"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRepositoryInMemory = void 0;
const Document_1 = require("../domain/Document");
const documents = [];
// Contador auto-incremental para IDs
let nextId = 1;
class DocumentRepositoryInMemory {
    async findAll() {
        return documents;
    }
    async findById(id) {
        return documents.find(doc => doc.id === id) || null;
    }
    async create(data) {
        const newDoc = new Document_1.Document(String(nextId++), data.title, data.content, new Date());
        documents.push(newDoc);
        return newDoc;
    }
}
exports.DocumentRepositoryInMemory = DocumentRepositoryInMemory;

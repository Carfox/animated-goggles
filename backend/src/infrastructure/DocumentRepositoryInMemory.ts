import { Document, DocumentRepository } from '../domain/Document';

const documents: Document[] = [];

// Contador auto-incremental para IDs
let nextId = 1;

export class DocumentRepositoryInMemory implements DocumentRepository {
    async findAll(): Promise<Document[]> {
        return documents;
    }

    async findById(id: string): Promise<Document | null> {
        return documents.find(doc => doc.id === id) || null;
    }

    async create(data: { title: string; content: string }): Promise<Document> {
        const newDoc = new Document(
            String(nextId++),
            data.title,
            data.content,
            new Date()
        );
        documents.push(newDoc);
        return newDoc;
    }

    
}

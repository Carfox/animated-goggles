// src/application/DocumentService.ts

import { Document, DocumentRepository } from '../domain/Document';

export interface CreateDocumentDto {
    title: string;
    content: string;
}

export class DocumentService {
    constructor(private readonly repository: DocumentRepository) { }

    getAll(): Promise<Document[]> {
        return this.repository.findAll();
    }

    getById(id: string): Promise<Document | null> {
        return this.repository.findById(id);
    }

    create(dto: CreateDocumentDto): Promise<Document> {
        return this.repository.create(dto);
    }
}

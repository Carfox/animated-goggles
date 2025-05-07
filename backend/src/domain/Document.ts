export class Document {
    constructor(
        public readonly id: string,
        public title: string,
        public content: string,
        public readonly createdAt: Date
    ) { }
}

export interface DocumentRepository {
    findAll(): Promise<Document[]>;
    findById( id: string ): Promise<Document | null>;
    create(   data: Omit<Document, 'id' | 'createdAt'>): Promise<Document>;
}

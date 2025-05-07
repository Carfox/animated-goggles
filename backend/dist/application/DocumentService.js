"use strict";
// src/application/DocumentService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
class DocumentService {
    constructor(repository) {
        this.repository = repository;
    }
    getAll() {
        return this.repository.findAll();
    }
    getById(id) {
        return this.repository.findById(id);
    }
    create(dto) {
        return this.repository.create(dto);
    }
}
exports.DocumentService = DocumentService;

import { useEffect, useState } from 'react';
import DocumentForm from './components/DocumentForm';
import DocumentList from './components/DocumentList';
import DocumentView from './components/DocumentView';
import type { Document } from './types';

const API_URL = 'http://127.0.0.1:3000/documents';  // Cambia si usas otro puerto/backend

function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al cargar documentos');
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchDocumentById = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error('Documento no encontrado');
      const data = await res.json();
      setSelectedDoc(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCreate = async (doc: Omit<Document, 'id'>) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc),
      });
      if (!res.ok) throw new Error('Error al crear documento');
      await fetchDocuments();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="max-w-3xl w-full flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Prueba Técnica by Carfox 🚀</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <DocumentForm onCreate={handleCreate} />
        <DocumentList documents={documents} onSelect={fetchDocumentById} />
        <DocumentView document={selectedDoc} />
      </div>
    </div>
  );
}

export default App;

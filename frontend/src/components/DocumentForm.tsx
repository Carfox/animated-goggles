import { useState } from 'react';
import type { Document } from '../types';

interface Props {
  onCreate: (doc: Omit<Document, 'id'>) => void;
}

const DocumentForm: React.FC<Props> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onCreate({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2 text-center text-gray-700">Crear Documento</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition disabled:bg-blue-300"
        disabled={!title || !content}
      >
        Crear
      </button>
    </form>
  );
};

export default DocumentForm;

import type { Document } from '../types';

interface Props {
  documents: Document[];
  onSelect: (id: string) => void;
}

const DocumentList: React.FC<Props> = ({ documents, onSelect }) => {
  return (
    <div className="bg-white p-4 shadow rounded w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2 text-center text-gray-700">Lista de Documentos</h2>
      {documents.length === 0 ? (
        <p className="text-center text-gray-500">No hay documentos.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li
              key={doc.id}
              onClick={() => onSelect(doc.id)}
              className="cursor-pointer hover:bg-blue-100 p-2 border-b last:border-b-0 rounded transition"
            >
              {doc.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;

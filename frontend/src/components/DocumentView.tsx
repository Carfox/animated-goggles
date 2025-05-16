import type { Document } from '../types';

interface Props {
  document: Document | null;
}
const DocumentView: React.FC<Props> = ({ document }) => {
  const handleDownload = async () => {
    if (!document) return;
    try {

      const response = await fetch(`http://convert:6000/convert` , {
        mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: document.content }),
      });

      if (!response.ok) {
        throw new Error('Error al generar PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = window.document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${document.title}.pdf`);
      window.document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

    } catch (error) {
      console.error('Error al descargar:', error);
      alert('Hubo un error al descargar el documento.');
    }
  };

  if (!document) {
    return (
      <div className="bg-white p-4 shadow rounded w-full max-w-md text-center">
        <p className="text-gray-500">Selecciona un documento para ver su contenido.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 shadow rounded w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2 text-center text-gray-700">{document.title}</h2>
      <p className="whitespace-pre-wrap text-gray-600 mb-4">{document.content}</p>
      <button
        onClick={handleDownload}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full transition"
      >
        Descargar PDF
      </button>
    </div>
  );
};

export default DocumentView;

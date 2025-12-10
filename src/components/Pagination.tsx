interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 mt-4">
      {/* Botón Anterior */}
      <button
        className="px-3 py-1 border rounded bg-gray-100 text-white hover:bg-gray-200 disabled:bg-gray-300"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>

      {/* Botones de números */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 border rounded   
          ${p === currentPage ? "bg-sky-400 text-gray-400" : "bg-white hover:bg-gray-100"}`}
        >
          {p}
        </button>
      ))}

      {/* Botón Siguiente */}
      <button
        className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200  text-gray-400  disabled:bg-gray-300"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
}

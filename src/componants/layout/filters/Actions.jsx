import { useEffect } from "react";

const Actions = ({ page, nextPage, prevPage }) => {
  useEffect(() => {
    // scroll top when page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="flex items-center justify-center gap-4 py-5 dark:text-white">
      <button
        className="bg-blue-600 text-white px-2 py-1 rounded"
        onClick={prevPage}
      >
        Prev
      </button>
      <button>{page}</button>
      <button
        className="bg-blue-600 text-white px-2 py-1 rounded"
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Actions;

import React from "react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div className="flex justify-end mt-10 space-x-2 items-center">
      <label htmlFor="itemsPerPage" className="mr-2 text-gray-700">
        Show Items:
      </label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className="border border-gray-400 rounded-md p-2 bg-gray-700 text-white"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>

      <span className="text-gray-700">
        Showing
        {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of{" "}
        {totalItems} items
      </span>
      <button
        onClick={() => onPageChange("prev")}
        className={`px-4 py-2 text-white font-semibold rounded-md ${
          currentPage === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange("next")}
        className={`px-4 py-2 text-white font-semibold rounded-md ${
          indexOfLastItem >= totalItems
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
        disabled={indexOfLastItem >= totalItems}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

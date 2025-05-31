import { useState } from "react";
import { headerData } from "../util/headerData";
import { Dummy_Data } from "../util/dummy-data";
export default function TableData() {
  const itemsPerPage = 15;

  const [data, setData] = useState(Dummy_Data.slice(0, itemsPerPage));
  const [isEdit, setIsEdit] = useState(null);
  const [inputValue, setInputValue] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(Dummy_Data.length > itemsPerPage);

  function handleEditClick(indexRow, key, value) {
    setIsEdit({ indexRow, key });
    setInputValue(value);
  }

  function handleValueChange(event) {
    setInputValue(event.target.value);
  }

  function handleBlur() {
    if (isEdit) {
      const { indexRow, key } = isEdit;
      const updatedData = [...data];
      updatedData[indexRow][key] = inputValue;

      setData(updatedData);
      setIsEdit(null);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleBlur();
    } else if (event.key === "Escape") {
      setIsEdit(null);
    }
  }

  function handleLoadMore() {
    const newPage = currentPage + 1;
    const startIndex = (newPage - 1) * itemsPerPage;
    const newData = Dummy_Data.slice(startIndex, startIndex + itemsPerPage);

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setData((prevData) => [...prevData, ...newData]);
      setCurrentPage(newPage);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-blue-50">
      <table className="table-fixed border-1 border-gray-200">
      <thead>
        {headerData.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((data) => (
              <th key={data} className="border-1 border-gray-200 p-2">
                {data}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {data.map((cell, indexRow) => (
          <tr key={indexRow}>
            {Object.keys(cell).map((key) => (
              <td
                key={key}
                className="border-1 border-gray-200 p-2"
                onClick={() => handleEditClick(indexRow, key, cell[key])}
              >
                {isEdit?.indexRow === indexRow && isEdit.key === key ? (
                  <input
                    type="text"
                    value={inputValue}
                    className="border p-1 w-24 outline-0"
                    onChange={handleValueChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus
                  />
                ) : (
                  <span className="cursor-pointer">{cell[key]}</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-400"
        >Load More</button>
      )}
    </div>
  );
}

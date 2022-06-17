import React, { useState } from 'react';

import { PDFGenerator } from '../helpers/pdf';

type PaginationAlignment = "none" | "left" | "center" | "right";

export const GeneratePDFView = () => {
  const [membersCount, setMembersCount] = useState<number>(3);
  const [paginationAlignment, setPaginationAlignment] = useState<PaginationAlignment>('none');

  const generatePDF = () => {
    const config = {
      membersCount,
      paginationAlignment,
    };

    PDFGenerator(config);
  }

  const buttonClasses = 'm-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800';

  return (
    <>
      <div className="my-2">
        <label htmlFor="pagination">Numerowanie Stron</label>
        <select
          id="pagination"
          name="pagination"
          onChange={(e) => {
            setPaginationAlignment(e.target.value as PaginationAlignment);
          }}
          value={paginationAlignment}
        >
          <option value="none">Brak</option>
          <option value="left">Lewa</option>
          <option value="center">Środek</option>
          <option value="right">Prawa</option>
        </select>

      </div>

      <div>
        <label htmlFor="asdf">Liczba osób sporządzających spis</label>
        <input
          id="asdf"
          min="1"
          onChange={(e) => { setMembersCount(parseInt(e.target.value)) }}
          type="number"
          value={membersCount}
        />
      </div>

      <button
        className={buttonClasses}
        onClick={generatePDF}
      >
        Generuj
      </button>
    </>
  );
}

export default GeneratePDFView;

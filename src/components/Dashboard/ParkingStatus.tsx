import React, { useState, useEffect } from "react";

const ParkingStatus: React.FC = () => {
  const parkingLots = [
    { name: "Darmstadt Nord", defaultSchema: "SBb-ssBs-BSB-SsSs-bsB" },
    { name: "Darmstadt Sud", defaultSchema: "SsSs-BBbs-sbBs-BbSS" },
    { name: "Frankfurt", defaultSchema: "BSBS-sbSb-SSss-BbSB-SbBB" },
    { name: "Mainz", defaultSchema: "SBSS-ssBb-sbSB-SSbb" },
    { name: "München", defaultSchema: "SbBB-ssSB-BBbs-SsBB" },
    { name: "Berlin", defaultSchema: "SSsb-BbBB-SBbs-BbSS-ssSb" },
  ];

  const [selectedParking, setSelectedParking] = useState<string | null>("Darmstadt Nord");
  const [columns, setColumns] = useState<number>(0);
  const [rowsPerColumn, setRowsPerColumn] = useState<string[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  const colorOccupied = "rgb(7, 142, 205)";
  const colorFree = "#D3D3D3";

  const selectParking = (parkingName: string, defaultSchema: string) => {
    setSelectedParking(parkingName);
    const columnsArray = defaultSchema.split("-");
    setColumns(columnsArray.length);
    setRowsPerColumn(columnsArray);
  };

  useEffect(() => {
    if (selectedParking) {
      const selectedParkingSchema = parkingLots.find(
        (parking) => parking.name === selectedParking
      )?.defaultSchema;

      if (selectedParkingSchema) {
        const columnsArray = selectedParkingSchema.split("-");
        setColumns(columnsArray.length);
        setRowsPerColumn(columnsArray);
      }
    }
  }, [selectedParking]); 

  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setColumns(value);
      setRowsPerColumn((prev) => {
        const updatedRows = [...prev];
        if (value > prev.length) {
          updatedRows.push(...Array(value - prev.length).fill(""));
        } else {
          updatedRows.length = value;
        }
        return updatedRows;
      });
    }
  };

  const handleRowInputChange = (index: number, value: string) => {
    const updatedRows = [...rowsPerColumn];
    updatedRows[index] = value;
    setRowsPerColumn(updatedRows);
  };

  const addNewSlot = (columnIndex: number) => {
    const updatedRows = [...rowsPerColumn];
    updatedRows[columnIndex] += "s"; // Add a small, unoccupied slot by default
    setRowsPerColumn(updatedRows);
  };

  const renderGrid = () => {
    return Array.from({ length: columns }).map((_, colIndex) => {
      const rowsInput = rowsPerColumn[colIndex] || "";
      const rows = rowsInput.split("");

      return (
        <div key={colIndex} className="flex flex-col items-center space-y-2">
          <h2 className="font-semibold text-xl">Column {colIndex+1}</h2>
          <div
            className="flex flex-col space-y-2"
            style={{ minWidth: "100px" }}
          >
            {rows.map((row, rowIndex) => {
              const slotId = `${colIndex}-${rowIndex}`;
              const isOccupied = row === "S" || row === "B";
              const isBig = row === "B" || row === "b";

              return (
                <div key={slotId} className="relative">
                  <div
                    className={`flex items-center justify-center border rounded-xl border-gray-500 ${isBig ? "h-40" : "h-20"
                      }`}
                    style={{
                      backgroundColor: isOccupied ? colorOccupied : colorFree,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (!editMode) return;
                      const updatedRows = [...rows];
                      updatedRows[rowIndex] =
                        row === "S"
                          ? "s"
                          : row === "s"
                            ? "S"
                            : row === "B"
                              ? "b"
                              : "B";
                      const updatedRowsPerColumn = [...rowsPerColumn];
                      updatedRowsPerColumn[colIndex] = updatedRows.join("");
                      setRowsPerColumn(updatedRowsPerColumn);
                    }}
                  >
                    {isBig ? "18m" : "12m"}
                  </div>

                  {/* Edit Mode Buttons */}
                  {editMode && (
                    <div className="absolute top-0 right-0 flex flex-col space-y-1 mt-1 mr-1">
                      {/* Remove Slot Button */}
                      <button
                        onClick={() => {
                          const updatedRows = [...rows];
                          updatedRows.splice(rowIndex, 1); // Remove the slot
                          const updatedRowsPerColumn = [...rowsPerColumn];
                          updatedRowsPerColumn[colIndex] = updatedRows.join("");
                          setRowsPerColumn(updatedRowsPerColumn);
                        }}
                        className="bg-white bg-opacity-50 border border-gray-500 text-black rounded-full p-1 text-xs hover:bg-gray-300 transition"
                        title="Remove Slot"
                      >
                        ✖
                      </button>
                      {/* Change Slot Size Button */}
                      <button
                        onClick={() => {
                          const updatedRows = [...rows];
                          updatedRows[rowIndex] =
                            row === "S" ? "B" : row === "B" ? "S" : row === "s" ? "b" : "s"; // Toggle size
                          const updatedRowsPerColumn = [...rowsPerColumn];
                          updatedRowsPerColumn[colIndex] = updatedRows.join("");
                          setRowsPerColumn(updatedRowsPerColumn);
                        }}
                        className="bg-white bg-opacity-50 border border-gray-500 text-black rounded-full p-1 text-xs hover:bg-gray-300 transition"
                        title="Change Slot Size"
                      >
                        ⇔
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {editMode && (
              <button
                onClick={() => addNewSlot(colIndex)}
                className={`flex items-center justify-center border rounded-xl border-gray-500 h-20 opacity-50 hover:opacity-80 transition`}
                style={{
                  backgroundColor: colorFree,
                  cursor: "pointer",
                }}
              >
                <span className="text-2xl font-bold text-gray-700">+</span>
              </button>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="bg-[#FFFFFF] bg-opacity-80 h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-6">
      {/* Top Section with Fleet Status Scroll and Buttons */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Fleet Status</h2>
        {/* Fleet Status Horizontal Scroll */}


        {/* Edit and Return Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setEditMode(!editMode)}
            className="p-2 rounded-lg border font-semibold border-[#cccccc] transition"
            style={{
              backgroundColor: editMode ? "rgb(7, 142, 205)" : "transparent",
              color: editMode ? "white" : "black",
            }}
          >
            {editMode ? "Exit Edit Mode" : "Edit"}
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto space-x-4 mb-5 scrollbar-hide">
        {parkingLots.map((parking) => (
          <button
            key={parking.name}
            onClick={() => selectParking(parking.name, parking.defaultSchema)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${parking.name === selectedParking
              ? "bg-[#078ECD] text-white"
              : "bg-black text-gray-100 hover:bg-[#078ECD] hover:text-white"
              }`}
          >
            {parking.name}
          </button>
        ))}
      </div>

      {/* Number of Columns Input */}
      <div className="flex items-center mb-6 space-x-4">
        <label className="font-semibold text-gray-700">Number of Columns:</label>
        <input
          type="number"
          min={0}
          value={columns || ""}
          onChange={handleColumnChange}
          className="border border-gray-300 px-3 py-1 rounded-md w-20"
        />
      </div>

      {/* Parking Grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(80px, 1fr))`,
        }}
      >
        {renderGrid()}
      </div>
    </div>
  );

};

export default ParkingStatus;

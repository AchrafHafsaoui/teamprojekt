import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import apiClient, { updateContextValues } from "../api/api";
import { useNavigate } from "react-router-dom";
import API_ROUTES from "../apiRoutes";

type ParkingStatusProps = {
  fullPage?: boolean; // Controls height and layout
};

const ParkingStatus: React.FC<ParkingStatusProps> = ({ fullPage = false }) => {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [parkingLots, setParkingLots] = useState<parking[]>([]);
  const [selectedParking, setSelectedParking] = useState<number | null>(1);
  const [columns, setColumns] = useState<number>(0);
  const [rowsPerColumn, setRowsPerColumn] = useState<string[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<boolean>(false);
  const [addingDepot, setAddingDepot] = useState(false);
  const [editingDepot, setEditingDepot] = useState<number | null>(null);
  const [editingDepotName, setEditingDepotName] = useState("");
  const [direction, setDirection] = useState<"Arrival" | "Departure">(
    "Arrival"
  );

  type resMsg = {
    message: string;
  };

  const colorOccupied = "rgb(7, 142, 205)";
  const colorFree = "#D3D3D3";

  const navigate = useNavigate();
  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

  const { setAuth, auth } = useAuth();
  type AuthReq = {
    message: string;
  };
  const checkAuth = async () => {
    updateContextValues(setAuth, auth);
    try {
      const res = await apiClient.post<AuthReq>(API_ROUTES.IS_AUTH, {
        role: 20,
      });
      if (res.data.message != "Authorized access") {
        console.log("access expired");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      navigate("/login", { replace: true });
      console.error("Is auth error :", error);
    }
  };

  const checkActiveUser = async () => {
    updateContextValues(setAuth, auth);
    try {
      const res = await apiClient.post<AuthReq>(API_ROUTES.IS_AUTH, {
        role: 50,
      });

      if (res.data.message === "Authorized access") {
        setActiveUser(true);
      } else setActiveUser(false);
    } catch (error) {
      console.error("Is auth error :", error);
    }
  };

  useEffect(() => {
    if (auth.access !== null || localStorage.getItem("refresh token")) {
      checkAuth();
      checkActiveUser();
    } else navigate("/login", { replace: true });
  }, []);

  type parking = {
    id: number;

    name: string;

    schema: string;

    created_by: number;

    created_at: string;
  };

  const getAllParking = async () => {
    setDataLoading(true);
    updateContextValues(setAuth, auth);
    try {
      const res = await apiClient.post<parking[]>(API_ROUTES.GET_PARKING, {});

      console.log(res.data);
      setParkingLots(res.data);
      setDataLoading(false);
    } catch (error) {
      console.error("could not get the parking list :", error);
    }
  };

  useEffect(() => {
    getAllParking();
  }, []);

  const changeDirection = () => {
    setDirection((prev) => (prev === "Arrival" ? "Departure" : "Arrival"));
    setRowsPerColumn((prev) =>
      prev.map(
        (column) => reverseColumn(column) // Reverse only the selected column
      )
    );
  };

  const reverseColumn = (column: string) => {
    // Reverse the string of the column
    return column.split("").reverse().join("");
  };

  const selectParking = (parkingID: number, schema: string) => {
    setSelectedParking(parkingID);
    const columnsArray = schema.split("-");
    setColumns(columnsArray.length);
    setRowsPerColumn(columnsArray);
  };

  useEffect(() => {
    if (!dataLoading) {
      if (selectedParking) {
        const selectedParkingSchema = parkingLots.find(
          (parking) => parking.id === selectedParking
        )?.schema;

        if (selectedParkingSchema) {
          const columnsArray = selectedParkingSchema.split("-");
          setColumns(columnsArray.length);
          setRowsPerColumn(columnsArray);
        }
      }
    }
  }, [selectedParking, dataLoading]);

  const handleColumnChange = () => {
    setColumns((prev) => prev + 1); // Increment the columns by one
    setRowsPerColumn((prev) => [...prev, ""]); // Add an empty row set for the new column
  };

  const addNewSlot = (columnIndex: number) => {
    setRowsPerColumn((prev) => {
      const updatedRows = [...prev];
      // Check if the row was initially empty
      if (!updatedRows[columnIndex]) {
        handleColumnChange(); // Call handleColumnChange if the row was empty
      }
      updatedRows[columnIndex] += "s"; // Add a small, unoccupied slot by default
      return updatedRows;
    });
  };

  const renderGrid = () => {
    if (!fullPage) {
      // Show in one row for non-full-page mode
      return (
        <div className="overflow-x-auto custom-scrollbar py-5">
          <div className="flex space-x-4 min-w-max">
            {rowsPerColumn.flatMap((column) =>
              column.split("").map((row, rowIndex) => {
                const isOccupied = row === "S" || row === "B";
                const isBig = row === "B" || row === "b";

                return (
                  <div
                    key={rowIndex}
                    className={`flex items-center justify-center border rounded-xl border-borderColor font-semibold text-lg ${
                      isBig ? "w-40 h-20" : "w-20 h-20"
                    }`}
                    style={{
                      backgroundColor: isOccupied ? colorOccupied : colorFree,
                    }}
                  >
                    {isBig ? "18m" : "12m"}
                  </div>
                );
              })
            )}
          </div>
        </div>
      );
    }

    return Array.from({ length: columns }).map((_, colIndex) => {
      const rowsInput = rowsPerColumn[colIndex] || "";
      const rows = rowsInput.split("");

      return (
        <div key={colIndex} className="flex flex-col items-center space-y-2">
          <div
            className={`flex items-center ${
              editMode && activeUser ? "ml-4" : "ml-2"
            }`}
          >
            <h2 className="font-semibold text-xl mr-2">
              Column {colIndex + 1}
            </h2>
            {direction === "Arrival" ? (
              <span
                onClick={() => changeDirection()}
                className={`hover:cursor-pointer text-black`}
              >
                <svg
                  width="20"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
                </svg>
              </span>
            ) : (
              <span
                onClick={() => changeDirection()}
                className={`hover:cursor-pointer text-black`}
              >
                <svg
                  width="20"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                </svg>
              </span>
            )}

            {/* Remove Column Button (Only in Edit Mode) */}
            {editMode && activeUser && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to remove Column ${
                        colIndex + 1
                      }? This action cannot be reversed.`
                    )
                  ) {
                    setRowsPerColumn((prev) =>
                      prev.filter((_, index) => index !== colIndex)
                    );
                    setColumns((prev) => prev - 1); // Decrease the column count
                    // edit parking here
                  }
                }}
                className="p-1 text-sm rounded-full font-semibold hover:bg-gray-200 transition"
                title="Remove Column"
              >
                <svg
                  width="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M7 12L17 12"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></circle>{" "}
                  </g>
                </svg>
              </button>
            )}
          </div>
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
                    className={`flex items-center justify-center border rounded-xl border-borderColor font-semibold text-lg ${
                      isBig ? "h-40" : "h-20"
                    }`}
                    style={{
                      backgroundColor: isOccupied ? colorOccupied : colorFree,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      //edit parking here
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
                  {editMode && activeUser && (
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
                        className="bg-white bg-opacity-50 border border-borderColor text-black rounded-full p-1 text-xs hover:bg-gray-300 transition"
                        title="Remove Slot"
                      >
                        <svg
                          width="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M7 12L17 12"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></circle>{" "}
                          </g>
                        </svg>
                      </button>
                      {/* Change Slot Size Button */}
                      <button
                        onClick={() => {
                          const updatedRows = [...rows];
                          updatedRows[rowIndex] =
                            row === "S"
                              ? "B"
                              : row === "B"
                              ? "S"
                              : row === "s"
                              ? "b"
                              : "s"; // Toggle size
                          const updatedRowsPerColumn = [...rowsPerColumn];
                          updatedRowsPerColumn[colIndex] = updatedRows.join("");
                          setRowsPerColumn(updatedRowsPerColumn);
                        }}
                        className="bg-white bg-opacity-50 border border-borderColor text-black rounded-full p-1 text-xs hover:bg-gray-300 transition"
                        title="Change Slot Size"
                      >
                        {row === "S" || row === "s" ? (
                          <svg
                            width="15"
                            fill="#000000"
                            viewBox="0 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <title>resize</title>{" "}
                              <path d="M25.99 6.042l-0.004 9.735-3.732-3.733-4.454 4.455-2.665-2.665 4.454-4.454-3.384-3.383 9.785 0.045zM11.494 22.805l3.238 3.182-9.722 0.017 0.004-9.68 3.815 3.815 4.925-4.924 2.665 2.665-4.925 4.925z"></path>{" "}
                            </g>
                          </svg>
                        ) : (
                          <svg
                            width="15"
                            fill="#000000"
                            viewBox="0 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <title>resize1</title>{" "}
                              <path d="M27.407 7.882l-2.665-2.665-4.925 4.925-3.815-3.815-0.004 9.68 9.723-0.017-3.238-3.183 4.924-4.925zM8.577 20.383l-4.453 4.453 2.665 2.666 4.453-4.455 3.732 3.732 0.004-9.734-9.784-0.045 3.383 3.383z"></path>{" "}
                            </g>
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {editMode && activeUser && (
              <button
                onClick={() => addNewSlot(colIndex)}
                className={`flex items-center justify-center border rounded-xl border-borderColor h-20 opacity-50 hover:opacity-80 transition`}
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
    <div
      className={`bg-secondaryColor bg-opacity-80 flex flex-col border border-borderColor shadow-md rounded-3xl p-6 overflow-hidden ${
        fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold text-primaryColor">
          Parking Status
        </h2>
        {/* Edit Button */}
        {fullPage && (
          <div className="flex items-center space-x-4">
            {activeUser && (
              <button
                onClick={async () => {
                  if (editMode && activeUser) {
                    const nonEmptyColumns = rowsPerColumn.filter(
                      (column) => column.trim() !== ""
                    );
                    setRowsPerColumn([...nonEmptyColumns]); // Create a new array to remove empty columns from memory
                    setColumns(nonEmptyColumns.length); // Update the columns count
                    let newDepotName = parkingLots.find(
                      (parking) => parking.id == selectedParking
                    )?.name;
                    console.log(
                      "cls2++++++++++++++++++++++++++" + rowsPerColumn
                    );
                    console.log(
                      "cls3++++++++++++++++++++++++" + rowsPerColumn.join("-")
                    );
                    updateContextValues(setAuth, auth);
                    try {
                      const res = await apiClient.post<parking>(
                        API_ROUTES.EDIT_PARKING,
                        {
                          newName: newDepotName,
                          newSchema: nonEmptyColumns.join("-"),
                          parking_id: selectedParking,
                        }
                      );
                      console.log(res.data);
                      getAllParking();
                    } catch (error) {
                      console.error("could not get the users list :", error);
                    }
                  } else {
                    handleColumnChange(); // Add a new column only when entering edit mode
                  }
                  if (addingDepot) setAddingDepot(false);
                  setEditMode(!editMode); // Toggle edit mode
                }}
                className={`p-2 rounded-lg border font-semibold transition ${
                  editMode && activeUser
                    ? "bg-primaryColor text-white border-borderColor"
                    : "bg-componentsColor text-black border-borderColor hover:bg-primaryColor hover:text-white"
                }`}
              >
                {editMode && activeUser ? "Save" : "Edit"}
              </button>
            )}
          </div>
        )}
      </div>
      {fullPage && (
        <div className="flex overflow-x-auto space-x-4 py-5">
          {parkingLots.map((parking, index) => (
            <div
              key={parking.name}
              className="relative flex items-center space-x-1"
            >
              {/* Depot Selection Button */}
              <button
                onClick={() => selectParking(parking.id, parking.schema)}
                className={`p-2 my-2 rounded-full font-semibold whitespace-nowrap transition ${
                  parking.id === selectedParking
                    ? "bg-primaryColor text-white"
                    : "bg-black text-gray-100 hover:bg-primaryColor hover:text-white"
                }`}
              >
                {parking.name}
              </button>

              {/* Edit Mode Buttons */}
              {editMode && activeUser && (
                <>
                  {editingDepot === index ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editingDepotName}
                        onChange={(e) => setEditingDepotName(e.target.value)}
                        className="px-2 py-1 border border-borderColor rounded-md text-black focus:outline-none focus:border-primaryColor"
                      />
                      <button
                        onClick={() => {
                          const updatedParkingLots = [...parkingLots];
                          updatedParkingLots[index].name =
                            editingDepotName.trim();
                          setParkingLots(updatedParkingLots);
                          setEditingDepot(null); // Exit editing mode
                          setEditingDepotName(""); // Reset input field
                          // edit name here
                        }}
                        className="px-3 py-1 rounded-full font-semibold whitespace-nowrap border border-borderColor bg-white text-black hover:bg-primaryColor hover:text-white transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingDepot(null);
                          setEditingDepotName(""); // Reset input when canceled
                        }}
                        className="px-2 py-1 rounded-full font-semibold text-red-600 hover:text-red-800 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingDepot(index); // Enable editing mode for this depot
                          setEditingDepotName(parking.name); // Pre-fill the current name
                        }}
                        className="px-1 py-1 text-sm rounded-full font-semibold text-black hover:bg-gray-200 transition"
                        title="Edit Name"
                      >
                        <svg
                          fill="#000000"
                          height="15px"
                          width="15px"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 306.637 306.637"
                        >
                          <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896 l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"></path>
                          <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095 L265.13,75.602L231.035,41.507z"></path>
                        </svg>
                      </button>
                      {/* Remove Button */}
                      <button
                        onClick={async () => {
                          if (
                            window.confirm(
                              `Are you sure you want to remove "${parking.name}"? This action can not be reversed`
                            )
                          ) {
                            console.log("parking to delete is: " + parking.id);
                            // delete parking here
                            updateContextValues(setAuth, auth);
                            try {
                              const res = await apiClient.post<resMsg>(
                                API_ROUTES.DELETE_PARKING,
                                { parking_id: parking.id }
                              );
                              console.log(res.data);
                            } catch (error) {
                              console.error(
                                "could not delete the parking:",
                                error
                              );
                            }
                            setParkingLots(
                              parkingLots.filter((_, i) => i !== index)
                            );
                            setSelectedParking(
                              parking.id > 1
                                ? parking.id - 1
                                : parkingLots[parkingLots.length - 1].id
                            );
                          }
                        }}
                        className="px-1 py-1 text-sm rounded-full font-semibold text-red-600 hover:bg-gray-200 transition"
                        title="Remove Depot"
                      >
                        <svg
                          width="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M7 12L17 12"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></circle>{" "}
                          </g>
                        </svg>
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Add New Depot Button */}
          {editMode && activeUser && (
            <button
              onClick={async () => {
                const newDepotName = `Depot ${parkingLots.length + 1}`;
                updateContextValues(setAuth, auth);
                try {
                  const res = await apiClient.post<parking>(
                    API_ROUTES.CREATE_PARKING,
                    { name: newDepotName, schema: "" }
                  );
                  console.log(res.data);
                  getAllParking();
                  selectParking(res.data.id, res.data.schema);
                } catch (error) {
                  console.error("could not get the users list :", error);
                }
                //create new parking
              }}
              className="px-2 my-2 rounded-full font-semibold whitespace-nowrap border border-borderColor bg-componentsColor text-black hover:bg-primaryColor hover:text-white transition"
            >
              + Add Depot
            </button>
          )}
        </div>
      )}
      {/* Parking Grid */}
      <div
        className="overflow-x-auto custom-scrollbar" // Enables horizontal scrolling
      >
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${Math.min(
              columns,
              fullPage ? 8 : 1
            )}, minmax(80px, 1fr))`, // Limit to max 8 columns
          }}
        >
          {renderGrid()}
        </div>
      </div>
    </div>
  );
};

export default ParkingStatus;

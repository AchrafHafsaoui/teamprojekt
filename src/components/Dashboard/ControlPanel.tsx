import React, { useState } from "react";
import { Link } from "react-router-dom";

const generateUsername = () => `user_${Math.floor(1000 + Math.random() * 9000)}`;
const generatePassword = () =>
  Math.random().toString(36).substring(2, 10) + "!";

const ControlPanel: React.FC = () => {
  const sampleLoginLogs = [
    { user: "John Doe", action: "Login", timestamp: "2024-11-12 09:30" },
    { user: "Jane Smith", action: "Logout", timestamp: "2024-11-12 10:15" },
    { user: "Chris Johnson", action: "Login", timestamp: "2024-11-12 10:45" },
    { user: "Anna Müller", action: "Login", timestamp: "2024-11-12 11:00" },
    { user: "Lukas Schmidt", action: "Logout", timestamp: "2024-11-12 11:20" },
    { user: "Sophia Wagner", action: "Login", timestamp: "2024-11-12 11:45" },
    { user: "Karl Becker", action: "Login", timestamp: "2024-11-12 12:15" },
    { user: "Emily Davis", action: "Logout", timestamp: "2024-11-12 12:30" },
    { user: "Maximilian Hoffmann", action: "Login", timestamp: "2024-11-12 12:45" },
    { user: "Laura Fischer", action: "Logout", timestamp: "2024-11-12 13:00" },
  ];

  const sampleEditLogs = [
    { user: "Jane Smith", page: "Fleet Status", action: "Changed Bus 23001 status", timestamp: "2024-11-12 11:00" },
    { user: "John Doe", page: "Parking Status", action: "Deleted Slot 1D (18m)", timestamp: "2024-11-12 11:15" },
    { user: "Chris Johnson", page: "Charging Schedule", action: "Added bus 19286 to charging queue", timestamp: "2024-11-12 11:30" },
    { user: "Anna Müller", page: "Fleet Status", action: "Changed bus 19286 charging point", timestamp: "2024-11-12 11:45" },
    { user: "Lukas Schmidt", page: "Parking Status", action: "Added Slot 4B (12m)", timestamp: "2024-11-12 12:00" },
    { user: "Sophia Wagner", page: "Charging Stations", action: "Deleted Station", timestamp: "2024-11-12 12:15" },
    { user: "Karl Becker", page: "Fleet Status", action: "Added Vehicle", timestamp: "2024-11-12 12:30" },
    { user: "Emily Davis", page: "Parking Status", action: "Changed size 5C (12m -> 18m)", timestamp: "2024-11-12 12:45" },
    { user: "Maximilian Hoffmann", page: "Charging Schedule", action: "Removed bus 23001 from charging queue", timestamp: "2024-11-12 13:00" },
    { user: "Laura Fischer", page: "Fleet Status", action: "Added new bus", timestamp: "2024-11-12 13:15" },
  ];

  const [members, setMembers] = useState([
    { id: 1, name: "John Doe", role: "Admin", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", role: "Active User", email: "jane.smith@example.com" },
    { id: 3, name: "Chris Johnson", role: "Passive User", email: "chris.johnson@example.com" },
    { id: 4, name: "Anna Müller", role: "Admin", email: "anna.mueller@example.de" },
    { id: 5, name: "Lukas Schmidt", role: "Active User", email: "lukas.schmidt@example.de" },
    { id: 6, name: "Sophia Wagner", role: "Passive User", email: "sophia.wagner@example.de" },
    { id: 7, name: "Karl Becker", role: "Active User", email: "karl.becker@example.de" },
    { id: 8, name: "Emily Davis", role: "Passive User", email: "emily.davis@example.com" },
    { id: 9, name: "Maximilian Hoffmann", role: "Admin", email: "maximilian.hoffmann@example.de" },
    { id: 10, name: "Laura Fischer", role: "Active User", email: "laura.fischer@example.de" },
  ]);

  const pageRoutes: { [key: string]: string } = {
    "Fleet Status": "/fleet-status",
    "Parking Status": "/parking",
    "Charging Schedule": "/charging-schedule",
    "Electricity Schedule": "/electricity-schedule",
    "Charging Stations": "/charging-stations",
  };

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleRoleChange = (id: number, newRole: string) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, role: newRole } : member
      )
    );
  };

  const handleGenerateCredentials = () => {
    setNewUsername(generateUsername());
    setNewPassword(generatePassword());
  };

  const handleAddNewUser = () => {
    setMembers((prevMembers) => [
      ...prevMembers,
      {
        id: prevMembers.length + 1,
        name: newUsername,
        role: "Passive User",
        email: `${newUsername}@example.com`,
      },
    ]);
    setIsPanelOpen(false);
  };

  return (
    <div className="flex flex-col overflow-hidden ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
        {/* Login/Logout Logs */}
        <div className="flex flex-col bg-gray-100 rounded-3xl shadow p-4">
          <h3 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-4 text-[#078ECD]">Login/Logout Logs</h3>
          <div className="overflow-y-auto custom-scrollbar">
            {sampleLoginLogs.map((log, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-3 border-b pb-2 text-gray-700"
              >
                <div>
                  <p className="font-semibold">{log.user}</p>
                  <p className="text-sm">{log.action}</p>
                </div>
                <p className="text-sm text-gray-500">{log.timestamp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Edits Logs */}
        <div className="flex flex-col bg-gray-100 rounded-3xl shadow p-4">
          <h3 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-4 text-[#078ECD]">Edit Logs</h3>
          <div className="overflow-y-auto custom-scrollbar">
            {sampleEditLogs.map((log, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center mb-3 border-b pb-2 text-gray-700"
                >
                  <div>
                    <p className="font-semibold">{log.user}</p>
                    <p className="text-sm">
                      {log.action} -{" "}
                      <Link
                        to={pageRoutes[log.page] || "/"}
                        className="text-[#078ECD] underline hover:text-[#066a97] transition"
                      >
                        {log.page}
                      </Link>
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{log.timestamp}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Member Management */}
        <div className="flex flex-col bg-gray-100 rounded-3xl shadow p-4 relative">
          <div className="flex justify-between items-center">
            <h3 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-4 text-[#078ECD]">
              Member Management
            </h3>
            <button
              onClick={() => setIsPanelOpen(true)}
              className="px-4 py-2 bg-[#078ECD] text-white font-semibold rounded-lg hover:bg-[#066a97] transition"
            >
              Add User
            </button>
          </div>
          <div className="overflow-y-auto custom-scrollbar">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center mb-3 border-b pb-2 text-gray-700"
              >
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#078ECD] bg-white"
                >
                  <option value="Admin">Admin</option>
                  <option value="Active User">Active User</option>
                  <option value="Passive User">Passive User</option>
                </select>
              </div>
            ))}
          </div>
          {/* New User Panel */}
          {isPanelOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-xl p-6 relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
                <h3 className="text-2xl font-bold mb-4 text-[#078ECD]">
                  Generate New User
                </h3>
                {/* Username and Password Display */}
                <div className="mb-4 mx-6">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Username:
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={newUsername}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-6 mx-6">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Password:
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={newPassword}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Generate Button */}
                <button
                  onClick={handleGenerateCredentials}
                  className="w-60 py-3 mx-6 rounded-full font-semibold bg-[#078ECD] text-white hover:bg-[#066a97] transition text-lg"
                >
                  Generate
                </button>
                {/* Add User Button */}
                <button
                  onClick={handleAddNewUser}
                  className="w-60 py-3 mx-6 rounded-full font-semibold bg-[#078ECD] text-white hover:bg-[#066a97] transition text-lg"
                >
                  Add User
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

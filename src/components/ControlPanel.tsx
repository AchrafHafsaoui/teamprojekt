import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import apiClient, { updateContextValues } from "../api/api";
import API_ROUTES from "../apiRoutes";

const generateUsername = () =>
  `user_${Math.floor(1000 + Math.random() * 9000)}@fenexity.com`;
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
    { user: "John Doe", action: "Login", timestamp: "2024-11-12 09:30" },
    { user: "Jane Smith", action: "Logout", timestamp: "2024-11-12 10:15" },
    { user: "Chris Johnson", action: "Login", timestamp: "2024-11-12 10:45" },
    { user: "Anna Müller", action: "Login", timestamp: "2024-11-12 11:00" },
    { user: "Lukas Schmidt", action: "Logout", timestamp: "2024-11-12 11:20" },
    { user: "Sophia Wagner", action: "Login", timestamp: "2024-11-12 11:45" },
    { user: "Karl Becker", action: "Login", timestamp: "2024-11-12 12:15" },
    { user: "Emily Davis", action: "Logout", timestamp: "2024-11-12 12:30" },
    { user: "John Doe", action: "Login", timestamp: "2024-11-12 09:30" },
    { user: "Jane Smith", action: "Logout", timestamp: "2024-11-12 10:15" },
    { user: "Chris Johnson", action: "Login", timestamp: "2024-11-12 10:45" },
    { user: "Anna Müller", action: "Login", timestamp: "2024-11-12 11:00" },
    { user: "Lukas Schmidt", action: "Logout", timestamp: "2024-11-12 11:20" },
    { user: "Sophia Wagner", action: "Login", timestamp: "2024-11-12 11:45" },
    { user: "Karl Becker", action: "Login", timestamp: "2024-11-12 12:15" },
    { user: "Emily Davis", action: "Logout", timestamp: "2024-11-12 12:30" },
    {
      user: "Maximilian Hoffmann",
      action: "Login",
      timestamp: "2024-11-12 12:45",
    },
    { user: "Laura Fischer", action: "Logout", timestamp: "2024-11-12 13:00" },
  ];

  type EditInfo = {
    detail: string;
  };

  type member = {
    id: number;
    username: string;
    email: string;
    role: number;
  };

  const [members, setMembers] = useState<member[] | undefined>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const getUsers = async () => {
    updateContextValues(setAuth, auth);
    try {
      const res = await apiClient.post<member[]>(API_ROUTES.GET_USERS, {});
      setMembers(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("could not get the users list :", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [changeEmail, setChangeEmail] = useState("");
  const [changeUserName, setChangeUserName] = useState("");
  const [changePwd, setChangePwd] = useState("");
  const [changeConfirmPwd, setChangeConfirmPwd] = useState("");
  const [oldPwd, setOldPwd] = useState("");

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
  const checkAdmin = async () => {
    updateContextValues(setAuth, auth);
    try {
      const res = await apiClient.post<AuthReq>(API_ROUTES.IS_AUTH, {
        role: 100,
      });
      console.log(res.data);
      if (res.data.message == "Authorized access") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Is auth error :", error);
    }
  };

  const checkAuth = async () => {
    updateContextValues(setAuth, auth);
    try {
      const res = await apiClient.post<AuthReq>(API_ROUTES.IS_AUTH, {
        role: 20,
      });
      if (res.data.message !== "Authorized access") {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      navigate("/login", { replace: true });
      console.error("Is auth error:", error);
    }
  };

  useEffect(() => {
    if (auth.access !== null || localStorage.getItem("refresh token")) {
      checkAuth();
      checkAdmin();
    } else navigate("/login", { replace: true });
  }, []);

  const handleRoleChange = async (member: member, newRole: string) => {
    const userResponse = window.confirm(
      "are u sure u want to change the role of user " +
        member.username +
        " from " +
        (member.role === 100
          ? "admin"
          : member.role === 50
          ? "active user"
          : "passive user") +
        " to " +
        (newRole === "100"
          ? "admin"
          : newRole === "50"
          ? "active user"
          : "passive user")
    );
    if (userResponse) {
      try {
        const res = await apiClient.post<EditInfo>(
          API_ROUTES.UPDATE_USER_ROLE,
          {
            member_id: member.id,
            new_role: newRole,
          }
        );
        alert(res.data.detail);
        getUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleGenerateCredentials = () => {
    setNewUsername(generateUsername());
    setNewPassword(generatePassword());
  };

  type AddUserRes = {
    id: number;
    email: string;
    role: number;
  };

  const handleAddNewUser = async () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(newUsername)) {
      updateContextValues(setAuth, auth);
      try {
        await navigator.clipboard.writeText(
          "username: " + newUsername + " / password: " + newPassword
        );
        alert("Generated user is copied to your clipboard!!");
      } catch (err) {
        console.error("Failed to copy text:", err);
        alert("Failed to copy text to clipboard");
      }
      try {
        const res = await apiClient.post<AddUserRes>(API_ROUTES.ADD_USER, {
          username: newUsername.split("@")[0],
          email: newUsername,
          password: newPassword,
        });
        alert(res.data.email + " was successfully added");
        getUsers();
      } catch (error) {
        alert("an error occured when adding the user");
      }
      setIsPanelOpen(false);
    } else {
      setNewUsername("");
      alert("username must be an email");
    }
  };

  const handleEditInfo = async () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (oldPwd == "") {
      alert("please provide your old password");
    }
    if (changeEmail !== "" && !re.test(changeEmail)) {
      alert("the new Email should have email format!");
    }
    if (
      changePwd !== "" &&
      changeConfirmPwd !== "" &&
      changePwd !== changeConfirmPwd
    ) {
      alert("the confirmation password is different from the new password");
    } else if (
      oldPwd !== "" &&
      ((re.test(changeEmail) && changeEmail !== "") ||
        changeUserName !== "" ||
        (changePwd !== "" &&
          changeConfirmPwd !== "" &&
          changePwd === changeConfirmPwd))
    ) {
      try {
        const res = await apiClient.post<EditInfo>(
          API_ROUTES.UPDATE_USER_INFO,
          {
            newEmail: changeEmail,
            newUserName: changeUserName,
            newPwd: changePwd,
            oldPwd: oldPwd,
          }
        );
        alert(res.data.detail);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
        <div className="flex flex-col bg-secondaryColor rounded-3xl shadow p-4 overflow-y-auto">
          <h3 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-4 text-primaryColor">
            Edit Personal info
          </h3>
          <div className="overflow-y-scroll custom-scrollbar p-4">
            <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  enter your new email
                </label>
                <input
                  type="email"
                  onFocus={(e) => e.target.removeAttribute("readonly")}
                  readOnly
                  value={changeEmail}
                  onChange={(e) => {
                    setChangeEmail(e.target.value);
                  }}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  enter your new user name
                </label>
                <input
                  type="text"
                  onFocus={(e) => e.target.removeAttribute("readonly")}
                  readOnly
                  value={changeUserName}
                  onChange={(e) => {
                    setChangeUserName(e.target.value);
                  }}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  enter your new password
                </label>
                <input
                  type="password"
                  onFocus={(e) => e.target.removeAttribute("readonly")}
                  readOnly
                  value={changePwd}
                  onChange={(e) => setChangePwd(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  confirm your new password
                </label>
                <input
                  type="password"
                  onFocus={(e) => e.target.removeAttribute("readonly")}
                  readOnly
                  value={changeConfirmPwd}
                  onChange={(e) => setChangeConfirmPwd(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  enter your old password (important!)
                </label>
                <input
                  type="password"
                  onFocus={(e) => e.target.removeAttribute("readonly")}
                  readOnly
                  value={oldPwd}
                  onChange={(e) => setOldPwd(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleEditInfo}
                  type="submit"
                  className="w-full py-3 px-4 bg-primaryColor text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all duration-300 transform hover:scale-105"
                >
                  apply changes
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Login/Logout Logs */}
        {isAdmin && (
          <>
            <div className="flex flex-col bg-secondaryColor rounded-3xl shadow p-4 overflow-y-auto">
              <h3
                onClick={getUsers}
                className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-4 text-primaryColor"
              >
                Login/Logout Logs
              </h3>
              <div className="overflow-y-scroll custom-scrollbar">
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

            {/* Member Management */}
            <div className="flex flex-col bg-secondaryColor rounded-3xl shadow p-4 overflow-y-auto">
              <div className="flex justify-between items-center">
                <h3 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-4 text-primaryColor">
                  Member Management
                </h3>
                <button
                  onClick={() => setIsPanelOpen(true)}
                  className="bg-secondaryColor border border-borderColor text-black px-4 py-2 rounded-lg hover:bg-primaryColor hover:text-white transition-all font-semibold"
                >
                  Add User
                </button>
              </div>
              <div className=" overflow-y-scroll custom-scrollbar p-0">
                {members?.map((member) => (
                  <div
                    key={member.id}
                    className="flex justify-between items-center mb-3 border-b pb-2 text-gray-700"
                  >
                    <div>
                      <p className="font-semibold">{member.username}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                    <select
                      value={member.role}
                      onChange={(e) => handleRoleChange(member, e.target.value)}
                      className="px-2 py-1 border border-borderColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor bg-secondaryColor"
                    >
                      <option value="100">Admin</option>
                      <option value="50">Active User</option>
                      <option value="20">Passive User</option>
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
                    <h3 className="text-2xl font-bold mb-4 text-primaryColor">
                      Generate New User
                    </h3>
                    {/* Username and Password Display */}
                    <div className="mb-4 mx-6">
                      <label className="block text-lg font-medium text-gray-700 mb-2">
                        User Email:
                      </label>
                      <input
                        placeholder="email"
                        type="text"
                        onChange={(e) => setNewUsername(e.target.value)}
                        value={newUsername}
                        className="w-full px-4 py-2 border border-borderColor rounded-md"
                      />
                    </div>
                    <div className="mb-6 mx-6">
                      <label className="block text-lg font-medium text-gray-700 mb-2">
                        Password:
                      </label>
                      <input
                        placeholder="password"
                        type="text"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        className="w-full px-4 py-2 border border-borderColor rounded-md"
                      />
                    </div>
                    {/* Generate Button */}
                    <button
                      onClick={handleGenerateCredentials}
                      className="w-60 py-3 mx-6 rounded-lg font-semibold border border-borderColor bg-primaryColor text-white text-lg"
                    >
                      Generate
                    </button>
                    {/* Add User Button */}
                    <button
                      onClick={handleAddNewUser}
                      className="w-60 py-3 mx-6 rounded-lg font-semibold border border-borderColor bg-primaryColor text-white text-lg"
                    >
                      Copy and add User
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;

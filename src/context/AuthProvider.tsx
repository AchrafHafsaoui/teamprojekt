import axios, { AxiosResponse } from "axios";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import API_ROUTES from "../apiRoutes";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthState {
  access: string | null;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true); // Track loading state
  const [auth, setAuth] = useState<AuthState>({
    access: null,
  });

  interface Tokens {
    access: string;
  }

  useEffect(() => {
    const getNewAccessToken = async () => {
      try {
        const refresh = localStorage.getItem("refresh token");
        if (!refresh) throw new Error("No refresh token found.");

        const response: AxiosResponse<Tokens> = await axios.post(
          API_ROUTES.REFRESH_TOKEN,
          {
            refresh,
          }
        );

        const { access } = response.data;

        console.log("authpro        ++++++++++     " + access);

        // Update tokens in storage
        setAuth({ access: access });
        setLoading(false);
        return access;
      } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error;
      }
    };

    getNewAccessToken();
  }, []);

  //if (loading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

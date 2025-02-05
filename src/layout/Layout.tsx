import { useEffect } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    console.log("checking role");
  }, []);

  return <div>{children}</div>;
};

export default Layout;

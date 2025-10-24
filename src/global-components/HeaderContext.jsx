import { createContext, useState } from "react";
import axios from "axios";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [headerData, setHeaderData] = useState("");

  const headers = {
    "Content-Type": "application/json",
  };

  const getHeaderData = async (roleId) => {
    try {
      const response = await axios.get(`https://api.quotient-ai.com/api/users/user-data?roleId=${roleId}`, { headers, withCredentials: true });
      const data = response.data;
      setHeaderData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return <HeaderContext.Provider value={{ headerData, getHeaderData }}>{children}</HeaderContext.Provider>;
};

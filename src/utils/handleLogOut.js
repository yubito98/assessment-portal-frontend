import axios from "axios";

export const handleLogout = async (roleId) => {
  try {
    const response = await axios.post(
      "https://api.quotient-ai.com/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    if (roleId === 1) {
      window.location.href = "/"
    } else if(roleId === 1) {
      window.location.href = "/candidate/login"
    }
  } catch (error) {
    console.log(error);
  }
};

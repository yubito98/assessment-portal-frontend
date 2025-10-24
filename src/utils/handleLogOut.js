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
    const data = response.data;
    if (data.role == 1) {
      window.location.href = "/"
    } else {
      window.location.href = "/candidate/login"
    }
  } catch (error) {
    console.log(error);
  }
};

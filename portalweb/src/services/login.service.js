import axios from "axios";
import API_URL from "../constants";

const login = async (email, password) => {
  //Post request to the API to login with Basic Auth and get the token
  const response = await axios.post(
    `${API_URL}/login`,
    {},
    {
      auth: {
        username: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );

  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;

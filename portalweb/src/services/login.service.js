import axiosInstance from "../axios";

const login = async (email, password) => {
  const response = await axiosInstance.post(
    `/login`,
    {},
    {
      auth: {
        username: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
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

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

const register = async (name, email, password, img_url) => {
  const response = await axiosInstance.post(
    `/register`,
    {
      name: name,
      email: email,
      password: password,
      img_url: img_url,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  if(response.data.token){
    localStorage.setItem("user", JSON.stringify(response.data.token));
  }
  return response.data.token;
}

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
  register,
};

export default authService;

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
    localStorage.setItem("user", JSON.stringify({token: response.data.token, logged_in: response.data.logged_in}));
    localStorage.setItem("cosa", JSON.stringify(response.data.current_user));
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
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
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

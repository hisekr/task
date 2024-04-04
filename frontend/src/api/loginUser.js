import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post("http://localhost:3000/auth/login", {
      email: email,
      password: password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userEmail", email);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

import axios from "axios";

export const forgotPassword = async (email, password) => {
  try {
    const res = await axios.put("http://localhost:3000/forgotPassword", {
      email: email,
      password: password,
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

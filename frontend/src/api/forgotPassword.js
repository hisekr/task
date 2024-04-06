import axios from "axios";

export const forgotPassword = async (email, password) => {
  try {
    const res = await axios.put(
      "https://task-backend-eguy.onrender.com/forgotPassword",
      {
        email: email,
        password: password,
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

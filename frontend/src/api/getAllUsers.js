import axios from "axios";

export const getAllUsers = async (email) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `https://task-backend-eguy.onrender.com/users/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

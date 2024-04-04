import axios from "axios";

export const getAllUsers = async (email) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`http://localhost:3000/users/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

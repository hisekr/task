import axios from "axios";

export const addUser = async (name, email, phone, password, dob, address) => {
  try {
    const res = await axios.post(
      "https://task-backend-eguy.onrender.com/auth/signup",
      {
        name: name,
        email: email,
        phone: phone,
        password: password,
        dob: dob,
        address: address,
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

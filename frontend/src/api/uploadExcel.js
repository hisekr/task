import axios from "axios";

export const handleUploadExcel = async (formData) => {
  try {
    const res = await axios.post(
      "https://task-backend-eguy.onrender.com/upload",
      formData
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

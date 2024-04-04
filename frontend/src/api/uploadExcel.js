import axios from "axios";

export const handleUploadExcel = async (formData) => {
  try {
    const res = await axios.post("http://localhost:3000/upload", formData);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

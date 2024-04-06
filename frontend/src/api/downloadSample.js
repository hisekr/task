import axios from "axios";

export const downloadSample = async () => {
  try {
    const res = await axios.get(
      `https://task-backend-eguy.onrender.com/sample`,
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([res.data], { type: res.headers["content-type"] });

    const tempLink = document.createElement("a");
    tempLink.href = window.URL.createObjectURL(blob);

    tempLink.setAttribute("download", "sample.xlsx");

    document.body.appendChild(tempLink);
    tempLink.click();

    document.body.removeChild(tempLink);
  } catch (error) {
    throw error;
  }
};

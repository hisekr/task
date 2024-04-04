import axios from "axios";

export const getExcelSheet = async (email) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/downloadExcel/${email}`,
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([res.data], { type: res.headers["content-type"] });

    const tempLink = document.createElement("a");
    tempLink.href = window.URL.createObjectURL(blob);

    tempLink.setAttribute("download", "output.xlsx");

    document.body.appendChild(tempLink);
    tempLink.click();

    document.body.removeChild(tempLink);
  } catch (error) {
    throw error;
  }
};

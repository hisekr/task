import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers } from "../api/getAllUsers";
import { getExcelSheet } from "../api/getExcelSheet";
import { downloadSample } from "../api/downloadSample";
import { handleUploadExcel } from "../api/uploadExcel";
import { styled } from "@mui/material/styles";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import Toast from "./Toast";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const User = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [data, setData] = useState(null);
  const [headingValues, setHeadingValues] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  //=========================================================================================

  const fetchUserData = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      if (userEmail !== email) {
        setToastMessage("Login in First to Continue");
        setOpenSnackbar(true);
        setLoading(false);
        setErrors(true);
      } else {
        const res = await getAllUsers(email);

        setData(res.user);

        console.log(res.user);
        setHeadingValues(Object.keys(res.user[0]));

        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      setLoading(false);
      setErrors(true);
      setToastMessage(error.response.data.error);
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  //==========================================================================================

  const handleDownload = async () => {
    try {
      await getExcelSheet(email);
      setToastMessage("Downloaded SuccessFully");
      setOpenSnackbar(true);
    } catch (error) {
      setToastMessage(error.response.data.error || "Error Downloading File");
      setOpenSnackbar(true);
      console.log(error);
    }
  };

  //==============================================================================================

  const handleSampleDownload = async () => {
    try {
      await downloadSample();
      setToastMessage("Downloaded SuccessFully");
      setOpenSnackbar(true);
    } catch (error) {
      setToastMessage(error.response.data.error || "Error Downloading Sample");
      setOpenSnackbar(true);
      console.log(error);
    }
  };

  //==============================================================================================

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //==============================================================================================

  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]);

  //==============================================================================================

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        setToastMessage("No Excel File Selected");
        setOpenSnackbar(true);
      } else if (!selectedFile.name.endsWith(".xlsx")) {
        setToastMessage("Please select an Excel file (.xlsx)");
        setOpenSnackbar(true);
      } else {
        const formData = new FormData();
        formData.append("selectedFile", selectedFile);
        console.log("line1");
        const res = await handleUploadExcel(formData);
        console.log("line2");

        console.log("res", res);
        setToastMessage("Uploaded Successfully");
        setOpenSnackbar(true);

        fetchUserData();
      }
    } catch (error) {
      setToastMessage(error.response.data.error);
      setOpenSnackbar(true);
      console.log(error);
    }
  };

  //==============================================================================================

  const handleLogout = () => {
    setToastMessage("Logging Out");
    setOpenSnackbar(true);
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleGoBack = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    navigate("/");
  };

  //==============================================================================================

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  //=============================================================================================

  return (
    <>
      <Toast
        open={openSnackbar}
        displayMessage={toastMessage}
        handleClose={() => setOpenSnackbar(false)}
      />

      {loading ? (
        <Box
          style={{ margin: "0 0 0 1rem", fontSize: "2rem", fontWeight: "800" }}
        >
          Loading...
        </Box>
      ) : errors ? (
        <Box
          style={{
            margin: "0 1rem",
            fontSize: "2rem",
            fontWeight: "800",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Error...
          <Button
            style={{ backgroundColor: "lightblue", color: "black" }}
            onClick={() => handleGoBack("/")}
          >
            Go Back
          </Button>
        </Box>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          gap={"10px"}
          mx={"1rem"}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
            <Box
              alignSelf={"flex-end"}
              bgcolor={"lightblue"}
              borderRadius={"10px"}
            >
              <Button sx={{ color: "black" }} onClick={() => handleLogout()}>
                Logout
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead style={{ backgroundColor: "lightgrey" }}>
                  <TableRow>
                    {headingValues.map((item, index) => {
                      if (item !== "password") {
                        item = item.toUpperCase();
                        return <TableCell key={index}>{item}</TableCell>;
                      }
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.dob}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                        <TableCell>{item.updatedAt}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box display={"flex"} gap={"1rem"} alignSelf={"flex-end"}>
            <Fab color="primary" aria-label="add" onClick={handleDownload}>
              <DownloadIcon />
            </Fab>

            <Box display={"flex"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <label htmlFor="file-upload">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Button>
                </label>
                <Button onClick={handleSampleDownload} size="small">
                  Download Sample
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default User;

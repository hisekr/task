import { Box, FormControl, Input, InputLabel, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/forgotPassword";
import Toast from "./Toast";
import CryptoJS from "crypto-js";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [finalPassword, setFinalPassword] = useState("");

  //================================================================

  const handleEncryption = (value, key) => {
    const result = CryptoJS.AES.encrypt(value, key).toString();
    return result;
  };

  //================================================================

  const handlePassword = async (value, key) => {
    try {
      const encryptedPassword = await handleEncryption(value, key);
      setFinalPassword(encryptedPassword);

      await forgotPassword(userEmail, encryptedPassword);

      // console.log("final", encryptedPassword);
      setToastMessage("Password Changed Successfully");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setToastMessage(error.response.data.error || "Error Changing Password");
      setOpenSnackbar(true);
      console.log(error);
    }
  };

  //========================================================================

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (userPassword !== confirmPassword) {
        setToastMessage("Passwords do not match");
        setOpenSnackbar(true);
      } else {
        await handlePassword(userPassword, import.meta.env.VITE_SECRET_KEY);
      }
    } catch (error) {
      setToastMessage(error.response.data.error || "Error Changing Password");
      setOpenSnackbar(true);
      console.log(error);
    }
  };

  //========================================================
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        bgcolor="whitesmoke"
        alignItems="center"
        border="1px solid black"
        mx="10rem"
        my="10rem"
        py="2rem"
        borderRadius="5px"
      >
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="10px">
            <FormControl>
              <InputLabel>Email</InputLabel>
              <Input
                placeholder="Enter Email"
                type="email"
                required
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
              <Toast
                open={openSnackbar}
                displayMessage={toastMessage}
                handleClose={() => setOpenSnackbar(false)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Enter New Password</InputLabel>
              <Input
                placeholder="Enter New Password"
                type="password"
                required
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Confirm New Password</InputLabel>
              <Input
                placeholder="Enter New Password"
                type="password"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </FormControl>
            <Button type="submit" sx={{ bgcolor: "#90caf9", color: "black" }}>
              Submit
            </Button>
            <Button
              sx={{ bgcolor: "#90caf9", color: "black" }}
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ForgotPassword;

import { Box, FormControl, Input, InputLabel, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/loginUser";
import Toast from "./Toast";
import CryptoJS from "crypto-js";

const Login = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  //================================================================

  const handleEncryption = (value, key) => {
    return CryptoJS.AES.encrypt(value, key).toString();
  };

  //================================================================

  const handlePassword = (value, key) => {
    const encryptedPassword = handleEncryption(value, key);
    setUserPassword(encryptedPassword);
  };

  //=============================================================

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const res = await loginUser(userEmail, userPassword);

      setOpenSnackbar(true);

      const emailUser = res.data.userEmail;

      setToastMessage("Logged In SuccessFully");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate(`/user/${emailUser}`);
      }, 1000);
    } catch (error) {
      setToastMessage("Login Error");
      setOpenSnackbar(true);
      console.log(error);
    }
  };

  //==============================================================
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
              <InputLabel>Password</InputLabel>
              <Input
                placeholder="Enter Password"
                type="password"
                required
                onChange={(e) => {
                  handlePassword(
                    e.target.value,
                    import.meta.env.VITE_SECRET_KEY
                  );
                }}
              />
            </FormControl>
            <Button type="submit" sx={{ bgcolor: "#90caf9", color: "black" }}>
              Submit
            </Button>

            <Button
              sx={{ bgcolor: "#e3f2fd" }}
              onClick={() => navigate(`/signup`)}
            >
              New User
            </Button>
            <Button
              sx={{ bgcolor: "#e3f2fd" }}
              onClick={() => navigate(`/forgotPassword`)}
            >
              Forgot Password
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Login;

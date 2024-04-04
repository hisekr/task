import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/addUser";
import Toast from "./Toast";
import CryptoJS from "crypto-js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  var givenDate = dob;
  var currentDate = new Date();
  givenDate = new Date(givenDate);

  const validateDate = (givenDate, currentDate) => {
    if (givenDate > currentDate) {
      setToastMessage("Invalid Date");
      setOpenSnackbar(true);
      return false;
    } else {
      return true;
    }
  };
  //=================================================================

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //=================================================================

  const validateValues = (email, phoneNumber) => {
    const isValidEmail = email.endsWith(".com") && email.includes("@");
    const isValidPhoneNumber = phoneNumber.length === 10;

    if (!isValidEmail && !isValidPhoneNumber) {
      setToastMessage("Wrong Email Format and Invalid Phone Number");
    } else if (!isValidEmail) {
      setToastMessage("Wrong Email Format");
    } else if (!isValidPhoneNumber) {
      setToastMessage("Invalid Phone Number");
    } else {
      return true;
    }

    setOpenSnackbar(true);
  };

  //================================================================

  const handleEncryption = (value, key) => {
    return CryptoJS.AES.encrypt(value, key).toString();
  };

  //================================================================

  const handlePassword = (value, key) => {
    const encryptedPassword = handleEncryption(value, key);
    setUserPassword(encryptedPassword);
  };

  //===============================================================
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (userPassword !== confirmPassword) {
        setToastMessage("Password does not match");
        setOpenSnackbar(true);
        return;
      }

      handlePassword(userPassword, import.meta.env.VITE_SECRET_KEY);

      if (
        validateValues(userEmail, phoneNumber) &&
        validateDate(givenDate, currentDate)
      ) {
        await addUser(
          userName,
          userEmail,
          phoneNumber,
          userPassword,
          dob,
          address
        );
        setToastMessage("User Created");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate(`/`);
        }, 1000);
      }
    } catch (error) {
      setToastMessage(error.response.data.error || "An error occurred");
      setOpenSnackbar(true);
      console.log(error);
    }
  };

  //==================================================================

  return (
    <>
      <Toast
        open={openSnackbar}
        displayMessage={toastMessage}
        handleClose={() => setOpenSnackbar(false)}
      />
      <Box
        display="flex"
        justifyContent="center"
        bgcolor="whitesmoke"
        alignItems="center"
        border="1px solid black"
        mx="10rem"
        my="5rem"
        py="2rem"
        borderRadius="5px"
      >
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="10px">
            <FormControl>
              <InputLabel>Enter Name</InputLabel>
              <Input
                placeholder="Enter Name"
                type="text"
                required
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Enter Email</InputLabel>
              <Input
                placeholder="Enter Email"
                type="email"
                required
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Enter Phone Number</InputLabel>
              <Input
                placeholder="Enter Phone Number"
                type="number"
                required
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              {/* <InputLabel>Date Of Birth</InputLabel> */}
              <Input
                placeholder="Enter DOB Number"
                type="date"
                required
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Address</InputLabel>
              <Input
                placeholder="Enter Phone Number"
                type="text"
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Enter Password</InputLabel>
              <Input
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel>Confirm Password</InputLabel>
              <Input
                placeholder="Enter Password"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" sx={{ bgcolor: "#90caf9", color: "black" }}>
              Submit
            </Button>
            <Button
              sx={{ bgcolor: "#81c784", color: "white" }}
              onClick={() => navigate(`/`)}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Signup;

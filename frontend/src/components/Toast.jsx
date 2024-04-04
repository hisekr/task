import React from "react";
import { Snackbar } from "@mui/material";

const Toast = ({ open, displayMessage, handleClose }) => {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={displayMessage}
      />
    </>
  );
};

export default Toast;

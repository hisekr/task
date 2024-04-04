import React from "react";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        fontSize="2rem"
        bgcolor="rgb(141, 166, 196)"
        color={"black"}
        py={"2rem"}
        my={"10px"}
        mx={"1rem"}
        borderRadius={"10px"}
        fontWeight={"800"}
      >
        Mountblue
      </Box>
    </>
  );
};

export default Header;

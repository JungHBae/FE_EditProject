import { Container } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const MotionContainer = motion(Container);
export const ProfilePage = () => {
  return (
    <MotionContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    ></MotionContainer>
  );
};

import React from "react";

export const ErrorMessage = ({ message }) => {
  if (message) {
    return <span className="error-message">{message}</span>;
  }
  return null;
};

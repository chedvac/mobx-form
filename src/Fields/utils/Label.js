import React from "react";

export const Label = props => {
  const { label, id, isRequired, customLabel } = props;
  if (label) {
    return (
      <label
        htmlFor={id}
        className={"label-field " + (isRequired ? "required" : "")}
      >
        {label}
      </label>
    );
  }
  if (customLabel) {
    return <props.customLabel />;
  }
  return null;
};

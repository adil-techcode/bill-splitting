import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";

const LetterAvatars = React.memo(({ name }) => {
  const [fname, setfname] = useState("");

  const firstLetter = () => {
    const letter = name.slice(0, 1).toUpperCase();
    setfname(letter);
  };

  useEffect(() => {
    firstLetter();
  }, [name]);

  const getRandomColor = () => {
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
      "#ffeb3b",
      "#ffc107",
      "#ff9800",
      "#ff5722",
      "#795548",
      "#9e9e9e",
      "#607d8b",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <Tooltip title={name}>
      <Avatar sx={{ bgcolor: getRandomColor(), width: "35px", height: "35px" }}>
        {" "}
        {fname}{" "}
      </Avatar>
    </Tooltip>
  );
});

export default LetterAvatars;

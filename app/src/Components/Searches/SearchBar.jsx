import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ placeholder, width, onClick, onChange }) {
  return (
    <Paper sx={{ p: "0px 0px", display: "flex", width: width }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        onChange={onChange}
      />
      <IconButton onClick={onClick} sx={{ p: "0.5px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

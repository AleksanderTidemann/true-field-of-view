import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../../store/slices/colorSlice";
import { getMode } from "../../store/slices/canvasSlice";
import {
  getAllCrowdNames,
  getCurrCrowdName,
  loadCurrCrowd,
} from "../../store/slices/crowdsSlice";

const menuPaperHeight = 48;
const style = isEyepieceMode => ({
  style: {
    maxHeight: menuPaperHeight * 4.5,
    width: "20ch",
    background: "black",
    color: "white",
    borderRadius: 20,
  },
  sx: {
    "& .MuiMenuItem-root": {
      borderRadius: 20,
    },
    "& .MuiMenuItem-root.Mui-selected": {
      backgroundColor: isEyepieceMode
        ? "rgba(25, 118, 210, 0.2)"
        : "rgba(25, 210, 118, 0.2)",
    },
    "& .MuiMenuItem-root:hover": {
      border: isEyepieceMode
        ? "1px solid rgba(25, 118, 210, 1)"
        : "1px solid rgba(25, 210, 118, 1)",
    },
    // "& .MuiMenuItem-root.Mui-selected:hover": {
    //   backgroundColor: props.isEyepieceMode
    //     ? "rgba(25, 118, 210, 0.3)"
    //     : "rgba(25, 210, 118, 0.3)",
    // },
  },
});

const CrowdSelector = () => {
  const dispatch = useDispatch();
  const isEyepieceMode = useSelector(getMode);
  const currCrowdName = useSelector(getCurrCrowdName);
  const crowdNames = useSelector(getAllCrowdNames);
  const colors = useSelector(getColors);

  const [options, setOptions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const paperPropsStyle = style(isEyepieceMode);

  useEffect(() => {
    setOptions(crowdNames);
  }, [crowdNames]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="col-1">
      <IconButton
        color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
        aria-label="more"
        id="body-selector-menu"
        aria-controls={open ? "body-selector-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="body-selector-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        PaperProps={paperPropsStyle}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            id={option}
            selected={option === currCrowdName}
            onClick={e => {
              dispatch(loadCurrCrowd(e.target.id));
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CrowdSelector;

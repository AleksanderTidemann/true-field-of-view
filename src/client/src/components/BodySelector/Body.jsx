import React, { memo } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { loadCurrBody } from "../../store/slices/crowdsSlice";

// https://www.framer.com/docs/examples/

const Body = ({ name, imgPath, picWidth }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      //   initial={true}
      animate={{ x: [-100, 0], rotate: 360 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onTap={event => {
        dispatch(loadCurrBody(event.target.alt));
      }}
    >
      <img
        src={imgPath}
        alt={name}
        width={picWidth}
        style={{
          opacity: 1,
          cursor: "pointer",
          margin: "0",
        }}
      />
    </motion.div>
  );
};

Body.propTypes = {
  name: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
  picWidth: PropTypes.string.isRequired,
};

export default memo(Body);

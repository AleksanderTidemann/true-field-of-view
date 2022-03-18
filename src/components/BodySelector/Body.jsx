import React, { memo } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// https://www.framer.com/docs/examples/

const Body = ({ name, img, onBodySelection, bodyWidth }) => {
  return (
    <motion.div
      //   initial={true}
      animate={{ x: [-100, 0], rotate: 360 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onTap={event => {
        onBodySelection(event.target.alt);
      }}
    >
      <img
        src={img}
        alt={name}
        width={bodyWidth}
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
  img: PropTypes.string.isRequired,
  onBodySelection: PropTypes.func.isRequired,
  bodyWidth: PropTypes.string.isRequired,
};

export default memo(Body);

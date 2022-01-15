import React, { useEffect, useState } from "react";

const InfoInput = (props) => {
  const [textColor, setTextColor] = useState(null);

  // set textColor based on submit and if the info value has changed after a submit.
  useEffect(() => {
    props.isChanged
      ? setTextColor(props.colors.textMuted)
      : setTextColor(props.colors.text);
  }, [props.isChanged, props.colors]);

  return (
    <div className={"form-label-group mb-0 mt-2 " + props.colors.text}>
      <p className={"mr-1"}>
        <small>{props.name}</small>
      </p>
      <p
        className={
          "info-items text-center " +
          textColor +
          " " +
          "col-auto border rounded border-" +
          props.borderColor
        }
      >
        {props.value}
      </p>
    </div>
  );
};

export default InfoInput;

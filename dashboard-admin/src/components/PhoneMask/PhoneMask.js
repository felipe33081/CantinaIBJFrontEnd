import React, { useRef, useEffect } from "react";
import { TextField, OutlinedInput } from "@material-ui/core";
import MaskedInput from "react-text-mask";
import createTextMaskInputElement from "react-text-mask";

export const PhoneMaskInput = React.forwardRef((props, ref) => {
  const { onChange, ...inputProps } = props;

  const mask = [
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  const textMaskRef = useRef();

  useEffect(() => {
    if (ref && ref.current) {
      const textMask = createTextMaskInputElement({
        inputElement: ref.current,
        mask: mask,
        guide: false,
      });
      textMaskRef.current = textMask;
    }
  }, [ref, mask]);

  return (
    <TextField
      {...inputProps}
      onChange={onChange}
      inputRef={ref}
      variant="outlined"
      InputProps={{
        inputComponent: TextMaskCustom,
        inputProps: {
          ref: ref,
          mask: mask,
          guide: false,
        },
        inputRef: textMaskRef,
        inputMode: "numeric"
      }}
    />
  );
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      showMask={false}
    />
  );
}

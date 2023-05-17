import * as React from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=','
      decimalScale={2}
      fixedDecimalScale
      valueIsNumericString
      prefix="R$ "
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormattedInputs({ onChange, price }) {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <Box>
      <TextField
        id="price"
        fullWidth
        label="Preço"
        required={true}
        variant="outlined"
        value={price}
        onChange={handleChange}
        name="numberformat"
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
      />
    </Box>
  );
}
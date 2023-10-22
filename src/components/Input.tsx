import { Autocomplete, TextField } from '@mui/material';
import { FieldError } from 'react-hook-form';
import usePlacesAutocomplete from 'use-places-autocomplete';

type InputProps = {
  onChange: (value: string | null) => void;
  error: FieldError | undefined;
  label: string;
};

const Input = (props: InputProps) => {
  const { onChange, error, label } = props;
  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 500,
  });

  const displayData = status === 'OK' ? data.map((datum) => datum.description) : [];

  return (
    <Autocomplete
      freeSolo
      autoSelect
      options={displayData}
      onClose={() => clearSuggestions()}
      onInputChange={(e, newInputValue) => setValue(newInputValue)}
      onChange={(e, value) => {
        console.log('value', value);
        onChange(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          value={value}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default Input;

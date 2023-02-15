import i18n from '../i18n';
import { Autocomplete, Box, TextField } from '@mui/material';

import React from 'react';
import { languages } from '../utils/constants/base';

const ChooseLang = ({ onChange }: any) => {
  // ts-ignore

  return (
    <Box minWidth={150}>
      <Autocomplete
        id="combo-box-demo"
        sx={{ bgcolor: 'secondary.light' }}
        options={languages}
        disableCloseOnSelect
        defaultValue={languages.find(lang => lang.code === i18n.language)}
        getOptionLabel={option => option.name}
        onChange={(e, value) => onChange(value?.code)}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option?.flag || option.code}.png`}
              srcSet={`https://flagcdn.com/w40/${
                option?.flag || option.code
              }.png 2x`}
              alt=""
            />
            {option.name} ({option.code})
          </Box>
        )}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            sx={{
              input: { color: 'white', textAlign: 'end', paddingRight: 10 },
            }}
          />
        )}
      />
    </Box>
  );
};

export default ChooseLang;

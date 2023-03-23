import React from 'react';
import { AlertColor, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  // eslint-disable-next-line react/jsx-no-undef
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BaseAlert = (props: {
  open: boolean;
  severity: AlertColor;
  setOpen: any;
  text: string;
}) => {
  const { open, severity, setOpen, text } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={() => setOpen(false)} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default BaseAlert;

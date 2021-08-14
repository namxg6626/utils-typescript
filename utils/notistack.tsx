import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider, useSnackbar, VariantType } from 'notistack';

// add a <div> child to body under which to mount the snackbars
const mountPoint = document.createElement('snackbar-helper');
document.body.appendChild(mountPoint);

export const notistack = {
  success: function (msg: string) {
    this.toast(msg, 'success');
  },
  warning: function (msg: string) {
    this.toast(msg, 'warning');
  },
  info: function (msg: string) {
    this.toast(msg, 'info');
  },
  error: function (msg: string) {
    this.toast(msg, 'error');
  },
  toast: function (msg: string, variant: VariantType = 'default') {
    const ShowSnackbar = ({ message }: { message: string; variant: VariantType }) => {
      const { enqueueSnackbar } = useSnackbar();
      enqueueSnackbar(message, { variant });
      return null;
    };
    ReactDOM.render(
      // see https://github.com/iamhosseindhv/notistack#snackbarprovider
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
        <ShowSnackbar message={msg} variant={variant} />
      </SnackbarProvider>,
      mountPoint,
    );
  },
};

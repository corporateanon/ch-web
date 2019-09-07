const captured = {
    enqueueSnackbar: null
};

export const capture = enqueueSnackbar => {
    captured.enqueueSnackbar = enqueueSnackbar;
};

export const enqueueSnackbar = (...args) => {
    captured.enqueueSnackbar && captured.enqueueSnackbar(...args);
};

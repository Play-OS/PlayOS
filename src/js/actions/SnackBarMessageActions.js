function setMessage(message, autoHideDuration = null) {
    return {
        type: 'SET_SNACKBAR_MESSAGE',
        payload: {
            message,
            autoHideDuration,
        },
    };
}

const SnackBarMessageActions = {
    setMessage,
};

export default SnackBarMessageActions;

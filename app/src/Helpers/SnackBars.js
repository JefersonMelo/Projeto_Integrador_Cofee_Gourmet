
export const ShowErrorSnackBar = (err, appContext, setAppContext) => {
  return setAppContext({
    ...appContext,
    warning: {
      opened: true,
      type: "error",
      msg: `${err.data.detail} 😞`,
    },
  });
};

export const ShowSuccessSnackBar = (res, appContext, setAppContext) => {
  return setAppContext({
    ...appContext,
    warning: {
      opened: true,
      type: "success",
      msg: `${res.data.detail} 😊`,
    },
  });
};
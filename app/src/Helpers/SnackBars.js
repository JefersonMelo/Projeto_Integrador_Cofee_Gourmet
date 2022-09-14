
export const ShowErrorSnackBar = (err, appContext, setAppContext) => {
    return setAppContext({
      ...appContext,
      warning: {
        opened: true,
        type: "error",
        msg: `${err.message} 😑`,
      },
    });
  };
  
  export const ShowSuccessSnackBar = (res, appContext, setAppContext) => {
    return setAppContext({
      ...appContext,
      warning: {
        opened: true,
        type: "success",
        msg: `${res.data.msg} 😊`,
      },
    });
  };
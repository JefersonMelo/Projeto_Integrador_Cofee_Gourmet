
export const ShowErrorSnackBar = (err, setAppContext) => {
  return setAppContext((prev) => ({
    ...prev,
    warning: {
      opened: true,
      type: "error",
      msg: `${(!err.message || err.response) ? err.response.data.detail : "Deu Erro Cara"} 😢`,
    },
  }));
};

export const ShowSuccessSnackBar = (res, setAppContext) => {
  return setAppContext((prev) => ({
    ...prev,
    warning: {
      opened: true,
      type: "success",
      msg: `${res.data.detail ? res.data.detail : "Deu Certo Cara!"} 😊`,
    },
  }));
};
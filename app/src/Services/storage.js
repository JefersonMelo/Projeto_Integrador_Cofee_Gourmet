export const logout = () => {
  localStorage.clear();
  window.location.reload();
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
  window.location.reload();
};

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
    // catch possible errors:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
}

export const getLocalStorage = (key, initialValue) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    console.log(e);
    // if error, return initial value
    return initialValue;
  }
}
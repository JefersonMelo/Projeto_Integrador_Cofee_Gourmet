
export function getDescenProp(obj, desc) {
  let array = desc.split(".");
  while (array.length && (obj = obj[array.shift()]));
  return obj;
}

export const handleOptionsAPI = (options, id, label) => {
  return options.map((element) => ({
    value: getDescenProp(element, id),
    label:
      typeof label === "function"
        ? label(element)
        : getDescenProp(element, label),
  }));
};

export const openInNewTab = (url) => {
  return window.open(url, "_blank");
};

export const IntegerListGenerator = (start, end) => {
  return Array(end - start + 1).fill().map((_, idx) => start + idx);
}
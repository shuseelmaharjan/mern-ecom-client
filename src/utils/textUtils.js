export const lowercaseAll = (str) => {
  return str.toLowerCase();
};

export const capitalizeWords = (str) => {
  return lowercaseAll(str)
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const capitalizeFirstLetter = (str) => {
  if (typeof str !== "string" || str.trim() === "") {
    return str;
  }
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const lowercaseAll = (str) => {
    return str.toLowerCase();
  };
  
  export const capitalizeWords = (str) => {
    return lowercaseAll(str)
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Capitalize only the first letter of the string
  export const capitalizeFirstLetter = (str) => {
    if (typeof str !== "string" || str.trim() === "") {
      return str; 
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  // Other utility functions remain the same
  
export const calculateTimeLeft = (expiryDate) => {
  const now = new Date();
  const timeDiff = expiryDate - now;

  if (timeDiff <= 0) {
    return "Expired";
  }

  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

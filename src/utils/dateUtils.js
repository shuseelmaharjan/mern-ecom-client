const DateUtils = {
  formatDate: (isoDate) => {
    const inputDate = new Date(isoDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday = inputDate.toDateString() === today.toDateString();
    const isYesterday = inputDate.toDateString() === yesterday.toDateString();

    const formatTime = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    if (isToday) {
      return `Today at ${formatTime(inputDate)}`;
    } else if (isYesterday) {
      return `Yesterday at ${formatTime(inputDate)}`;
    } else {
      const day = inputDate.getDate();
      const month = inputDate.toLocaleString("default", { month: "short" });
      const year = inputDate.getFullYear();
      return `${day} ${month}, ${year}`;
    }
  },
};

export default DateUtils;

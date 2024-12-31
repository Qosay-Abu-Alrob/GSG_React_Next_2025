const DateDisplay: React.FC = () => {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "short",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  const today = new Date();
  const formattedDate = formatDate(today);

  return <div><span className="text-[#39D08B]">ToDo APP</span> {formattedDate}</div>;
};

export default DateDisplay;

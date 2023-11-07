import moment from "moment";
export const isValidTime = (time: string) => {
  const flag = moment(time, "HH:mm:ss", true).isValid();
  return flag;
};

export const minuteDifference = (start: string, end: string) => {
  const minutes = moment(start, "HH:mm:ss").diff(
    moment(end, "HH:mm:ss"),
    "minute"
  );
  return minutes;
};

export const formattedDate = (d: Date) => {
  return moment(d).format("YYYY-MM-DD").toString();
};

import { message } from "antd";
import { getLocalStorage } from "./storage";

const isString = (v) => typeof v === "string";

export const formatDateDifference = (differenceInMilliseconds) => { 
  // convert date difference to text
  const seconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Assuming 30 days in a month
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (seconds > 0) {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  } else {
    return 'Just now';
  }
};

export const formatDuration = (secs) => {
  if (secs == 0) return "00:00";
  const minutes = Math.floor(secs / 60);
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnedMinutes}:${returnedSeconds}`;
}

export const formatDateTime = (date) => {
  // convert Date to "DD/MM/YYYY HH:MM:SS" format
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

export const trimParams = (params) =>
  Object.keys(params).reduce((acc, k) => {
    if (!isString(params[k])) {
      return {
        ...acc,
        [k]: params[k],
      };
    }
    return {
      ...acc,
      [k]: params[k].trim(),
    };
  }, {});

export const fileMusicPattern =
  /^(audio\/mp3|audio\/mpeg|video\/mp4|audio\/x-ms-wma|audio\/wav|audio\/flac|audio\/aac|audio\/ogg|audio\/aiff|audio\/alac)$/;

export const fileImagePattern =
  /^(image\/jpeg|image\/png|image\/gif|image\/bmp|image\/tiff|image\/webp)$/;

export const checkFile = (file) => {
  const { type } = file;

  const isMusicFile = fileMusicPattern.test(type);

  if (!isMusicFile) {
    message.error("Upload wrong file");
  }
  return isMusicFile;
};

export const checkImageFile = (file) => {
  const { type } = file;

  const isImageFile = fileImagePattern.test(type);

  if (!isImageFile) {
    message.error("Upload wrong file");
  }
  return isImageFile;
};

export const user = getLocalStorage("tempUser");

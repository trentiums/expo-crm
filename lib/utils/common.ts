/* eslint-disable no-useless-escape */
import { Alert, Linking, Platform } from 'react-native';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { whatsAppLink } from './config';

export const getuuid = () => {
  return uuidv4();
};

export const sanitizeObject = (object: any) => {
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'string') {
      object[key] = object[key].trim();
    }
  });
  return object;
};

export const dateToFromNowDaily = (someDate: moment.MomentInput) => {
  const date = moment(someDate);
  if (moment().diff(date, 'days') >= 2) {
    return date.fromNow();
  }
  return date.calendar().split(' ')[0];
};

export const formatDate = (date: moment.MomentInput) => {
  const currentDate = moment(new Date()).format();
  if (date === currentDate) {
    return `Today, ${moment(date).format('DD MMM')}`;
  } else {
    const weekDayName = moment(date).format('dddd, DD MMM');
    return weekDayName;
  }
};

export const onCallMobilePhone = (phone: string) => {
  let phoneNumber = phone;
  if (Platform.OS === 'ios') {
    phoneNumber = `telprompt:${phone}`;
  } else if (Platform.OS === 'android') {
    phoneNumber = `tel:${phone}`;
  } else {
    console.log('Something went wrong');
    return;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};

export const timeConvert = (date: any, hourss?: boolean, min?: boolean) => {
  const hours = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((date % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((date % (1000 * 60)) / 1000);
  if (hourss) {
    return hours + 'h' + minutes;
  }
  if (min) {
    return minutes + ' min';
  }
  return hours + ' hours ' + minutes + ' min ' + seconds + ' second';
};

export const mergeAndUpdate = (oldData: any, newData: any) => {
  const mergedData = { ...oldData };
  for (const key in newData) {
    if (mergedData.hasOwnProperty(key)) {
      mergedData[key] += newData[key];
    } else {
      mergedData[key] = newData[key];
    }
  }
  return mergedData;
};

export const extractUserEmail = (email: string | undefined) => {
  if (email) {
    return email.split('@')[0].replace(/\./g, '');
  }
};

export const validateEmail = (email: string): boolean => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const compressString = (
  data: string,
  maximumStringLengthToBe: number,
): string => {
  return data?.length > maximumStringLengthToBe
    ? data?.substring(0, maximumStringLengthToBe) + '...'
    : data;
};

export const callToAction = (link: string) => {
  Linking.openURL(link).catch((err) => {
    console.error('Failed to open URL:', err);
  });
};
export const generateWhatsAppUrl = (phoneNumber: number | string) => {
  const whatsAppUrl = `${whatsAppLink}${phoneNumber}`;
  const fallbackUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    'Join WhatsApp using this link: https://whatsapp.com/dl/',
  )}`;

  Linking.canOpenURL(whatsAppUrl)
    .then((supported) => {
      if (supported) {
        callToAction(whatsAppUrl);
      } else {
        callToAction(fallbackUrl);
      }
    })
    .catch((err) => {
      console.error('An error occurred', err);
    });
};
export const handleOpenEmail = (email: string) => {
  const emailUrl = `mailto:${email}?subject=Your%20Subject%20Here&body=Your%20Message%20Here`;

  Linking.openURL(emailUrl);
};
export const handleOpenDialCall = (phoneNumber: number) => {
  const phoneUrl = `tel:${phoneNumber}`;
  Linking.openURL(phoneUrl).catch((err) => {
    console.error('Failed to open dialer', err);
  });
};

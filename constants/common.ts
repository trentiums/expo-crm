import { Dimensions, Platform } from "react-native";

export const dateMonthWordFormate = "DD MMM YYYY";
export const dateFormate = "DD/MM/YYYY";
export const dateTimeFormate = "DD MMM YYYY, hh:mm A";

export const calendarDefaultWidth = (value: number) => {
  const screenWidth = Dimensions.get("screen").width;
  return screenWidth > value ? value : screenWidth - 24;
};

export const calendarDefaultHeight = (value: number) => {
  const screenHeight = Dimensions.get("screen").height;
  return screenHeight > value ? value : screenHeight - 24;
};
export const DropdownBottomSheetSnapPoints: [number, string] = Platform.select({
  android: [1, "100%"],
  ios: [1, "100%"],
  web: [1, "100%"],
});

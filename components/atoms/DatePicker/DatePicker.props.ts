import CalendarPicker, {
  CalendarPickerProps,
} from 'react-native-calendar-picker';

export type DatePickerProps = React.ComponentProps<typeof CalendarPicker> &
  CalendarPickerProps & {
    onPress: (value: string) => void;
    minDate?: string;
    maxDate?: string;
  };

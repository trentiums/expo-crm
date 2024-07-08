import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { useAppTheme } from '@constants/theme';
import { DatePickerProps } from './DatePicker.props';
import { Container } from './DatePicker.styles';
import { calendarDefaultWidth, calendarDefaultHeight } from '@constants/common';

const DatePicker: React.FC<DatePickerProps> = ({
  onPress,
  minDate,
  initialDate,
  maxDate,
  ...rest
}) => {
  const { colors } = useAppTheme();
  const onDatePickerPress = (date) => {
    onPress(date);
  };

  return (
    <Container>
      <CalendarPicker
        {...rest}
        onDateChange={(date) => onDatePickerPress(date)}
        selectedDayTextColor={colors.black}
        textStyle={{ color: colors.white, fontSize: 18 }}
        todayBackgroundColor={colors.primarygradient2}
        selectedDayColor={colors.primarygradient2}
        todayTextStyle={{ color: colors.black }}
        width={calendarDefaultWidth(400)}
        height={calendarDefaultHeight(400)}
        minDate={minDate}
        maxDate={maxDate}
        initialDate={initialDate}
        customDatesStyles={[
          {
            date: initialDate,
            style: { backgroundColor: colors.primarygradient2 },
            textStyle: { color: colors.white },
          },
        ]}
      />
    </Container>
  );
};

export default DatePicker;

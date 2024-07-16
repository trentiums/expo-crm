import React, { useState } from "react";
import { FieldDatePickerProps } from "./FieldDatePicker.props";
import { Pressable } from "react-native";
import DatePicker from "@atoms/DatePicker/DatePicker";
import {
  Container,
  DateView,
  DateText,
  CalendarIcon,
  ModalContainer,
  DatePickerContainer,
} from "./FieldDatePicker.styles";
import FormError from "@atoms/FormError/FormError";
import moment from "moment";
import {
  dateFormate,
  dateMonthWordFormate,
} from "@redux/actions/constants/common";

const FieldDatePicker: React.FC<FieldDatePickerProps> = ({
  input,
  compact,
  meta,
  minDate,
  maxDate,
  initialDate,
  showMonth,
}) => {
  const [isCalendar, setIsCalendar] = useState(false);
  const onDatePickerPress = (val) => {
    input.onChange(val.toString());
    handleShowDatePicker();
  };
  const handleShowDatePicker = () => {
    setIsCalendar(!isCalendar);
  };
  return (
    <>
      <Pressable onPress={() => onDatePickerPress(input.value)}>
        <Container>
          <DateView>
            <DateText input={input?.value}>
              {input && input.value
                ? moment(input.value).format(
                    showMonth ? dateMonthWordFormate : dateFormate
                  )
                : dateFormate}
            </DateText>
          </DateView>
        </Container>
      </Pressable>
      {!!(meta.touched && meta.error) && (
        <FormError
          compact={compact}
          visible={!!(meta.touched && meta.error)}
          errorId={meta.error}
        />
      )}

      {isCalendar && (
        <ModalContainer
          animationIn={"fadeIn"}
          transparent={true}
          onRequestClose={handleShowDatePicker}
          onBackdropPress={handleShowDatePicker}
          isVisible={isCalendar}>
          <DatePickerContainer>
            <DatePicker
              onPress={(val) => onDatePickerPress(val)}
              minDate={minDate}
              maxDate={maxDate}
              initialDate={initialDate}
            />
          </DatePickerContainer>
        </ModalContainer>
      )}
    </>
  );
};

export default FieldDatePicker;

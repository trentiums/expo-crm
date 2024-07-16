import React, { forwardRef, useEffect, useState } from "react";
import FormError from "@atoms/FormError/FormError";
import { useAppTheme } from "@constants/theme";
import { CustomTextInputProps } from "@atoms/TextInput/TextInput.props";
import CheckMarkIcon from "@atoms/Illustrations/Check";
import CrossIcon from "@atoms/Illustrations/Cross";
import { Dropdown } from "react-native-element-dropdown";
import { FieldDropDownContainer } from "./FieldDropDown.styles";
import { dropdownData } from "@redux/actions/constants/dummyData";

const FieldDropDown = forwardRef<CustomTextInputProps, any>(
  (
    {
      placeholder,
      input,
      meta,
      compact,
      keyboardType,
      left,
      right,
      password,
      ...rest
    },
    ref
  ) => {
    const { colors } = useAppTheme();
    const [selectedValue, setSelectedValue] = useState(input?.value || "");
    const handleOnChange = (value: string) => {
      setSelectedValue(value);
      input.onChange(value);
    };

    let rightIcon = null;
    if (right) {
      if (password) {
        rightIcon = password;
      } else {
        rightIcon = !!(meta?.error && meta?.touched)
          ? () => <CrossIcon />
          : () => <CheckMarkIcon />;
      }
    }

    useEffect(() => {
      setSelectedValue(input?.value || "");
    }, [input.value]);
    return (
      <>
        <FieldDropDownContainer isError={meta.touched && meta.error}>
          <Dropdown
            data={dropdownData}
            placeholder="Select an option"
            value={selectedValue}
            onChange={handleOnChange}
            itemTextStyle={{
              color: colors.black,
            }}
            containerStyle={{
              backgroundColor: colors.lightGray,
            }}
            selectedTextStyle={{ color: colors.white, paddingLeft: 8 }}
            activeColor={colors.gray}
            placeholderStyle={{
              color: colors.placeholderTextColor,
              paddingLeft: 8,
            }}
          />
        </FieldDropDownContainer>
        {!!(meta.touched && meta.error) && (
          <FormError
            compact={compact}
            visible={!!(meta.touched && meta.error)}
            errorId={meta.error}
          />
        )}
      </>
    );
  }
);

export default FieldDropDown;

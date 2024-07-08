import CrossIcon from "@atoms/Illustrations/Cross";
import { useAppTheme } from "@constants/theme";
import React from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DropDownSelectedItemView, SelectedText } from "./DropDown.styles";
import { StyleSheet } from "react-native";

const DropDown = ({
  isStaff,
  handleRemoveIconPress,
  isMultiple,
  ...props
}: any) => {
  const { colors } = useAppTheme();

  const createStyles = StyleSheet.create({
    itemTextStyle: {
      color: colors.white,
      borderColor: colors.bgColor,
      fontSize: 14,
    },
    containerStyle: {
      backgroundColor: colors.darkBackground,
      height: 170,
      marginTop: 12,
    },
    selectedTextStyle: {
      color: colors.white,
      paddingLeft: 8,
    },
    selectedTextSingleStyle: {
      color: colors.white,
      paddingLeft: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      color: colors.placeholderTextColor,
      paddingLeft: 8,
    },
  });

  return (
    <>
      {isMultiple ? (
        <MultiSelect
          labelField="label"
          valueField="value"
          itemTextStyle={createStyles.itemTextStyle}
          containerStyle={createStyles.containerStyle}
          selectedTextStyle={createStyles.selectedTextStyle}
          activeColor={colors.primaryColor}
          placeholderStyle={createStyles.placeholderStyle}
          showsVerticalScrollIndicator={false}
          renderSelectedItem={(item) => (
            <TouchableOpacity onPress={() => handleRemoveIconPress(item)}>
              <DropDownSelectedItemView>
                <SelectedText>{item.label}</SelectedText>
                <CrossIcon color={colors.transparent} />
              </DropDownSelectedItemView>
            </TouchableOpacity>
          )}
          {...props}
        />
      ) : (
        <Dropdown
          labelField="label"
          valueField="value"
          itemTextStyle={createStyles.itemTextStyle}
          containerStyle={createStyles.containerStyle}
          selectedTextStyle={createStyles.selectedTextSingleStyle}
          activeColor={colors.primaryColor}
          placeholderStyle={createStyles.placeholderStyle}
          showsVerticalScrollIndicator={false}
          disable={isStaff}
          {...props}
          iconStyle={{ marginRight: 4 }}
        />
      )}
    </>
  );
};

export default DropDown;

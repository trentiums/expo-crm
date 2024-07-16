import { useAppTheme } from "@constants/theme";
import { FieldDropDownContainer } from "@organisms/LeadDetailsForm/LeadDetailsForm.styles";
import React from "react";
import { SelectListProps } from "./SelectList.prop";
import DropDown from "@atoms/DropDown/DropDown";

const SelectListDropdown: React.FC<SelectListProps> = ({
  selectedValue,
  data,
}: any) => {
  return (
    <FieldDropDownContainer isError={false}>
      <DropDown
        data={data}
        placeholder="Select an option"
        value={selectedValue}
        onChange={(value) => {
          console.log("value: ", value);
        }}
      />
    </FieldDropDownContainer>
  );
};

export default SelectListDropdown;

import React from 'react';
import { FieldDropDownProps } from './FieldDropDown.props';
import DropDown from '@molecules/DropDown/DropDown';
import FormError from '@atoms/FormError/FormError';

const FieldDropDown: React.FC<FieldDropDownProps> = ({
  input,
  meta,
  compact,
  listData,
  value,
  isMultiple,
  isAllowDeselect,
  isShowSelected,
  isSearch,
  placeholder,
  dropdownDataType,
  heading,
  isStaff,
}) => {
  const handleSelect = (value: any) => {
    if (isStaff) return;
    else {
      if (isMultiple) {
        const multiValue: number[] = Array.isArray(input.value)
          ? input.value
          : [];
        if (multiValue?.includes(value)) {
          input.onChange(multiValue.filter((id) => value !== id));
        } else {
          input.onChange(multiValue.concat(value));
        }
      } else {
        if (input.value === value && isAllowDeselect) {
          input.onChange(null);
        } else {
          input.onChange(value);
        }
      }
    }
  };
  return (
    <>
      <DropDown
        data={listData}
        isMultiple={isMultiple}
        onChange={(value: string) => handleSelect(value)}
        value={input.value}
        isShowSelected={isShowSelected}
        placeholder={placeholder}
        isSearch={isSearch}
        dropdownDataType={dropdownDataType}
        heading={heading}
      />
      {!!(meta.touched && meta.error) && (
        <FormError
          compact={compact}
          visible={!!(meta.touched && meta.error)}
          errorId={meta.error}
        />
      )}
    </>
  );
};

export default FieldDropDown;

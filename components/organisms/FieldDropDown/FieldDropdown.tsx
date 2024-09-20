import React from 'react';
import { FieldDropDownProps } from './FieldDropDown.props';
import DropDown from '@molecules/DropDown/DropDown';
import FormError from '@atoms/FormError/FormError';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useTranslation } from 'react-i18next';

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
  const toast = useToast();
  const { t } = useTranslation('drawer');
  const handleSelect = (value: any) => {
    if (isStaff) {
      toast.show(t('userChannelError'), {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    } else {
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

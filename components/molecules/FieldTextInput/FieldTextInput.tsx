import React, { forwardRef } from 'react';
import { FieldTextInputProps } from './FieldTextInput.props';
import TextInput from '@atoms/TextInput/TextInput';
import FormError from '@atoms/FormError/FormError';
import { useAppTheme } from '@constants/theme';
import { CustomTextInputProps } from '@atoms/TextInput/TextInput.props';
import CheckMarkIcon from '@atoms/Illustrations/Check';
import CrossIcon from '@atoms/Illustrations/Cross';

const FieldTextInput = forwardRef<CustomTextInputProps, FieldTextInputProps>(
  (
    {
      numberOfLines,
      isFloatValue,
      input,
      meta,
      compact,
      keyboardType,
      left,
      right,
      password,
      ...rest
    },
    ref,
  ) => {
    const { colors } = useAppTheme();
    const handleOnChange = (value: string) => {
      if (keyboardType === 'numeric') {
        const pattern = isFloatValue ? /^\s*\d*\.?\d*\s*$/ : /^\s*\d*\d*\s*$/;

        if (pattern.test(value)) {
          input.onChange(value?.trimStart());
        }
      } else {
        input.onChange(value?.trimStart());
      }
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
    return (
      <>
        <TextInput
          ref={ref}
          value={input.value}
          onChangeText={handleOnChange}
          error={meta.touched && meta.error}
          autoCapitalize="none"
          style={
            rest?.style || {
              backgroundColor: colors?.IcewindDale,
            }
          }
          textColor={rest?.textDark || colors?.textDark}
          enterKeyHint="done"
          autoCorrect={false}
          left={left}
          keyboardType={keyboardType}
          theme={{
            roundness: 6,
            colors: {
              primary: colors.gray,
            },
          }}
          right={rightIcon}
          secureTextEntry={rest?.secureTextEntry}
          placeholderTextColor={colors.placeholderTextColor}
          outlineStyle={{
            borderColor: colors.IcewindDale,
            borderWidth: 3,
            borderRadius: 10,
          }}
          {...rest}
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
  },
);

export default FieldTextInput;

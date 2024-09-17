import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native-paper';
import { CustomTextInputProps } from './TextInput.props';
import { LabelText, RNPTextInput } from './TextInput.styles';

const TextInput = forwardRef<typeof RNTextInput, CustomTextInputProps>(
  ({ label, labelColor, right, left, ...props }) => {
    return (
      <>
        {!!label && <LabelText>{label}</LabelText>}
        <RNTextInput
          mode="outlined"
          {...props}
          left={left && <RNPTextInput.Icon icon={left} />}
          right={right && <RNPTextInput.Icon icon={right} />}
          secureTextEntry={props?.secureTextEntry}
        />
      </>
    );
  },
);

export default TextInput;

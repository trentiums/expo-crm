import React from 'react';
import Switch from '@atoms/Switch/Switch';
import { FieldSwitchProps } from './FieldSwitch.props';

const FieldSwitch: React.FC<FieldSwitchProps> = ({
  input,
  toggle,
  onToggle,
  ...props
}) => {
  return (
    <Switch
      toggle={!!input.checked}
      onToggle={() => input.onChange(!input.checked)}
      {...props}
    />
  );
};
export default FieldSwitch;

import { FieldRenderProps } from 'react-final-form';
import { CustomSwitchProps } from '@atoms/Switch/Switch.props';

export type FieldSwitchProps = CustomSwitchProps & FieldRenderProps<boolean>;

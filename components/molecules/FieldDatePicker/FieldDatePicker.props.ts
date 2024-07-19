import { FieldRenderProps } from 'react-final-form';
import { DatePickerProps } from '@atoms/DatePicker/DatePicker.props';

export type FieldDatePickerProps = DatePickerProps & FieldRenderProps<string>;

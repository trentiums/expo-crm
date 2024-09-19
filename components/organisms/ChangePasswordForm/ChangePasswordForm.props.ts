import { FormRenderProps } from 'react-final-form';

export type ChangePasswordFormValues = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export type ChangePasswordFormProps =
  FormRenderProps<ChangePasswordFormValues> & {
    loading?: boolean;
  };

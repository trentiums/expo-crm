import { FormRenderProps } from 'react-final-form';

export type ForgotPasswordFormValues = {
  email: string;
};

export type ForgotPasswordFormProps =
  FormRenderProps<ForgotPasswordFormValues> & {
    loading?: boolean;
  };

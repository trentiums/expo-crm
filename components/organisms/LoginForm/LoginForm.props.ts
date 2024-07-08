import { FormRenderProps } from 'react-final-form';

export type LoginFormValues = {
  username: string;
  privatekey: string;
};

export type LoginFormProps = FormRenderProps<LoginFormValues> & {
  loading?: boolean;
  forgotPress: () => void;
};

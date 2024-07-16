import { FormRenderProps } from 'react-final-form';

export type UserInformationFormValues = {
  name: string;
  email: string;
  password: string;
};

export type UserInformationFormProps =
  FormRenderProps<UserInformationFormValues> & {
    loading?: boolean;
    isSave?: boolean;
  };

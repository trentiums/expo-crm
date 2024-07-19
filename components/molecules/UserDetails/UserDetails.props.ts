import { ImageSourcePropType } from 'react-native';

export interface UserDetailsProps {
  phoneNumber: string;
  whatsAppNumber: string;
  mailID: string;
  cardImage: ImageSourcePropType;
  title: string;
  dateTime: string;
}

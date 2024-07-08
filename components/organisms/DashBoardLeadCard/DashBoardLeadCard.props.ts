import { RefObject } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

export interface DashBoardLeadCardProps {
  id?: number;
  title: string;
  whatsAppNumber: number;
  phoneNumber: number;
  onDelete: () => void;
  mailID: string;
  dateTime: string;
  closeSwipeAble: () => void;
  setSwipeAbleRef: (ref: RefObject<Swipeable>) => void;
  selectedCard: number | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>;
  cardIndex: number;
}

import { RefObject } from "react";
import { ImageSourcePropType } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export interface UserDetailCardProps {
  id?: number;
  whatsAppNumber?: string | number;
  phoneNumber?: string | number;
  mailID: string;
  cardImage?: ImageSourcePropType;
  title: string;
  onDelete: () => void;
  onEdit: () => void;
  dateTime?: string;
  closeSwipeAble: () => void;
  setSwipeAbleRef: (ref: RefObject<Swipeable>) => void;
  selectedCard: number | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>;
  cardIndex: number;
  name?: string;
  email?: string;
  createdAt?: string;
}

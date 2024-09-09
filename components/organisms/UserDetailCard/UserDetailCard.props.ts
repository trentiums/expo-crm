export interface UserDetailCardProps {
  data: UserDetailCardValue;
  onChangeModalState?: (value: boolean) => void;
  showModal?: boolean;
  onDelete: (id: number) => void;
  onEdit: () => void;
  id?: number;
  loading?: boolean;
  setDeleteId?: (value: number) => void;
  isServices?: boolean;
  onChangeDeleteId?: (value: number) => void;
  isSocialMediaVisible?: boolean;
}
export interface UserDetailCardValue {
  id?: number;
  phone: number;
  email: string;
  name: string;
  dateTime?: string;
  createdAt?: string;
}

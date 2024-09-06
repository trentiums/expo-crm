export interface UserDetailCardProps {
  data: UserDetailCardValue;
  setShowModal?: (value: boolean) => void;
  showModal?: boolean;
  onDelete: (id: number) => void;
  onEdit: () => void;
  id?: number;
  loading?: boolean;
  isServices?: boolean;
  setDeleteId?: (value: number) => void;
  isShowSocialMedia?: boolean;
}
export interface UserDetailCardValue {
  id?: number;
  phone: number;
  email: string;
  name: string;
  dateTime?: string;
  createdAt?: string;
}

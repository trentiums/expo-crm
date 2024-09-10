export interface ProductCardProps {
  onEdit: () => void;
  onDelete: () => void;
  setDeleteId: (value: number) => void;
  showModal: boolean;
  onChangeModalState: (value: boolean) => void;
  isDeleteLoading: boolean;
  data: {
    name: string;
    id: number;
  };
}

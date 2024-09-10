import React from 'react';
import {
  DetailContainer,
  NameText,
  ProductDetailContainer,
  ProductInfoView,
} from './ProductCard.styles';
import ActionModal from '@molecules/ActionModal/ActionModal';
import TrashIcon from '@atoms/Illustrations/Trash';
import { useAppTheme } from '@constants/theme';
import { useTranslation } from 'react-i18next';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import Service from '@atoms/Illustrations/Service';
import { ProductCardProps } from './ProductCard.props';

const ProductCard: React.FC<ProductCardProps> = ({
  onEdit,
  onDelete,
  data,
  setDeleteId,
  showModal,
  onChangeModalState,
  isDeleteLoading,
}) => {
  const { t: tm } = useTranslation('modalText');
  const { colors } = useAppTheme();
  const hideActionModal = () => {
    onChangeModalState(false);
  };
  const onDeleteLead = (id: number) => {
    onChangeModalState(true);
    setDeleteId?.(id);
  };
  const handleDeleteLead = async () => {
    onDelete();
  };
  return (
    <DetailContainer>
      <ProductInfoView>
        <Service />
        <ProductDetailContainer>
          <NameText numberOfLines={1}>{data?.name}</NameText>
        </ProductDetailContainer>
      </ProductInfoView>
      {showModal && (
        <ActionModal
          isModal={showModal}
          onBackdropPress={hideActionModal}
          heading={tm('discardMedia')}
          description={tm('disCardDescription')}
          label={tm('yesDiscard')}
          actionType={Actions.delete}
          actiontext={tm('cancel')}
          onCancelPress={hideActionModal}
          onActionPress={() => handleDeleteLead()}
          icon={<TrashIcon color={colors?.deleteColor} />}
          loading={isDeleteLoading}
        />
      )}
    </DetailContainer>
  );
};

export default ProductCard;

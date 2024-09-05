import React from 'react';
import {
  DetailContainer,
  NameText,
  ProductDetailContainer,
  ProductInfoView,
} from './ProductCard.styles';
import ProductServices from '@atoms/Illustrations/ProductService';
import { Flexed } from '@atoms/common/common.styles';
import ActionMenu from '@molecules/ActionMenu/ActionMenu';
import ActionModal from '@molecules/ActionModal/ActionModal';
import TrashIcon from '@atoms/Illustrations/Trash';
import { useAppTheme } from '@constants/theme';
import { useTranslation } from 'react-i18next';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import View from '@atoms/View/View';

const ProductCard = ({
  onEdit,
  onDelete,
  data,
  setDeleteId,
  showModal,
  setShowModal,
  isDeleteLoading,
}) => {
  const { t: tm } = useTranslation('modalText');
  const { colors } = useAppTheme();
  const hideActionModal = () => {
    setShowModal(false);
  };
  const onDeleteLead = (id: number) => {
    setShowModal(true);
    setDeleteId?.(id);
  };
  const handleDeleteLead = async () => {
    onDelete();
  };
  return (
    <DetailContainer>
      <ProductInfoView>
        <ProductServices />
        <ProductDetailContainer>
          <NameText numberOfLines={1}>{data?.name}</NameText>
          <ActionMenu
            onEdit={onEdit}
            onDelete={(id) => onDeleteLead(id)}
            id={data?.id}
          />
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

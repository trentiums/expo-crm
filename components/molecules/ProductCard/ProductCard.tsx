import React, { useState } from 'react';
import {
  DetailContainer,
  NameText,
  ProductDetailContainer,
  ProductInfoView,
} from './ProductCard.styles';
import { useAppTheme } from '@constants/theme';
import ServiceIcon from '@atoms/Illustrations/Service';
import { ProductCardProps } from './ProductCard.props';
import { ActionMenuIcon } from '@molecules/LeadDetail/LeadDetail.styles';
import BottomSheetNavigator from '@organisms/bottom-sheet-Navigator/bottomSheetNavigator';
import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';
import { deleteProductServiceAction } from '@redux/actions/productService';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useAppDispatch } from '@redux/store';

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { colors } = useAppTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);

  const openBottomSheet = () => setVisibleBottomSheet(true);

  const closeBottomSheet = () => setVisibleBottomSheet(false);

  const handleDeleteProduct = async () => {
    try {
      const response = await dispatch(
        deleteProductServiceAction({ product_service_id: data.id }),
      ).unwrap();
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
  };

  return (
    <DetailContainer>
      <ProductInfoView>
        <ServiceIcon />
        <ProductDetailContainer>
          <NameText numberOfLines={1}>{data?.name}</NameText>
          <ActionMenuIcon
            icon="dots-vertical"
            onPress={openBottomSheet}
            iconColor={colors.textDark}
          />
        </ProductDetailContainer>
      </ProductInfoView>

      {visibleBottomSheet && (
        <BottomSheetNavigator
          initialRouteName="ModifyLeadOption"
          onClosePress={closeBottomSheet}
          meta={{
            editRoute: `/add-product/${data.id}`,
            onDelete: () => handleDeleteProduct(),
            optionType: ScreenOptionType.DEFAULT,
          }}
        />
      )}
      {visibleBottomSheet && (
        <BottomSheetNavigator
          initialRouteName="ModifyLeadOption"
          onClosePress={closeBottomSheet}
          meta={{
            optionType: ScreenOptionType.DEFAULT,
          }}
        />
      )}
    </DetailContainer>
  );
};

export default ProductCard;

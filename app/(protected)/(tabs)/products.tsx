import Loader from '@atoms/Loader/Loader';
import { useAppTheme } from '@constants/theme';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { router, useNavigation } from 'expo-router';
import React, { RefObject, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Swipeable } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import { FlatListCon } from './tabs.style';
import { RefreshControl } from 'react-native';
import { UserDetailCardProps } from '@organisms/UserDetailCard/UserDetailCard.props';
import UserDetailCard from '@organisms/UserDetailCard/UserDetailCard';
import {
  deleteProductServiceAction,
  getProductServiceListAction,
} from '@redux/actions/productService';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import TrashIcon from '@atoms/Illustrations/Trash';
import { ProductCardView } from './drawer.style';

const products = () => {
  const { colors } = useAppTheme();
  const { t: ts } = useTranslation('screenTitle');
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('modalText');
  const products = useSelector(
    (state: RootState) => state.productService?.productServiceList,
  );
  const [openSwipeAbleRef, setOpenSwipeAbleRef] =
    useState<RefObject<Swipeable> | null>(null);
  const closeSwipeAble = () => {
    if (openSwipeAbleRef && openSwipeAbleRef.current) {
      openSwipeAbleRef.current.close();
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | string>(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [moreLoading, setMoreLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = (slug: string | number) => {
    setShowModal(true);
    setDeleteId(slug);
  };
  const handleEdit = (slug: string | number) => {
    router.navigate(`/add-product/${slug}`);
  };
  const setSwipeAbleRef = (ref: RefObject<Swipeable>) => {
    setOpenSwipeAbleRef(ref);
  };
  const RenderComponent = ({
    item,
    index,
  }: {
    item: UserDetailCardProps;
    index: number;
  }) => (
    <ProductCardView
      key={`${item.id}-${index}`}
      onPress={() => {
        console.log('pressCard', item.id);
      }}>
      <UserDetailCard
        key={`${item.id}-${index}`}
        onDelete={() => handleDelete(item?.id)}
        onEdit={() => handleEdit(item?.id)}
        mailID={item.email}
        title={item.name}
        closeSwipeAble={closeSwipeAble}
        setSwipeAbleRef={setSwipeAbleRef}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        cardIndex={index}
      />
    </ProductCardView>
  );

  const handleGetMoreProductsData = async () => {
    if (products?.currentPage !== products?.lastPage) {
      try {
        setMoreLoading(true);
        await dispatch(
          getProductServiceListAction({ page: products?.currentPage + 1 }),
        ).unwrap();
      } catch (error: any) {
        toast.show(error, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
      setMoreLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setDeleteLoading(true);
      const response = await dispatch(
        deleteProductServiceAction({ product_service_id: deleteId }),
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
    openSwipeAbleRef?.current?.close();
    setShowModal(false);
    setDeleteLoading(false);
  };
  const onDeleteActionPress = async () => {
    await handleDeleteProduct();
    setShowModal(false);
  };
  const onRefreshProductServiceList = async () => {
    try {
      setRefreshing(true);
      await dispatch(getProductServiceListAction({}));
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };
  useEffect(() => {
    navigation.setOptions({
      title: ts('products'),
      headerStyle: {
        backgroundColor: colors.tabBar,
      },
      headerTintColor: colors.white,
    });
  }, [navigation]);
  return (
    <ScreenTemplate
      addButtonText={t('addProduct')}
      onAddButtonPress={() => router.navigate(`/add-product/add`)}>
      {loading ? (
        <Loader />
      ) : (
        <FlatListCon
          data={products?.serviceList}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={RenderComponent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleGetMoreProductsData}
          ListFooterComponent={moreLoading ? <Loader size={24} /> : null}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshProductServiceList}
              colors={[colors.primaryColor]}
            />
          }
        />
      )}

      {showModal && (
        <ActionModal
          isModal={showModal}
          onBackdropPress={() => {
            setShowModal(false);
            closeSwipeAble();
          }}
          heading={t('discardMedia')}
          description={t('disCardDescription')}
          label={t('yesDiscard')}
          actionType={Actions.delete}
          actiontext={t('cancel')}
          onCancelPress={() => {
            setShowModal(false);
            closeSwipeAble();
          }}
          onActionPress={() => onDeleteActionPress()}
          icon={<TrashIcon color={colors?.deleteColor} />}
          loading={deleteLoading}
        />
      )}
    </ScreenTemplate>
  );
};

export default products;

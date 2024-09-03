import Loader from '@atoms/Loader/Loader';
import { useAppTheme } from '@constants/theme';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { FlatListCon } from './tabs.style';
import { RefreshControl } from 'react-native';
import { UserDetailCardProps } from '@organisms/UserDetailCard/UserDetailCard.props';
import UserDetailCard from '@organisms/UserDetailCard/UserDetailCard';
import {
  deleteProductServiceAction,
  getProductServiceListAction,
} from '@redux/actions/productService';
import { ToastTypeProps } from '@molecules/Toast/Toast.props';

const products = () => {
  const { colors } = useAppTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const products = useSelector(
    (state: RootState) => state.productService?.productServiceList,
  );
  const [showModal, setShowModal] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = (slug: string | number) => {
    router.navigate(`/add-product/${slug}`);
  };
  const RenderComponent = ({
    item,
    index,
  }: {
    item: UserDetailCardProps;
    index: number;
  }) => (
    <UserDetailCard
      key={`${item.id}-${index}`}
      onDelete={handleDeleteProduct}
      onEdit={() => handleEdit(item?.id)}
      data={item}
      showModal={showModal}
      setShowModal={setShowModal}
      loading={deleteLoading}
      setDeleteId={setDeleteId}
      isServices
    />
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
          type: 'customToast',
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
        type: 'customToast',
        data: {
          type: ToastTypeProps.Success,
        },
      });
    } catch (error: any) {
      toast.show(error, {
        type: 'customToast',
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setShowModal(false);
    setDeleteLoading(false);
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
  return (
    <ScreenTemplate isDrawerBtn>
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
    </ScreenTemplate>
  );
};

export default products;

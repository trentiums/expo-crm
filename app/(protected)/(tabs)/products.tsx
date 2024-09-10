import Loader from '@atoms/Loader/Loader';
import { useAppTheme } from '@constants/theme';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import {
  CountsText,
  ProductsFlatList,
  HeadingText,
  HeadingView,
} from './tabs.style';
import { RefreshControl } from 'react-native';
import { UserDetailCardProps } from '@organisms/UserDetailCard/UserDetailCard.props';
import {
  deleteProductServiceAction,
  getProductServiceListAction,
} from '@redux/actions/productService';
import { useTranslation } from 'react-i18next';
import SearchFilter from '@molecules/Search/Search';
import ProductCard from '@molecules/ProductCard/ProductCard';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';

const products = () => {
  const { t: ts } = useTranslation('drawer');
  const { t } = useTranslation('modalText');
  const { colors } = useAppTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const products = useSelector(
    (state: RootState) => state.productService?.productServiceList,
  );
  const [showModal, setShowModal] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productSearch, setProductUserSearch] = useState('');

  const handleEdit = (slug: string | number) => {
    router.navigate(`/add-product/${slug}`);
  };

  const renderProducts = ({
    item,
    index,
  }: {
    item: UserDetailCardProps;
    index: number;
  }) => (
    <ProductCard
      key={`${item.id}-${index}`}
      onDelete={handleDeleteProduct}
      onEdit={() => handleEdit(item?.id)}
      data={item}
      showModal={showModal}
      onChangeModalState={(value) => setShowModal(value)}
      loading={deleteLoading}
      onChangeDeleteId={(id) => setDeleteProductId(id)}
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
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
      setMoreLoading(false);
    }
  };
  const renderHeader = () => {
    return (
      <SearchFilter
        search={productSearch}
        setSearch={setProductUserSearch}
        handleSearch={() => console.log('search')}
      />
    );
  };
  const handleDeleteProduct = async () => {
    try {
      setDeleteLoading(true);
      const response = await dispatch(
        deleteProductServiceAction({ product_service_id: deleteProductId }),
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
    <ScreenTemplate moreVisible>
      <HeadingView>
        <HeadingText>{ts('services')}</HeadingText>
        <CountsText>
          {t('itemWithCount', { count: products?.total })}
        </CountsText>
      </HeadingView>
      {renderHeader()}
      {loading ? (
        <Loader />
      ) : (
        <ProductsFlatList
          data={products?.serviceList?.slice(0, 1)}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderProducts}
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

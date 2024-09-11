import Loader from '@atoms/Loader/Loader';
import { useAppTheme } from '@constants/theme';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import {
  CountsText,
  ProductsFlatList,
  HeadingText,
  HeadingView,
  LoaderView,
} from './tabs.style';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { UserDetailCardProps } from '@organisms/UserDetailCard/UserDetailCard.props';
import { getProductServiceListAction } from '@redux/actions/productService';
import { useTranslation } from 'react-i18next';
import SearchFilter from '@molecules/Search/Search';
import ProductCard from '@molecules/ProductCard/ProductCard';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import NoData from '@molecules/NoData/NoData';
import { LoadingStatus } from '../../(public)/login/LoginScreen.props';

const products = () => {
  const { t: ts } = useTranslation('drawer');
  const { t } = useTranslation('modalText');
  const { colors } = useAppTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const products = useSelector(
    (state: RootState) => state.productService?.productServiceList,
  );
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('NONE');
  const [productSearch, setProductUserSearch] = useState('');

  const renderProducts = ({
    item,
    index,
  }: {
    item: UserDetailCardProps;
    index: number;
  }) => <ProductCard key={`${item.id}-${index}`} data={item} />;

  const handleGetMoreProductsData = async () => {
    if (products?.currentPage !== products?.lastPage) {
      try {
        setLoadingStatus('MORE');
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
      setLoadingStatus('NONE');
    }
  };
  const handleSearchProducts = async (search) => {
    try {
      setLoadingStatus('SCREEN');
      await dispatch(getProductServiceListAction(search)).unwrap();
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoadingStatus('NONE');
  };
  const renderHeader = () => {
    return (
      <SearchFilter
        search={productSearch}
        setSearch={setProductUserSearch}
        handleSearch={(search) => handleSearchProducts(search)}
      />
    );
  };

  const onRefreshProductServiceList = async () => {
    try {
      setLoadingStatus('REFRESH');
      await dispatch(getProductServiceListAction({}));
    } catch (error) {
      console.log(error);
    }
    setLoadingStatus('NONE');
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
      {loadingStatus === 'SCREEN' ? (
        <LoaderView>
          <ActivityIndicator color={colors.blueChaos} />
        </LoaderView>
      ) : (
        <>
          {Array.isArray(products?.serviceList) &&
          products?.serviceList.length > 0 ? (
            <ProductsFlatList
              data={products?.serviceList}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={renderProducts}
              showsVerticalScrollIndicator={false}
              onEndReached={handleGetMoreProductsData}
              ListFooterComponent={
                loadingStatus === 'MORE' ? <Loader size={24} /> : null
              }
              refreshControl={
                <RefreshControl
                  refreshing={loadingStatus === 'REFRESH'}
                  onRefresh={onRefreshProductServiceList}
                  colors={[colors.primaryColor]}
                />
              }
            />
          ) : (
            <LoaderView>
              <NoData text={t('noServices')} />
            </LoaderView>
          )}
        </>
      )}
    </ScreenTemplate>
  );
};

export default products;

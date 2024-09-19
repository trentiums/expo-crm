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
  LoaderContainer,
} from '../tabs.style';
import { RefreshControl } from 'react-native';
import { UserDetailCardProps } from '@organisms/UserDetailCard/UserDetailCard.props';
import { getProductServiceListAction } from '@redux/actions/productService';
import { useTranslation } from 'react-i18next';
import SearchFilter from '@molecules/Search/Search';
import ProductCard from '@molecules/ProductCard/ProductCard';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import NoDataAvailable from '@molecules/NoDataAvailable/NoDataAvailable';
import { LoadingStatus } from '../../(public)/login/LoginScreen.props';
import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';

const products = () => {
  const { t: ts } = useTranslation('drawer');
  const { t } = useTranslation('modalText');
  const { colors } = useAppTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const products = useSelector(
    (state: RootState) => state.productService?.productServiceList,
  );
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    LoadingStatus.NONE,
  );
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
        setLoadingStatus(LoadingStatus.MORE);
        await dispatch(
          getProductServiceListAction({
            page: products?.currentPage + 1,
            search: productSearch,
          }),
        ).unwrap();
      } catch (error: any) {
        toast.show(error, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
      setLoadingStatus(LoadingStatus.NONE);
    }
  };
  const handleSearchProducts = async () => {
    try {
      setLoadingStatus(LoadingStatus.SCREEN);
      await dispatch(
        getProductServiceListAction({ search: productSearch || undefined }),
      ).unwrap();
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoadingStatus(LoadingStatus.NONE);
  };
  const renderHeader = () => {
    return (
      <SearchFilter
        search={productSearch}
        setSearch={setProductUserSearch}
        handleSearch={handleSearchProducts}
        dropdownDataType={DropdownDataType.SERVICES}
      />
    );
  };

  const onRefreshProductServiceList = async () => {
    try {
      setLoadingStatus(LoadingStatus.REFRESH);
      await dispatch(getProductServiceListAction({}));
    } catch (error) {
      console.log(error);
    }
    setLoadingStatus(LoadingStatus.NONE);
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
      {loadingStatus === LoadingStatus.SCREEN ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <>
          {Array.isArray(products?.serviceList) &&
          products?.serviceList.length > 0 ? (
            <ProductsFlatList
              data={products.serviceList}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={renderProducts}
              showsVerticalScrollIndicator={false}
              onEndReached={handleGetMoreProductsData}
              ListFooterComponent={
                loadingStatus === LoadingStatus.MORE && <Loader size={24} />
              }
              refreshControl={
                <RefreshControl
                  refreshing={loadingStatus === LoadingStatus.REFRESH}
                  onRefresh={onRefreshProductServiceList}
                  colors={[colors.primaryColor]}
                />
              }
            />
          ) : (
            <LoaderContainer>
              <NoDataAvailable text={t('noServices')} />
            </LoaderContainer>
          )}
        </>
      )}
    </ScreenTemplate>
  );
};

export default products;

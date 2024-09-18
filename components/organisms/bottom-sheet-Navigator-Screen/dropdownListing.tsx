import React, { useEffect, useState } from 'react';
import {
  DropDownImage,
  DropdownListingText,
  DropdownListingView,
  DropdownListView,
  LeasFilterScreenContainer,
} from './screen.style';
import SearchFilter from '@molecules/Search/Search';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import CheckCircleIcon from '@atoms/Illustrations/CheckCircle';
import Loader from '@atoms/Loader/Loader';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { getProductServiceListAction } from '@redux/actions/productService';
import { getAssignUserListAction } from '@redux/actions/user';
import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';
import { LoadingStatus } from '../../../app/(public)/login/LoginScreen.props';

const DropdownListing = ({
  dropdownData,
  handelSelectData,
  selectedValue,
  dropdownDataType,
}) => {
  const dispatch = useAppDispatch();
  const [dropListData, setDropListData] = useState(dropdownData);
  const [search, setSearch] = useState('');
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    LoadingStatus?.NONE,
  );
  const productServiceListData = useSelector(
    (state: RootState) => state.productService.productServiceList,
  );
  const assignUserList = useSelector(
    (state: RootState) => state.user.assignUserList,
  );
  const handleGetServicesWithSearch = async () => {
    if (
      productServiceListData?.currentPage !== productServiceListData?.lastPage
    ) {
      try {
        await dispatch(
          getProductServiceListAction({
            page: productServiceListData?.currentPage + 1,
            search: search || undefined,
          }),
        ).unwrap();
        setDropListData(productServiceListData?.serviceList);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const handleSearchServices = async () => {
    try {
      await dispatch(
        getProductServiceListAction({
          search: search || undefined,
        }),
      ).unwrap();
      setDropListData(productServiceListData?.serviceList);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleGetMoreUsers = async () => {
    if (assignUserList?.currentPage !== assignUserList?.lastPage) {
      try {
        await dispatch(
          getAssignUserListAction({
            page: assignUserList?.currentPage + 1,
            search: search || undefined,
          }),
        ).unwrap();
        setDropListData(assignUserList?.assignUsers);
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  const handleSearchUser = async () => {
    try {
      await dispatch(
        getAssignUserListAction({
          search: search || undefined,
        }),
      ).unwrap();
      setDropListData(assignUserList?.assignUsers);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoadingStatus(LoadingStatus?.SCREEN);
    if (dropdownDataType === DropdownDataType.USERS) {
      handleSearchUser();
    } else if (dropdownDataType === DropdownDataType.SERVICES) {
      handleSearchServices();
    } else {
      const filtered = dropdownData.filter((item) =>
        item.title.toLowerCase().includes(search?.toLocaleLowerCase()),
      );
      setDropListData(filtered);
    }
    setLoadingStatus(LoadingStatus?.NONE);
  }, [search]);

  const handleGetMoreData = () => {
    setLoadingStatus(LoadingStatus?.MORE);

    if (dropdownDataType === DropdownDataType.USERS) {
      handleGetMoreUsers();
    } else if (dropdownDataType === DropdownDataType.SERVICES) {
      handleGetServicesWithSearch();
    }

    setLoadingStatus(LoadingStatus?.NONE);
  };

  const renderDownListData = ({ item }) => (
    <DropdownListView
      onPress={() => handelSelectData(item.id)}
      isBorder={item.image}>
      <DropdownListingText>{item.title}</DropdownListingText>
      {Array.isArray(selectedValue) && !item.image
        ? selectedValue.includes(item.id) && <CheckCircleIcon />
        : selectedValue === item.id && <CheckCircleIcon />}
      {item.image && <DropDownImage source={item.image} contentFit="cover" />}
    </DropdownListView>
  );

  return (
    <LeasFilterScreenContainer>
      <DropdownListingView>
        <SearchFilter
          search={search}
          setSearch={setSearch}
          searchRadius={44}
          dropdownDataType={dropdownDataType}
        />
        {loadingStatus === LoadingStatus?.SCREEN ? (
          <Loader />
        ) : (
          <BottomSheetFlatList
            data={dropListData?.map((item) => {
              return {
                title: item?.name || item?.title || item?.currencyCodeAlpha,
                id: item?.id,
                image: item?.flag,
              };
            })}
            renderItem={renderDownListData}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={handleGetMoreData}
            ListFooterComponent={
              loadingStatus === LoadingStatus?.MORE && <Loader />
            }
            keyboardShouldPersistTaps
          />
        )}
      </DropdownListingView>
    </LeasFilterScreenContainer>
  );
};

export default DropdownListing;

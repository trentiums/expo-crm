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
import { LoadingStatus } from '../../../app/(public)/login/LoginScreen.props';
import { DropdownListingProps } from './screen.props';

const DropdownListing = ({
  dropdownData,
  handelSelectData,
  selectedValue,
  dropdownDataType,
}) => {
  const [dropListData, setDropListData] = useState(dropdownData);
  const [search, setSearch] = useState('');
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    LoadingStatus?.NONE,
  );
  useEffect(() => {
    if (search) {
      setLoadingStatus(LoadingStatus?.SCREEN);
      const filtered = dropdownData.filter((item) =>
        item.title.toLowerCase().includes(search?.toLocaleLowerCase()),
      );
      setDropListData(filtered);
      setLoadingStatus(LoadingStatus?.NONE);
    } else {
      setDropListData(dropdownData);
    }
  }, [search]);
  const renderDownListData = ({ item }: { item: DropdownListingProps }) => {
    return (
      <DropdownListView
        onPress={() => handelSelectData(item.id)}
        isBorder={item.image}>
        <DropdownListingText variant="SF-Pro-Display-Medium_500">
          {item?.title}
        </DropdownListingText>
        {Array.isArray(selectedValue) && !item.image
          ? selectedValue.includes(item.id) && <CheckCircleIcon />
          : selectedValue === item.id && <CheckCircleIcon />}
        {item.image && <DropDownImage source={item.image} contentFit="cover" />}
      </DropdownListView>
    );
  };

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
                image: item?.flag || item?.image,
              };
            })}
            renderItem={renderDownListData}
            keyExtractor={(item) => item?.id?.toString()}
            keyboardShouldPersistTaps="always"
          />
        )}
      </DropdownListingView>
    </LeasFilterScreenContainer>
  );
};

export default DropdownListing;

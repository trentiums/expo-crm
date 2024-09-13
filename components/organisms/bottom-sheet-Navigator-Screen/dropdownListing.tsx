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

const DropdownListing = ({
  dropdownData,
  handelSelectData,
  selectedValue,
  onEndReached,
}) => {
  const [dropListData, setDropListData] = useState(dropdownData);
  const [search, setSearch] = useState('');
  const [moreDataLoading, setMoreDataLoading] = useState(false);
  useEffect(() => {
    const filtered = dropdownData.filter((item) =>
      item.title.toLowerCase().includes(search?.toLocaleLowerCase()),
    );
    setDropListData(filtered);
  }, [search, dropdownData]);

  const handleGetMoreData = () => {
    if (onEndReached) {
      setMoreDataLoading(true);
      onEndReached();
      setMoreDataLoading(false);
    }
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
        <SearchFilter search={search} setSearch={setSearch} searchRadius={44} />
        <BottomSheetFlatList
          data={dropListData}
          renderItem={renderDownListData}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleGetMoreData}
          ListFooterComponent={moreDataLoading && <Loader />}
        />
      </DropdownListingView>
    </LeasFilterScreenContainer>
  );
};

export default DropdownListing;

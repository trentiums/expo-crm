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

const DropdownListing = ({ handleSearch, dropdownData, handelSelectData }) => {
  const [dropListData, setDropListData] = useState(dropdownData);
  const [search, setSearch] = useState('');
  const renderDownListData = ({ item }) => (
    <DropdownListView onPress={() => handelSelectData(item.id)}>
      <DropdownListingText>{item.title}</DropdownListingText>
      {item.image && <DropDownImage source={item.image} contentFit="cover" />}
    </DropdownListView>
  );
  useEffect(() => {
    const filtered = dropListData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
    setDropListData(filtered);
  }, [search]);
  return (
    <LeasFilterScreenContainer>
      <DropdownListingView>
        <SearchFilter
          handleSearch={(search) => setSearch(search)}
          search={search}
          setSearch={setSearch}
        />
        <BottomSheetFlatList
          data={dropListData}
          renderItem={renderDownListData}
          keyExtractor={(item) => item.id.toString()}
        />
      </DropdownListingView>
    </LeasFilterScreenContainer>
  );
};

export default DropdownListing;

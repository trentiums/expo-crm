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

const DropdownListing = ({ dropdownData, handelSelectData }) => {
  const [dropListData, setDropListData] = useState(dropdownData);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const filtered = dropdownData.filter((item) =>
      item.title.toLowerCase().includes(search?.toLocaleLowerCase()),
    );
    setDropListData(filtered);
  }, [search, dropdownData]);

  const renderDownListData = ({ item }) => (
    <DropdownListView onPress={() => handelSelectData(item.id)}>
      <DropdownListingText>{item.title}</DropdownListingText>
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
        />
      </DropdownListingView>
    </LeasFilterScreenContainer>
  );
};

export default DropdownListing;

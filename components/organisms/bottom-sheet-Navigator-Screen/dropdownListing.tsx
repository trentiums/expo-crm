import React, { useState } from 'react';
import {
  DropDownImage,
  DropdownListingText,
  DropdownListingView,
  DropdownListView,
} from './screen.style';
import SearchFilter from '@molecules/Search/Search';
import { FlatList } from 'react-native';

const DropdownListing = ({ handleSearch, dropdownData, handelSelectData }) => {
  console.log(dropdownData, 'dropdownData');
  const [search, setSearch] = useState('');
  const renderDownListData = ({ item }) => (
    <DropdownListView onPress={() => handelSelectData(item.id)}>
      <DropdownListingText>{item.title}</DropdownListingText>
      {item.image && <DropDownImage />}
    </DropdownListView>
  );
  return (
    <DropdownListingView>
      <SearchFilter
        handleSearch={(search) => handleSearch(search)}
        search={search}
        setSearch={setSearch}
      />
      <FlatList data={dropdownData} renderItem={renderDownListData} />
    </DropdownListingView>
  );
};

export default DropdownListing;

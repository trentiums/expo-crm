import React, { useEffect, useRef, useState } from 'react';
import {
  DataText,
  DropDownContainer,
  DropDownDataContainer,
  DropDownDataView,
  DropdownLeftView,
  DropDownSelectedView,
  DropDownTitleText,
  ImageView,
  MultipleSelectedText,
  PlaceHolderText,
  PressableView,
  SelectedText,
  ShowMultipleDataList,
} from './DropDown.styles';
import ArrowDownIcon from '@atoms/Illustrations/ArrowDown';
import { DropdownBottomSheetSnapPoints } from '@constants/common';
import { DropDownProps } from './DropDown.props';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useAppTheme } from '@constants/theme';
import CheckMarkIcon from '@atoms/Illustrations/Check';
import { View } from 'react-native';
import BottomSheetNavigator from '@organisms/bottom-sheet-Navigator/bottomSheetNavigator';

const DropDown: React.FC<DropDownProps> = ({
  data,
  value,
  isMultiple,
  onChange,
  placeholder,
  dropDownTitle,
  dataToShow,
  isDataToShow,
  isLeadChange,
  isFullWidth,
  isShowSelected,
  isStaff,
}) => {
  const [showDropList, setShowDropList] = useState(false);
  const [dropListData, setDropListData] = useState(data);
  const renderMultipleData = ({ selectedData }) => {
    const isSelectedData = Array.isArray(value)
      ? value.includes(selectedData.id)
      : value === selectedData.id;
    return (
      <PressableView
        onPress={() => handelSelectData(selectedData?.id)}
        isSelected={isSelectedData}
        key={selectedData.id}>
        <MultipleSelectedText isSelected={isSelectedData}>
          {selectedData.title}
        </MultipleSelectedText>
      </PressableView>
    );
  };

  const handelSelectData = (id) => {
    onChange(id);
  };
  const handleCloseDropList = () => {
    setShowDropList(false);
  };
  const handleSearch = (search: string) => {
    const filtered = dropListData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
    setDropListData(filtered);
  };

  return (
    <>
      {isShowSelected ? (
        <DropDownContainer onPress={() => setShowDropList(true)}>
          <DropdownLeftView
            isImage={data?.filter((item) => item.id === value)[0]?.image}
            isFullWidth={isFullWidth}>
            {
              <ImageView
                source={data?.filter((item) => item.id === value)[0]?.image}
                contentFit="cover"
              />
            }
            <DropDownSelectedView>
              {isMultiple && Array.isArray(value) ? (
                <>
                  {value?.length > 0 ? (
                    <ShowMultipleDataList
                      data={value}
                      renderItem={({ item }) =>
                        renderMultipleData({ selectedData: item })
                      }
                      keyExtractor={(item, index) => `${item} - ${index}`}
                    />
                  ) : (
                    <PlaceHolderText>{placeholder}</PlaceHolderText>
                  )}
                </>
              ) : (
                <>
                  {data?.filter((item) => item.id === value)?.[0]?.title ? (
                    <SelectedText numberOfLines={1}>
                      {data?.filter((item) => item.id === value)?.[0]?.title}
                    </SelectedText>
                  ) : (
                    <PlaceHolderText>{placeholder}</PlaceHolderText>
                  )}
                </>
              )}
            </DropDownSelectedView>
            <ArrowDownIcon />
          </DropdownLeftView>
        </DropDownContainer>
      ) : (
        <ShowMultipleDataList
          data={data}
          renderItem={({ item }) => renderMultipleData({ selectedData: item })}
          keyExtractor={(item, index) => `${item.id} - ${index}`}
        />
      )}
      {showDropList && (
        <BottomSheetNavigator
          initialRouteName="DropdownListing"
          onClosePress={handleCloseDropList}
          meta={{
            dropdownData: dropListData,
            handelSelectData: (id) => handelSelectData(id),
            handleSearch: (search) => handleSearch(search),
          }}
        />
      )}
    </>
  );
};

export default DropDown;

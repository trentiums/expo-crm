import React, { useEffect, useRef, useState } from 'react';
import {
  DataText,
  DropDownContainer,
  DropDownDataContainer,
  DropDownDataView,
  DropdownLeftView,
  DropdownPlaceHolderText,
  DropDownSelectedView,
  DropDownTitleText,
  ImageView,
  MultipleSelectedText,
  PlaceHolderText,
  PressableView,
  SearchFilterContainer,
  SelectedText,
  ShowMultipleDataList,
} from './DropDown.styles';
import ArrowDownIcon from '@atoms/Illustrations/ArrowDown';
import { DropDownProps } from './DropDown.props';
import BottomSheetNavigator from '@organisms/bottom-sheet-Navigator/bottomSheetNavigator';
import {
  FilterIconView,
  SearchTextInput,
} from '@molecules/Search/Search.styles';
import { useTranslation } from 'react-i18next';
import Search from '@atoms/Illustrations/Search';
import { useAppTheme } from '@constants/theme';
import { Keyboard } from 'react-native';
import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';
import View from '@atoms/View/View';

const DropDown: React.FC<DropDownProps> = ({
  data,
  value,
  isMultiple,
  onChange,
  placeholder,
  isShowSelected,
  isSearch,
  dropdownDataType,
  heading,
}) => {
  const searchInputRef = useRef(null);
  const { t: ts } = useTranslation('drawer');
  const { colors } = useAppTheme();
  const [showDropList, setShowDropList] = useState(false);
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
    if (
      !isMultiple &&
      dropdownDataType !== DropdownDataType.BUDGET &&
      dropdownDataType !== DropdownDataType.TIMELINE
    ) {
      handleCloseDropList();
    }
  };
  const handleCloseDropList = () => {
    setShowDropList(false);
  };
  useEffect(() => {
    if (showDropList && searchInputRef.current) {
      searchInputRef.current.blur();
      Keyboard.dismiss();
    }
  }, [showDropList]);

  return (
    <>
      {isShowSelected ? (
        <DropDownContainer onPress={() => setShowDropList(true)}>
          <DropdownLeftView
            isImage={data?.filter((item) => item.id === value)[0]?.image}>
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
                    <PlaceHolderText numberOfLines={1}>
                      {placeholder}
                    </PlaceHolderText>
                  )}
                </>
              ) : (
                <>
                  {data?.filter((item) => item.id === value)?.[0]?.title ? (
                    <SelectedText numberOfLines={1}>
                      {
                        data
                          ?.filter((item) => item.id === value)?.[0]
                          ?.title?.split(' ')?.[0]
                      }
                    </SelectedText>
                  ) : (
                    <PlaceHolderText numberOfLines={1}>
                      {placeholder}
                    </PlaceHolderText>
                  )}
                </>
              )}
            </DropDownSelectedView>
            <ArrowDownIcon />
          </DropdownLeftView>
        </DropDownContainer>
      ) : isSearch ? (
        <SearchFilterContainer onPress={() => setShowDropList(true)}>
          <View pointerEvents="none">
            <SearchTextInput
              mode="outlined"
              placeholder={placeholder}
              textColor={colors.textDark}
              outlineColor="transparent"
              outlineStyle={{ borderWidth: 0 }}
              left={<Search color={colors.snowGray} />}
              onFocus={() => setShowDropList(true)}
              ref={searchInputRef}
              onBlur={() => Keyboard.dismiss()}
              disabled
            />
          </View>
          <FilterIconView>
            <Search color={colors.snowGray} />
          </FilterIconView>
        </SearchFilterContainer>
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
            selectedValue: value,
            heading: heading,
            dropdownData: data,
            handelSelectData: (id) => handelSelectData(id),
            dropdownDataType: dropdownDataType,
          }}
        />
      )}
    </>
  );
};

export default DropDown;

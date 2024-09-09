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
  isStaff,
}) => {
  const { colors } = useAppTheme();
  const { top, bottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef<any>(null);
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
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const handelSelectData = (id) => {
    onChange(id);
    if (!isMultiple) {
      setShowBottomSheet(false);
    }
  };
  const renderDropdownData = ({ item }) => (
    <DropDownDataView key={item.id} onPress={() => handelSelectData(item.id)}>
      <DropDownDataContainer>
        {item.image && <ImageView source={item.image} contentFit="cover" />}
        <DataText>{item.title}</DataText>
      </DropDownDataContainer>
      {isMultiple && value?.includes(item.id) && <CheckMarkIcon />}
      {!isMultiple && value === item.id && <CheckMarkIcon />}
    </DropDownDataView>
  );
  const handleOpenBottomSheetOpen = () => {
    bottomSheetRef.current?.present();
  };
  useEffect(() => {
    if (showBottomSheet) {
      handleOpenBottomSheetOpen();
    }
  }, [showBottomSheet]);

  return (
    <>
      <DropDownContainer>
        {/* <DropdownLeftView
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
          </DropdownLeftView>
          <ArrowDownIcon /> */}
        <ShowMultipleDataList
          data={data}
          renderItem={({ item }) => renderMultipleData({ selectedData: item })}
          keyExtractor={(item, index) => `${item.id} - ${index}`}
        />
      </DropDownContainer>
      {showBottomSheet && !isStaff && (
        <BottomSheetModal
          backgroundStyle={{
            backgroundColor: colors.darkBackground,
          }}
          handleIndicatorStyle={{ backgroundColor: colors.white }}
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          topInset={top}
          index={1}
          snapPoints={DropdownBottomSheetSnapPoints}
          onChange={(index) => {
            if (index <= 0) {
              bottomSheetRef.current?.close();
              setShowBottomSheet(false);
            }
          }}>
          <>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.transparent,
                paddingBottom: 16,
                paddingTop: 8,
              }}>
              <DropDownTitleText>{dropDownTitle}</DropDownTitleText>
            </View>
            <BottomSheetFlatList
              keyboardShouldPersistTaps="always"
              data={isDataToShow ? dataToShow : data}
              renderItem={renderDropdownData}
              keyExtractor={(item, index) => `${item.id} - ${index}`}
              ListFooterComponent={<View style={{ paddingBottom: bottom }} />}
            />
          </>
        </BottomSheetModal>
      )}
    </>
  );
};

export default DropDown;

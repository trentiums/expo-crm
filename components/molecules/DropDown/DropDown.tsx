import React, { useEffect, useRef, useState } from "react";
import {
  DataText,
  DropDownContainer,
  DropDownDataContainer,
  DropDownDataView,
  DropdownLeftView,
  DropDownTitleText,
  ImageView,
  MultipleSelectedText,
  PlaceHolderText,
  PressableView,
  SelectedText,
} from "./DropDown.styles";
import ArrowDown from "@atoms/Illustrations/ArrowDown";
import { DropdownBottomSheetSnapPoints } from "@constants/common";
import { DropDownProps } from "./DropDown.props";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAppTheme } from "@constants/theme";
import { FlatList } from "react-native-gesture-handler";
import View from "@atoms/View/View";
import CheckMarkIcon from "@atoms/Illustrations/Check";
import { Spacer } from "@atoms/common/common.styles";

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
}) => {
  const { colors } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const bottomSheetRef = useRef<any>(null);
  const renderMultipleData = ({ selectedData }) => (
    <MultipleSelectedText>
      {`${data?.filter((item) => item.id === +selectedData)?.[0]?.title}`}
    </MultipleSelectedText>
  );
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
        <PressableView
          onPress={() => setShowBottomSheet(true)}
          isLeadChange={isLeadChange}>
          <DropdownLeftView
            isImage={data?.filter((item) => item.id === value)[0]?.image}>
            {
              <ImageView
                source={data?.filter((item) => item.id === value)[0]?.image}
                contentFit="cover"
              />
            }
            <View>
              {isMultiple && Array.isArray(value) ? (
                <FlatList
                  data={value}
                  renderItem={({ item }) =>
                    renderMultipleData({ selectedData: item })
                  }
                  numColumns={2}
                  keyExtractor={(item, index) => `${item} - ${index}`}
                />
              ) : (
                <>
                  {data?.filter((item) => item.id === value)?.[0]?.title ? (
                    <SelectedText>
                      {data?.filter((item) => item.id === value)?.[0]?.title}
                    </SelectedText>
                  ) : (
                    <PlaceHolderText>{placeholder}</PlaceHolderText>
                  )}
                </>
              )}
            </View>
          </DropdownLeftView>
          <ArrowDown />
        </PressableView>
      </DropDownContainer>
      {showBottomSheet && (
        <BottomSheetModal
          backgroundStyle={{ backgroundColor: colors.darkBackground }}
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          topInset={top}
          index={1}
          snapPoints={DropdownBottomSheetSnapPoints}
          onChange={(index) => index === -1 && setShowBottomSheet(false)}>
          <>
            <DropDownTitleText>{dropDownTitle}</DropDownTitleText>
            <Spacer size={16} />
            <BottomSheetFlatList
              keyboardShouldPersistTaps="always"
              data={isDataToShow ? dataToShow : data}
              renderItem={renderDropdownData}
              keyExtractor={(item, index) => `${item.id} - ${index}`}
            />
          </>
        </BottomSheetModal>
      )}
    </>
  );
};

export default DropDown;

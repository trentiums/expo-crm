import React, { useEffect, useState } from 'react';
import {
  ButtonContainer,
  ButtonSubmit,
  ButtonUpdateText,
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
import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';
import { Flexed } from '@atoms/common/common.styles';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownListingProps } from './screen.props';

const DropdownListing: React.FC<DropdownListingProps> = ({
  dropdownData,
  handelSelectData,
  selectedValue,
  dropdownDataType,
  changeRoute,
  changeSnapPoints,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const [dropListData, setDropListData] = useState(dropdownData);
  const [search, setSearch] = useState('');
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    LoadingStatus?.NONE,
  );
  const isBudgetTimeline =
    dropdownDataType === DropdownDataType.BUDGET ||
    dropdownDataType === DropdownDataType.TIMELINE;
  const onLayout = () => {
    if (isBudgetTimeline) {
      changeSnapPoints?.(['50%', '50%']);
    }
  };
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
  const renderDownListData = ({ item }: { item: Dropdown }) => {
    return (
      <DropdownListView
        onPress={() => handelSelectData(item.id)}
        isBorder={item.image}>
        <DropdownListingText variant="SF-Pro-Display-Medium_500">
          {item?.title}
        </DropdownListingText>
        {item.image && <DropDownImage source={item.image} contentFit="cover" />}
        {Array.isArray(selectedValue) && !item.image
          ? selectedValue.includes(item.id) && <CheckCircleIcon />
          : selectedValue === item.id && <CheckCircleIcon />}
      </DropdownListView>
    );
  };
  const handleSave = () => {
    changeRoute();
  };
  return (
    <LeasFilterScreenContainer onLayout={onLayout}>
      <DropdownListingView>
        {dropdownDataType !== DropdownDataType.BUDGET &&
          dropdownDataType !== DropdownDataType.TIMELINE && (
            <SearchFilter
              search={search}
              setSearch={setSearch}
              searchRadius={44}
              dropdownDataType={dropdownDataType}
            />
          )}
        {loadingStatus === LoadingStatus?.SCREEN ? (
          <Loader />
        ) : (
          <Flexed>
            <Flexed>
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
            </Flexed>
            {isBudgetTimeline && (
              <ButtonContainer>
                <ButtonSubmit onPress={handleSave} valid={selectedValue}>
                  <ButtonUpdateText
                    variant="SF-Pro-Display-Semibold_600"
                    valid={selectedValue}>
                    {t('update')}
                  </ButtonUpdateText>
                </ButtonSubmit>
              </ButtonContainer>
            )}
          </Flexed>
        )}
      </DropdownListingView>
    </LeasFilterScreenContainer>
  );
};

export default DropdownListing;

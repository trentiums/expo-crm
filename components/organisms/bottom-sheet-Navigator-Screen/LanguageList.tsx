import React, { useCallback, useState } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
  LoaderContainer,
  ButtonContainer,
  ButtonSubmit,
  ButtonUpdateText,
} from './screen.style';
import { LanguageListProps } from './screen.props';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import BottomSheetItemListing from '@molecules/BottomSheetItemListing/BottomSheetItemListing';

import Loader from '@atoms/Loader/Loader';
import { languageList } from '@utils/constant';
import { changeLanguage, LanguageProps } from '@redux/slices/auth';
import { Flexed } from '@atoms/common/common.styles';

const LanguageList: React.FC<LanguageListProps> = ({
  handleBottomSheetClose,
  changeSnapPoints,
}) => {
  const { t, i18n } = useTranslation('bottomSheetModifyLead');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.auth.currentLanguage,
  );
  const onLayout = useCallback(() => {
    changeSnapPoints(['50%', '50%']);
  }, []);
  const [SelectedId, setSelectedId] = useState(currentLanguage.id);
  const handleItemPress = async (languageId: number) => {
    setIsLoading(true);
    const selectedLanguage = languageList.filter(
      ({ id }) => id === languageId,
    )[0];
    dispatch(changeLanguage(selectedLanguage));
    i18n.changeLanguage(selectedLanguage.shortForm);
    handleBottomSheetClose?.();
    setIsLoading(false);
  };

  const renderLanguageOption = ({
    item,
    index,
  }: {
    item: LanguageProps;
    index: number;
  }) => {
    const isStatusSelected = SelectedId === item.id;
    return (
      <BottomSheetItemListing
        handlePress={() => setSelectedId(item.id)}
        label={t(`${item.name}`)}
        key={`${item.id}-${index}`}
        isSelected={isStatusSelected}
      />
    );
  };
  return (
    <BottomSheetListContainer onLayout={onLayout}>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Flexed>
          <Flexed>
            <BottomSheetFlatListContainer
              data={languageList}
              keyExtractor={(item: LanguageProps, index: number) =>
                `${item.id}-${index}`
              }
              renderItem={renderLanguageOption}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </Flexed>
          <ButtonContainer>
            <ButtonSubmit
              onPress={() => handleItemPress(SelectedId)}
              loading={isLoading}
              valid={SelectedId}>
              <ButtonUpdateText
                valid={SelectedId}
                variant="SF-Pro-Display-Semibold_600">
                {t('update')}
              </ButtonUpdateText>
            </ButtonSubmit>
          </ButtonContainer>
        </Flexed>
      )}
    </BottomSheetListContainer>
  );
};

export default LanguageList;

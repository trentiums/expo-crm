import React, { useCallback, useState } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
  LoaderContainer,
} from './screen.style';
import { LanguageListProps } from './screen.props';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import BottomSheetItemListing from '@molecules/BottomSheetItemListing/BottomSheetItemListing';

import Loader from '@atoms/Loader/Loader';
import { languageList } from '@utils/constant';
import { changeLanguage, LanguageProps } from '@redux/slices/auth';

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
    changeSnapPoints(['25%', '90%']);
  }, []);

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
    const isStatusSelected = currentLanguage.id === item.id;
    return (
      <BottomSheetItemListing
        handlePress={() => handleItemPress(item.id)}
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
        <BottomSheetFlatListContainer
          data={languageList}
          keyExtractor={(item: LanguageProps, index: number) =>
            `${item.id}-${index}`
          }
          renderItem={renderLanguageOption}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </BottomSheetListContainer>
  );
};

export default LanguageList;

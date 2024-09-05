import React from 'react';
import {
  AddButton,
  AddText,
  Container,
  ScreenTemplateView,
} from './ScreenTemplate.styles';
import { ScreenTemplateProps } from './ScreenTemplate.props';
import PlusIcon from '@atoms/Illustrations/PlusIcon';
import { useAppTheme } from '@constants/theme';
import TitleWithButton from '@molecules/TitleWithButton/TitleWithButton';
import { router } from 'expo-router';
import MoreMenuButton from '@molecules/MoreMenuButton/MoreMenuButton';

const ScreenTemplate: React.FC<ScreenTemplateProps> = ({
  children,
  safeAreaProps,
  backgroundColor,
  addButtonText,
  onAddButtonPress,
  isDrawerBtn,
  title,
}) => {
  const { colors } = useAppTheme();
  return (
    <Container {...safeAreaProps} backgroundColor={backgroundColor}>
      {title && (
        <TitleWithButton text={title} btnBackPress={() => router?.back()} />
      )}
      {isDrawerBtn && <MoreMenuButton />}
      <ScreenTemplateView>
        {children}
        {!!addButtonText && (
          <AddButton onPress={() => onAddButtonPress?.()}>
            <PlusIcon color={colors.bgColor} />
            <AddText>{addButtonText}</AddText>
          </AddButton>
        )}
      </ScreenTemplateView>
    </Container>
  );
};

export default ScreenTemplate;

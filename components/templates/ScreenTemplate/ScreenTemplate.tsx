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
import MoreMenuButton from '@molecules/MoreMenuButton/MoreMenuButton';
import TitleWithButton from '@molecules/TitleWithButton/TitleWithButton';

const ScreenTemplate: React.FC<ScreenTemplateProps> = ({
  children,
  safeAreaProps,
  backgroundColor,
  addButtonText,
  onAddButtonPress,
  moreVisible,
  title,
  onBackPress,
}) => {
  const { colors } = useAppTheme();
  return (
    <Container {...safeAreaProps} backgroundColor={backgroundColor}>
      {!!title && <TitleWithButton text={title} onBackPress={onBackPress} />}
      {moreVisible && <MoreMenuButton />}
      <ScreenTemplateView>
        {children}
        {!!addButtonText && (
          <AddButton onPress={() => onAddButtonPress?.()}>
            <PlusIcon color={colors?.bgColor} />
            <AddText>{addButtonText}</AddText>
          </AddButton>
        )}
      </ScreenTemplateView>
    </Container>
  );
};

export default ScreenTemplate;

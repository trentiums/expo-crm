import React from 'react';
import { AddButton, AddText, Container } from './ScreenTemplate.styles';
import { ScreenTemplateProps } from './ScreenTemplate.props';
import PlusIcon from '@atoms/Illustrations/PlusIcon';
import { useAppTheme } from '@constants/theme';
import MoreMenuButton from '@molecules/MoreMenuButton/MoreMenuButton';

const ScreenTemplate: React.FC<ScreenTemplateProps> = ({
  children,
  safeAreaProps,
  backgroundColor,
  addButtonText,
  onAddButtonPress,
}) => {
  const { colors } = useAppTheme();
  return (
    <Container {...safeAreaProps} backgroundColor={backgroundColor}>
      <MoreMenuButton />
      {children}
      {!!addButtonText && (
        <AddButton onPress={() => onAddButtonPress?.()}>
          <PlusIcon color={colors?.bgColor} />
          <AddText>{addButtonText}</AddText>
        </AddButton>
      )}
    </Container>
  );
};

export default ScreenTemplate;

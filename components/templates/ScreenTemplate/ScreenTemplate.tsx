import React from 'react';
import {
  AddButton,
  AddText,
  Container,
  SafeAreaContainer,
  ScreenTemplateView,
} from './ScreenTemplate.styles';
import { ScreenTemplateProps } from './ScreenTemplate.props';
import PlusIcon from '@atoms/Illustrations/PlusIcon';
import { useAppTheme } from '@constants/theme';
import TitleWithButton from '@molecules/TitleWithButton/TitleWithButton';
import MoreMenuButton from '@molecules/MoreMenuButton/MoreMenuButton';

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
  return (
    <SafeAreaContainer>
      <Container backgroundColor={backgroundColor}>
        {!!title && <TitleWithButton text={title} onBackPress={onBackPress} />}
        {moreVisible && <MoreMenuButton />}
        <ScreenTemplateView>{children}</ScreenTemplateView>
      </Container>
    </SafeAreaContainer>
  );
};

export default ScreenTemplate;

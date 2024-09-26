import React from 'react';
import {
  Container,
  SafeAreaContainer,
  ScreenTemplateView,
} from './ScreenTemplate.styles';
import { ScreenTemplateProps } from './ScreenTemplate.props';
import TitleWithButton from '@molecules/TitleWithButton/TitleWithButton';
import MoreMenuButton from '@molecules/MoreMenuButton/MoreMenuButton';

const ScreenTemplate: React.FC<ScreenTemplateProps> = ({
  children,
  backgroundColor,
  moreVisible,
  title,
  onBackPress,
}) => {
  return (
    <SafeAreaContainer
      edges={title ? ['top', 'left', 'right'] : ['left', 'right']}>
      <Container backgroundColor={backgroundColor}>
        {!!title && <TitleWithButton text={title} onBackPress={onBackPress} />}
        {moreVisible && <MoreMenuButton />}
        <ScreenTemplateView>{children}</ScreenTemplateView>
      </Container>
    </SafeAreaContainer>
  );
};

export default ScreenTemplate;

import { useAppTheme } from '@constants/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LeadStageProps } from './LeadStage.props';
import { LeadStageType } from '@organisms/LeadDetailCard/LeadDetailCard.props';
import { LeadStageContainer, LeadStageText } from './LeadStage.styles';

const LeadStage: React.FC<LeadStageProps> = ({ leadStage }) => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('leadStage');
  switch (leadStage) {
    case LeadStageType.PROPOSED:
      return (
        <LeadStageContainer bgColor={colors.lightYellow}>
          <LeadStageText
            color={colors.yellow}
            variant="SF-Pro-Display-Medium_500">
            {t('proposed')}
          </LeadStageText>
        </LeadStageContainer>
      );

    case LeadStageType.CLOSEWON:
      return (
        <LeadStageContainer bgColor={colors.lightBlue}>
          <LeadStageText
            color={colors.blue}
            variant="SF-Pro-Display-Medium_500">
            {t('closedWon')}
          </LeadStageText>
        </LeadStageContainer>
      );
    case LeadStageType.NEGOTIATION:
      return (
        <LeadStageContainer bgColor={colors.redLight}>
          <LeadStageText color={colors.red} variant="SF-Pro-Display-Medium_500">
            {t('negotiation')}
          </LeadStageText>
        </LeadStageContainer>
      );

    case LeadStageType.CLOSELOST:
      return (
        <LeadStageContainer bgColor={colors.gray}>
          <LeadStageText
            color={colors.textDark}
            variant="SF-Pro-Display-Medium_500">
            {t('closedLost')}
          </LeadStageText>
        </LeadStageContainer>
      );

    case LeadStageType.INITIAL:
      return (
        <LeadStageContainer bgColor={colors.boogieBlast12}>
          <LeadStageText
            color={colors.green}
            variant="SF-Pro-Display-Medium_500">
            {t('initial')}
          </LeadStageText>
        </LeadStageContainer>
      );

    default:
      return null;
  }
};

export default LeadStage;

import React from 'react';
import { LeadStatusContainer, LeadStatusText } from './LeadStatus.styles';
import { LeadStatusProps } from './LeadStatus.props';
import { LeadStatusTypes } from '@organisms/LeadDetailCard/LeadDetailCard.props';
import { useAppTheme } from '@constants/theme';
import { useTranslation } from 'react-i18next';

const LeadStatus: React.FC<LeadStatusProps> = ({ leadStatus }) => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('leadStatus');
  switch (leadStatus) {
    case LeadStatusTypes.CONTACTED:
      return (
        <LeadStatusContainer bgColor={colors.lightYellow}>
          <LeadStatusText color={colors.yellow}>
            {t('contacted')}
          </LeadStatusText>
        </LeadStatusContainer>
      );

    case LeadStatusTypes.QUALIFIED:
      return (
        <LeadStatusContainer bgColor={colors.lightBlue}>
          <LeadStatusText color={colors.blue}>{t('qualified')}</LeadStatusText>
        </LeadStatusContainer>
      );

    case LeadStatusTypes.UNQUALIFIED:
      return (
        <LeadStatusContainer bgColor={colors.lightRed}>
          <LeadStatusText color={colors.red}>{t('unQualified')}</LeadStatusText>
        </LeadStatusContainer>
      );

    case LeadStatusTypes.NEW:
      return (
        <LeadStatusContainer bgColor={colors.boogieBlast12}>
          <LeadStatusText color={colors.green}>{t('new')}</LeadStatusText>
        </LeadStatusContainer>
      );

    default:
      return (
        <LeadStatusContainer>
          <LeadStatusText>{t('contacted')}</LeadStatusText>
        </LeadStatusContainer>
      );
  }
};

export default LeadStatus;

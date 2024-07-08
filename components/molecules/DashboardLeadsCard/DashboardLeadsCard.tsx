import React from 'react';
import { DashboardLeadsCardProps } from './DashboardLeadsCard.props';
import {
  LeadIcon,
  LeadsCount,
  LeadsCountView,
  LeadsText,
  DashboardLeadsCardContainer,
} from './DashboardLeadsCard.styles';
import { Spacer } from '@atoms/common/common.styles';

const DashboardLeadsCard: React.FC<DashboardLeadsCardProps> = ({
  title,
  icon,
  scoreColor,
  leads,
}) => {
  return (
    <DashboardLeadsCardContainer>
      <LeadsText>{title}</LeadsText>
      <Spacer size={20} />
      <LeadsCountView>
        <LeadIcon>{icon}</LeadIcon>
        <LeadsCount scoreColor={scoreColor}>{leads}</LeadsCount>
      </LeadsCountView>
    </DashboardLeadsCardContainer>
  );
};

export default DashboardLeadsCard;

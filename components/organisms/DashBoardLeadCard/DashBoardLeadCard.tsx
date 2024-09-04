import React from 'react';
import { LeadDetailCardContainer } from './DashBoardLeadCard.styles';
import { Spacer } from '@atoms/common/common.styles';
import { DashBoardLeadCardProps } from './DashBoardLeadCard.props';
import LeadDetail from '@molecules/LeadDetail/LeadDetail';

const DashBoardLeadCard: React.FC<DashBoardLeadCardProps> = ({ leadData }) => {
  return (
    <>
      <LeadDetailCardContainer isActive={false}>
        <LeadDetail leadData={leadData} />
      </LeadDetailCardContainer>
      <Spacer size={16} />
    </>
  );
};

export default DashBoardLeadCard;

import React from 'react';
import { LeadDetailCardContainer } from './LeadDetailCard.styles';
import { LeadDetailCardProps } from './LeadDetailCard.props';
import LeadDetail from '@molecules/LeadDetail/LeadDetail';

const LeadDetailCard: React.FC<LeadDetailCardProps> = ({
  phoneNumber,
  title,
  email,
  createdAt,
  leadId,
  optionType,
}) => {
  return (
    <LeadDetailCardContainer isActive={false}>
      <LeadDetail
        leadData={{
          phone: phoneNumber,
          email: email,
          name: title,
          createdAt,
          leadId: leadId,
        }}
        isShowLeadInfo
        isSocialMediaVisible
        optionType={optionType}
      />
    </LeadDetailCardContainer>
  );
};

export default LeadDetailCard;

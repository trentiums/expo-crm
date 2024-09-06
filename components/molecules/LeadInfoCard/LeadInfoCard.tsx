import React from 'react';
import {
  LeadInfoCardContainer,
  LeadInfoContainer,
  LeadInfoTitle,
  LeadInfoValue,
} from './LeadInfoCard.styles';
import PhoneIcon from '@atoms/Illustrations/PhoneIcon';
import { LeadInfoProps } from './LeadInfoCard.props';
import EmailIcon from '@atoms/Illustrations/Email';
import ProductServices from '@atoms/Illustrations/ProductService';
import StageIcon from '@atoms/Illustrations/StageIcon';
import ChannelIcon from '@atoms/Illustrations/ChannelIcon';
import AssignedToIcon from '@atoms/Illustrations/AssignedToIcon';

const LeadInfoCard: React.FC<LeadInfoProps> = ({ data }) => {
  const leadInfo = [
    {
      icon: <PhoneIcon />,
      value: data.phone,
    },
    {
      icon: <EmailIcon />,
      value: data.email,
    },
    {
      title: 'Services',
      icon: <ProductServices />,
    },
    {
      title: 'Stage',
      icon: <StageIcon />,
    },
    {
      title: 'Channel',
      icon: <ChannelIcon />,
      value: data.channel,
    },
    {
      title: 'assignedTo',
      icon: <AssignedToIcon />,
      value: data.assignedTo,
    },
  ];
  const renderLeadInfo = ({ icon, title, value }) => {
    return (
      <LeadInfoContainer>
        {icon}
        {title && <LeadInfoTitle>{`${title}: `}</LeadInfoTitle>}
        {value && <LeadInfoValue>{value}</LeadInfoValue>}
      </LeadInfoContainer>
    );
  };
  return <LeadInfoCardContainer></LeadInfoCardContainer>;
};

export default LeadInfoCard;

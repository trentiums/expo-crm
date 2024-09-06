import React from 'react';
import {
  LeadAssignedToContainer,
  LeadInfoCardContainer,
  LeadInfoContainer,
  LeadInfoTitle,
  LeadInfoValue,
  LeadServicesContainer,
  LeadServicesText,
  ServiceListContainer,
} from './LeadInfoCard.styles';
import PhoneIcon from '@atoms/Illustrations/PhoneIcon';
import { LeadInfoProps } from './LeadInfoCard.props';
import EmailIcon from '@atoms/Illustrations/Email';
import StageIcon from '@atoms/Illustrations/StageIcon';
import ChannelIcon from '@atoms/Illustrations/ChannelIcon';
import AssignedToIcon from '@atoms/Illustrations/AssignedToIcon';
import { RootState, useSelector } from '@redux/store';
import { FlatList, ListRenderItem } from 'react-native';
import { useAppTheme } from '@constants/theme';
import LeadStage from '@molecules/LeadStage/LeadStage';
import ProfileIcon from '@atoms/Illustrations/Profile';
import ProductServices from '@atoms/Illustrations/ProductService';
import View from '@atoms/View/View';

const LeadInfoCard: React.FC<LeadInfoProps> = ({ leadId }) => {
  const { colors } = useAppTheme();
  const leads = useSelector((state: RootState) => state.leads.leadList.leads);
  const leadDetail = leads.find((item) => item.id === leadId);
  const generalLists = useSelector((state: RootState) => state.general);
  const leadAssignToData = useSelector(
    (state: RootState) => state.user.assignUserList,
  );
  const servicesTitle = ['xyz', 'abc'];
  const leadInfo = [
    {
      key: 'phone',
      icon: <PhoneIcon />,
      value: leadDetail.phone && (
        <LeadInfoValue>{leadDetail.phone}</LeadInfoValue>
      ),
    },
    {
      key: 'email',
      icon: <EmailIcon color={colors.modernLavender} />,
      value: leadDetail.email && (
        <LeadInfoValue>{leadDetail.email}</LeadInfoValue>
      ),
    },
    {
      key: 'services',
      title: 'Services',
      icon: <ProductServices />,
      value: (
        <ServiceListContainer
          data={servicesTitle}
          renderItem={({ item }) => <LeadServicesText>{item}</LeadServicesText>}
          keyExtractor={(item, index) => index.toString()}
        />
      ),
    },
    {
      key: 'stage',
      title: 'Stage',
      icon: <StageIcon />,
      value: <LeadStage leadStage={leadDetail.leadStatusId} />,
    },
    {
      key: 'channel',
      title: 'Channel',
      icon: <ChannelIcon />,
      value: (
        <LeadInfoValue>
          {
            generalLists?.leadChannelList?.filter(
              (item) => item.id === leadDetail.leadChannelId,
            )[0]?.name
          }
        </LeadInfoValue>
      ),
    },
    {
      key: 'assignedTo',
      title: 'Assigned To',
      icon: <AssignedToIcon />,
      value: leadDetail.assignTo && (
        <LeadAssignedToContainer>
          <ProfileIcon />
          <LeadInfoValue>
            {
              leadAssignToData.filter(
                (item) => item.id === leadDetail.assignTo,
              )[0]?.title
            }
          </LeadInfoValue>
        </LeadAssignedToContainer>
      ),
    },
  ];
  const renderLeadInfo: ListRenderItem<(typeof leadInfo)[0]> = ({ item }) => (
    <LeadInfoContainer>
      {item.icon}
      {item.title && <LeadInfoTitle>{`${item.title}: `}</LeadInfoTitle>}
      {item.value}
    </LeadInfoContainer>
  );

  return (
    <LeadInfoCardContainer>
      <FlatList
        data={leadInfo?.filter((item) => item.value)}
        renderItem={renderLeadInfo}
        keyExtractor={(item) => item.key}
      />
    </LeadInfoCardContainer>
  );
};

export default LeadInfoCard;

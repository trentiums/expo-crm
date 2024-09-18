import React from 'react';
import {
  LeadAssignedToContainer,
  LeadInfoCardContainer,
  LeadInfoContainer,
  LeadInfoTitle,
  LeadInfoValue,
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
import { useTranslation } from 'react-i18next';
import ServicesComputerIcon from '@atoms/Illustrations/ServicesComputer';

const LeadInfoCard: React.FC<LeadInfoProps> = ({ leadId }) => {
  const { t } = useTranslation('LeadInfoCard');
  const { colors } = useAppTheme();
  const leads = useSelector((state: RootState) => state.leads.leadList.leads);
  const leadDetail = leads.find((item) => item.id === leadId);
  const generalLists = useSelector((state: RootState) => state.general);
  const leadAssignToData = useSelector(
    (state: RootState) => state.user.assignUserList,
  );
  const servicesTitle =
    leadDetail?.productService?.map((item) => item.name) || '';
  const channelName = generalLists?.leadChannelList?.filter(
    (item) => item?.id === leadDetail?.leadChannelId,
  )?.[0]?.name;
  const assignedName =
    leadAssignToData?.assignUsers?.filter(
      (item) => item?.id === leadDetail?.assignTo,
    )?.[0]?.title || '';
  const leadInfo = [
    {
      key: t('phone'),
      icon: <PhoneIcon />,
      value: leadDetail?.phone && (
        <LeadInfoValue>{leadDetail?.phone}</LeadInfoValue>
      ),
    },
    {
      key: t('email'),
      icon: <EmailIcon color={colors.modernLavender} />,
      value: leadDetail?.email && (
        <LeadInfoValue>{leadDetail?.email}</LeadInfoValue>
      ),
    },
    {
      key: t('services'),
      title: t('services'),
      icon: <ServicesComputerIcon color={colors.modernLavender} />,
      value: (
        <ServiceListContainer
          data={servicesTitle}
          renderItem={({ item }) => <LeadServicesText>{item}</LeadServicesText>}
          keyExtractor={(item, index) => index.toString()}
        />
      ),
    },
    {
      key: t('stage'),
      title: t('stage'),
      icon: <StageIcon />,
      value: <LeadStage leadStage={leadDetail?.leadStatusId} />,
    },
    {
      key: t('channel'),
      title: t('channel'),
      icon: <ChannelIcon />,
      value: <LeadInfoValue>{channelName}</LeadInfoValue>,
    },
    {
      key: t('assignedTo'),
      title: t('assignedTo'),
      icon: <AssignedToIcon />,
      value: leadDetail?.assignTo && (
        <LeadAssignedToContainer>
          <ProfileIcon />
          <LeadInfoValue>{assignedName}</LeadInfoValue>
        </LeadAssignedToContainer>
      ),
    },
  ];
  const renderLeadInfo: ListRenderItem<(typeof leadInfo)[0]> = ({
    item,
    index,
  }) => (
    <LeadInfoContainer isItemsStarts={item.key === t('services')}>
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

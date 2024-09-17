import React from 'react';
import {
  CompanyDashboardCardContainer,
  LeadCount,
  LeadFlatListCon,
  LeadsCountContainer,
  LeadsStatusDetailContainer,
  LeadTitle,
  TotalLeadsCountContainer,
  TotalLeadTitle,
  UserInformationContainer,
  UserNameText,
} from './CompanyDashboardCard.styles';
import ProfileIcon from '@atoms/Illustrations/Profile';
import { CompanyDashboardCardProps, Leads } from './CompanyDashboardCard.props';
import { Spacer } from '@atoms/common/common.styles';
import { useAppTheme } from '@constants/theme';
import { useTranslation } from 'react-i18next';

const CompanyDashboardCard: React.FC<CompanyDashboardCardProps> = ({
  name,
  leads,
  leadsCount,
}) => {
  const { t } = useTranslation('dashBoard');
  const { colors } = useAppTheme();
  const renderLeads = ({ item }: { item: Leads }) => {
    return (
      <LeadsCountContainer>
        <LeadTitle bgColor={item.bgColor} color={item.color}>
          {item.title}
        </LeadTitle>
        <LeadCount>{item.value}</LeadCount>
      </LeadsCountContainer>
    );
  };

  return (
    <CompanyDashboardCardContainer>
      <UserInformationContainer>
        <ProfileIcon />
        <UserNameText numberOfLines={1}>{name}</UserNameText>
      </UserInformationContainer>
      <Spacer size={16} />
      <LeadsStatusDetailContainer>
        <TotalLeadsCountContainer>
          <TotalLeadTitle color={colors.englishHolly}>
            {t('totalLeads')}
          </TotalLeadTitle>
          <LeadCount>{leadsCount}</LeadCount>
        </TotalLeadsCountContainer>
        <LeadFlatListCon
          data={leads}
          renderItem={renderLeads}
          keyExtractor={(item, index) => index.toString()}
        />
      </LeadsStatusDetailContainer>
    </CompanyDashboardCardContainer>
  );
};

export default CompanyDashboardCard;

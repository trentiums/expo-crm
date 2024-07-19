import React from 'react';
import {
  LeadSelectContainer,
  LeadSelectSubContainer,
  SelectTitleText,
} from './LeadSelect.styles';
import { Spacer } from '@atoms/common/common.styles';
import { useTranslation } from 'react-i18next';
import { LeadListProps, LeadSelectProps } from './LeadSelect.props';
import { FieldDropDownContainer } from '@organisms/LeadDetailsForm/LeadDetailsForm.styles';
import DropDown from '@atoms/DropDown/DropDown';
import { RootState, useSelector } from '@redux/store';
import { userRole } from '@type/api/auth';

const LeadSelect: React.FC<LeadSelectProps> = ({
  channelList,
  leadList,
  StageList,
  setSelectedChannel,
  selectedChannel,
  selectedLead,
  setSelectedLead,
  setSelectedStage,
  selectedStage,
  leadCardId,
}) => {
  const { t } = useTranslation('leadDetailList');

  const channelListData = channelList?.map((item) => {
    return { value: item?.id, label: item?.name };
  });
  const leadListData = leadList?.map((item) => {
    return { value: item?.id, label: item?.name };
  });
  const StageListData = StageList?.map((item) => {
    return { value: item?.id, label: item?.name };
  });
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.userRole !== userRole.CompanyStaff;
  return (
    <LeadSelectContainer>
      <LeadSelectSubContainer>
        <SelectTitleText>{t('leadChannel')}</SelectTitleText>
        <Spacer size={10} />
        <FieldDropDownContainer isError={false}>
          <DropDown
            data={channelListData}
            placeholder={t('leadChannel')}
            value={selectedChannel}
            onChange={(value: LeadListProps) => {
              setSelectedChannel(leadCardId, value?.value);
            }}
            isStaff={!isAdmin}
          />
        </FieldDropDownContainer>
      </LeadSelectSubContainer>
      <LeadSelectSubContainer>
        <SelectTitleText>{t('leadStatus')}</SelectTitleText>
        <Spacer size={10} />
        <FieldDropDownContainer isError={false}>
          <DropDown
            data={leadListData}
            placeholder={t('leadStatus')}
            value={selectedLead}
            onChange={(value: LeadListProps) => {
              setSelectedLead(leadCardId, value?.value);
            }}
          />
        </FieldDropDownContainer>
      </LeadSelectSubContainer>
      <LeadSelectSubContainer>
        <SelectTitleText>{t('LeadStage')}</SelectTitleText>
        <Spacer size={10} />
        <FieldDropDownContainer isError={false}>
          <DropDown
            data={StageListData}
            placeholder={t('LeadStage')}
            value={selectedStage}
            onChange={(value: LeadListProps) => {
              setSelectedStage(leadCardId, value?.value);
            }}
          />
        </FieldDropDownContainer>
      </LeadSelectSubContainer>
    </LeadSelectContainer>
  );
};

export default LeadSelect;

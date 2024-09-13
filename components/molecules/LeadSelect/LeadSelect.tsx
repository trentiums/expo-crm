import React from 'react';
import {
  LeadSelectContainer,
  LeadSelectSubContainer,
  SelectTitleText,
} from './LeadSelect.styles';
import { useTranslation } from 'react-i18next';
import { LeadListProps, LeadSelectProps } from './LeadSelect.props';
import { RootState, useSelector } from '@redux/store';
import { UserRole } from '@type/api/auth';
import DropDown from '@molecules/DropDown/DropDown';

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
  assignedTo,
  setAssignTo,
}) => {
  const { t } = useTranslation('leadDetailList');
  const { t: tl } = useTranslation('leadDetailList');
  const channelListData = channelList?.map((item) => {
    return { id: item?.id, title: item?.name };
  });
  const leadListData = leadList?.map((item) => {
    return { id: item?.id, title: item?.name };
  });
  const StageListData = StageList?.map((item) => {
    return { id: item?.id, title: item?.name };
  });
  const leadAssignToData = useSelector(
    (state: RootState) => state.user.assignUserList,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.userRole !== UserRole.CompanyStaff;
  return (
    <>
      <LeadSelectContainer>
        <LeadSelectSubContainer>
          <SelectTitleText>{t('channel')}</SelectTitleText>
          <DropDown
            data={channelListData}
            placeholder={t('leadChannel')}
            value={selectedChannel}
            onChange={(value: LeadListProps) => {
              setSelectedChannel(leadCardId, value);
            }}
            isStaff={!isAdmin}
            dropDownTitle={`${t('leadChannel')} ${t('list')}`}
            isLeadChange
            isDisabled={!isAdmin}
          />
        </LeadSelectSubContainer>
        <LeadSelectSubContainer>
          <SelectTitleText>{t('status')}</SelectTitleText>
          <DropDown
            data={leadListData}
            placeholder={t('leadStatus')}
            value={selectedLead}
            onChange={(value: LeadListProps) => {
              setSelectedLead(leadCardId, value);
            }}
            dropDownTitle={`${t('leadStatus')} ${t('list')}`}
            isLeadChange
          />
        </LeadSelectSubContainer>
      </LeadSelectContainer>
      <LeadSelectContainer>
        <LeadSelectSubContainer>
          <SelectTitleText>{t('stage')}</SelectTitleText>
          <DropDown
            data={StageListData}
            placeholder={t('LeadStage')}
            value={selectedStage}
            onChange={(value: LeadListProps) => {
              setSelectedStage(leadCardId, value);
            }}
            dropDownTitle={`${t('LeadStage')} ${t('list')}`}
            isLeadChange
          />
        </LeadSelectSubContainer>
        <LeadSelectSubContainer>
          <SelectTitleText>{`${tl('assignTo')}`}</SelectTitleText>
          <DropDown
            data={leadAssignToData}
            placeholder={tl('assignTo')}
            value={assignedTo}
            onChange={(value: any) => {
              if (assignedTo === value) {
                setAssignTo();
              } else {
                setAssignTo(leadCardId, value);
              }
            }}
            dropDownTitle={`${t('assignTo')} ${t('list')}`}
            dataToShow={leadAssignToData?.filter(
              (item) => item.id !== assignedTo,
            )}
            isDataToShow
            isLeadChange
          />
        </LeadSelectSubContainer>
      </LeadSelectContainer>
    </>
  );
};

export default LeadSelect;

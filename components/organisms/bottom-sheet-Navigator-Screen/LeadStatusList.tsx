import React, { useCallback, useEffect } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
} from './screen.style';
import { LeadStatusListItemProps, LeadStatusListProps } from './screen.props';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import BottomSheetItemListing from '@molecules/BottomSheetItemListing/BottomSheetItemListing';
import { leadStatusListAction } from '@redux/actions/general';
import { LeadStatusTypes } from '@organisms/LeadDetailCard/LeadDetailCard.props';
import {
  getLeadDetailsAction,
  updateLeadStatusAction,
} from '@redux/actions/lead';
import { UpdateLeadStatusParams, updateLeadStatusTypes } from '@type/api/lead';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';

const LeadStatusList: React.FC<LeadStatusListProps> = ({
  handleBottomSheetClose,
  leadId,
  navigation,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const dispatch = useAppDispatch();
  const leadStatusList = useSelector(
    (state: RootState) => state.general.leadStatusList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const getLeadStatusList = async () => {
    await dispatch(leadStatusListAction());
  };

  const handleItemPress = async (statusId: number) => {
    const leadStatusId = leadsDetail.leadStatusId;
    if (
      (statusId === LeadStatusTypes.CONTACTED ||
        statusId === LeadStatusTypes.QUALIFIED ||
        statusId === LeadStatusTypes.UNQUALIFIED) &&
      statusId !== leadStatusId
    ) {
      const slug = {
        leadId: leadId,
        leadStatusId: statusId,
      };
      statusId !== leadStatusId &&
        navigation.navigate('LeadStatusChange', slug);
    } else {
      if (leadStatusId !== statusId) {
        const updatedLeadStatusRequestParams: UpdateLeadStatusParams = {
          type: updateLeadStatusTypes.STATUS,
          lead_id: leadId,
          lead_status_id: statusId,
        };
        await dispatch(
          updateLeadStatusAction(updatedLeadStatusRequestParams),
        ).unwrap();
        await dispatch(getLeadDetailsAction({ lead_id: leadId }));
        dispatch(dashboardLeadListAction({}));
        dispatch(dashboardLeadStageCountAction());
      }
      handleBottomSheetClose?.();
    }
  };

  const handleRefresh = useCallback(() => {
    getLeadStatusList();
  }, []);

  const renderModifyLeadOption = ({
    item,
    index,
  }: {
    item: LeadStatusListItemProps;
    index: number;
  }) => {
    const isStatusSelected = leadsDetail.leadStatusId === item.id;
    return (
      <BottomSheetItemListing
        handlePress={() => handleItemPress(item.id)}
        label={t(`${item.name}`)}
        key={`${item.id}-${index}`}
        isSelected={isStatusSelected}
      />
    );
  };
  return (
    <BottomSheetListContainer>
      <BottomSheetFlatListContainer
        data={leadStatusList}
        keyExtractor={(item: LeadStatusListItemProps, index: number) =>
          `${item.id}-${index}`
        }
        renderItem={renderModifyLeadOption}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={false}
        onRefresh={handleRefresh}
      />
    </BottomSheetListContainer>
  );
};

export default LeadStatusList;

import React, { useCallback, useEffect } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
} from './screen.style';
import { LeadStageListItemProps, LeadStageListProps } from './screen.props';
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

const LeadStageList: React.FC<LeadStageListProps> = ({
  changeRoute,
  leadId,
  navigation,
  changeSnapPoints,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const dispatch = useAppDispatch();
  const leadStatusList = useSelector(
    (state: RootState) => state.general.leadConversionList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const getAssignUserList = async () => {
    await dispatch(leadStatusListAction());
  };
  const onLayout = useCallback(() => {
    changeSnapPoints(['40%', '90%']);
  }, []);

  const handleItemPress = async (ItemId: number) => {
    const leadStatusId = leadsDetail.leadStatusId;
    if (
      (ItemId === LeadStatusTypes.CONTACTED ||
        ItemId === LeadStatusTypes.QUALIFIED ||
        ItemId === LeadStatusTypes.UNQUALIFIED) &&
      ItemId !== leadStatusId
    ) {
      const slug = {
        leadId: leadId,
        leadStatusId: ItemId,
      };
      ItemId !== leadStatusId && navigation.navigate('LeadStatusChange', slug);
    } else {
      if (leadStatusId !== ItemId) {
        const updatedLeadStatusRequestParams: UpdateLeadStatusParams = {
          type: updateLeadStatusTypes.STATUS,
          lead_id: leadId,
          lead_status_id: ItemId,
        };
        await dispatch(
          updateLeadStatusAction(updatedLeadStatusRequestParams),
        ).unwrap();
        await dispatch(getLeadDetailsAction({ lead_id: leadId }));
      }
      changeRoute?.();
    }
  };

  const handleRefresh = useCallback(() => {
    getAssignUserList();
  }, []);

  const renderModifyLeadOption = ({
    item,
    index,
  }: {
    item: LeadStageListItemProps;
    index: number;
  }) => {
    const isStatusSelected = !!(leadsDetail.leadStatusId === item.id);
    return (
      <BottomSheetItemListing
        handlePress={() => handleItemPress(item.id)}
        label={t(`${item.name}`)}
        key={`${item.id}-${index}`}
        VisibleSelected={isStatusSelected}
      />
    );
  };
  return (
    <BottomSheetListContainer onLayout={onLayout}>
      <BottomSheetFlatListContainer
        data={leadStatusList}
        keyExtractor={(item: LeadStageListItemProps, index: number) =>
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

export default LeadStageList;

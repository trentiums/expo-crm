import React, { useCallback } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
} from './screen.style';
import { LeadStageListItemProps, LeadStageListProps } from './screen.props';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import BottomSheetItemListing from '@molecules/BottomSheetItemListing/BottomSheetItemListing';
import { leadConversionListAction } from '@redux/actions/general';
import { LeadStageType } from '@organisms/LeadDetailCard/LeadDetailCard.props';
import {
  getLeadDetailsAction,
  updateLeadStatusAction,
} from '@redux/actions/lead';
import { UpdateLeadStatusParams, updateLeadStatusTypes } from '@type/api/lead';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';

const LeadStageList: React.FC<LeadStageListProps> = ({
  handleBottomSheetClose,
  leadId,
  navigation,
  changeSnapPoints,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const dispatch = useAppDispatch();
  const leadStageList = useSelector(
    (state: RootState) => state.general.leadConversionList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const getLeadStageList = async () => {
    await dispatch(leadConversionListAction());
  };
  const onLayout = useCallback(() => {
    changeSnapPoints(['35%', '90%']);
  }, []);

  const handleItemPress = async (conversionId: number) => {
    const leadConversionId = leadsDetail.leadConversionId;
    const slug = { leadId: leadId, leadConversionId: conversionId };
    if (
      (conversionId === LeadStageType.CLOSELOST ||
        conversionId === LeadStageType.CLOSEWON) &&
      conversionId !== leadConversionId
    ) {
      navigation.navigate('LeadStageCloseWon', slug);
    } else if (
      conversionId === LeadStageType?.NEGOTIATION &&
      leadConversionId !== conversionId
    ) {
      navigation.navigate('LeadStageNegotiation', slug);
    } else {
      if (leadConversionId !== conversionId) {
        const updatedLeadStatusRequestParams: UpdateLeadStatusParams = {
          type: updateLeadStatusTypes.CONVERSION,
          lead_id: leadId,
          lead_conversion_id: conversionId,
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
    getLeadStageList();
  }, []);

  const renderModifyLeadOption = ({
    item,
    index,
  }: {
    item: LeadStageListItemProps;
    index: number;
  }) => {
    const isStatusSelected = leadsDetail.leadConversionId === item.id;
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
    <BottomSheetListContainer onLayout={onLayout}>
      <BottomSheetFlatListContainer
        data={leadStageList}
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

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

  const handleItemPress = async (ItemId: number) => {
    const leadConversionId = leadsDetail.leadConversionId;
    if (
      (ItemId === LeadStageType.CLOSELOST ||
        ItemId === LeadStageType.CLOSEWON) &&
      ItemId !== leadConversionId
    ) {
      const slug = { leadId: leadId, leadConversionId: ItemId };
      navigation.navigate('LeadStageCloseWon', slug);
    } else if (
      ItemId === LeadStageType?.NEGOTIATION &&
      leadConversionId !== ItemId
    ) {
      const slug = {
        leadId: leadId,
        leadConversionId: ItemId,
      };
      navigation.navigate('LeadStageNegotiation', slug);
    } else {
      if (leadConversionId !== ItemId) {
        const updatedLeadStatusRequestParams: UpdateLeadStatusParams = {
          type: updateLeadStatusTypes.CONVERSION,
          lead_id: leadId,
          lead_conversion_id: ItemId,
        };
        await dispatch(
          updateLeadStatusAction(updatedLeadStatusRequestParams),
        ).unwrap();
        await dispatch(getLeadDetailsAction({ lead_id: leadId }));
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
    const isStatusSelected = !!(leadsDetail.leadConversionId === item.id);
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

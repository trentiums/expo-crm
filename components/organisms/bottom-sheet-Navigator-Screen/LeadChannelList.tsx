import React, { useCallback, useState } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
  LoaderContainer,
} from './screen.style';
import { LeadChannelListProps, LeadStageListItemProps } from './screen.props';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import BottomSheetItemListing from '@molecules/BottomSheetItemListing/BottomSheetItemListing';
import { leadChannelListAction } from '@redux/actions/general';
import {
  getLeadDetailsAction,
  updateLeadStatusAction,
} from '@redux/actions/lead';
import { UpdateLeadStatusParams, updateLeadStatusTypes } from '@type/api/lead';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';
import Loader from '@atoms/Loader/Loader';

const LeadChannelList: React.FC<LeadChannelListProps> = ({
  handleBottomSheetClose,
  leadId,
  changeSnapPoints,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const leadChannelList = useSelector(
    (state: RootState) => state.general.leadChannelList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const getLeadSChannelList = async () => {
    await dispatch(leadChannelListAction());
  };
  const onLayout = useCallback(() => {
    changeSnapPoints(['50%', '90%']);
  }, []);

  const handleItemPress = async (ItemId: number) => {
    setIsLoading(true);
    const leadChannelId = leadsDetail.leadChannelId;
    if (leadChannelId !== ItemId) {
      const updatedLeadStatusRequestParams: UpdateLeadStatusParams = {
        type: updateLeadStatusTypes.CHANNEL,
        lead_id: leadId,
        lead_channel_id: ItemId,
      };
      await dispatch(
        updateLeadStatusAction(updatedLeadStatusRequestParams),
      ).unwrap();
      await dispatch(getLeadDetailsAction({ lead_id: leadId }));
      dispatch(dashboardLeadListAction({}));
      dispatch(dashboardLeadStageCountAction());
    }
    handleBottomSheetClose?.();
    setIsLoading(false);
  };

  const handleRefresh = useCallback(() => {
    getLeadSChannelList();
  }, []);

  const renderModifyLeadOption = ({
    item,
    index,
  }: {
    item: LeadStageListItemProps;
    index: number;
  }) => {
    const isStatusSelected = !!(leadsDetail.leadChannelId === item.id);
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
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <BottomSheetFlatListContainer
          data={leadChannelList}
          keyExtractor={(item: LeadStageListItemProps, index: number) =>
            `${item.id}-${index}`
          }
          renderItem={renderModifyLeadOption}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={false}
          onRefresh={handleRefresh}
        />
      )}
    </BottomSheetListContainer>
  );
};

export default LeadChannelList;

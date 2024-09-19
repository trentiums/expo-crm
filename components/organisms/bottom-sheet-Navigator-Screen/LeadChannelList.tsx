import React, { useCallback, useState } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
  LoaderContainer,
  ButtonContainer,
  ButtonSubmit,
  ButtonUpdateText,
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
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { Flexed } from '@atoms/common/common.styles';

const LeadChannelList: React.FC<LeadChannelListProps> = ({
  handleBottomSheetClose,
  leadId,
  changeSnapPoints,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const leadChannelList = useSelector(
    (state: RootState) => state.general.leadChannelList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const [SelectedId, setSelectedId] = useState(leadsDetail.leadChannelId);
  const getLeadSChannelList = async () => {
    await dispatch(leadChannelListAction());
  };
  const onLayout = useCallback(() => {
    changeSnapPoints(['50%', '50%']);
  }, []);

  const handleItemPress = async (channelId: number) => {
    setIsLoading(true);
    try {
      const leadChannelId = leadsDetail.leadChannelId;
      if (leadChannelId !== channelId) {
        const updatedLeadStatusRequestParams: UpdateLeadStatusParams = {
          type: updateLeadStatusTypes.CHANNEL,
          lead_id: leadId,
          lead_channel_id: channelId,
        };
        const response = await dispatch(
          updateLeadStatusAction(updatedLeadStatusRequestParams),
        ).unwrap();
        await dispatch(getLeadDetailsAction({ lead_id: leadId }));
        dispatch(dashboardLeadListAction({}));
        dispatch(dashboardLeadStageCountAction());
        toast.show(response.message, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Success,
          },
        });
      }
      handleBottomSheetClose?.();
      setIsLoading(false);
    } catch (error) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
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
    const isStatusSelected = SelectedId === item.id;
    return (
      <BottomSheetItemListing
        handlePress={() => setSelectedId(item.id)}
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
        <Flexed>
          <Flexed>
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
          </Flexed>
          <ButtonContainer>
            <ButtonSubmit
              onPress={() => handleItemPress(SelectedId)}
              loading={isLoading}
              valid={SelectedId}>
              <ButtonUpdateText
                valid={SelectedId}
                variant="SF-Pro-Display-Semibold_600">
                {t('update')}
              </ButtonUpdateText>
            </ButtonSubmit>
          </ButtonContainer>
        </Flexed>
      )}
    </BottomSheetListContainer>
  );
};

export default LeadChannelList;

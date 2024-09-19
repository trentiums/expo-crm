import React, { useCallback, useEffect, useState } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
  LoaderContainer,
  ButtonContainer,
  ButtonSubmit,
  ButtonUpdateText,
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
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import Loader from '@atoms/Loader/Loader';
import { Flexed } from '@atoms/common/common.styles';

const LeadStatusList: React.FC<LeadStatusListProps> = ({
  handleBottomSheetClose,
  leadId,
  navigation,
  changeSnapPoints,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const leadStatusList = useSelector(
    (state: RootState) => state.general.leadStatusList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const [SelectedId, setSelectedId] = useState(leadsDetail.leadStatusId);
  const getLeadStatusList = async () => {
    await dispatch(leadStatusListAction());
  };

  const onLayout = useCallback(() => {
    changeSnapPoints(['50%', '50%']);
  }, []);
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
        setIsLoading(true);
        const updatedLeadStatusRequestParams: UpdateLeadStatusParams = {
          type: updateLeadStatusTypes.STATUS,
          lead_id: leadId,
          lead_status_id: statusId,
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

export default LeadStatusList;

import React, { useCallback, useState } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
  LoaderContainer,
  ButtonContainer,
  ButtonSubmit,
  ButtonUpdateText,
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
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import Loader from '@atoms/Loader/Loader';
import { Flexed } from '@atoms/common/common.styles';

const LeadStageList: React.FC<LeadStageListProps> = ({
  handleBottomSheetClose,
  leadId,
  navigation,
  changeSnapPoints,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const leadStageList = useSelector(
    (state: RootState) => state.general.leadConversionList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const [SelectedId, setSelectedId] = useState(leadsDetail.leadConversionId);
  const getLeadStageList = async () => {
    await dispatch(leadConversionListAction());
  };
  const onLayout = useCallback(() => {
    changeSnapPoints(['50%', '50%']);
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
      setIsLoading(true);
      if (leadConversionId !== conversionId) {
        const updatedLeadStatusRequestParams: UpdateLeadStatusParams = {
          type: updateLeadStatusTypes.CONVERSION,
          lead_id: leadId,
          lead_conversion_id: conversionId,
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
    getLeadStageList();
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

export default LeadStageList;

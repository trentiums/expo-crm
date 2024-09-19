import React, { useCallback, useEffect, useState } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
  LoaderContainer,
  ButtonSubmit,
  ButtonUpdateText,
  ButtonContainer,
} from './screen.style';
import {
  AssignedUsersListItemProps,
  AssignedUsersListProps,
} from './screen.props';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import {
  assignLeadToUserAction,
  getAssignUserListAction,
} from '@redux/actions/user';
import BottomSheetItemListing from '@molecules/BottomSheetItemListing/BottomSheetItemListing';
import Loader from '@atoms/Loader/Loader';
import {
  assignLeadOnDeleteAction,
  getLeadDetailsAction,
} from '@redux/actions/lead';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { Flexed } from '@atoms/common/common.styles';

const AssignedUserList: React.FC<AssignedUsersListProps> = ({
  handleBottomSheetClose,
  leadId,
  userId,
  assignLeadOnDelete,
  changeSnapPoints,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [SelectedId, setSelectedId] = useState(leadsDetail.assignTo);
  const leadAssignToData = useSelector(
    (state: RootState) => state.user.assignUserList.assignUsers,
  );
  const onLayout = useCallback(() => {
    changeSnapPoints(['50%', '50%']);
  }, []);

  const getAssignUserList = async () => {
    if (assignLeadOnDelete) {
      await dispatch(getAssignUserListAction({ user_id: userId }));
    } else {
      await dispatch(getAssignUserListAction({}));
    }
  };

  useEffect(() => {
    getAssignUserList();
  }, []);

  const handleItemPress = async (ItemId: number) => {
    setIsLoading(true);
    try {
      if (assignLeadOnDelete) {
        await dispatch(
          assignLeadOnDeleteAction({
            assign_to_user_id: ItemId,
            assign_from_user_id: userId,
          }),
        );
        handleBottomSheetClose?.();
      } else {
        const response = await dispatch(
          assignLeadToUserAction({
            assign_to_user_id: ItemId,
            lead_id: leadId,
          }),
        ).unwrap();
        await dispatch(getLeadDetailsAction({ lead_id: leadId }));
        dispatch(dashboardLeadListAction({}));
        dispatch(dashboardLeadStageCountAction());
        handleBottomSheetClose?.();
        toast.show(response.message, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Success,
          },
        });
      }
    } catch (error) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setIsLoading(false);
  };

  const handleRefresh = useCallback(() => {
    getAssignUserList();
  }, []);

  const renderModifyLeadOption = ({
    item,
    index,
  }: {
    item: AssignedUsersListItemProps;
    index: number;
  }) => {
    const isStatusSelected = !!(SelectedId === item.id);
    return (
      <BottomSheetItemListing
        handlePress={() => setSelectedId(item.id)}
        label={t(`${item.title}`)}
        key={`${item.id}-${index}`}
        isSelected={!assignLeadOnDelete && isStatusSelected}
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
              data={leadAssignToData}
              keyExtractor={(item: AssignedUsersListItemProps, index: number) =>
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

export default AssignedUserList;

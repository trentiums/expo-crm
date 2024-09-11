import React, { useCallback, useEffect, useState } from 'react';
import {
  ModifyLeadOptionContainer,
  ModifyLeadOptionFlatList,
} from './screen.style';
import {
  FunctionType,
  ModifyLeadOptionItemProps,
  ModifyLeadOptionProps,
  ScreenOptionType,
} from './screen.props';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import ModifyLeadOptionItem from '@molecules/ModifyLeadOptionItem/ModifyLeadOptionItem';
import NotebookEditIcon from '@atoms/Illustrations/NotebookEdit';
import SyncIcon from '@atoms/Illustrations/Sync';
import StageIcon from '@atoms/Illustrations/Stage';
import TrashIcon from '@atoms/Illustrations/Trash';
import { deleteLeadAction, getLeadDetailsAction } from '@redux/actions/lead';
import { useAppDispatch } from '@redux/store';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import CircleDeleteIcon from '@atoms/Illustrations/CircleDelete';
import { dashboardLeadListAction } from '@redux/actions/dashboard';
import ChannelIcon from '@atoms/Illustrations/Channel';
import AssignmentCardIcon from '@atoms/Illustrations/AssignmentCard';

const ModifyLeadOption: React.FC<ModifyLeadOptionProps> = ({
  changeSnapPoints,
  handleBottomSheetClose,
  navigation,
  leadId,
  optionType,
  editRoute,
  onDelete,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const { t: tm } = useTranslation('modalText');
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const onLayout = useCallback(() => {
    if (optionType === ScreenOptionType.DASHBOARD) {
      changeSnapPoints(['31%', '90%']);
    } else if (optionType === ScreenOptionType.LEAD) {
      changeSnapPoints(['41%', '90%']);
    } else {
      changeSnapPoints(['21%', '90%']);
    }
  }, []);
  const modifyLeadOption = [
    {
      label: 'edit',
      icon: <NotebookEditIcon />,
      route: editRoute || `/(protected)/add-lead/${leadId}`,
      bottomSheetRoute: '',
    },

    {
      label: 'delete',
      icon: <TrashIcon />,
      route: '',
      bottomSheetRoute: '',
      functionType: FunctionType.DELETE,
    },
  ];

  if (
    optionType === ScreenOptionType.DASHBOARD ||
    optionType === ScreenOptionType.LEAD
  ) {
    modifyLeadOption.splice(1, 0, {
      label: 'updateStage',
      icon: <StageIcon />,
      route: '',
      bottomSheetRoute: 'LeadStageList',
    });
    modifyLeadOption.splice(1, 0, {
      label: 'updateStatus',
      icon: <SyncIcon />,
      route: '',
      bottomSheetRoute: 'LeadStatusList',
    });
  }

  if (optionType === ScreenOptionType.LEAD) {
    modifyLeadOption.splice(1, 0, {
      label: 'updateChannel',
      icon: <ChannelIcon />,
      route: '',
      bottomSheetRoute: 'LeadChannelList',
    });
    modifyLeadOption.splice(1, 0, {
      label: 'updateAssignedUsers',
      icon: <AssignmentCardIcon />,
      route: '',
      bottomSheetRoute: 'AssignedUserList',
    });
  }

  const getLeadDetails = async () => {
    if (leadId && optionType === ScreenOptionType.DASHBOARD) {
      try {
        await dispatch(getLeadDetailsAction({ lead_id: leadId })).unwrap();
      } catch (error) {
        toast.show(error, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
    }
  };

  useEffect(() => {
    getLeadDetails();
  }, []);

  const handleRedirection = (leadItemDetails: ModifyLeadOptionItemProps) => {
    if (leadItemDetails.route) {
      handleBottomSheetClose?.();
      router.navigate(leadItemDetails.route);
    } else if (leadItemDetails.bottomSheetRoute) {
      navigation.navigate(leadItemDetails.bottomSheetRoute);
    } else if (leadItemDetails?.functionType === FunctionType.DELETE) {
      setShowModal(true);
    }
  };

  const handleDeleteLead = async () => {
    setDeleteLoading(true);
    if (onDelete) {
      onDelete();
      setShowModal(false);
    } else {
      try {
        const response = await dispatch(
          deleteLeadAction({ lead_id: leadId }),
        ).unwrap();
        toast.show(response?.message, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Success,
          },
        });
        await dispatch(dashboardLeadListAction({}));
      } catch (error: any) {
        toast.show(error, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
    }
    setShowModal(false);
    handleBottomSheetClose?.();
    setDeleteLoading(false);
  };

  const renderModifyLeadOption = ({
    item,
    index,
  }: {
    item: ModifyLeadOptionItemProps;
    index: number;
  }) => {
    return (
      <ModifyLeadOptionItem
        handlePress={() => handleRedirection(item)}
        icon={item.icon}
        label={t(`${item.label}`)}
        key={`${item.label}-${index}`}
        canNavigate={!!item.bottomSheetRoute}
      />
    );
  };
  return (
    <ModifyLeadOptionContainer onLayout={onLayout}>
      <ModifyLeadOptionFlatList
        data={modifyLeadOption}
        keyExtractor={(item: ModifyLeadOptionItemProps, index: number) =>
          `${item.label}-${index}`
        }
        renderItem={renderModifyLeadOption}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      {showModal && (
        <ActionModal
          isModal={showModal}
          onBackdropPress={() => setShowModal(false)}
          heading={tm('discardMedia')}
          description={tm('disCardDescription')}
          label={tm('yesDiscard')}
          actionType={Actions.delete}
          actiontext={tm('cancel')}
          onCancelPress={() => setShowModal(false)}
          onActionPress={() => handleDeleteLead()}
          icon={<CircleDeleteIcon />}
          loading={deleteLoading}
        />
      )}
    </ModifyLeadOptionContainer>
  );
};

export default ModifyLeadOption;

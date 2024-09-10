import React, { useCallback, useEffect, useState } from 'react';
import {
  ModifyLeadOptionContainer,
  ModifyLeadOptionFlatList,
} from './screen.style';
import {
  FunctionType,
  ModifyLeadOptionItemProps,
  ModifyLeadOptionProps,
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

const ModifyLeadOption: React.FC<ModifyLeadOptionProps> = ({
  changeSnapPoints,
  changeRoute,
  navigation,
  leadId,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const { t: tm } = useTranslation('modalText');
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const onLayout = useCallback(() => {
    changeSnapPoints(['31%', '90%']);
  }, []);
  const modifyLeadOption = [
    {
      label: 'edit',
      icon: <NotebookEditIcon />,
      route: `/(protected)/add-lead/${leadId}`,
      bottomSheetRoute: '',
    },
    {
      label: 'updateStatus',
      icon: <SyncIcon />,
      route: '',
      bottomSheetRoute: 'LeadStatusList',
    },
    {
      label: 'updateStage',
      icon: <StageIcon />,
      route: '',
      bottomSheetRoute: 'LeadStageList',
    },
    {
      label: 'delete',
      icon: <TrashIcon />,
      route: '',
      bottomSheetRoute: '',
      functionType: FunctionType.DELETE,
    },
  ];

  const getLeadDetails = async () => {
    if (leadId) {
      try {
        await dispatch(getLeadDetailsAction({ lead_id: leadId })).unwrap();
      } catch (error) {
        console.log(error, 'error');
      }
    }
  };

  useEffect(() => {
    getLeadDetails();
  }, []);

  const handleRedirection = (leadItemDetails: ModifyLeadOptionItemProps) => {
    if (leadItemDetails.route) {
      changeRoute?.();
      router.navigate(leadItemDetails.route);
    } else if (leadItemDetails.bottomSheetRoute) {
      navigation.navigate(leadItemDetails.bottomSheetRoute);
    } else if (leadItemDetails?.functionType) {
      switch (leadItemDetails.functionType) {
        case FunctionType.DELETE:
          setShowModal(true);
        default:
          return null;
      }
    }
  };

  const handleDeleteLead = async () => {
    setDeleteLoading(true);
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
      setShowModal(false);
      changeRoute?.();
      await dispatch(dashboardLeadListAction({}));
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
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
        bottomSheetRoute={!!item.bottomSheetRoute}
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

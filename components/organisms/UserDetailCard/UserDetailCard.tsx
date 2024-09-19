import React from 'react';
import { UserDetailCardProps } from './UserDetailCard.props';
import LeadDetail from '@molecules/LeadDetail/LeadDetail';
import { LeadDetailCardContainer } from '@organisms/DashBoardLeadCard/DashBoardLeadCard.styles';
import { EmailText, PhoneInfoView } from './UserDetailCard.styles';
import EmailIcon from '@atoms/Illustrations/Email';
import { useAppTheme } from '@constants/theme';
import { Spacer } from '@atoms/common/common.styles';
import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';
import { useAppDispatch } from '@redux/store';
import { deleteUserAction, getAssignUserListAction } from '@redux/actions/user';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { getLeadListAction } from '@redux/actions/lead';

const UserDetailCard: React.FC<UserDetailCardProps> = ({
  data,
  isSocialMediaVisible,
  assignLeadOnDelete,
}) => {
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const handleDeleteUser = async () => {
    try {
      const response = await dispatch(
        deleteUserAction({ user_id: data.id }),
      ).unwrap();
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
      await dispatch(getAssignUserListAction({}));
      await dispatch(getLeadListAction({})).unwrap();
    } catch (error: string) {
      toast.show(`${error}`, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
  };
  return (
    <>
      <LeadDetailCardContainer isActive={false}>
        <LeadDetail
          leadData={data}
          isSocialMediaVisible={isSocialMediaVisible}
          optionType={ScreenOptionType.DEFAULT}
          editRoute={`/(protected)/add-user/${data.id}`}
          onDelete={handleDeleteUser}
          assignLeadOnDelete={assignLeadOnDelete}
        />
        <Spacer size={8} />
        {data?.email && (
          <PhoneInfoView>
            <EmailIcon color={colors.gray} />
            <EmailText>{data.email}</EmailText>
          </PhoneInfoView>
        )}
      </LeadDetailCardContainer>
    </>
  );
};

export default UserDetailCard;

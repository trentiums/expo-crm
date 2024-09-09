import React from 'react';
import { UserDetailCardProps } from './UserDetailCard.props';
import LeadDetail from '@molecules/LeadDetail/LeadDetail';
import { LeadDetailCardContainer } from '@organisms/DashBoardLeadCard/DashBoardLeadCard.styles';
import { EmailText, PhoneInfoView } from './UserDetailCard.styles';
import EmailIcon from '@atoms/Illustrations/Email';
import { useAppTheme } from '@constants/theme';
import { Spacer } from '@atoms/common/common.styles';

const UserDetailCard: React.FC<UserDetailCardProps> = ({
  data,
  onChangeModalState,
  onEdit,
  onDelete,
  showModal,
  loading,
  setDeleteId,
  isServices,
  isSocialMediaVisible,
  onChangeDeleteId,
}) => {
  const { colors } = useAppTheme();
  return (
    <>
      <LeadDetailCardContainer isActive={false}>
        <LeadDetail
          leadData={data}
          onEdit={onEdit}
          onDelete={onDelete}
          showModal={showModal}
          onChangeModalState={(value) => onChangeModalState(value)}
          loading={loading}
          setDeleteId={setDeleteId}
          isServices={isServices}
          setDeleteId={(id) => onChangeDeleteId(id)}
          onChangeDeleteId={isSocialMediaVisible}
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

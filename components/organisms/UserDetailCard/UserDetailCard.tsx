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
  setShowModal,
  onEdit,
  onDelete,
  showModal,
  loading,
  setDeleteId,
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
          setShowModal={setShowModal}
          loading={loading}
          setDeleteId={setDeleteId}
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

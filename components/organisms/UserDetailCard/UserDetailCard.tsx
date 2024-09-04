import React, { useState } from 'react';
import {
  ActionMenuContainer,
  LeadDetailCardContainer,
} from './UserDetailCard.styles';
import { UserDetailCardProps } from './UserDetailCard.props';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@constants/theme';
import LeadDetail from '@molecules/LeadDetail/LeadDetail';
import { IconButton, Menu } from 'react-native-paper';

const UserDetailCard: React.FC<UserDetailCardProps> = ({
  phoneNumber,
  mailID,
  title,
  onDelete,
  onEdit,
  createdAt,
}) => {
  const { t } = useTranslation('leadDetailCardDetails');
  const { colors } = useAppTheme();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <>
      <LeadDetailCardContainer isActive={false}>
        <LeadDetail
          leadData={{
            phone: phoneNumber,
            email: mailID,
            name: title,
            createdAt,
          }}
        />
        <ActionMenuContainer>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
            style={{ borderRadius: 16, overflow: 'hidden' }}>
            <Menu.Item
              leadingIcon="pencil"
              onPress={() => {
                closeMenu();
                onEdit();
              }}
              style={{
                borderBottomColor: colors.lightBorder,
                borderBottomWidth: 1,
              }}
              title={t('edit')}
            />
            <Menu.Item
              leadingIcon="delete"
              onPress={() => {
                closeMenu();
                onDelete();
              }}
              title={t('delete')}
            />
          </Menu>
        </ActionMenuContainer>
      </LeadDetailCardContainer>
    </>
  );
};

export default UserDetailCard;

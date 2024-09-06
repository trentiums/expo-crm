import { useAppTheme } from '@constants/theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'react-native-paper';
import { ActionMenuContainer, ActionMenuIcon } from './ActionMenu.styles';
import { ActionMenuProps } from './ActionMenu.props';

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onDelete }) => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('leadDetailCardDetails');
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <ActionMenuContainer
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <ActionMenuIcon
          icon="dots-vertical"
          onPress={openMenu}
          iconColor={colors.textDark}
        />
      }>
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
          onDelete(id);
        }}
        title={t('delete')}
      />
    </ActionMenuContainer>
  );
};

export default ActionMenu;

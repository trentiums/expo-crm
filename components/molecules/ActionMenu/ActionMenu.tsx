import { useAppTheme } from '@constants/theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu } from 'react-native-paper';
import { ActionMenuComponent, ActionMenuIcon } from './ActionMenu.styles';

const ActionMenu = ({ onEdit, onDelete }) => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('leadDetailCardDetails');
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <ActionMenuComponent
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
          onDelete();
        }}
        title={t('delete')}
      />
    </ActionMenuComponent>
  );
};

export default ActionMenu;

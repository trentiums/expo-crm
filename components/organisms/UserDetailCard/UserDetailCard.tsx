import React, { useRef, useState } from 'react';
import {
  LeadDetailCardContainer,
  RenderRightView,
  SwipeText,
  TouchableOpacityContainer,
  ViewContainer,
} from './UserDetailCard.styles';
import { Spacer } from '@atoms/common/common.styles';
import { Swipeable } from 'react-native-gesture-handler';
import Trash from '@atoms/Illustrations/Trash';
import EditIcon from '@atoms/Illustrations/EditIcon';
import { UserDetailCardProps } from './UserDetailCard.props';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@constants/theme';
import LeadDetail from '@molecules/LeadDetail/LeadDetail';
import { RootState, useSelector } from '@redux/store';
import { View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';

const UserDetailCard: React.FC<UserDetailCardProps> = ({
  whatsAppNumber,
  phoneNumber,
  mailID,
  title,
  cardImage,
  onDelete,
  onEdit,
  dateTime,
  closeSwipeAble,
  setSwipeAbleRef,
  cardIndex,
  selectedCard,
  setSelectedCard,
}) => {
  const { t } = useTranslation('leadDetailCardDetails');
  const { colors } = useAppTheme();

  const user = useSelector((state: RootState) => state.auth.user);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <>
      <LeadDetailCardContainer isActive={false}>
        <LeadDetail
          phoneNumber={phoneNumber}
          whatsAppNumber={whatsAppNumber}
          mailID={mailID}
          cardImage={cardImage}
          title={title}
          dateTime={dateTime}
        />
        <View style={{ position: 'absolute', top: 0, right: 0, width: 50 }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
            <Menu.Item
              leadingIcon="pencil"
              onPress={() => {
                closeMenu();
                onEdit();
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
        </View>
      </LeadDetailCardContainer>
    </>
  );
};

export default UserDetailCard;

import React, { useRef } from 'react';
import {
  LeadDetailCardContainer,
  RenderRightView,
  SwipeText,
  TouchableOpacityContainer,
  ViewContainer,
} from './DashBoardLeadCard.styles';
import { Spacer } from '@atoms/common/common.styles';
import { Swipeable } from 'react-native-gesture-handler';
import Trash from '@atoms/Illustrations/Trash';
import { DashBoardLeadCardProps } from './DashBoardLeadCard.props';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@constants/theme';
import LeadDetail from '@molecules/LeadDetail/LeadDetail';

const DashBoardLeadCard: React.FC<DashBoardLeadCardProps> = ({
  whatsAppNumber,
  phoneNumber,
  onDelete,
  title,
  mailID,
  dateTime,
  closeSwipeAble,
  setSwipeAbleRef,
  cardIndex,
  selectedCard,
  setSelectedCard,
}) => {
  const { t } = useTranslation('leadDetailCardDetails');
  const { colors } = useAppTheme();
  const swipeAbleRef = useRef(null);
  const renderRightActions = () => (
    <RenderRightView>
      <TouchableOpacityContainer
        backgroundColor={colors?.deleteColor}
        onPress={onDelete}>
        <ViewContainer>
          <Trash />
        </ViewContainer>
        <Spacer size={10} />
        <SwipeText>{t('delete')}</SwipeText>
      </TouchableOpacityContainer>
    </RenderRightView>
  );
  return (
    <>
      <Swipeable
        ref={swipeAbleRef}
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={() => {
          if (cardIndex !== selectedCard) {
            closeSwipeAble();
          }
          setSwipeAbleRef(swipeAbleRef);
          setSelectedCard(cardIndex);
        }}
        onSwipeableWillClose={() => {
          setSelectedCard(cardIndex);
        }}>
        <LeadDetailCardContainer isActive={false}>
          <LeadDetail
            phoneNumber={phoneNumber}
            whatsAppNumber={whatsAppNumber}
            mailID={mailID}
            title={title}
            dateTime={dateTime}
          />
        </LeadDetailCardContainer>
      </Swipeable>
      <Spacer size={16} />
    </>
  );
};

export default DashBoardLeadCard;

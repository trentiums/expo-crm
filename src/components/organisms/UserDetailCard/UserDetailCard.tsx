import React, { useRef } from "react";
import {
  LeadDetailCardContainer,
  RenderRightView,
  SwipeText,
  TouchableOpacityContainer,
  ViewContainer,
} from "./UserDetailCard.styles";
import { Spacer } from "@atoms/common/common.styles";
import { Swipeable } from "react-native-gesture-handler";
import Trash from "@atoms/Illustrations/Trash";
import EditIcon from "@atoms/Illustrations/EditIcon";
import { UserDetailCardProps } from "./UserDetailCard.props";
import { useTranslation } from "react-i18next";
import UserDetails from "@molecules/UserDetails/UserDetails";
import { useAppTheme } from "@constants/theme";
import LeadDetail from "@molecules/LeadDetail/LeadDetail";

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
  const { t } = useTranslation("leadDetailCardDetails");
  const { colors } = useAppTheme();
  const swipeAbleRef = useRef(null);
  const renderRightActions = () => (
    <RenderRightView>
      <TouchableOpacityContainer
        backgroundColor={colors?.lightBlue}
        onPress={onEdit}>
        <ViewContainer>
          <EditIcon />
        </ViewContainer>
        <Spacer size={10} />
        <SwipeText>{t("edit")}</SwipeText>
      </TouchableOpacityContainer>
      <TouchableOpacityContainer
        backgroundColor={colors?.deleteColor}
        onPress={onDelete}>
        <ViewContainer>
          <Trash />
        </ViewContainer>
        <Spacer size={10} />
        <SwipeText>{t("delete")}</SwipeText>
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
            cardImage={cardImage}
            title={title}
            dateTime={dateTime}
          />
        </LeadDetailCardContainer>
      </Swipeable>
      <Spacer size={16} />
    </>
  );
};

export default UserDetailCard;

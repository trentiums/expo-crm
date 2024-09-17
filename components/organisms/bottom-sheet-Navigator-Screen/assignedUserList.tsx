import React, { useCallback, useEffect } from 'react';
import {
  BottomSheetListContainer,
  BottomSheetFlatListContainer,
} from './screen.style';
import {
  AssignedUsersListItemProps,
  AssignedUsersListProps,
} from './screen.props';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { getAssignUserListAction } from '@redux/actions/user';
import BottomSheetItemListing from '@molecules/BottomSheetItemListing/BottomSheetItemListing';

const AssignedUserList: React.FC<AssignedUsersListProps> = ({
  handleBottomSheetClose,
}) => {
  const { t } = useTranslation('bottomSheetModifyLead');
  const dispatch = useAppDispatch();
  const leadAssignToData = useSelector(
    (state: RootState) => state.user.assignUserList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const getAssignUserList = async () => {
    await dispatch(getAssignUserListAction());
  };

  const handleItemPress = (ItemId: number) => {
    handleBottomSheetClose?.();
  };

  const handleRefresh = useCallback(() => {
    getAssignUserList();
  }, []);

  const renderModifyLeadOption = ({
    item,
    index,
  }: {
    item: AssignedUsersListItemProps;
    index: number;
  }) => {
    const isStatusSelected = !!(leadsDetail.assignTo === item.id);
    return (
      <BottomSheetItemListing
        handlePress={() => handleItemPress(item.id)}
        label={t(`${item.title}`)}
        key={`${item.id}-${index}`}
        isSelected={isStatusSelected}
      />
    );
  };
  return (
    <BottomSheetListContainer>
      <BottomSheetFlatListContainer
        data={leadAssignToData}
        keyExtractor={(item: AssignedUsersListItemProps, index: number) =>
          `${item.id}-${index}`
        }
        renderItem={renderModifyLeadOption}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={false}
        onRefresh={handleRefresh}
      />
    </BottomSheetListContainer>
  );
};

export default AssignedUserList;

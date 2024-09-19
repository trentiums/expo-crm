import React, { useCallback, useState } from 'react';
import {
  DashboardFilterApplyButton,
  DashboardFilterButton,
  DashboardFilterContainer,
  DashboardFilterScreenContainer,
  DashboardSortFilterText,
  IconWrapper,
} from './screen.style';
import { FlatList, ListRenderItem } from 'react-native';
import { dashboardQuickFilters } from '@utils/constant';
import {
  DashboardSortFilterItemProp,
  DashboardSortFilterProps,
} from './screen.props';
import CircleCheckIcon from '@atoms/Illustrations/CircleCheck';
import { FormButtonText } from '@organisms/UserInformationForm/UserInformationForm.styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@redux/store';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { dashboardAdminLeadListAction } from '@redux/actions/dashboard';
import { Spacer } from '@atoms/common/common.styles';

const DashboardSortFilter: React.FC<DashboardSortFilterProps> = ({
  changeRoute,
  changeSnapPoints,
  setSelectedSort,
  selectedSort,
}) => {
  const { t } = useTranslation('leadsFilter');
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [filterLoading, setFilterLoading] = useState(false);
  const renderLeadsSortFilter: ListRenderItem<DashboardSortFilterItemProp> = ({
    item,
  }) => (
    <DashboardFilterContainer onPress={() => setSelectedSort(item)}>
      <DashboardSortFilterText>{item.title}</DashboardSortFilterText>
      <IconWrapper>
        {selectedSort?.id === item.id && <CircleCheckIcon />}
      </IconWrapper>
    </DashboardFilterContainer>
  );

  const onLayout = useCallback(() => {
    changeSnapPoints(['32%', '90%']);
  }, []);
  const handleApplySortFilter = async () => {
    if (!filterLoading) {
      try {
        setFilterLoading(true);
        await dispatch(
          dashboardAdminLeadListAction(selectedSort.filters),
        ).unwrap();
      } catch (error) {
        toast.show(error, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
    }
    setFilterLoading(false);
    changeRoute();
  };
  return (
    <DashboardFilterScreenContainer onLayout={onLayout}>
      <FlatList
        data={dashboardQuickFilters}
        renderItem={renderLeadsSortFilter}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
      />
      <Spacer size={32} />
      <DashboardFilterButton>
        <DashboardFilterApplyButton
          loading={filterLoading}
          onPress={handleApplySortFilter}>
          <FormButtonText valid={true}>{t('applyFilter')}</FormButtonText>
        </DashboardFilterApplyButton>
      </DashboardFilterButton>
    </DashboardFilterScreenContainer>
  );
};

export default DashboardSortFilter;

import { leadsQuickFilters } from '@utils/constant';
import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import {
  FilterApplyButton,
  RemoveButtonText,
  RemoveFilterButton,
} from '@organisms/LeadsFilterForm/LeadsFilterForm.styles';
import { FormButtonText } from '@organisms/UserInformationForm/UserInformationForm.styles';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { getLeadListAction } from '@redux/actions/lead';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useToast } from 'react-native-toast-notifications';
import { LeadSortFilterItemProp, LeadsSortFilterProps } from './screen.props';
import {
  IconWrapper,
  LeadsFilterButton,
  LeadsFilterContainer,
  LeadsSortFilterText,
  LeasFilterScreenContainer,
} from './screen.style';
import CircleCheckIcon from '@atoms/Illustrations/CircleCheck';
import { setLeadsSort } from '@redux/slices/leads';
import moment from 'moment';

const LeadsSortFilter: React.FC<LeadsSortFilterProps> = ({
  changeRoute,
  changeSnapPoints,
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { t } = useTranslation('leadsFilter');

  const leadsSortFilter = useSelector(
    (state: RootState) => state.leads.leadsSort,
  );
  const leadsFilter = useSelector(
    (state: RootState) => state.leads.leadsFilter,
  );
  const [selectedSort, setSelectedSort] = useState(leadsSortFilter);
  const [filterLoading, setFilterLoading] = useState(false);

  const handleSelectSortFilter = (item) => {
    setSelectedSort(item);
    dispatch(setLeadsSort(item));
  };
  const renderLeadsSortFilter: ListRenderItem<LeadSortFilterItemProp> = ({
    item,
  }) => (
    <LeadsFilterContainer onPress={() => handleSelectSortFilter(item)}>
      <LeadsSortFilterText>{item.title}</LeadsSortFilterText>
      <IconWrapper>
        {selectedSort?.id === item.id && <CircleCheckIcon />}
      </IconWrapper>
    </LeadsFilterContainer>
  );
  const onLayout = useCallback(() => {
    changeSnapPoints(['50%', '90%']);
  }, []);
  const handleRemoveFilters = () => {
    setSelectedSort(null);
    dispatch(setLeadsSort({}));
  };
  const handleApplySortFilter = async () => {
    if (!filterLoading) {
      try {
        setFilterLoading(true);
        await dispatch(
          getLeadListAction({
            ...(leadsSortFilter?.filters ? leadsSortFilter.filters : undefined),
            start_date:
              leadsFilter?.startDate &&
              moment(leadsFilter?.startDate).format('YYYY-MM-DD'),
            end_date:
              leadsFilter.endDate &&
              moment(leadsFilter.endDate).format('YYYY-MM-DD'),
            lead_channel_id: leadsFilter?.selectedChannel,
            lead_conversion_id: leadsFilter?.selectedStage,
            lead_status_id: leadsFilter?.selectedStatus,
          }),
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
    <LeasFilterScreenContainer onLayout={onLayout}>
      <FlatList
        data={leadsQuickFilters}
        renderItem={renderLeadsSortFilter}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
      />
      <LeadsFilterButton>
        <RemoveFilterButton onPress={handleRemoveFilters}>
          <RemoveButtonText>{t('removeFilter')}</RemoveButtonText>
        </RemoveFilterButton>
        <FilterApplyButton
          loading={filterLoading}
          onPress={handleApplySortFilter}>
          <FormButtonText valid={true}>{t('applyFilter')}</FormButtonText>
        </FilterApplyButton>
      </LeadsFilterButton>
    </LeasFilterScreenContainer>
  );
};

export default LeadsSortFilter;

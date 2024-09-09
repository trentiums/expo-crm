import { leadsQuickFilters } from '@utils/constant';
import React, { useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import {
  FilterApplyButton,
  RemoveButtonText,
  RemoveFilterButton,
} from '@organisms/LeadsFilterForm/LeadsFilterForm.styles';
import { FormButtonText } from '@organisms/UserInformationForm/UserInformationForm.styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@redux/store';
import { getLeadListAction } from '@redux/actions/lead';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useToast } from 'react-native-toast-notifications';
import Back from '@atoms/Illustrations/Back';
import { CreateOptionProps, LeadSortFilterItemProp } from './screen.props';
import {
  LeadsFilterButton,
  LeadsFilterContainer,
  LeadsSortFilterText,
  LeasFilterScreenContainer,
} from './screen.style';

const LeadsSortFilter: React.FC<CreateOptionProps> = ({ changeRoute }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { t } = useTranslation('leadsFilter');
  const [selectedSort, setSelectedSort] = useState(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const renderLeadsSortFilter: ListRenderItem<LeadSortFilterItemProp> = ({
    item,
  }) => (
    <LeadsFilterContainer onPress={() => setSelectedSort(item)}>
      <LeadsSortFilterText>{item.title}</LeadsSortFilterText>
      {selectedSort?.id === item.id && <Back />}
    </LeadsFilterContainer>
  );
  const handleRemoveFilters = () => {
    setSelectedSort(null);
  };
  const handleApplySortFilter = async () => {
    try {
      setFilterLoading(true);
      await dispatch(getLeadListAction(selectedSort.filter)).unwrap();
    } catch (error) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setFilterLoading(false);
    changeRoute();
  };

  return (
    <LeasFilterScreenContainer>
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

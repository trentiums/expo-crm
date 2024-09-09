import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import LeadsFilterForm from '@organisms/LeadsFilterForm/LeadsFilterForm';
import { getLeadListAction } from '@redux/actions/lead';
import { setLeadsFilters } from '@redux/slices/leads';
import { RootState, useAppDispatch } from '@redux/store';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import moment from 'moment';
import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { LeadsFilterProps } from './leadsFilter.props';
import { useSelector } from 'react-redux';
import { CreateOptionProps } from './screen.props';

const LeadsFilter: React.FC<CreateOptionProps> = ({ changeRoute }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const leadsAppliedFilter = useSelector(
    (state: RootState) => state.leads.leadsFilter,
  );
  const [filterLoading, setFilterLoading] = useState(false);
  const handleApplyFilter = async (values: LeadsFilterProps) => {
    const states = [
      values?.startDate || leadsAppliedFilter?.startDate,
      values?.endDate || leadsAppliedFilter?.endDate,
      //TODO: as api change the channel will go in array
      values?.selectedChannel?.[0] || leadsAppliedFilter?.selectedChannel,
      values?.selectedStatus || leadsAppliedFilter?.selectedStatus,
      values?.selectedStage || leadsAppliedFilter?.selectedStage,
    ];

    const count = states.filter(
      (state) => state !== null && state !== undefined && state !== '',
    ).length;
    dispatch(setLeadsFilters(values));
    try {
      setFilterLoading(true);
      await dispatch(
        getLeadListAction({
          end_date:
            (values?.endDate && moment(values?.endDate).format('YYYY-MM-DD')) ||
            undefined,
          start_date:
            (values?.startDate &&
              moment(values?.startDate).format('YYYY-MM-DD')) ||
            undefined,
          lead_channel_id: values?.selectedChannel,
          lead_conversion_id: values?.selectedStage,
          lead_status_id: values?.selectedStatus,
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
    setFilterLoading(false);
    changeRoute();
  };
  return (
    <FormTemplate
      Component={LeadsFilterForm}
      onSubmit={(values) => handleApplyFilter(values)}
      loading={filterLoading}
    />
  );
};

export default LeadsFilter;

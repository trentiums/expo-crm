import React from 'react';
import { FlatListCon } from './LeadsProgressChart.styles';
import { Leads, LeadsProgressDataProps } from './LeadsProgressChart.props';
import LeadsProgressChartItem from '@molecules/LeadsProgressChartItem/LeadsProgressChartItem';

const LeadsProgressChart: React.FC<LeadsProgressDataProps> = ({ leads }) => {
  const findMaxValue = (data: Leads[]) => {
    if (!data || data?.length === 0) return 0;
    return Math.max(...data.map((item) => item.progress));
  };

  const maxValue = findMaxValue(leads);
  return (
    <FlatListCon
      data={leads}
      renderItem={({ item }) => (
        <LeadsProgressChartItem item={item} maxValue={maxValue} />
      )}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default LeadsProgressChart;

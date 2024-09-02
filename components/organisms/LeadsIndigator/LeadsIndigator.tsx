import React from 'react';
import { FlatListCon } from './LeadsIndigator.styles';
import LeadsIndigatorItem from '@molecules/LeadsIndigatorItem/LeadsIndigatorIcon';

const LeadsIndigator = ({ data }) => {
  const findMaxValue = (data) => {
    if (!data || data.length === 0) return 0;
    return Math.max(...data.map((item) => item.value));
  };

  const maxValue = findMaxValue(data);
  return (
    <FlatListCon
      data={data}
      renderItem={({ item }) => (
        <LeadsIndigatorItem item={item} maxValue={maxValue} />
      )}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default LeadsIndigator;

import React from 'react';
import {
  FlatListCon,
  IndigatorContainer,
  IndigatorText,
  IndigatorValue,
  IndigatorValueContainer,
} from './LeadsIndigator.styles';
import Animated, { useSharedValue } from 'react-native-reanimated';

const LeadsIndigator = ({ data }) => {
  const findMaxValue = (data) => {
    if (!data || data.length === 0) return 0;
    return Math.max(...data.map((item) => item.value));
  };
  const height = useSharedValue(100);
  const maxValue = findMaxValue(data);
  const renderItem = ({ item }) => {
    const containerHeight = maxValue === 0 ? 0 : (item.value / maxValue) * 100;
    return (
      <IndigatorContainer>
        <IndigatorValue>{item?.value}</IndigatorValue>
        <Animated.View>
          <IndigatorValueContainer
            color={item.color}
            height={containerHeight}
          />
        </Animated.View>
        <IndigatorText>{item.label}</IndigatorText>
      </IndigatorContainer>
    );
  };
  return (
    <FlatListCon
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default LeadsIndigator;

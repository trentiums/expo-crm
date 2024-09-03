import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { LeadsIndicatorItemProps } from './LeadsProgressChartItem.props';
import { useAppTheme } from '@constants/theme';
import {
  IndicatorContainer,
  IndicatorText,
  IndicatorValue,
  LabelContainer,
} from '@organisms/LeadsProgressChart/LeadsProgressChart.styles';

const LeadsProgressChartItem: React.FC<LeadsIndicatorItemProps> = ({
  item,
  maxValue,
}) => {
  const height = useSharedValue(0);
  const { colors } = useAppTheme();
  useEffect(() => {
    const containerHeight =
      maxValue === 0 ? 0 : (item.progress / maxValue) * 70;
    height.value = withTiming(containerHeight, { duration: 1000 });
  }, [item.progress, maxValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${height.value}%`,
    width: 30,
    borderRadius: 15,
    backgroundColor: item?.color,
    borderWidth: item?.progress !== 0 ? 2 : undefined,
    borderColor: colors.white,
  }));

  return (
    <IndicatorContainer>
      <IndicatorValue>{item?.progress}</IndicatorValue>
      <Animated.View style={animatedStyle} />
      <LabelContainer>
        <IndicatorText>{item.label}</IndicatorText>
      </LabelContainer>
    </IndicatorContainer>
  );
};

export default LeadsProgressChartItem;

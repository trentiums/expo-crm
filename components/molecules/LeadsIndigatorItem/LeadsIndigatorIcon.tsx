import React, { useEffect } from 'react';
import {
  IndigatorContainer,
  IndigatorText,
  IndigatorValue,
  LabelContainer,
} from '@organisms/LeadsIndigator/LeadsIndigator.styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { LeadsIndigatorItemProps } from './LeadsIndigatorIcon.props';
import { useAppTheme } from '@constants/theme';

const LeadsIndigatorItem: React.FC<LeadsIndigatorItemProps> = ({
  item,
  maxValue,
}) => {
  const height = useSharedValue(0);
  const { colors } = useAppTheme();
  useEffect(() => {
    const containerHeight = maxValue === 0 ? 0 : (item.value / maxValue) * 70;
    height.value = withTiming(containerHeight, { duration: 1000 });
  }, [item.value, maxValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${height.value}%`,
    width: 30,
    borderRadius: 15,
    backgroundColor: item?.color,
    borderWidth: item?.value !== 0 ? 2 : undefined,
    borderColor: colors.white,
  }));

  return (
    <IndigatorContainer>
      <IndigatorValue>{item?.value}</IndigatorValue>
      <Animated.View style={animatedStyle} />
      <LabelContainer>
        <IndigatorText>{item.label}</IndigatorText>
      </LabelContainer>
    </IndigatorContainer>
  );
};

export default LeadsIndigatorItem;

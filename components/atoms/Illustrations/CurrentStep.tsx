import * as React from 'react';
import Svg, { Circle, SvgProps } from 'react-native-svg';
const CurrentStep = (props: SvgProps) => (
  <Svg width={22} height={21} viewBox="0 0 22 21" fill="none" {...props}>
    <Circle
      cx={10.9004}
      cy={10.25}
      r={8.96875}
      fill="white"
      stroke="#5892FF"
      strokeWidth={2.5625}
    />
  </Svg>
);
export default CurrentStep;

import * as React from 'react';
import Svg, { Circle, SvgProps } from 'react-native-svg';
const NextStep = (props: SvgProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
    <Circle
      cx={10.5}
      cy={10.25}
      r={9}
      fill="white"
      stroke="#E2E2E2"
      strokeWidth={2}
    />
  </Svg>
);
export default NextStep;

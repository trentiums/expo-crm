import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const Back = (props: SvgProps) => (
  <Svg width={31} height={31} viewBox="0 0 31 31" fill="none" {...props}>
    <Path
      d="M11 9L5 15.5L11 22"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 15.5L25 15.5"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Back;

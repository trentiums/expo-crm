import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Back = (props) => (
  <Svg
    width={22}
    height={15}
    viewBox="0 0 22 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M7 1L1 7.5L7 14"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 7.5L21 7.5"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Back;

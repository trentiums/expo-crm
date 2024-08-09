import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Filter = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#121212"
      fillRule="evenodd"
      d="M4.961 2h14.18v.01a2.9 2.9 0 0 1 2.05 5l-4.77 4.77a2.91 2.91 0 0 0-.85 2v4.4a2.91 2.91 0 0 1-1.16 2.32l-1.24.93a2.89 2.89 0 0 1-4.64-2.32v-5.33a2.91 2.91 0 0 0-.85-2l-4.77-4.77A2.9 2.9 0 0 1 4.961 2Zm15.48 2.37a1.4 1.4 0 0 0-1.3-.87H4.961a1.4 1.4 0 0 0-1.3.87 1.38 1.38 0 0 0 .31 1.53l4.79 4.77a4.36 4.36 0 0 1 1.29 3.11v5.33a1.39 1.39 0 0 0 1.37 1.41 1.35 1.35 0 0 0 .83-.29l1.24-.93a1.4 1.4 0 0 0 .56-1.12v-4.4a4.36 4.36 0 0 1 1.31-3.11l4.77-4.77a1.38 1.38 0 0 0 .31-1.53Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default Filter;

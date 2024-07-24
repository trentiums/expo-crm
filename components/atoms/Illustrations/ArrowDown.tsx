import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ArrowDown = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#969A99"
      d="M9.414 10c-.89 0-1.337 1.077-.707 1.707l2.586 2.586a1 1 0 0 0 1.414 0l2.586-2.586c.63-.63.184-1.707-.707-1.707H9.414Z"
    />
  </Svg>
);
export default ArrowDown;

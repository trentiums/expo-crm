import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';
const Stage = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#A8ACB3"
        d="M7.428 20.203A3.5 3.5 0 0 1 4.86 19.14a3.499 3.499 0 0 1-1.063-2.568 3.5 3.5 0 0 1 1.063-2.568 3.499 3.499 0 0 1 2.568-1.064h11.144a3.5 3.5 0 0 1 2.568 1.063 3.499 3.499 0 0 1 1.063 2.568 3.5 3.5 0 0 1-1.063 2.568 3.499 3.499 0 0 1-2.568 1.064H7.428Zm-2-9.143A3.5 3.5 0 0 1 2.86 9.996 3.499 3.499 0 0 1 1.797 7.43 3.5 3.5 0 0 1 2.86 4.86a3.499 3.499 0 0 1 2.568-1.063h11.15a3.49 3.49 0 0 1 2.564 1.063 3.501 3.501 0 0 1 1.061 2.568 3.503 3.503 0 0 1-1.061 2.568 3.49 3.49 0 0 1-2.564 1.064H5.428Z"
      />
    </G>
  </Svg>
);
export default Stage;

import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';
const ArrowRight = ({ color, ...props }: SvgProps) => (
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
        fill={color || '#A8ACB3'}
        d="M12.409 12 8.604 8.196a1.08 1.08 0 0 1-.316-.796A1.08 1.08 0 0 1 9.4 6.288c.32 0 .585.105.796.316l4.594 4.594c.112.112.193.237.245.373a1.2 1.2 0 0 1 .078.43 1.2 1.2 0 0 1-.078.428 1.052 1.052 0 0 1-.245.373l-4.594 4.594a1.08 1.08 0 0 1-.796.317A1.08 1.08 0 0 1 8.288 16.6c0-.32.105-.584.316-.796L12.41 12Z"
      />
    </G>
  </Svg>
);
export default ArrowRight;

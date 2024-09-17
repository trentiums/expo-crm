import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';
const DarkTheme = ({ color, ...props }: SvgProps) => (
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
        d="M12.006 21.09c-2.56 0-4.717-.875-6.468-2.625C3.786 16.715 2.91 14.56 2.91 12c0-2.232.706-4.194 2.119-5.886C6.44 4.423 8.302 3.397 10.61 3.038a1.16 1.16 0 0 1 1.185.384c.132.154.213.34.243.555.03.216-.01.434-.12.653-.23.417-.408.848-.532 1.291a5.14 5.14 0 0 0-.185 1.388c0 1.528.536 2.827 1.607 3.897 1.072 1.07 2.374 1.604 3.906 1.604.473 0 .944-.062 1.412-.186a5.216 5.216 0 0 0 1.273-.514c.215-.097.425-.131.628-.103.204.028.38.096.53.203.163.108.285.26.364.456.08.197.093.43.04.699-.305 2.24-1.312 4.087-3.021 5.542-1.71 1.455-3.688 2.183-5.935 2.183Z"
      />
    </G>
  </Svg>
);
export default DarkTheme;

import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Lock = ({color, ...props}: SvgProps) => (
  <Svg width={24} height={24} fill='none' {...props}>
    <Path
      fill={color}
      fillRule='evenodd'
      d='M16.552 7.122v-3.12a3 3 0 0 0-3.11-3h-3.28a3 3 0 0 0-3.11 3v3.12a4.58 4.58 0 0 0-3 5l.95 5.77a4.86 4.86 0 0 0 4.88 3.92h3.88a4.86 4.86 0 0 0 4.88-3.92l.95-5.77a4.58 4.58 0 0 0-3.04-5Zm-3.75 7.81.21.62a.94.94 0 0 1-.88 1.23h-.74a.94.94 0 0 1-.88-1.23l.21-.62a1 1 0 0 0-.23-1 1.66 1.66 0 1 1 2.54 0 1 1 0 0 0-.23 1Zm-4.25-8.15h.36v.01h6.14v-2.79a1.55 1.55 0 0 0-1.61-1.48h-3.28a1.55 1.55 0 0 0-1.61 1.48v2.78Z'
      clipRule='evenodd'
    />
  </Svg>
);
export default Lock;

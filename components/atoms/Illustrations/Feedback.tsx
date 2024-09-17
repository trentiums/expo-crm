import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';
const Feedback = ({ color, ...props }: SvgProps) => (
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
        d="M12 7c.283 0 .52-.096.713-.287A.967.967 0 0 0 13 6a.967.967 0 0 0-.287-.713A.968.968 0 0 0 12 5a.968.968 0 0 0-.713.287A.967.967 0 0 0 11 6c0 .283.096.52.287.713.192.191.43.287.713.287Zm0 8c.283 0 .52-.096.713-.287A.968.968 0 0 0 13 14v-4a.967.967 0 0 0-.287-.713A.968.968 0 0 0 12 9a.968.968 0 0 0-.713.287A.967.967 0 0 0 11 10v4c0 .283.096.52.287.713.192.191.43.287.713.287Zm-6 3-2.3 2.3c-.317.317-.68.387-1.088.212-.408-.175-.612-.487-.612-.937V4c0-.55.196-1.02.587-1.413A1.926 1.926 0 0 1 4 2h16c.55 0 1.02.196 1.413.587C21.803 2.98 22 3.45 22 4v12c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0 1 20 18H6Z"
      />
    </G>
  </Svg>
);

export default Feedback;

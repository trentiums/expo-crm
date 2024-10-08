import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';
const CircleCheck = ({ color, ...props }: SvgProps) => (
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
        fill={color || '#5892FF'}
        d="m10.582 13.59-1.994-1.994a1.062 1.062 0 0 0-.784-.31c-.315 0-.577.103-.784.31-.207.207-.31.469-.308.784.002.315.107.576.314.783l2.755 2.755c.229.228.496.342.802.342.306 0 .573-.114.8-.342l5.561-5.56c.207-.208.311-.468.311-.781s-.104-.574-.31-.78a1.062 1.062 0 0 0-.785-.312c-.315 0-.576.104-.783.311l-4.795 4.795ZM12 22.204a9.944 9.944 0 0 1-3.983-.803 10.298 10.298 0 0 1-3.238-2.18 10.3 10.3 0 0 1-2.18-3.237A9.945 9.945 0 0 1 1.798 12c0-1.415.268-2.743.803-3.984A10.3 10.3 0 0 1 4.78 4.78a10.299 10.299 0 0 1 3.237-2.18A9.945 9.945 0 0 1 12 1.798c1.415 0 2.743.267 3.984.803 1.24.535 2.32 1.261 3.237 2.179a10.3 10.3 0 0 1 2.18 3.237A9.946 9.946 0 0 1 22.202 12a9.946 9.946 0 0 1-.803 3.983 10.301 10.301 0 0 1-2.179 3.238 10.297 10.297 0 0 1-3.237 2.18 9.944 9.944 0 0 1-3.984.802Z"
      />
    </G>
  </Svg>
);
export default CircleCheck;

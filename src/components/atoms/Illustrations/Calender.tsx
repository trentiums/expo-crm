import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Calendar = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#969A99"
      fillRule="evenodd"
      d="M16.9 3.57h.1a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5h.1V1.75a.75.75 0 0 1 1.5 0v1.82h6.8V1.75a.75.75 0 0 1 1.5 0v1.82ZM7.5 9.66h9a.75.75 0 0 0 0-1.5h-9a.75.75 0 0 0 0 1.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default Calendar;

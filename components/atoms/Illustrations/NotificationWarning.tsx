import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
const NotificationWarning = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Circle cx={12} cy={12} r={12} fill="#E2463C" />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M18.071 14.32a1.334 1.334 0 0 1-.467-1.013v-3.214c0-2.633-2.386-4.76-5.333-4.76s-5.333 2.127-5.333 4.76v3.214c0 .39-.17.76-.467 1.013-1.007.9-.293 2.433 1.133 2.433h2.534a2.267 2.267 0 0 0 4.266 0h2.534c1.426 0 2.14-1.533 1.133-2.433Zm-5.8 2.933a1.287 1.287 0 0 1-1.013-.5h2c-.235.31-.599.494-.987.5Zm4.673-1.5a.587.587 0 0 0 .58-.326.3.3 0 0 0-.113-.36 2.394 2.394 0 0 1-.8-1.76v-3.214c0-2.073-1.947-3.76-4.333-3.76-2.387 0-4.334 1.687-4.334 3.76v3.214a2.393 2.393 0 0 1-.8 1.76.3.3 0 0 0-.12.36.587.587 0 0 0 .58.326h9.34Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default NotificationWarning;

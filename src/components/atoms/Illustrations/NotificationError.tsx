import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
const NotificationError = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Circle cx={12} cy={12} r={12} fill="#fff" />
    <Path
      fill="#DF3E51"
      d="M17.146 16.26 12.884 12l4.262-4.229a.63.63 0 0 0-.026-.852.62.62 0 0 0-.846-.039l-4.275 4.198-4.2-4.229a.62.62 0 0 0-.88 0 .63.63 0 0 0 0 .891l4.195 4.223-4.263 4.222a.63.63 0 0 0 .443 1.073.62.62 0 0 0 .436-.176l4.269-4.235 4.275 4.304a.621.621 0 0 0 1.06-.446.63.63 0 0 0-.188-.445Z"
    />
  </Svg>
);
export default NotificationError;

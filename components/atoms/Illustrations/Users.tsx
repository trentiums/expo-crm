import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Users = ({ color, ...props }: SvgProps) => {
  return (
    <Svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 18a6.002 6.002 0 018.018-5.652c.343.122.671.275.982.455A5.965 5.965 0 0115 12a6.002 6.002 0 016 6v3h-5.25v-1.5h3.75V18a4.5 4.5 0 00-6.188-4.172A5.98 5.98 0 0115 18v3H3v-3zm6-6.75A3.748 3.748 0 015.25 7.5 3.75 3.75 0 0112 5.25a3.75 3.75 0 110 4.5 3.733 3.733 0 01-3 1.5zM13.5 18v1.5h-9V18a4.5 4.5 0 119 0zM11.25 7.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM15 5.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
        fill={color || "#080341"}
      />
    </Svg>
  );
};

export default Users;

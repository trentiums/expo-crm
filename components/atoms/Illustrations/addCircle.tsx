import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const AddCircle = ({ color, ...props }: SvgProps) => (
  <Svg width={37} height={36} fill="none" {...props}>
    <Path
      fill={color || '#5892FF'}
      d="M16.917 19.778v5.167c0 .472.156.868.468 1.187.313.32.714.48 1.203.48.49 0 .889-.157 1.198-.468.31-.312.464-.714.464-1.207v-5.16h5.195c.472 0 .868-.155 1.187-.468.32-.312.48-.713.48-1.203 0-.49-.156-.889-.468-1.198-.312-.309-.714-.463-1.206-.463H20.25v-5.39c0-.472-.156-.868-.469-1.187-.312-.32-.713-.48-1.203-.48-.489 0-.888.156-1.197.468-.31.312-.464.714-.464 1.206v5.383h-5.362c-.472 0-.868.156-1.187.468-.32.313-.48.714-.48 1.203 0 .49.157.889.468 1.198.312.31.714.464 1.207.464h5.354Zm1.594 16.055c-2.488 0-4.813-.464-6.975-1.392a17.923 17.923 0 0 1-5.664-3.813 17.929 17.929 0 0 1-3.813-5.662C1.131 22.806.667 20.48.667 17.99s.464-4.817 1.392-6.98c.928-2.163 2.198-4.048 3.809-5.653 1.61-1.606 3.497-2.877 5.66-3.813C13.688.607 16.015.139 18.507.139c2.491 0 4.82.467 6.985 1.403 2.166.935 4.05 2.204 5.655 3.807 1.604 1.603 2.874 3.488 3.81 5.655.935 2.167 1.403 4.497 1.403 6.988 0 2.491-.468 4.818-1.405 6.98-.936 2.161-2.207 4.046-3.813 5.654-1.605 1.608-3.49 2.878-5.653 3.81-2.164.931-4.49 1.397-6.979 1.397Z"
    />
  </Svg>
);
export default AddCircle;

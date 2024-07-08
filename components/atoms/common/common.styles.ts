import { styled } from '@utils/styled';
import { Dimensions, View } from 'react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const Flexed = styled(View)`
  flex: 1;
`;

export const JustifyCenter = styled(View)`
  justify-content: center;
`;

export const Row = styled(View)`
  flex-direction: row;
`;

export const RowReverse = styled(View)`
  flex-direction: row-reverse;
`;

export const RowCentered = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

export const Center = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const FlexedCenter = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const FlexedStart = styled(View)`
  justify-content: flex-start;
`;

export const AbsContainer = styled(View)`
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 0;
`;
export const PaddingView = styled(View)`
  padding: 16px;
`;
export const PL16View = styled(View)`
  padding-left: 16px;
`;
export const PT16View = styled(View)`
  padding-top: 16px;
`;
export const PR16View = styled(View)`
  padding-right: 16px;
`;
export const PB16View = styled(View)`
  padding-bottom: 16px;
`;

export const MarginView = styled(View)`
  margin: 16px;
`;
export const ML16View = styled(View)`
  margin-left: 16px;
`;
export const MT16View = styled(View)`
  margin-top: 16px;
`;
export const MR16View = styled(View)`
  margin-right: 16px;
`;
export const MB16View = styled(View)`
  margin-bottom: 16px;
`;

export const Spacer = styled(View)<{ size: number }>`
  height: ${({ size }: { size: number }) => size}px;
  width: ${({ size }: { size: number }) => size}px;
`;

export const Padder = styled(View)<{ size: number }>`
  padding: ${({ size }: { size: number }) => size}px;
`;

export const Marginer = styled(View)<{ size: number }>`
  margin: ${({ size }: { size: number }) => size}px;
`;

export const PaddingSpace = styled(View)`
  padding-left: 16px;
  padding-right: 16px;
`;

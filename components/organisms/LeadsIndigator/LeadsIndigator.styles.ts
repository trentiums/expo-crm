import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { FlatList } from 'react-native';

export const IndigatorContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  flex: 1;
`;
export const IndigatorText = styled(Text)`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 12px;
  max-width: 60px;
  text-align: center;
`;
export const IndigatorValueContainer = styled(View)<{
  color?: string;
  height?: number;
}>`
  height: ${({ height }) => height || 'auto'};
  width: 30px;
  border-radius: 30px;
  background-color: ${({ theme, color }) => color || theme.colors.lightYellow};
`;
export const FlatListCon = styled(FlatList).attrs({
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
  },
})`
  height: ${({ height }) => `${height}px` || 'auto'};
  max-height: ${({ maxHeight }) => `${maxHeight}px` || 'auto'};
`;
export const IndigatorValue = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkText};
`;

export const LabelContainer = styled(View)`
  justify-content: flex-start;
  height: 30px;
`;

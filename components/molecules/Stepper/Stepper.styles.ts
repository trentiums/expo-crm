import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { FlatList, Pressable } from 'react-native';
export const StepInfoContainer = styled(Pressable)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 16px;
`;
export const StepInfo = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StepList = styled(FlatList).attrs({
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    columnGap: 20,
  },
})`
  display: flex;
`;
export const StepText = styled(Text)<{ isCurrentStep: boolean }>`
  font-size: 14px;
  color: ${({ theme, isCurrentStep }) =>
    !isCurrentStep ? theme.colors.textGray : theme.colors.englishHolly};
`;
export const Separator = styled(View)<{ width: number }>`
  width: ${({ width }) => width || 65}px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.aria};
  margin-top: -20px;
`;

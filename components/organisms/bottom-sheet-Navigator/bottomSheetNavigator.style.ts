import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';

export const BottomSheetHeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.black15};
  padding: 15px;
`;

export const BottomSheetHeaderTitle = styled(Text)`
  font-size: 18px;
  text-align: center;
  flex: 1;
  color: ${({ theme }) => theme.colors.englishHolly};
`;

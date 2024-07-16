import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';

export const DropDownSelectedItemView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;
  border-width: 2px;
  margin: 2px 4px;
  border-color: ${({ theme }) => theme.colors.transparent};
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.darkBackground};
`;
export const SelectedText = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
`;
export const CrossIconView = styled(View)`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.white};
`;

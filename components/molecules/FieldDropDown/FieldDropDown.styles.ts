import View from '@atoms/View/View';
import { styled } from '@utils/styled';

export const FieldDropDownContainer = styled(View)<{ isError?: boolean }>`
  background-color: ${({ theme }) => theme.colors.transparent};
  padding: 8px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${({ theme, isError }) =>
    isError ? theme.colors.error : theme.colors.gray};
`;

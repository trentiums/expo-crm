import View from '@atoms/View/View';
import { styled } from '@utils/styled';

export const ChangePasswordContainer = styled(View)<{ spacing: number }>`
  background-color: ${({ theme }) => theme.colors.doctor};
  flex: 1;
  margin-top: ${({ spacing }) => spacing}px;
`;

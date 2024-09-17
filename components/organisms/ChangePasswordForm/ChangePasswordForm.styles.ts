import Button from '@atoms/Button/Button';
import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';

export const Label = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textDark};
  padding-bottom: 8px;
`;

export const ButtonSubmit = styled(Button)<{ valid: boolean }>`
  height: 48px;
  justify-content: center;
  background-color: ${({ theme, valid }) =>
    valid ? theme.colors.blueChaos : theme.colors.gray};
  border-radius: 50px;
  border-width: 1px;
`;

export const ViewMainContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  flex: 1;
`;

export const FormButtonText = styled(Text)<{ valid: boolean }>`
  font-weight: 700;
  color: ${({ valid, theme }) =>
    valid ? theme.colors.white : theme.colors.disabledTextColor};
`;

export const BottomContainer = styled(View)`
  flex: 0.2;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

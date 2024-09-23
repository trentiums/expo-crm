import Button from '@atoms/Button/Button';
import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import styled from 'styled-components';

export const MenuBottomContainer = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VersionText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const LogoutBtn = styled(Button)`
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  border-color: ${({ theme }) => theme.colors.christmasSilver};
  border-width: 1px;
`;

export const LogoutContainer = styled(View)`
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LogoutText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const PolicyText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const NormalText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const PolicyContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

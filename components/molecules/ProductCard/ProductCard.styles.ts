import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';

export const ProductInfoView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: 'center';
  flex: 1;
  flex-basis: auto;
  gap: 14px;
`;

export const ProductDetailContainer = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.aria};
`;
export const NameText = styled(Text)`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 20px;
  font-weight: 400;
  padding-top: 8px;
  padding-bottom: 24px;
`;
export const DetailContainer = styled(View)`
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  gap: 8px;
  padding-top: 24px;
`;

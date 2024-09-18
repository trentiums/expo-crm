import Button from '@atoms/Button/Button';
import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';

export const LeadsFilterFormContainer = styled(View)`
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
export const DateFilterContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 16px;
`;
export const DateContainer = styled(View)`
  width: 48%;
`;

export const FilterBtnText = styled(Text)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryColor};
  text-align: center;
`;
export const FilterFormView = styled(View)`
  flex: 1;
`;
export const FiltersDropDownViews = styled(View)`
  justify-content: flex-start;
`;
export const RemoveFilterBtnText = styled(Text)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.errorText};
  text-align: center;
`;
export const LeadsFilterButton = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
`;
export const FilterApplyButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.blueChaos};
  border-radius: 50px;
  width: 50%;
`;
export const RemoveFilterButton = styled(Button)`
  border-color: ${({ theme }) => theme.colors.lightGray};
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  width: 50%;
`;
export const RemoveButtonText = styled(Text)`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.englishHolly};
`;

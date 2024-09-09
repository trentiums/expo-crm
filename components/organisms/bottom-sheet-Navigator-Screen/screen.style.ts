import { styled } from '@utils/styled';
import { FlatList, View } from 'react-native';

export const CreateOptionContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
  padding-top: 15px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CreateOptionsFlatList = styled(FlatList).attrs({
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})``;

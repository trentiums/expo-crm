import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
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

export const ModifyLeadOptionContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
  padding-top: 15px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ModifyLeadOptionFlatList = styled(FlatList).attrs({
  contentContainerStyle: {
    flexDirection: 'column',
  },
})`
  padding: 0px 20px;
`;

export const BottomSheetListContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
  padding-top: 15px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const BottomSheetFlatListContainer = styled(BottomSheetFlatList).attrs({
  contentContainerStyle: {
    flexDirection: 'column',
  },
})`
  padding: 0px 20px;
`;

export const LoaderContainer = styled(View)`
  height: 100px;
`;

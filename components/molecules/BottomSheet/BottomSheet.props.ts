import { BottomSheetProps } from '@gorhom/bottom-sheet';

export interface BottomSheetMethods {
  snapToIndex: (value: number) => void;
}

export type BottomSheetCustomProps = Partial<BottomSheetProps> & {
  children?: any;
  snapPoints: BottomSheetProps['snapPoints'];
  bgColor?: string;
};

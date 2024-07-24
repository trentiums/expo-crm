import React, { useRef, forwardRef } from 'react';
import RNBottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import {
  BottomSheetCustomProps,
  BottomSheetMethods,
} from './BottomSheet.props';

const BottomSheet = (
  { bgColor, children, ...props }: BottomSheetCustomProps,
  ref: React.ForwardedRef<BottomSheetMethods>,
) => {
  const { snapPoints } = props;

  const bottomSheetRef = useRef<RNBottomSheet>(null);
  const bottomViewStyle: Object = {
    opacity: 1,
    backgroundColor: bgColor ? bgColor : '#161B22',
    borderRadius: 32,
  };
  // comment this function because its crash the app
  // useImperativeHandle(ref, () => ({
  //   snapToIndex: (index: number) => {
  //     bottomSheetRef.current?.snapToIndex(index);
  //   },
  // }));

  let extraProps: Partial<BottomSheetProps> = {
    snapPoints,
    style: { flex: 1 },
  };

  return (
    <RNBottomSheet
      {...props}
      {...extraProps}
      ref={bottomSheetRef}
      index={0}
      enableContentPanningGesture={false}
      handleIndicatorStyle={{
        backgroundColor: 'rgba(255, 255, 255, 0.60)',
      }}
      backgroundStyle={bottomViewStyle}>
      {children}
    </RNBottomSheet>
  );
};

export default forwardRef<BottomSheetMethods, BottomSheetCustomProps>(
  BottomSheet,
);

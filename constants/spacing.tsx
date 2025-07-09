import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  base: moderateScale(12),
  md: moderateScale(16),
  lg: moderateScale(20),
  xl: moderateScale(24),
  bold: {
    fontWeight: "bold",
  }
};
import { RFValue } from "react-native-responsive-fontsize";

export const textSizes = {
  xs: RFValue(9),
  sm: RFValue(12),
  base: RFValue(14),
  md: RFValue(16),
  lg: RFValue(20),
  xl: RFValue(24),
  title: RFValue(30),
} as const;

export const textWeights = {
  light: "300",
  regular: "500",
  medium: "700",
  bold: "800"
} as const;
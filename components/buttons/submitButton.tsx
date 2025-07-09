import React, { forwardRef, ReactNode } from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { spacing } from "../../constants/spacing";
import { textSizes, textWeights } from "@/constants/text";
import { Theme } from "@/constants/types";

type SubmitButtonProps = {
  text?: string;
  theme: Theme;
  onPress: () => void;
  style?: ViewStyle;
  children?: ReactNode;
};

const SubmitButton = forwardRef<any, SubmitButtonProps>(({ text, theme, onPress, style, children }, ref) => {

  return (
    <Pressable ref={ref} onPress={onPress} style={[styles.button, {backgroundColor: theme.text}, style,]}>
      <Text style={[{fontSize: textSizes.sm, fontWeight: textWeights.regular, color: theme.background}]}>{text}</Text>
      {children}
    </Pressable>
  );
});

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: spacing.md,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  text: {
    color: "#fff",
    fontSize: 16
  }
});
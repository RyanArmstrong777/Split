import React from "react";
import { StyleSheet, TextInput, View, ViewStyle } from "react-native";
import { spacing } from "../../constants/spacing";
import { textSizes, textWeights } from "../../constants/text";
import { Theme } from "../../constants/types";

type Props = {
  value: string
  onChangeText?: (text: string) => void
  onBlur?: () => void
  theme: Theme;
  keyboardType?: "default" | "numeric";
  placeholder?: string;
  style?: ViewStyle,
};

const DefaultInput: React.FC<Props> = ({ value, onChangeText, onBlur, theme, style, placeholder, keyboardType="default" }) => {

    return (
        <View style={[styles.container, style]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor={theme.accent}
                keyboardType={keyboardType}
                style={[styles.text, { color: theme.text, backgroundColor: theme.card }]}
            />
        </View>
    );
};

export default DefaultInput;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: textSizes.sm,
        fontWeight: textWeights.regular,
        padding: spacing.sm,
        flex: 0,
        width: "100%",
        borderRadius: 5
    }
});
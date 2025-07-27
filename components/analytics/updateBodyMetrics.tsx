import { useEffect, useState, useCallback, useMemo } from "react";
import { StyleSheet, Dimensions, SafeAreaView, Text, View, Pressable, ScrollView } from "react-native";
import { useThemeContext } from "@/contexts/themeContext";
import { spacing } from "../../constants/spacing";
import { textSizes, textWeights } from "@/constants/text";


const { width, height } = Dimensions.get("window");

export default function UpdateRecordsScreen() {

    const { theme } = useThemeContext()
    
    return (
        <SafeAreaView style={[styles.background, { backgroundColor: theme.background }]}>
            <View style={styles.container}>
                <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, paddingHorizontal: spacing.lg, paddingTop: spacing.lg}}>Update records</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        width,
        height: height - 110,
    },
    container: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        gap: spacing.sm
    }
});

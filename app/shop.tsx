import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import SubmitButton from "../components/buttons/submitButton";
import { spacing } from "../constants/spacing";
import { textSizes, textWeights } from "../constants/text";
import { ShopProduct } from "../constants/types";
import { useAppSettingsContext } from "../contexts/appSettingsContext";
import { useSplitContext } from "../contexts/splitContext";
import { useThemeContext } from "../contexts/themeContext";

const { width, height } = Dimensions.get("window");

export default function AnalyticsScreen() {

    const { theme } = useThemeContext()
    const { refreshKey, triggerRefresh } = useAppSettingsContext();
    const { split } = useSplitContext()
    const db = useSQLiteContext()

    const mainRef = useRef<ScrollView>(null)

    function viewShopItem(item?: ShopProduct | null) {
        let timeout: number;
        if (item) {
            setSelectedItem(item)
        }
        mainRef.current?.scrollTo({x: item ? width : 0})
    }

    const [selectedItem, setSelectedItem] = useState<ShopProduct | null>(null)

    useEffect(() => {
        viewShopItem(selectedItem)
    }, [selectedItem])
    
    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <View style={{padding: spacing.lg, paddingHorizontal: spacing.lg * 2, gap: spacing.sm, justifyContent: "center", alignItems: "center", flex: 1}}>
                <Image source={require('../assets/images/logo.png')} style={{aspectRatio: 1, width: "100%", alignItems: "center"}}/>
                <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, paddingTop: spacing.lg}}>
                    Remove ads
                </Text>
                <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, alignItems: "center"}}>
                    Enjoy the app? Make the experience better by removing those pesky distractions!
                </Text>
                <SubmitButton theme={theme} onPress={() => {}} text="£4.99" /> 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        gap: spacing.sm
    },
    actionButton: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 10,
        alignSelf: "flex-start"
    }
});

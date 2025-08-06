import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import Purchases, { LOG_LEVEL, PurchasesPackage } from 'react-native-purchases';
import SubmitButton from "../components/buttons/submitButton";
import { spacing } from "../constants/spacing";
import { textSizes, textWeights } from "../constants/text";
import { ShopProduct } from "../constants/types";
import { useAppSettingsContext } from "../contexts/appSettingsContext";
import { useSplitContext } from "../contexts/splitContext";
import { useThemeContext } from "../contexts/themeContext";
import { removeAds } from "../db/queries/app_settings/removeAds";

const { width, height } = Dimensions.get("window");

export default function AnalyticsScreen() {

    const { theme } = useThemeContext()
    const { refreshKey, triggerRefresh, settings } = useAppSettingsContext();
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

    useEffect(() => {
        Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

        if (Platform.OS === 'ios') {
            Purchases.configure({apiKey: "appl_IazrpTPhcwtllpcaCDausmHqJQH"});
        }
    }, []);

    const [purchasePackage, setPurchasePackage] = useState<PurchasesPackage | null>(null)

    useEffect(() => {
        const fetchOffering = async () => {
            try {
                const offerings = await Purchases.getOfferings()
                const pkg = offerings.current?.availablePackages[0]
                if (pkg) {
                    setPurchasePackage(pkg)
                    console.log(offerings)
                }
            } catch (error) {
                console.log("No IAPs found")
            }
        }
        fetchOffering()
    }, [])

    const handlePurchase = async () => {
        if (!purchasePackage) return;

        try {
            const customerInfo = await Purchases.purchasePackage(purchasePackage);
            const pids = customerInfo.customerInfo.allPurchasedProductIdentifiers;

            if (pids.includes("com.armsydev777.Split.remove_ads")) {
                removeAds(db);
                triggerRefresh();
            } else {
                console.warn("Purchase completed, but expected product ID not found.");
            }
        } catch (error) {
            console.error("Purchase failed:", error);
        }
    };
    
    return (
        <View style={{ backgroundColor: theme.background, flex: 1, padding: spacing.lg }}>
            <View style={{gap: spacing.sm, flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={{paddingHorizontal: spacing.lg, justifyContent: "center", alignItems: "center", gap: spacing.sm}}>
                    <Image source={require('../assets/images/logo_cropped.png')} style={{width: width - spacing.lg * 4, height: (width - spacing.lg * 4) / 2, resizeMode: "contain"}}/>
                    <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, paddingTop: spacing.lg}}>
                        {settings?.removeAds === 1 ? "Ads removed!" : "Remove ads"}
                    </Text>
                    <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, textAlign: "center"}}>
                        {settings?.removeAds === 1 ? "Thank you for helping out! it means a lot." : "Enjoy the app? Improve the experience by removing those pesky distractions!"}
                    </Text>
                </View>
                <SubmitButton theme={theme} onPress={() => settings?.removeAds === 1 ? {} : handlePurchase()} text={settings?.removeAds === 1 ? "Purchased!" : "£4.99"} style={{marginTop: spacing.md}}/>
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

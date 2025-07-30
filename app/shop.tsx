import RecordButton from "@/components/buttons/recordButton";
import SubmitButton from "@/components/buttons/submitButton";
import ShopItemCard from "@/components/shopItem";
import { textSizes, textWeights } from "@/constants/text";
import { ShopProduct } from "@/constants/types";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";
import { useSplitContext } from "@/contexts/splitContext";
import { useThemeContext } from "@/contexts/themeContext";
import { removeAds } from "@/db/queries/app_settings/removeAds";
import { getAllProducts } from "@/db/queries/shop/getAllProducts";
import { setItemPurchased } from "@/db/queries/shop/setItemPurchased";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ChevronLeft } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { spacing } from "../constants/spacing";

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

    const [items, setItems] = useState<ShopProduct[] | null>(null)

    const [selectedItem, setSelectedItem] = useState<ShopProduct | null>(null)

    useEffect(() => {
        viewShopItem(selectedItem)
    }, [selectedItem])

    async function purchaseItem(itemId: number) {
        const newItem = await setItemPurchased(db, itemId)
        if (selectedItem) {
            setSelectedItem({
                ...selectedItem,
                purchased: 1,
                id: selectedItem.id!,
            });
        }
        triggerRefresh()
    }

    async function getShopProducts() {
        const products = await getAllProducts(db)
        setItems(products)
    }

    async function handleRemoveAds() {
        removeAds(db)
        triggerRefresh()
    }

    useFocusEffect(
        useCallback(() => {
            getShopProducts()
        }, [refreshKey])
    );
    
    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <View style={{padding: spacing.lg, paddingHorizontal: spacing.lg * 2, gap: spacing.sm}}>
                <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, paddingTop: spacing.lg}}>
                    Shop
                </Text>
                <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular}}>
                    Purchase splits used by your favourite athletes!
                </Text>
                <SubmitButton theme={theme} onPress={() => settings?.removeAds === 1 ? {} : handleRemoveAds()} text={settings?.removeAds === 1 ? "Ads removed. Thanks!" : "Remove ads - £4.99"} style={{marginTop: spacing.sm}} />
            </View>
            <ScrollView style={{flex: 1}} horizontal pagingEnabled showsHorizontalScrollIndicator={false} ref={mainRef} scrollEnabled={false}>
                <ScrollView style={{width}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: spacing.lg, gap: spacing.sm}}>
                    {items?.map((item, index) => (
                        <View key={index}>
                            <ShopItemCard item={item} theme={theme} viewShopItem={viewShopItem} />
                        </View>
                    ))}
                </ScrollView>
                <View style={{width, flex: 1, paddingHorizontal: spacing.lg, gap: spacing.lg}}>
                    <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}} onPress={() => viewShopItem(null)}>
                        <ChevronLeft size={textSizes.md} color={theme.text}/>
                        <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.bold, marginRight: "auto"}}>
                            Back
                        </Text>
                    </RecordButton>
                    <View style={{ flex: 1, paddingBottom: spacing.lg, gap: spacing.lg }}>
                        <ScrollView contentContainerStyle={{paddingHorizontal: spacing.lg, gap: spacing.md}} style={{flex: 1}} showsVerticalScrollIndicator={false}>
                            <Text style={{ fontSize: textSizes.lg, color: theme.text, fontWeight: textWeights.bold }}>
                                {selectedItem?.title}
                            </Text>
                            <View style={{gap: spacing.sm}}>
                                <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.bold }}>
                                    Description
                                </Text>
                                <Text
                                    style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.light }}
                                >
                                    {selectedItem?.description}
                                </Text>
                            </View>

                            <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.light }}>
                                Note: adjust weight to facilitate your capabilities
                            </Text>
                            
                            <View style={{gap: spacing.sm}}>
                                <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.bold }}>
                                    Focus
                                </Text>
                                <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.light }}>
                                    - {selectedItem?.focus}
                                </Text>
                            </View>
                            
                            <View style={{gap: spacing.sm}}>
                                <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.bold }}>
                                    Difficulty
                                </Text>
                                <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.light }}>
                                    - {selectedItem?.difficulty}
                                </Text>
                            </View>

                            <View style={{gap: spacing.sm}}>
                                <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.bold }}>
                                    What's included?
                                </Text>
                                <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.light }}>
                                    - 1 Gym plan
                                </Text>
                            </View>

                        </ScrollView>
                        <SubmitButton style={{marginTop: 0}} theme={theme} onPress={() => (selectedItem?.purchased === 1 || !selectedItem) ? {} : purchaseItem(selectedItem.id)} text={(selectedItem?.purchased === 1) ? "Purchased" : `+ £${selectedItem?.price}`} />
                    </View>
                </View>
            </ScrollView>
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

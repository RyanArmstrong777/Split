import { useState, useCallback, useRef, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { StyleSheet, Dimensions, Text, ScrollView, View } from "react-native";
import { useThemeContext } from "@/contexts/themeContext";
import { spacing } from "../constants/spacing";
import { useSQLiteContext } from "expo-sqlite";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";
import { textSizes, textWeights } from "@/constants/text";
import { ShopProduct } from "@/constants/types";
import { getAllProducts } from "@/db/queries/shop/getAllProducts";
import RecordButton from "@/components/buttons/recordButton";
import ShopItemCard from "@/components/shopItem";
import { ChevronLeft } from "lucide-react-native";
import { setItemPurchased } from "@/db/queries/shop/setItemPurchased";
import SubmitButton from "@/components/buttons/submitButton";
import { useSplitContext } from "@/contexts/splitContext";

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

    useFocusEffect(
        useCallback(() => {
            getShopProducts()
        }, [refreshKey])
    );
    
    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <View style={{padding: spacing.lg}}>
                <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, padding: spacing.lg, paddingBottom: 0}}>
                    Shop
                </Text>
                <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, paddingHorizontal: spacing.lg, paddingTop: spacing.sm}}>
                    Purchase splits used by your favourite athletes!
                </Text>
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

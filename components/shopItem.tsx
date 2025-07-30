import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import RecordButton from './buttons/recordButton';
import { spacing } from '@/constants/spacing';
import { textSizes, textWeights } from '@/constants/text';
import { ShopProduct } from '@/constants/types';
import { setItemPurchased } from '@/db/queries/shop/setItemPurchased';
import { useSQLiteContext } from 'expo-sqlite';
import { useAppSettingsContext } from '@/contexts/appSettingsContext';
import * as InAppPurchases from 'expo-in-app-purchases';

type Props = {
    item: ShopProduct;
    theme: any;
    showPrice?: boolean;
    viewShopItem?: (item: ShopProduct) => void
    purchaseFunction: (productId: string) => void
};

const ShopItemCard: React.FC<Props> = ({ item, theme, showPrice, viewShopItem, purchaseFunction }) => {

    const db = useSQLiteContext()
    const { triggerRefresh } = useAppSettingsContext()

    async function purchaseItem(itemId: number) {
        await setItemPurchased(db, itemId)
        triggerRefresh()
    }

    return (
        <RecordButton key={item.id} theme={theme} style={{ paddingVertical: spacing.lg }} onPress={() => viewShopItem ? viewShopItem(item) : {}}>
            <View style={{ flex: 1, gap: spacing.sm, paddingHorizontal: spacing.lg }}>
                <Text style={{ fontSize: textSizes.lg, color: theme.text, fontWeight: textWeights.bold }}>
                    {item.title}
                </Text>
                <Text
                    style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.light }}
                    numberOfLines={2}
                    lineBreakMode="tail"
                >
                    {item.description}
                </Text>
                <View style={{ flex: 0, paddingTop: spacing.sm, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable
                        style={[styles.actionButton, { backgroundColor: theme.text }]}
                        onPress={() => (item.purchased === 1) ? {} : purchaseItem(item.id)}
                    >
                        <Text style={{ fontSize: textSizes.sm, color: theme.background, fontWeight: textWeights.regular }}>
                            {(item.purchased === 1) ? "Purchased" : `+ £${item.price}`}
                        </Text>
                    </Pressable>
                    {showPrice && (
                        <Pressable style={[styles.actionButton, { backgroundColor: theme.background, marginRight: "auto" }]} onPress={() => purchaseFunction(item.title.toLowerCase().replace(/\s+/g, '_'))}>
                            <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular }}>
                                £{item.price}
                            </Text>
                        </Pressable>
                    )}
                    {viewShopItem && (
                        <Pressable
                            style={[styles.actionButton, { backgroundColor: theme.card }]}
                            onPress={() => viewShopItem(item)}
                        >
                            <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular }}>
                                See more
                            </Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </RecordButton>
    );
};

export default ShopItemCard;

const styles = StyleSheet.create({
    actionButton: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 10,
        alignSelf: "flex-start"
    }
});

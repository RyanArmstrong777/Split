import * as InAppPurchases from 'expo-in-app-purchases'
import { useFocusEffect } from "expo-router"
import { useSQLiteContext } from "expo-sqlite"
import { Bell, Check, ChevronLeft, ChevronRight, Dumbbell, Eraser, Moon, RefreshCw, ShoppingCart, Vibrate } from "lucide-react-native"
import { useCallback, useEffect, useRef, useState } from "react"
import { Dimensions, Pressable, ScrollView, StyleSheet, Switch, Text, Vibration, View } from "react-native"
import AdBanner from "../components/ads/adBanner"
import RecordButton from "../components/buttons/recordButton"
import ShopItemCard from "../components/shopItem"
import { spacing } from "../constants/spacing"
import { textSizes, textWeights } from "../constants/text"
import { ShopProduct } from "../constants/types"
import { useAppSettingsContext } from "../contexts/appSettingsContext"
import { useThemeContext } from "../contexts/themeContext"
import { removeAds } from "../db/queries/app_settings/removeAds"
import { getAllProducts } from "../db/queries/shop/getAllProducts"
import runSeeder from "../db/seeder"
import { seedArnoldSplit } from "../db/seeders/shop_products/ArnoldSchwarzenegger"
import { seedChrisBumsteadSplit } from "../db/seeders/shop_products/ChrisBumstead"
import { seedDavidLaidSplit } from "../db/seeders/shop_products/DavidLaid"
import { seedGregDoucetteSplit } from "../db/seeders/shop_products/GregDoucette"
import { seedJeffCavaliereSplit } from "../db/seeders/shop_products/JeffCavaliere"
import { seedJeffNippardSplit } from "../db/seeders/shop_products/JeffNippard"
import { seedJeremyEthierSplit } from "../db/seeders/shop_products/JeremyEthier"
import { seedNickWalkerSplit } from "../db/seeders/shop_products/NickWalker"
import { seedOmarIsufSplit } from "../db/seeders/shop_products/OmarIsuf"
import { seedSamSulekSplit } from "../db/seeders/shop_products/SamSulek"
import deleteTables from "../db/utilities/deleteTables"

const { width } = Dimensions.get("window")

export default function SettingsScreen() {

    const { theme, changeTheme } = useThemeContext()
    
    const db = useSQLiteContext()

    const { settings, updateSettings, triggerRefresh, refreshKey } = useAppSettingsContext()

    const mainRef = useRef<ScrollView>(null)

    const [weightUnits, setWeightUnits] = useState(false)
    const [themeValue, setThemeValue] = useState(false)
    const [notifications, setNotifications] = useState(false)
    const [vibrationFeedback, setVibrationFeedback] = useState(false)
    const [isResetting, setIsResetting] = useState(false)

    const [items, setItems] = useState<ShopProduct[] | null>(null)

    useEffect(() => {
        if (settings) {
            setWeightUnits(settings?.weightUnit === "kg");
            setThemeValue(settings?.theme === "dark")
            setNotifications(settings?.notificationsEnabled === 1)
            setVibrationFeedback(settings?.vibrationFeedback === 1)
        }
    }, [settings]);

    function handleSetWeightUnits() {
        const newValue = weightUnits ? "lbs" : "kg";
        updateSettings({ weightUnit: newValue });
        setWeightUnits(prev => !prev)
    };

    function handleChangeTheme() {
        const newValue = themeValue ? "light" : "dark";
        changeTheme(newValue);
        setThemeValue(prev => !prev)
    }

    function handleSetNotifications() {
        const newValue = notifications ? 0 : 1
        updateSettings({ notificationsEnabled: newValue })
        setNotifications(prev => !prev)
    }

    function handleSetVibrationFeedback() {
        const newValue = vibrationFeedback ? 0 : 1
        if (newValue === 1 && settings?.vibrationFeedback === 1) {
            Vibration.vibrate(200)
        }
        updateSettings({ vibrationFeedback: newValue })
        setVibrationFeedback(prev => !prev)
    }

    async function handleResetApp() {
        await deleteTables(db)
        await runSeeder(db)
        if (settings?.vibrationFeedback === 1) {
            Vibration.vibrate(200)
        }
        triggerRefresh()
        setIsResetting(true)
        setTimeout(() => {
            setIsResetting(false)
        }, 800)
    }
    
    function viewPurchases(value: boolean) {
        mainRef.current?.scrollTo({x: value ? width : 0})
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

    const handleRestorePurchases = async () => {
        try {
            const { responseCode, results } = await InAppPurchases.getPurchaseHistoryAsync();

            if (responseCode === InAppPurchases.IAPResponseCode.OK && results) {
                for (const purchase of results) {
                    if (!purchase.acknowledged) {
                        switch (purchase.productId) {
                            case 'remove_ads':
                                removeAds(db);
                                break;
                            case 'arnold_inspired':
                                seedArnoldSplit(db);
                                break;
                            case 'cbum_inspired':
                                seedChrisBumsteadSplit(db);
                                break;
                            case 'david_laid_inspired':
                                seedDavidLaidSplit(db);
                                break;
                            case 'greg_doucette_inspired':
                                seedGregDoucetteSplit(db);
                                break;
                            case 'jeff_cavaliere_inspired':
                                seedJeffCavaliereSplit(db);
                                break;
                            case 'jeff_nippard_inspired':
                                seedJeffNippardSplit(db);
                                break;
                            case 'jeremy_ethier_inspired':
                                seedJeremyEthierSplit(db);
                                break;
                            case 'nick_walker_inspired':
                                seedNickWalkerSplit(db);
                                break;
                            case 'omar_isuf_inspired':
                                seedOmarIsufSplit(db);
                                break;
                            case 'sam_sulek_inspired':
                                seedSamSulekSplit(db);
                                break;
                        }

                        await InAppPurchases.finishTransactionAsync(purchase, true);
                    }
                }
            }
        } catch (error) {
            console.error('Restore error:', error);
        }
    };

    return (
        <View style={{backgroundColor: theme.background, flex: 1}}>
            <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, padding: spacing.lg * 2, paddingBottom: 0}}>Settings</Text>
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} ref={mainRef} scrollEnabled={false}>
                <View style={[styles.container, {backgroundColor: theme.background}]}>
                    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}}>
                            <Dumbbell size={textSizes.md} color={theme.text}/>
                            <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, marginRight: "auto"}}>
                                Use Metric Units? (kg)
                            </Text>
                            <Switch value={weightUnits} onValueChange={() => handleSetWeightUnits()} />
                        </RecordButton>
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}}>
                            <Moon size={textSizes.md} color={theme.text}/>
                            <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, marginRight: "auto"}}>
                                Dark Mode
                            </Text>
                            <Switch value={themeValue} onValueChange={() => handleChangeTheme()} />
                        </RecordButton>
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}}>
                            <Bell size={textSizes.md} color={theme.text}/>
                            <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, marginRight: "auto"}}>
                                Notifications
                            </Text>
                            <Switch value={notifications} onValueChange={() => handleSetNotifications()} />
                        </RecordButton>
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}}>
                            <Vibrate size={textSizes.md} color={theme.text}/>
                            <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, marginRight: "auto"}}>
                                Vibration Feedback
                            </Text>
                            <Switch value={vibrationFeedback} onValueChange={() => handleSetVibrationFeedback()} />
                        </RecordButton>
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}} onPress={() => viewPurchases(true)}>
                            <ShoppingCart size={textSizes.md} color={theme.text}/>
                            <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, marginRight: "auto"}}>
                                View Purchases
                            </Text>
                            <ChevronRight size={textSizes.md} color={theme.text}/>
                        </RecordButton>
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}} onPress={() => handleRestorePurchases()}>
                            <RefreshCw size={textSizes.md} color={theme.text}/>
                            <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, marginRight: "auto"}}>
                                Restore Purchases
                            </Text>
                        </RecordButton>
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}} onPress={() => handleResetApp()}>
                            {isResetting ? (
                                <Check size={textSizes.md} color={"green"}/>
                            ) : (
                                <Eraser size={textSizes.md} color={theme.text}/>
                            )}
                            <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular}}>
                                Reset App
                            </Text>
                        </RecordButton>
                    </ScrollView>
                </View>
                <View style={[styles.container, {backgroundColor: theme.background, gap: 0}]}>
                    <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg}}>
                        <Pressable onPress={() => viewPurchases(false)} style={{paddingVertical: spacing.md}}>
                            <ChevronLeft size={textSizes.md} color={theme.text}/>
                        </Pressable>
                        <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.bold, marginRight: "auto"}}>
                            Purchases
                        </Text>
                    </RecordButton>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {items?.filter(item => item.purchased === 1).map((item) => (
                            <View key={item.id}>
                                <ShopItemCard
                                    item={item}
                                    theme={theme}
                                    showPrice={true}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            <AdBanner style={{alignItems: "center", width: "100%", paddingVertical: spacing.sm}} id={"ca-app-pub-9362350160554339/8670022380"}/>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        gap: spacing.lg,
    }
})
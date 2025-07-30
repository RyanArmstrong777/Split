import AdBanner from "@/components/ads/adBanner"
import RecordButton from "@/components/buttons/recordButton"
import ShopItemCard from "@/components/shopItem"
import { spacing } from "@/constants/spacing"
import { textSizes, textWeights } from "@/constants/text"
import { ShopProduct } from "@/constants/types"
import { useAppSettingsContext } from "@/contexts/appSettingsContext"
import { useThemeContext } from "@/contexts/themeContext"
import { getAllProducts } from "@/db/queries/shop/getAllProducts"
import runSeeder from "@/db/seeder"
import deleteTables from "@/db/utilities/deleteTables"
import { useFocusEffect } from "expo-router"
import { useSQLiteContext } from "expo-sqlite"
import { Bell, Check, ChevronLeft, ChevronRight, Dumbbell, Eraser, Moon, RefreshCw, ShoppingCart, Vibrate } from "lucide-react-native"
import { useCallback, useEffect, useRef, useState } from "react"
import { Dimensions, Pressable, ScrollView, StyleSheet, Switch, Text, Vibration, View } from "react-native"

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
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}}>
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

            <AdBanner style={{alignItems: "center", width: "100%", paddingVertical: spacing.sm}} />
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
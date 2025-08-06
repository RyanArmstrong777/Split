import { useSQLiteContext } from "expo-sqlite"
import { Bell, Check, Dumbbell, Eraser, Moon, RefreshCw, Vibrate } from "lucide-react-native"
import { useEffect, useRef, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Switch, Text, Vibration, View } from "react-native"
import Purchases, { PurchasesPackage } from 'react-native-purchases'
import AdBanner from "../components/ads/adBanner"
import RecordButton from "../components/buttons/recordButton"
import { spacing } from "../constants/spacing"
import { textSizes, textWeights } from "../constants/text"
import { useAppSettingsContext } from "../contexts/appSettingsContext"
import { useThemeContext } from "../contexts/themeContext"
import { removeAds } from "../db/queries/app_settings/removeAds"
import runSeeder from "../db/seeder"
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

    async function restorePurchases() {
        try {
            const customerInfo = await Purchases.restorePurchases();
            const pids = customerInfo.allPurchasedProductIdentifiers;

            if (pids.includes("prodf6f62963e8")) {
                removeAds(db);
            } else {
                console.warn("Restored purchases, but expected product ID not found.");
            }
        } catch (error) {
            console.error("Restore failed:", error);
        }
    }

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
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}} onPress={() => restorePurchases()}>
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
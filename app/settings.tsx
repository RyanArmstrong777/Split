import { spacing } from "@/constants/spacing"
import { textSizes, textWeights } from "@/constants/text"
import { useThemeContext } from "@/contexts/themeContext"
import { View, StyleSheet, SafeAreaView, Text, Switch, ScrollView } from "react-native"
import RecordButton from "@/components/buttons/recordButton"
import { useAppSettingsContext } from "@/contexts/appSettingsContext"
import { useState, useEffect } from "react"
import { Bell, Check, ChevronRight, Dumbbell, Eraser, Moon, RefreshCw, ShoppingCart, Vibrate } from "lucide-react-native"
import deleteTables from "@/db/utilities/deleteTables"
import { useSQLiteContext } from "expo-sqlite"
import runSeeder from "@/db/seeder"

export default function SettingsScreen() {

    const { theme, changeTheme } = useThemeContext()
    
    const db = useSQLiteContext()

    const { settings, updateSettings, triggerRefresh } = useAppSettingsContext()

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
        updateSettings({ vibrationFeedback: newValue })
        setVibrationFeedback(prev => !prev)
    }

    async function handleResetApp() {
        await deleteTables(db)
        await runSeeder(db)
        triggerRefresh()
        setIsResetting(true)
        setTimeout(() => {
            setIsResetting(false)
        }, 800)
    }

    return (
        <SafeAreaView style={[{backgroundColor: theme.background, flex: 1}]}>
            <View style={styles.container}>
                <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, padding: spacing.lg}}>Settings</Text>
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
                    <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg, paddingVertical: spacing.md}}>
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
                        <ChevronRight size={textSizes.md} color={theme.text}/>
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.lg,
    }
})
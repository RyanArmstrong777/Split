import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { House, NotebookPen, Dumbbell, ChartNoAxesColumnIncreasing, Settings } from 'lucide-react-native';
import { textSizes } from '../constants/text';
import { spacing } from '../constants/spacing';
import { useThemeContext } from '@/contexts/themeContext';
import { darkTheme } from '../constants/colors';
import { router } from 'expo-router';

const { width } = Dimensions.get("window");

export default function Navbar() {

    const { theme, changeTheme } = useThemeContext()

    const [activeTab, setActiveTab] = useState<"splits" | "" | "analytics" | "settings">("")
  
    const handleThemeToggle = () => {
        const newTheme = theme === darkTheme ? 'light' : 'dark';
        changeTheme(newTheme);
    };

    useEffect(() => {
        router.replace(`/${activeTab}`)
    }, [activeTab])

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Pressable style={[styles.iconWrapper, { aspectRatio: 1, backgroundColor: theme.background, borderWidth: 0}, styles.borderRadius, styles.shadow, {shadowColor: theme.text}]} onPress={() => handleThemeToggle()}>
                <House size={textSizes.lg} color={theme.text}></House>
            </Pressable>
            <View style={[styles.midSection, styles.borderRadius, styles.shadow, {shadowColor: theme.text, backgroundColor: theme.background}]}>
                <Pressable style={[styles.iconWrapper, { aspectRatio: 1, backgroundColor: theme.background  }, styles.borderRadius]} onPress={() => setActiveTab("splits")}>
                    <NotebookPen size={textSizes.lg} color={theme.text} />
                </Pressable>
                <Pressable style={[styles.iconWrapper, { aspectRatio: 1, backgroundColor: theme.background, marginHorizontal: "auto" }, styles.borderRadius]} onPress={() => setActiveTab("")}>
                    <Dumbbell size={textSizes.lg} color={theme.text} />
                </Pressable>
                <Pressable style={[styles.iconWrapper, { aspectRatio: 1, backgroundColor: theme.background }, styles.borderRadius ]} onPress={() => setActiveTab("analytics")}>
                    <ChartNoAxesColumnIncreasing size={textSizes.lg} color={theme.text} />
                </Pressable>
            </View>
            <Pressable style={[styles.iconWrapper, { aspectRatio: 1, backgroundColor: theme.background }, styles.borderRadius, styles.shadow, {shadowColor: theme.text}]} onPress={() => setActiveTab("settings")}>
                <Settings size={textSizes.lg} color={theme.text} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width,
        height: 60,
        marginBottom: 50,
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
        flexDirection: "row",
    },
    iconWrapper: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    midSection: {
        flex: 1,
        flexDirection: "row",
    },
    borderRadius: {
        borderRadius: 20,
    },
    shadow: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    }
});
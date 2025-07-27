import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { ShoppingBag, NotebookPen, Dumbbell, ChartNoAxesColumnIncreasing, Settings } from 'lucide-react-native';
import { textSizes } from '../constants/text';
import { spacing } from '../constants/spacing';
import { useThemeContext } from '@/contexts/themeContext';
import { darkTheme } from '../constants/colors';
import { router } from 'expo-router';

const { width, height } = Dimensions.get("window");

export default function Navbar() {
    const { theme, changeTheme } = useThemeContext();
    const [activeTab, setActiveTab] = useState<"shop" | "splits" | "" | "analytics" | "settings">("");

    const handleThemeToggle = () => {
        const newTheme = theme === darkTheme ? 'light' : 'dark';
        changeTheme(newTheme);
    };

    useEffect(() => {
        if (activeTab !== null) {
            router.replace(`/${activeTab}`);
        }
    }, [activeTab]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Pressable
                style={[
                    styles.button,
                    styles.outerButton,
                    { shadowColor: theme.text, backgroundColor: theme.background }
                ]}
                onPress={() => setActiveTab("shop")}
            >
                <ShoppingBag size={textSizes.lg} color={theme.text} />
            </Pressable>

            <View style={[
                styles.middleContainer,
                styles.outerButton,
                { backgroundColor: theme.background, shadowColor: theme.text }
            ]}>
                <Pressable
                    style={[styles.button, { backgroundColor: theme.background }]}
                    onPress={() => setActiveTab("splits")}
                >
                    <NotebookPen size={textSizes.lg} color={theme.text} />
                </Pressable>

                <Pressable
                    style={[styles.button, { backgroundColor: theme.background }]}
                    onPress={() => setActiveTab("")}
                >
                    <Dumbbell size={textSizes.lg} color={theme.text} />
                </Pressable>

                <Pressable
                    style={[styles.button, { backgroundColor: theme.background }]}
                    onPress={() => setActiveTab("analytics")}
                >
                    <ChartNoAxesColumnIncreasing size={textSizes.lg} color={theme.text} />
                </Pressable>
            </View>

            <Pressable
                style={[
                    styles.button,
                    styles.outerButton,
                    { shadowColor: theme.text, backgroundColor: theme.background }
                ]}
                onPress={() => setActiveTab("settings")}
            >
                <Settings size={textSizes.lg} color={theme.text} />
            </Pressable>
        </View>
    );
}

const shadowStyle = {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
};

const styles = StyleSheet.create({
    container: {
        width,
        padding: spacing.lg,
        gap: spacing.lg,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "red"
    },

    middleContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 20,
        ...shadowStyle,
    },

    button: {
        aspectRatio: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.md
    },

    outerButton: {
        ...shadowStyle,
    },
});

import Navbar from "@/components/navbar";
import ThemedBackground from "@/components/themedBackground";
import { AppSettingsProvider } from "@/contexts/appSettingsContext";
import { SplitProvider } from "@/contexts/splitContext";
import { ThemeProvider } from "@/contexts/themeContext";
import runSeeder from "@/db/seeder";
import { Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaView, View } from "react-native";

function InnerApp() {

    return (
        <AppSettingsProvider>
            <ThemeProvider>
                <SplitProvider>
                    <ThemedBackground>
                        <SafeAreaView style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <Tabs
                                screenOptions={{
                                    headerShown: false,
                                    tabBarStyle: { display: "none" },
                                }}
                                >
                                    <Tabs.Screen name="index" options={{ title: "Workout" }} />
                                    <Tabs.Screen name="splits" options={{ title: "Splits" }} />
                                    <Tabs.Screen name="settings" options={{ title: "Settings" }} />
                                    <Tabs.Screen name="analytics" options={{ title: "Analytics" }} />
                                    <Tabs.Screen name="shop" options={{ title: "Shop" }} />
                                </Tabs>
                            </View>
                            <Navbar />
                        </SafeAreaView>
                    </ThemedBackground>
                </SplitProvider>
            </ThemeProvider>
        </AppSettingsProvider>
    );
}

export default function RootLayout() {
    return (
        <SQLiteProvider
            databaseName="pushpump.db"
            options={{ useNewConnection: false }}
            onInit={async (db) => {
                try {
                    await runSeeder(db);
                } catch (e) {
                    console.error("Seeder failed:", e);
                }
            }}
        >
            <InnerApp />
        </SQLiteProvider>
    );
}

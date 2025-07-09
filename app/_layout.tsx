import { SQLiteProvider } from 'expo-sqlite';
import runSeeder from '@/db/seeder';
import { Tabs } from 'expo-router';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/contexts/themeContext';
import ThemedBackground from '@/components/themedBackground';
import { SplitProvider } from '@/contexts/splitContext';
import { AppSettingsProvider } from '@/contexts/appSettingsContext';

function InnerApp() {
  return (
    <AppSettingsProvider>
      <ThemeProvider>
        <SplitProvider>
          <ThemedBackground>
            <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
              <Tabs.Screen name="index" options={{ title: 'Workout' }} />
              <Tabs.Screen name="splits" options={{ title: 'Splits' }} />
              <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
              <Tabs.Screen name="analytics" options={{ title: 'Analytics' }} />
            </Tabs>
            <Navbar />
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
          console.error('Seeder failed:', e);
        }
      }}
    >
      <InnerApp />
    </SQLiteProvider>
  );
}
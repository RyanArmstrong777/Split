import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useThemeContext } from '@/contexts/themeContext';

type ThemedBackgroundProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function ThemedBackground({ children, style }: ThemedBackgroundProps) {

    const { theme } = useThemeContext();

    return (
        <View style={[{ flex: 1, backgroundColor: theme.background }, style]}>
        {children}
        </View>
    );
}
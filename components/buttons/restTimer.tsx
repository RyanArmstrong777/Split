import { Clock } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, Vibration } from 'react-native';
import { spacing } from '../../constants/spacing';
import { textSizes, textWeights } from '../../constants/text';
import { useThemeContext } from '../../contexts/themeContext';

type RestTimerProps = {
  time: number;
  onPress?: () => void;
};

const RestTimer: React.FC<RestTimerProps> = ({ time, onPress }) => {
  const [remainingTime, setRemainingTime] = useState(time);
  const [isActive, setIsActive] = useState(false);

  const { theme } = useThemeContext();

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime <= 0) {
      setIsActive(false);
      Vibration.vibrate(100)
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, remainingTime]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePress = () => {
    if (!isActive) {
      setRemainingTime(time);
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable onPress={handlePress} style={[styles.button, {backgroundColor: theme.text}]}>
        <Clock size={textSizes.md} color={theme.background} />
        <Text style={{fontSize: textSizes.sm, fontWeight: textWeights.regular, color: theme.background}}>{isActive ? formatTime(remainingTime) : `Rest for ${formatTime(time)}s`}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        paddingVertical: spacing.md,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: "auto",
        flexDirection: "row",
        gap: spacing.sm,
    }
})

export default RestTimer;
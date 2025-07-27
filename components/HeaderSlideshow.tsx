import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useSharedValue, runOnJS } from 'react-native-reanimated';
import { textSizes, textWeights } from '../constants/text';
import { Theme } from '@/constants/types';
import { quotes } from '@/constants/quotes';
import { spacing } from '@/constants/spacing';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { getDateAsDayNumber } from '@/utilities/getDateAsDayNumber';
import { getWeek } from '@/utilities/getWeek';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CompletedWorkout, Workout } from '@/constants/types';

const SWIPE_THRESHOLD = 50;

type Props = {
  selectedDate: string;
  setSelectedDate: (date: string) => void
  today: string;
  selectedWorkout: (CompletedWorkout & Workout) | null;
  theme: Theme;
};

const { width, height } = Dimensions.get('window');

const HeaderSlideshow = ({
  selectedDate,
  setSelectedDate,
  today,
  selectedWorkout,
  theme,
}: Props) => {

  const [showQuote, setShowQuote] = useState(false);
  const [randomQuote, setRandomQuote] = useState('');
  const slideAnim = useRef(new Animated.Value(300)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<number | null>(null);

  const [day, setDay] = useState(getDateAsDayNumber(today))

  const week = getWeek()

  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const swipe = Gesture.Pan()
  .onUpdate((e) => {
    position.value = e.translationX;
  })
  .onEnd((e) => {
    const isRightSwipe = e.translationX > SWIPE_THRESHOLD;
    const isLeftSwipe = e.translationX < -SWIPE_THRESHOLD;

    if (isRightSwipe) {
      position.value = 0;
      onLeft.value = false;
      runOnJS(setSelectedDate)(week[(day - 1 + 7) % 7]);
    } else if (isLeftSwipe) {
      position.value = 0;
      onLeft.value = true;
      runOnJS(setSelectedDate)(week[(day + 1 + 7) % 7]);
    } else {
      position.value = 0;
    }
  });

  const workoutDateText =
    selectedDate === today
      ? 'Today'
      : new Date(selectedDate).toLocaleDateString('en-US', {
          weekday: 'long',
        });

  const startSlideshowInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      animateFadeOutAndSlideIn();
    }, 10000);
  };

  const animateFadeOutAndSlideIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setShowQuote(prev => {
        const next = !prev;

        if (next && quotes.length > 0) {
          const quote = quotes[Math.floor(Math.random() * quotes.length)];
          setRandomQuote(quote);
        }

        slideAnim.setValue(300);
        opacityAnim.setValue(1);

        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();

        return next;
      });
    });
  };

  useEffect(() => {
    slideAnim.setValue(300);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    startSlideshowInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    slideAnim.stopAnimation();
    opacityAnim.stopAnimation();

    setShowQuote(false);
    slideAnim.setValue(0);
    opacityAnim.setValue(1);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    startSlideshowInterval();
  }, [selectedDate, selectedWorkout]);

  useEffect(() => {
    setDay(getDateAsDayNumber(selectedDate));
  }, [selectedDate]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={swipe}>
        <View style={styles.innerView}>
          <Animated.View
            style={{
              transform: [{ translateX: slideAnim }],
              opacity: opacityAnim,
            }}
          >
            {!showQuote ? (
              <View style={styles.pageTitle}>
                <Text
                  style={{
                    fontSize: textSizes.sm,
                    color: theme.text,
                    fontWeight: textWeights.regular,
                  }}
                >
                  {`${workoutDateText} is`}
                </Text>
                <Text
                  style={{
                    fontSize: textSizes.xl,
                    color: theme.text,
                    fontWeight: textWeights.bold,
                    textAlign: "center"
                  }}
                >
                  {selectedWorkout?.name ?? "Rest day"}
                </Text>
              </View>
            ) : (
              <View style={styles.quoteView}>
                <Text
                  style={{
                    fontSize: textSizes.md,
                    color: theme.text,
                    fontWeight: textWeights.light,
                    textAlign: 'center',
                  }}
                >
                  {randomQuote}
                </Text>
              </View>
            )}
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: height * .1,
  },
  innerView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * .05,
    flex: 1
  },
  pageTitle: {
    alignItems: 'center',
    justifyContent: "center"
  },
  quoteView: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
});

export default HeaderSlideshow;

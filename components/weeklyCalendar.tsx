import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { spacing } from "../constants/spacing";
import { textSizes } from "../constants/text";
import { CalendarProps } from "../constants/types";

const { height } = Dimensions.get("window");

export default function WeeklyCalendar({ selectedDate, setSelectedDate, theme, style, goToSection }: CalendarProps) {

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().split('T')[0]);
    }
    
    return weekDates;
  };

  const weekDates = getWeekDates();

  function handleDateChange(date: string) {
    setSelectedDate(date)
    if (goToSection) {
      goToSection(0)
    }
  }

  return (
    <View style={[styles.calendarContainer, style]}>
      {days.map((dayLetter, index) => {
        const date = weekDates[index];
        const isSelected = selectedDate === date;
        
        return (
          <Pressable
            key={date}
            onPress={() => {
              handleDateChange(date);
            }}
            style={[
              styles.calendarButton,
              {
                backgroundColor: isSelected ? theme.text : theme.background,
              },
            ]}
          >
            <Text
              style={[
                {
                  fontSize: textSizes.md,
                  color: isSelected ? theme.background : theme.text,
                },
                styles.dayLetter,
              ]}
            >
              {dayLetter}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "center",
  },
  calendarButton: {
    padding: spacing.xs,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  dayLetter: {
    height: textSizes.md,
    width: textSizes.md,
    textAlign: "center",
    lineHeight: textSizes.md + 3,
  },
});
import { ViewStyle } from "react-native";

export type AppSettings = {
    id: number,
    theme: string,
    notificationsEnabled: number,
    weightUnit: 'kg' | 'lbs',
    vibrationFeedback: number,
    currentSplitId: number,
    removeAds: number
};

export type Split = {
    id: number,
    name: string,
    description: string
}

export type Workout = {
    id: number
    splitId: number
    day: number
    name: string
}

export type CompletedWorkout = {
    id: number,
    workoutId: number,
    startDate: string,
};

export type Exercise = {
    id: number;
    workoutId: number,
    name: string;
    restInterval: number;
};

export type CompletedExercise = {
    id: number,
    name: string,
    restInterval: number
    completedWorkoutId: number,
    setsToBeCompleted: number,
    setsCompleted: number
}

export type Set = {
    id: number,
    exerciseId: number,
    weight: number,
    reps: number,
    time: number,
    order: number
}

export type CompletedSet = {
    id: number,
    completedExerciseId: number,
    targetWeight: number | null,
    weight: number | null,
    targetReps: number | null,
    reps: number | null,
    targetTime: number | null,
    time: number | null,
    completed: number,
    order: number
}

export type BodyMetrics = {
    id: number,
    date: string,
    weight: number,
    bodyFatPercentage: number,
    BMI: number
}

export type CompletedExerciseWithDate = CompletedExercise & {
    startDate: string;
    volume: number
};

export type CalendarProps = {
  selectedDate: string | null
  setSelectedDate: (date: string) => void
  theme: Theme
  style?: ViewStyle
  goToSection?: (section: number) => void
};

export type WorkoutChecklistRef = {
    goToPage: (pageNumber: number) => void;
    viewSets: (id: number) => Promise<void>;
};

export type CompleteSetParameters = {
    id: number,
    weight?: number,
    reps?: number,
    time?: number
}

export type Theme = {
    mode: string,
    background: string,
    card: string,
    border: string,
    text: string,
    notification: string,
    accent: string
}

export type ChartData = {
    labels: string[]
    datasets: {
        data: number[]
    }[]
}

export type ShopProduct = {
    id: number;
    title: string;
    description: string;
    focus: string;
    difficulty: string;
    price: number;
    sale_price?: number;
    seeder: string;
    purchased: number;
};

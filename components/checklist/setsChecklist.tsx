import { spacing } from '@/constants/spacing';
import { textSizes, textWeights } from '@/constants/text';
import { CompletedExercise, CompletedSet, Theme } from '@/constants/types';
import { useAppSettingsContext } from '@/contexts/appSettingsContext';
import { createCompletedSet } from '@/db/queries/completed_sets/createCompletedSet';
import { getActiveCompletedSets } from '@/db/queries/completed_sets/getActiveCompletedSets';
import { formatWeight } from '@/utilities/formatWeight';
import { SQLiteDatabase } from 'expo-sqlite';
import { Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import RecordButton from '../buttons/recordButton';
import RestTimer from '../buttons/restTimer';

type SetsListProps = {
    db: SQLiteDatabase
    theme: Theme;
    selectedExercise: CompletedExercise
    setRefreshExercises: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedExercise: (exercise: CompletedExercise) => void
    setSelectedSet: (set: CompletedSet) => void
    weightUnits: string;
    goToPage: (page: number) => void
    refreshSets: boolean
    setRefreshSets: React.Dispatch<React.SetStateAction<boolean>>
};

const { width } = Dimensions.get("window")

const SetsChecklist = ({
    db,
    theme,
    selectedExercise,
    setRefreshExercises,
    setSelectedExercise,
    setSelectedSet,
    weightUnits,
    goToPage,
    refreshSets,
    setRefreshSets,
}: SetsListProps) => {

    const [sets, setSets] = useState([] as CompletedSet[])

    const { settings } = useAppSettingsContext()

    useEffect(() => {
        async function getSets() {
            if (selectedExercise) {
                setSets((await getActiveCompletedSets(db, selectedExercise.id)).sets)
            }
        }
        getSets()
    }, [refreshSets, selectedExercise])

    function handleSelectSet(set: CompletedSet) {
        setSelectedSet(set)
        goToPage(2)
    }

    async function handleCreateNewSet() {
        const newSet = await createCompletedSet(db, {completedExerciseId: selectedExercise.id, order: sets.length + 1})
        setSelectedSet(newSet)
        setRefreshExercises(prev => !prev)
        setRefreshSets(prev => !prev)
        goToPage(2)
    }

    return (
        <View style={styles.pageView}>
            <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg}}>
                <Pressable onPress={() => goToPage(0)} style={{paddingVertical: spacing.md}}>
                    <ChevronLeft size={textSizes.md} color={theme.text} />
                </Pressable>
                <Text style={[styles.exerciseNameText, { color: theme.text }]}>
                    {selectedExercise?.name}
                </Text>
                <Pressable style={{marginLeft: "auto", paddingVertical: spacing.md}} onPress={() => handleCreateNewSet()}>
                    <Plus size={textSizes.md} color={theme.text} />
                </Pressable>
            </RecordButton>

            <ScrollView style={styles.exercisesContainer} showsVerticalScrollIndicator={false}>
                {sets.map((set, index) => (
                    <RecordButton
                        key={index}
                        theme={theme}
                        onPress={() => handleSelectSet(set)}
                        style={[styles.setButton, { paddingVertical: spacing.md }]}
                    >
                        <Text style={[styles.setNumberText, { color: theme.text, }]}>
                            {`${index + 1}.`}
                        </Text>

                        { (set.targetWeight != null || set.weight != null) && (
                            <Text style={{ fontSize: textSizes.sm, color: theme.text, marginRight: "auto" }}>
                                {`${set.targetWeight != null && !set.completed 
                                ? (settings?.weightUnit === "kg" ? set.targetWeight.toFixed(1) : formatWeight(set.targetWeight).toFixed(1)) 
                                : (settings?.weightUnit === "kg" ? set.weight?.toFixed(1) : (set.weight != null ? formatWeight(set.weight).toFixed(1) : "-"))} ${weightUnits}`}
                            </Text>
                        )}

                        { (set.targetReps != null || set.reps != null) && (
                            <Text style={{ fontSize: textSizes.sm, color: theme.text, marginLeft: (set.weight) ? "auto" : 0, marginRight: (!set.targetWeight && !set.weight) ? "auto" : 0 }}>
                                {`${set.targetReps != null && !set.completed ? set.targetReps : set.reps} reps`}
                            </Text>
                        )}

                        { (set.targetTime != null || set.time != null) && (
                            <Text style={{ fontSize: textSizes.sm, color: theme.text, marginLeft: ((set.targetReps || set.reps) || (!set.targetWeight && !set.weight)) ? 0 : "auto"}}>
                                {`${set.targetTime != null && !set.completed ? set.targetTime : set.time}s`}
                            </Text>
                        )}

                        {set.completed === 0 ? (
                            <ChevronRight size={textSizes.md} color={theme.text} />
                        ) : (
                            <Check size={textSizes.md} color="green" />
                        )}
                    </RecordButton>
                ))}
            </ScrollView>

            {selectedExercise.restInterval && (
                <View style={styles.restTimerContainer}>
                    <RestTimer time={selectedExercise.restInterval} />
                </View>
            )}
        </View>
    );
};

const styles = {
    pageView: {
        flex: 1,
        width,
        paddingHorizontal: spacing.lg,
    },
    exercisesContainer: {
        flex: 1,
    },
    exerciseNameText: {
        fontSize: textSizes.sm,
        fontWeight: textWeights.bold,
    },
    setButton: {
        paddingHorizontal: spacing.lg,
    },
    setNumberText: {
        fontSize: textSizes.sm,
    },
    weightText: {
        fontSize: textSizes.sm,
    },
    repsText: {
        fontSize: textSizes.sm,
    },
    rightAligned: {
        marginLeft: 'auto',
    },
    leftAligned: {
        marginRight: 'auto',
    },
    restTimerContainer: {
        paddingVertical: spacing.lg
    },
};

export default SetsChecklist;
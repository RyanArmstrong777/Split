import React, { SetStateAction, useEffect, useState } from "react";
import { ScrollView, Text, Dimensions, View, Pressable, Vibration } from "react-native";
import { ChevronRight, ChevronLeft, Plus, Trash2 } from "lucide-react-native";
import RecordButton from "@/components/buttons/recordButton";
import { spacing } from "@/constants/spacing";
import { textSizes, textWeights } from "@/constants/text";
import { Set, Exercise } from "@/constants/types";
import { createSet } from "@/db/queries/sets/createSet";
import { deleteExercise } from "@/db/queries/exercises/deleteExercise";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";
import { formatWeight } from "@/utilities/formatWeight";
import DefaultInput from "@/components/inputs/defaultInput";
import { updateExerciseName } from "@/db/queries/exercises/updateExerciseName";

const { width } = Dimensions.get("window");

type SetSelectorProps = {
    theme: any
    db: any
    sets: Set[]
    weightUnits: string | undefined
    refreshExercises: boolean
    setRefreshExercises: React.Dispatch<SetStateAction<boolean>>
    selectedExercise: Exercise
    goToSection: (section: number) => void
    setSelectedSet: (set: Set) => void;
};

const SetSelector: React.FC<SetSelectorProps> = ({
    theme,
    db,
    sets,
    weightUnits,
    refreshExercises,
    setRefreshExercises,
    selectedExercise,
    goToSection,
    setSelectedSet,
}) => {

    const { settings } = useAppSettingsContext()

    const [exerciseName, setExerciseName] = useState(selectedExercise.name)
    const [isActive, setIsActive] = useState(false)

    async function handleCreateSet() {
        const newSet = await createSet({db: db, exerciseId: selectedExercise.id, order: sets.length})
        if (settings?.vibrationFeedback === 1) {
            Vibration.vibrate(200)
        }
        handleSelectSet(newSet)
    }

    async function handleDeleteExercise() {
        await deleteExercise(db, selectedExercise.id)
        if (settings?.vibrationFeedback === 1) {
            Vibration.vibrate(200)
        }
        setRefreshExercises(!refreshExercises)
    }

    function handleSelectSet(set: Set) {
        setSelectedSet(set)
        goToSection(3)
    }

    async function updateExercise() {
        await updateExerciseName(db, selectedExercise.id, exerciseName)
    }

    useEffect(() => {

        if (!selectedExercise?.id || exerciseName === "" || !isActive) return;

        const timeout = setTimeout(() => {
            updateExercise()
            setRefreshExercises(prev => !prev)
        }, 500)

        return () => clearTimeout(timeout);

    }, [exerciseName])

    useEffect(() => {
        if (selectedExercise?.name) {
            setIsActive(false)
            setExerciseName(selectedExercise.name)
            setRefreshExercises(prev => !prev)
            setIsActive(true)
        }
    }, [selectedExercise]);

    return (
        <View style={{width: width - spacing.lg * 2}}>
            <RecordButton
                theme={theme}
                style={{ paddingRight: spacing.lg, gap: spacing.md }}
            >
                <Pressable onPress={() => goToSection(1)} style={{paddingVertical: spacing.md}}>
                    <ChevronLeft size={textSizes.md} color={theme.text} />
                </Pressable>
                <DefaultInput theme={theme} placeholder={"Exercise name..."} value={exerciseName} onChangeText={setExerciseName} />
                <Pressable onPress={handleCreateSet} style={{paddingVertical: spacing.md}}>
                    <Plus size={textSizes.md} color={theme.text} />
                </Pressable>
                <Pressable onPress={() => handleDeleteExercise()} style={{paddingVertical: spacing.md}}>
                    <Trash2 size={textSizes.md} color={"red"} />
                </Pressable>
            </RecordButton>
            <ScrollView style={{ flex: 1, width: width - spacing.lg * 2 }} showsVerticalScrollIndicator={false}>
                {sets.map((set, index) => (
                    <RecordButton
                        key={set.id}
                        theme={theme}
                        onPress={() => {handleSelectSet(set)}}
                        style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}
                    >
                        <Text
                            style={{
                                fontSize: textSizes.sm,
                                fontWeight: textWeights.regular,
                                color: theme.text,
                            }}
                        >
                            {index + 1}.
                        </Text>
                        {set.weight !== null && (
                            <Text
                                style={{
                                    fontSize: textSizes.sm,
                                    fontWeight: textWeights.regular,
                                    color: theme.text,
                                    marginRight: "auto",
                                }}
                            >
                                {`${settings?.weightUnit === "kg" ? set.weight : formatWeight(set.weight)}${weightUnits}`}
                            </Text>
                        )}
                        {set.reps != null && (
                            <Text
                                style={{
                                    fontSize: textSizes.sm,
                                    fontWeight: textWeights.regular,
                                    color: theme.text,
                                    marginRight: set.weight ? 0 : "auto",
                                }}
                            >
                                {`${set.reps} reps`}
                            </Text>
                        )}
                        {set.time !== null && (
                            <Text
                                style={{
                                    fontSize: textSizes.sm,
                                    fontWeight: textWeights.regular,
                                    color: theme.text,
                                    marginLeft: set.reps ? spacing.sm : 0,
                                    marginRight: set.reps || set.weight ? 0 : "auto"
                                }}
                            >
                                {`${set.time}s`}
                            </Text>
                        )}
                        <ChevronRight size={textSizes.md} color={theme.text} />
                    </RecordButton>
                ))}
            </ScrollView>
        </View>
    );
};

export default SetSelector;

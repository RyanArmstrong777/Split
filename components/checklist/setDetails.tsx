import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, Dimensions, Switch, Vibration } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import RecordButton from '../buttons/recordButton';
import DefaultInput from '../inputs/defaultInput';
import SubmitButton from '../buttons/submitButton';
import { textSizes, textWeights } from '@/constants/text';
import { spacing } from '@/constants/spacing';
import { CompletedExercise, CompletedSet, Theme } from '@/constants/types';
import { completeSet } from '@/db/queries/completed_sets/completeSet';
import { SQLiteDatabase } from 'expo-sqlite';
import { deleteCompletedSet } from '@/db/queries/completed_sets/deleteCompletedSet';
import { updateCompletedSet } from '@/db/queries/completed_sets/updateCompletedSet';
import { useAppSettingsContext } from '@/contexts/appSettingsContext';
import { lbsToKg } from '@/utilities/lbsToKg';

type SetDetailsProps = {
    theme: Theme
    db: SQLiteDatabase
    setRefreshExercises: React.Dispatch<React.SetStateAction<boolean>>
    selectedSet: CompletedSet | null
    setSelectedSet: (set: null) => void
    selectedExercise: CompletedExercise
    weightUnits: string
    goToPage: (page: number) => void
    setRefreshSets: React.Dispatch<React.SetStateAction<boolean>>
};

const { width } = Dimensions.get("window")

const SetDetails = ({
    theme,
    db,
    setRefreshExercises,
    selectedSet,
    setSelectedSet,
    selectedExercise,
    weightUnits,
    goToPage,
    setRefreshSets,
}: SetDetailsProps) => {

    const { settings } = useAppSettingsContext()

    const [weightInput, setWeightInput] = useState('');
    const [repsInput, setRepsInput] = useState('');
    const [timeInput, setTimeInput] = useState('');

    const [recordWeight, setRecordWeight] = useState(false)
    const [recordTime, setRecordTime] = useState(false)
    const [recordReps, setRecordReps] = useState(false)

    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (selectedSet && isActive) {
            const timeout = setTimeout(() => {
                updateCompletedSet(db, selectedSet.id, {
                    weight: selectedSet.completed === 0 || !recordWeight ? null : settings?.weightUnit === "kg" ? parseInt(weightInput, 10) : lbsToKg(parseInt(weightInput, 10)),
                    time: selectedSet.completed === 0 || !recordTime ? null : parseInt(timeInput, 10),
                    reps: selectedSet.completed === 0 || !recordReps ? null : parseInt(repsInput, 10),
                    targetWeight: selectedSet.completed === 1 || !recordWeight ? null : settings?.weightUnit === "kg" ? parseInt(weightInput, 10) : lbsToKg(parseInt(weightInput, 10)),
                    targetTime: selectedSet.completed === 1 || !recordTime ? null : parseInt(timeInput, 10),
                    targetReps: selectedSet.completed === 1 || !recordReps ? null : parseInt(repsInput, 10),
                }).then(() => {
                    setRefreshSets(prev => !prev);
                });
            }, 500);

            return () => clearTimeout(timeout);
        }

    }, [weightInput, timeInput, repsInput, recordWeight, recordTime, recordReps]);

    useEffect(() => {

        setIsActive(false);

        let newRecordWeight = true;
        let newRecordReps = true;
        let newRecordTime = true;

        if (selectedSet?.targetWeight != null) {
            setWeightInput(selectedSet.targetWeight.toString());
        } else if (selectedSet?.weight) {
            setWeightInput(selectedSet.weight.toString());
        } else {
            setWeightInput("");
            newRecordWeight = false;
        }

        if (selectedSet?.targetReps != null) {
            setRepsInput(selectedSet.targetReps.toString());
        } else if (selectedSet?.reps) {
            setRepsInput(selectedSet.reps.toString());
        } else {
            setRepsInput("");
            newRecordReps = false;
        }

        if (selectedSet?.targetTime != null) {
            setTimeInput(selectedSet.targetTime.toString());
        } else if (selectedSet?.time) {
            setTimeInput(selectedSet.time.toString());
        } else {
            setTimeInput("");
            newRecordTime = false;
        }

        if (!newRecordWeight && !newRecordReps && !newRecordTime) {
            newRecordWeight = true;
            newRecordReps = true;
        }

        setRecordWeight(newRecordWeight);
        setRecordReps(newRecordReps);
        setRecordTime(newRecordTime);

        setIsActive(true);

    }, [selectedSet]);

    async function resetInputs() {
        goToPage(1)
        if ((!(recordReps || recordWeight || recordTime ) || (weightInput === "" && repsInput === "" && timeInput === "")) && selectedSet) {
            await deleteCompletedSet(db, selectedSet.id)
        }
        setRefreshSets(prev => !prev)
        setRefreshExercises(prev => !prev)
        const timeout = setTimeout(() => {
            setSelectedSet(null)
        }, 500)

        clearTimeout(timeout)
    }

    async function handleCompleteSet() {
        if (selectedSet) {
            await completeSet({db: db, id: selectedSet.id, weight: parseInt(weightInput, 10), time: parseInt(timeInput, 10), reps: parseInt(repsInput, 10)})
            resetInputs()
            if (settings?.vibrationFeedback === 1) {
                Vibration.vibrate(200)
            }
        }
    }

    return (
        <View style={styles.pageView}>
            <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg}}>
                <Pressable onPress={() => resetInputs()} style={{paddingVertical: spacing.md}}>
                    <ChevronLeft size={textSizes.md} color={theme.text} />
                </Pressable>
                <Text style={[styles.exerciseNameText, { color: theme.text, marginRight: "auto" }]}>{selectedExercise?.name}</Text>
                <Text style={[styles.setNumberText, { color: theme.text }]}>Set {selectedSet?.order}</Text>
            </RecordButton>

            <ScrollView style={styles.exercisesContainer} showsVerticalScrollIndicator={false}>
    
                <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg}}>
                    <Text style={[styles.labelText, { color: theme.text , fontWeight: textWeights.regular, fontSize: textSizes.sm, width: "25%", paddingVertical: spacing.md + spacing.sm }]}>Weight / {weightUnits}:</Text>
                    <DefaultInput
                        theme={theme}
                        placeholder={`Weight`}
                        value={weightInput}
                        onChangeText={setWeightInput}
                        keyboardType="numeric"
                        style={{ display: recordWeight ? "flex" : "none" }}
                    />
                    <Switch value={recordWeight} onValueChange={() => setRecordWeight(!recordWeight)} />
                </RecordButton>

                <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg}}>
                    <Text style={[styles.labelText, { color: theme.text , fontWeight: textWeights.regular, fontSize: textSizes.sm, width: "25%", paddingVertical: spacing.md + spacing.sm }]}>Reps:</Text>
                    <DefaultInput
                        theme={theme}
                        placeholder={`Reps`}
                        value={repsInput}
                        onChangeText={setRepsInput}
                        keyboardType="numeric"
                        style={{ display: recordReps ? "flex" : "none" }}
                    />
                    <Switch value={recordReps} onValueChange={() => setRecordReps(!recordReps)} />
                </RecordButton>

                <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg}}>
                    <Text style={[styles.labelText, { color: theme.text , fontWeight: textWeights.regular, fontSize: textSizes.sm, width: "25%", paddingVertical: spacing.md + spacing.sm }]}>Time / s:</Text>
                    <DefaultInput
                        theme={theme}
                        placeholder={`Time`}
                        value={timeInput}
                        onChangeText={setTimeInput}
                        keyboardType="numeric"
                        style={{display: recordTime ? "flex" : "none", paddingVertical: spacing.md}}
                    />
                    <Switch value={recordTime} onValueChange={() => setRecordTime(!recordTime)} />
                </RecordButton>

            </ScrollView>

            <View style={[styles.submitButtonContainer, { display: selectedSet?.completed ? "none" : "flex" }]}>
                <SubmitButton
                    text={'Mark as complete'}
                    theme={theme}
                    onPress={() => handleCompleteSet()}
                />
            </View>
        </View>
    );
};

const styles = {
  pageView: {
    flex: 1,
    width,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  exercisesContainer: {
    flex: 1,
  },
  exerciseNameText: {
    fontSize: textSizes.sm,
    fontWeight: textWeights.bold
  },
  setNumberText: {
    fontSize: textSizes.sm,
    fontWeight: textWeights.regular,
  },
  labelText: {
    paddingVertical: spacing.md
  },
  submitButtonContainer: {
    borderBottomWidth: 0,
  },
};

export default SetDetails;
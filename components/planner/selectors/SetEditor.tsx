import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Dimensions, Switch, ScrollView, Vibration } from "react-native";
import RecordButton from "@/components/buttons/recordButton";
import DefaultInput from "@/components/inputs/defaultInput";
import SubmitButton from "@/components/buttons/submitButton";
import { ChevronLeft, Trash2 } from "lucide-react-native";
import { spacing } from "@/constants/spacing";
import { textSizes, textWeights } from "@/constants/text";
import { Set } from "@/constants/types";
import { updateSet } from "@/db/queries/sets/updateSet";
import { SQLiteDatabase } from "expo-sqlite";
import { deleteSet } from "@/db/queries/sets/deleteSet";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";
import { lbsToKg } from "@/utilities/lbsToKg";

const { width } = Dimensions.get("window");

type SetEditorProps = {
    theme: any
    db: SQLiteDatabase
    weightUnits: string | undefined
    selectedSet: Set
    refreshSets: boolean
    setRefreshSets: (value: boolean) => void
    goToSection: (section: number) => void
};

const SetEditor: React.FC<SetEditorProps> = ({
    theme,
    db,
    weightUnits,
    selectedSet,
    refreshSets,
    setRefreshSets,
    goToSection
}) => {

    const { settings } = useAppSettingsContext()

    const [weightInput, setWeightInput] = useState("")
    const [timeInput, setTimeInput] = useState("")
    const [repsInput, setRepsInput] = useState("")

    const [recordWeight, setRecordWeight] = useState(false)
    const [recordTime, setRecordTime] = useState(false)
    const [recordReps, setRecordReps] = useState(false)

    useEffect(() => {
        setWeightInput("")
    }, [recordWeight])

    useEffect(() => {
        setTimeInput("")
    }, [recordTime])

    useEffect(() => {
        setRepsInput("")
    }, [recordReps])

    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(false)
        if (selectedSet.weight) {
            setWeightInput(selectedSet.weight.toString())
            setRecordWeight(true)
        }
        if (selectedSet.time) {
            setTimeInput(selectedSet.time.toString())
            setRecordTime(true)
        }
        if (selectedSet.reps) {
            setRepsInput(selectedSet.reps.toString())
            setRecordReps(true)
        }
        setIsActive(true)
        if (!selectedSet.weight && !selectedSet.time && !selectedSet.reps) {
            setWeightInput("")
            setRecordWeight(true)
            setRepsInput("")
            setRecordReps(true)
            setRecordTime(false)
        }
    }, [selectedSet])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isActive) {
                updateSet({
                    db,
                    setId: selectedSet.id,
                    weight: recordWeight ? settings?.weightUnit === "kg" ? parseInt(weightInput, 10) : lbsToKg(parseInt(weightInput, 10)) : null,
                    time: recordTime ? parseInt(timeInput, 10) : null,
                    reps: recordReps ? parseInt(repsInput, 10) : null,
                }).then(() => {
                    setRefreshSets(!refreshSets);
                });
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [weightInput, timeInput, repsInput, recordWeight, recordTime, recordReps]);

    async function handleGoBack() {
        if (weightInput === "" && timeInput === "" && repsInput == "") {
            handleDeleteSet()
        }
        goToSection(2)
    }

    async function handleDeleteSet() {
        await deleteSet(db, selectedSet.id)
        setRefreshSets(!refreshSets)
        goToSection(2)
    }

    return (
        <View style={{width: width - spacing.lg * 2}}>
            <RecordButton theme={theme} style={{ paddingHorizontal: spacing.lg }}>
                <Pressable onPress={() => handleGoBack()} style={{paddingVertical: spacing.md}}>
                    <ChevronLeft size={textSizes.md} color={theme.text} />
                </Pressable>
                <Text style={{ fontSize: textSizes.sm, fontWeight: textWeights.bold, color: theme.text }}>
                    Edit set
                </Text>
                <Pressable onPress={() => handleDeleteSet()} style={{marginLeft: "auto", paddingVertical: spacing.md}}>
                    <Trash2 size={textSizes.md} color={"red"} />
                </Pressable>
            </RecordButton>

            <ScrollView showsVerticalScrollIndicator={false}>

                <RecordButton theme={theme} style={{ paddingHorizontal: spacing.lg }}>
                    <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, width: "25%", paddingVertical: spacing.md + spacing.sm  }}>
                        {`Weight / ${weightUnits}: `}
                    </Text>
                    <DefaultInput
                        theme={theme}
                        placeholder="Target weight..."
                        value={weightInput}
                        onChangeText={setWeightInput}
                        keyboardType="numeric"
                        style={{ display: recordWeight ? "flex" : "none" }}
                    />
                    <Switch value={recordWeight} onValueChange={() => setRecordWeight(!recordWeight)} />
                </RecordButton>

                <RecordButton theme={theme} style={{ paddingHorizontal: spacing.lg }}>
                    <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, width: "25%", paddingVertical: spacing.md + spacing.sm }}>
                        Reps:
                    </Text>
                    <DefaultInput
                        theme={theme}
                        placeholder="Target reps..."
                        value={repsInput}
                        onChangeText={setRepsInput}
                        keyboardType="numeric"
                        style={{ display: recordReps ? "flex" : "none" }}
                    />
                    <Switch value={recordReps} onValueChange={() => setRecordReps(!recordReps)} />
                </RecordButton>

                <RecordButton theme={theme} style={{ paddingHorizontal: spacing.lg }}>
                    <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, width: "25%", paddingVertical: spacing.md + spacing.sm }}>
                        Time / s:
                    </Text>
                    <DefaultInput
                        theme={theme}
                        placeholder="Target time..."
                        value={timeInput}
                        onChangeText={setTimeInput}
                        keyboardType="numeric"
                        style={{ display: recordTime ? "flex" : "none" }}
                    />
                    <Switch value={recordTime} onValueChange={() => setRecordTime(!recordTime)} />
                </RecordButton>

            </ScrollView>

        </View>
    );
};

export default SetEditor;

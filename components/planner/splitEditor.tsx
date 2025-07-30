import { spacing } from "@/constants/spacing";
import { textSizes, textWeights } from "@/constants/text";
import { Split } from "@/constants/types";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";
import { useSplitContext } from "@/contexts/splitContext";
import { deleteSplit } from "@/db/queries/splits/deleteSplit";
import { SQLiteDatabase } from "expo-sqlite";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, Vibration, View, ViewStyle } from "react-native";
import AdBanner from "../ads/adBanner";
import RecordButton from "../buttons/recordButton";
import SubmitButton from "../buttons/submitButton";
import DefaultInput from "../inputs/defaultInput";

const { width } = Dimensions.get("window");

type validationProps = {
    valid: boolean
    message: string
}

type Props = {
    theme: any
    db: SQLiteDatabase
    splits: Split[] | null
    selectedSplit: Split
    setRefreshSplits: React.Dispatch<React.SetStateAction<boolean>>
    goToPage: (index: number) => void
    style: ViewStyle
};

const SplitEditor: React.FC<Props> = ({
    theme,
    db,
    selectedSplit,
    splits,
    setRefreshSplits,
    goToPage,
    style
}) => {

    const { settings } = useAppSettingsContext()

    const split = useSplitContext()

    const [splitName, setSplitName] = useState("");
    const [splitNameValid, setSplitNameValid] = useState<validationProps>({} as validationProps);

    useEffect(() => {
        setSplitName(selectedSplit.name)
    }, [selectedSplit])

    function isNewSplitNameValid() {
        if (splitName === "") {
            setSplitNameValid({ valid: false, message: "Split name cannot be empty" });
            return;
        }
        if (splits?.some(otherSplit => otherSplit.name === splitName && otherSplit.id !== selectedSplit.id)) {
            setSplitNameValid({ valid: false, message: "A split with this name already exists" });
        }
        split.updateName(selectedSplit.id, splitName)
        setRefreshSplits(prev => !prev)
    }

    async function handleSetActiveSplit() {
        split.changeSplit(selectedSplit.id)
        if (settings?.vibrationFeedback === 1) {
            Vibration.vibrate(200)
        }
        goToPage(0);
    }

    async function handleDeleteSplit() {

        await deleteSplit(db, selectedSplit.id)
        setRefreshSplits(prev => !prev)
        goToPage(0)

        const timeout = setTimeout(() => {
            setSplitName("")
        }, 500)

        return () => clearTimeout(timeout)
    }

    return (
        <View style={[styles.scrollPage, style]}>
            <RecordButton theme={theme} style={{ paddingRight: spacing.lg }}>
                <Pressable onPress={() => goToPage(0)} style={{paddingVertical: spacing.md}}>
                    <ChevronLeft size={textSizes.md} color={theme.text} />
                </Pressable>
                <Text
                    style={{
                        fontSize: textSizes.sm,
                        fontWeight: textWeights.bold,
                        color: theme.text,
                        marginRight: "auto",
                        paddingVertical: spacing.md
                    }}
                >
                    {splitName}
                </Text>
                <Pressable onPress={() => handleDeleteSplit()} style={{paddingVertical: spacing.md}}>
                    <Trash2 size={textSizes.md} color={"red"} />
                </Pressable>
            </RecordButton>

            <RecordButton
                theme={theme}
                style={{ paddingHorizontal: spacing.lg, flexDirection: "row" }}
            >
                <Text
                    style={{
                        fontSize: textSizes.sm,
                        color: theme.text,
                        fontWeight: textWeights.regular,
                        paddingVertical: spacing.md
                    }}
                >
                    Split name:{" "}
                </Text>
                <DefaultInput
                    theme={theme}
                    value={splitName}
                    onChangeText={setSplitName}
                    onBlur={() => isNewSplitNameValid()}
                    placeholder={"Split name..."}
                    style={{paddingVertical: spacing.md}}
                />
            </RecordButton>

            <RecordButton
                theme={theme}
                style={{ paddingHorizontal: spacing.lg, flexDirection: "row", paddingVertical: spacing.md }}
                onPress={() => goToPage(2)}
            >
                <Text
                    style={{
                        fontSize: textSizes.sm,
                        color: theme.text,
                        fontWeight: textWeights.regular,
                        marginRight: "auto",
                    }}
                >
                    View workouts
                </Text>
                <ChevronRight size={textSizes.md} color={theme.text} />
            </RecordButton>

            <RecordButton
                theme={theme}
                style={{ paddingHorizontal: spacing.lg, borderBottomWidth: 0, paddingVertical: spacing.md }}
            >
                <Text
                    style={{
                        fontSize: textSizes.sm,
                        color: "red",
                        fontWeight: textWeights.light,
                        marginRight: "auto",
                    }}
                >
                    {splitNameValid.valid ? "" : splitNameValid.message}
                </Text>
            </RecordButton>

            <RecordButton
                theme={theme}
                style={{ borderBottomWidth: 0, marginTop: "auto", marginBottom: spacing.lg, flexDirection: "column" }}
            >
                <AdBanner style={{alignItems: "center", width: "100%", paddingVertical: spacing.sm}}/>
                <SubmitButton
                    theme={theme}
                    text={"Set as active split"}
                    onPress={handleSetActiveSplit}
                />
            </RecordButton>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollPage: {
        width,
        flex: 1,
        paddingHorizontal: spacing.lg,
    },
});

export default SplitEditor;

import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, ViewStyle } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { spacing } from "@/constants/spacing";
import { textSizes, textWeights } from "@/constants/text";
import RecordButton from "../buttons/recordButton";
import DefaultInput from "../inputs/defaultInput";
import SubmitButton from "../buttons/submitButton";
import { createSplit } from "@/db/queries/splits/createSplit";
import { definitions } from "@/constants/definitions";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    scrollPage: {
        width,
        flex: 1,
        paddingHorizontal: spacing.lg,
        display: "flex",
        gap: spacing.md,
    },
});

type Props = {
    theme: any
    db: any
    goToPage: (page: number) => void
    setRefreshSplits: React.Dispatch<React.SetStateAction<boolean>>
    style: ViewStyle
};

const CreateNewSplit: React.FC<Props> = ({
    theme,
    db,
    goToPage,
    setRefreshSplits,
    style
}) => {

    const [splitName, setSplitName] = useState("");

    async function handleCreateNewSplit() {
        await createSplit(db, splitName);
        setRefreshSplits(prev => !prev)
        setSplitName("")
        goToPage(0);
    }

    return (
        <View style={[styles.scrollPage, style]}>
            <RecordButton theme={theme} style={{ paddingHorizontal: spacing.lg }}>
                <Pressable onPress={() => { goToPage(0); setSplitName("") }} style={{paddingVertical: spacing.md}}>
                    <ChevronLeft size={textSizes.md} color={theme.text} />
                </Pressable>
                <Text
                    style={{
                        fontSize: textSizes.sm,
                        fontWeight: textWeights.bold,
                        color: theme.text,
                        marginRight: "auto",
                    }}
                >
                    Name your new split
                </Text>
            </RecordButton>

            <DefaultInput
                theme={theme}
                value={splitName}
                onChangeText={setSplitName}
                placeholder={"Split name..."}
                style={{ paddingHorizontal: spacing.lg, flex: 0 }}
            />
            <Text
                style={{
                    fontSize: textSizes.xs,
                    fontWeight: textWeights.light,
                    color: theme.text,
                    paddingHorizontal: spacing.lg,
                    textAlign: "left"
                }}
            >
                {definitions.newSplit}
            </Text>
            <RecordButton
                theme={theme}
                style={{ borderBottomWidth: 0, marginTop: "auto", marginBottom: spacing.lg }}
            >
                <SubmitButton theme={theme} text={"Create split"} onPress={() => handleCreateNewSplit()} />
            </RecordButton>
        </View>
    );
};

export default CreateNewSplit;

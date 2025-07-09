import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable } from "react-native";
import { ChevronRight, Plus } from "lucide-react-native";
import RecordButton from "@/components/buttons/recordButton";
import { Split } from "@/constants/types";
import { spacing } from "@/constants/spacing";
import { textSizes, textWeights } from "@/constants/text";
import { definitions } from "@/constants/definitions";
import { useSplitContext } from "@/contexts/splitContext";

const { width } = Dimensions.get("window");

type Props = {
    theme: any
    splits: Split[] | null
    goToPage: (page: number) => void
    setSelectedSplit: (split: Split) => void
    setIsEditing: (value: boolean) => void
};

export default function SplitsDisplay({
    theme,
    splits,
    goToPage,
    setSelectedSplit,
    setIsEditing
}: Props) {

    function handleSelectSplit(split: Split) {
        setSelectedSplit(split)
        setIsEditing(true)
        goToPage(1)
    }

    function handleCreateSplit() {
        setIsEditing(false)
        goToPage(1)
    }

    return (
        <View style={styles.scrollPage}>
            <RecordButton
                theme={theme}
                style={{
                    paddingHorizontal: spacing.lg,
                    gap: spacing.sm,
                }}
            >
                <Text
                    style={{
                        fontSize: textSizes.sm,
                        fontWeight: textWeights.bold,
                        color: theme.text,
                        paddingVertical: spacing.md,
                        marginRight: "auto",
                    }}
                >
                    Create and edit splits
                </Text>
                <Pressable onPress={() => handleCreateSplit()} style={{paddingVertical: spacing.md}}>
                    <Plus size={textSizes.md} color={theme.text} />
                </Pressable>
            </RecordButton>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 0}}>
                {splits?.map((split) => (
                    <RecordButton
                        theme={theme}
                        key={split.id}
                        onPress={() => handleSelectSplit(split)}
                        style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}
                    >
                        <Text
                            style={{
                                fontSize: textSizes.sm,
                                fontWeight: textWeights.regular,
                                color: theme.text,
                                marginRight: "auto",
                                flexShrink: 1,
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {split.name}
                        </Text>
                        <ChevronRight size={textSizes.md} color={theme.text} />
                    </RecordButton>
                ))}
                <Text
                    style={{
                        fontSize: textSizes.xs,
                        fontWeight: textWeights.light,
                        color: theme.text,
                        paddingHorizontal: spacing.lg,
                        textAlign: "left",
                        paddingVertical: spacing.md
                    }}
                >
                    {definitions.split}
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollPage: {
        width,
        flex: 1,
        paddingHorizontal: spacing.lg,
    },
});

import { ChevronRight, Plus } from "lucide-react-native";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import RecordButton from "../../components/buttons/recordButton";
import { definitions } from "../../constants/definitions";
import { spacing } from "../../constants/spacing";
import { textSizes, textWeights } from "../../constants/text";
import { Split } from "../../constants/types";
import { useSplitContext } from "../../contexts/splitContext";
import AdBanner from "../ads/adBanner";

const { width, height } = Dimensions.get("window");

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

    const { split } = useSplitContext()

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
            <View style={styles.header}>
                <Text style={[{fontSize: textSizes.sm, fontWeight: textWeights.regular, color: theme.text}]}>Active split</Text>
                <Text style={[{fontSize: textSizes.xl, fontWeight: textWeights.bold, color: theme.text, textAlign: "center"}]} numberOfLines={2} lineBreakMode="tail">{split?.name}</Text>
            </View>
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
            <ScrollView showsVerticalScrollIndicator={false} style={{flexShrink: 1}}>
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
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {split.name}
                        </Text>
                        <ChevronRight size={textSizes.md} color={theme.text} />
                    </RecordButton>
                ))}
            </ScrollView>
            <Text
                style={{
                    fontSize: textSizes.xs,
                    fontWeight: textWeights.light,
                    color: theme.text,
                    paddingHorizontal: spacing.lg,
                    textAlign: "left",
                    paddingVertical: spacing.md,
                }}
            >
                {definitions.split}
            </Text>
            <AdBanner style={{alignItems: "center", width: "100%", paddingVertical: spacing.sm}} id={"ca-app-pub-9362350160554339/3800839084"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollPage: {
        width,
        flex: 1,
        paddingHorizontal: spacing.lg,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.lg
    },
});

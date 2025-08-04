import { ReactNode } from "react"
import { Pressable, StyleSheet } from "react-native"
import { spacing } from "../../constants/spacing"
import { Theme } from "../../constants/types"

type props = {
    children: ReactNode,
    theme: Theme,
    style?: Object,
    onPress?: () => void,
    index?: string | number
}

const RecordButton: React.FC<props> = ({ children, theme, style, onPress, index }) => {

    return (
        <Pressable style={[styles.splitContainer, {borderColor: theme.card, gap: spacing.lg}, style]} onPress={onPress} key={index}>
            {children}
        </Pressable>
    )
}

export default RecordButton;

const styles = StyleSheet.create({
    splitContainer: {
        flexDirection: "row",
        width: "100%",
        gap: spacing.lg,
        borderBottomWidth: 0.5,
        alignItems: "center",
    },
})
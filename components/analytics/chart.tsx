import { Theme } from '@/constants/types';
import { formatDateForChart } from '@/utilities/formatDateForChart';
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Bar, CartesianChart } from "victory-native";
import { spacing } from '@/constants/spacing';

type ChartProps = {
    theme: Theme;
    xKey: string;
    yKey: string;
    xTitle: string;
    yTitle: string;
    data: { x: string; y: number }[] | null;
    timeframe: string;
};

const { width, height } = Dimensions.get("window");

const Chart: React.FC<ChartProps> = ({ theme, xKey, yKey, xTitle, yTitle, data, timeframe }) => {
    return (
        <View style={{ width: width - spacing.lg * 4 }}>
            <Text style={{ color: theme.text }}>{xTitle} vs {yTitle}</Text>
            <CartesianChart 
                data={data ?? []} 
                xKey={"x"} 
                yKeys={["y"]}
                domain={{y: [0, 100]}}
                axisOptions={{
                    tickCount: 5,
                    labelColor: theme.text,
                    lineColor: theme.background,
                    formatXLabel: (date: string) => {
                        const newDate = new Date(date)
                        return formatDateForChart(newDate, timeframe)
                    }
                }}
            >
                {({ points, chartBounds }) => {
                    return (
                        <Bar
                            points={points.y}
                            chartBounds={chartBounds}
                            animate={{type: "timing", duration: 300}}
                            roundedCorners={{topLeft: 10, topRight: 10}}
                            color={theme.text}
                        >
                        </Bar>
                    )
                }}
            </CartesianChart>
        </View>
    );
};

export default Chart;

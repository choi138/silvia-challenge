import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { colors } from 'src/styles';

export interface ChartProps {
  data: { value: number }[];
  xLabelTexts: string[];
  yLabelSuffix: string;
}

export const Chart: React.FC<ChartProps> = ({ data, xLabelTexts, yLabelSuffix }) => {
  const deviceWidth = Dimensions.get('window').width;
  return (
    <LineChart
      adjustToWidth
      data={data}
      trimYAxisAtTop
      showVerticalLines
      thickness={4}
      dataPointsColor={colors.primary}
      horizontalRulesStyle={{ left: 20 }}
      width={deviceWidth - 100}
      height={140}
      isAnimated
      curved
      curveType={0}
      color={colors.primary}
      maxValue={data.reduce((acc, cur) => (cur.value > acc ? cur.value : acc), 0)}
      roundToDigits={1}
      verticalLinesColor={colors.softWhite}
      rulesType="solid"
      yAxisColor={colors.softWhite}
      xAxisColor={colors.softWhite}
      xAxisLabelsVerticalShift={10}
      xAxisLabelTexts={xLabelTexts}
      xAxisLabelTextStyle={{ right: 6, color: colors.text.darkGray }}
      yAxisLabelContainerStyle={{ left: 16 }}
      yAxisLabelSuffix={yLabelSuffix}
      yAxisTextStyle={{ color: colors.text.darkGray }}
      noOfSections={2}
      initialSpacing={20}
      endSpacing={0}
    />
  );
};

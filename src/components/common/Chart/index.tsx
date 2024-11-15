import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { colors } from 'src/styles';

export interface ChartProps {
  data: { value: number }[];
  xLabelTexts: string[];
  yLabelSuffix: string;
}

/**
 * 라인 차트 컴포넌트
 * @param data 차트 데이터
 * @param xLabelTexts x축 라벨 텍스트 리스트
 * @param yLabelSuffix y축 라벨 접미사
 */
export const Chart: React.FC<ChartProps> = ({ data, xLabelTexts, yLabelSuffix }) => {
  const deviceWidth = Dimensions.get('window').width;

  return (
    <View style={{ width: '100%' }}>
      <LineChart
        adjustToWidth
        data={data}
        trimYAxisAtTop
        showVerticalLines
        thickness={4}
        dataPointsColor={colors.primary}
        height={140}
        isAnimated
        curved
        curveType={0}
        color={colors.primary}
        roundToDigits={1}
        verticalLinesColor={colors.softWhite}
        rulesType="solid"
        yAxisColor={colors.softWhite}
        xAxisColor={colors.softWhite}
        xAxisLabelsVerticalShift={10}
        xAxisLabelTexts={xLabelTexts}
        xAxisLabelTextStyle={{ left: 10, color: colors.text.darkGray }}
        spacing={deviceWidth / data.length}
        yAxisLabelContainerStyle={{}}
        yAxisLabelSuffix={yLabelSuffix}
        yAxisTextStyle={{ color: colors.text.darkGray }}
        noOfSections={2}
        initialSpacing={0}
        endSpacing={0}
      />
    </View>
  );
};

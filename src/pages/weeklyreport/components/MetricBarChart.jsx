import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import * as S from './MetricLineChart.styles';
import { formatChartData, formatValue, PLOT_TOP } from './chartUtils';

// 막대 상단(PLOT_TOP)과 가까운 값은 라벨이 잘리므로 막대 안쪽으로 내려서 표시
const renderBarLabel = (unit) => (props) => {
  const { x, y, width, value } = props;
  if (value === null || value === undefined) return null;
  const hasRoomAbove = y - PLOT_TOP > 20;
  const labelY = hasRoomAbove ? y - 8 : y + 16;
  return (
    <text
      x={x + width / 2}
      y={labelY}
      textAnchor="middle"
      fontSize={11}
      fontWeight={400}
      fill="#212529"
    >
      {formatValue(value)}
      {unit}
    </text>
  );
};

/**
 * 주간 리포트용 단일 지표 막대그래프.
 * unit은 세로축 칸마다 표시하지 않고 좌상단에 한 번만 표시한다.
 */
const MetricBarChart = ({
  data,
  unit,
  domain,
  ticks,
  color = '#d5e6ff',
  height = 180,
}) => {
  const chartData = formatChartData(data);

  return (
    <S.ChartWrapper>
      <S.UnitLabel>{unit}</S.UnitLabel>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          margin={{ top: PLOT_TOP, right: 16, bottom: 0, left: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#e1e0d9"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="day"
            axisLine={{ stroke: '#c3c2b7' }}
            tickLine={false}
            tick={{ fill: '#898781', fontSize: 12 }}
          />
          <YAxis
            domain={domain}
            ticks={ticks}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#898781', fontSize: 11 }}
            width={32}
          />
          <Bar
            dataKey="value"
            fill={color}
            radius={[8, 8, 0, 0]}
            label={renderBarLabel(unit)}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </S.ChartWrapper>
  );
};

export default MetricBarChart;

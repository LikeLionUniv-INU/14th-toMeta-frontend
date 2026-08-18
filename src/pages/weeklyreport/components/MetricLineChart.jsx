import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
} from 'recharts';
import * as S from './MetricLineChart.styles';
import { formatChartData, formatValue, PLOT_TOP } from './chartUtils';

// 맨 왼쪽(월요일) 점은 라벨을 오른쪽으로, 맨 오른쪽(일요일) 점은 왼쪽으로 붙여
// 세로축/차트 경계와 겹치거나 잘리지 않도록 한다
const CustomDot = ({ cx, cy, payload, color, unit, isFirst, isLast }) => {
  if (payload.value === null || payload.value === undefined) return null;
  const hasRoomAbove = cy - PLOT_TOP > 20;
  const labelY = hasRoomAbove ? cy - 12 : cy + 18;
  const textAnchor = isFirst ? 'start' : isLast ? 'end' : 'middle';
  const labelX = isFirst ? cx + 6 : isLast ? cx - 6 : cx;
  return (
    <g>
      <text
        x={labelX}
        y={labelY}
        textAnchor={textAnchor}
        fontSize={11}
        fontWeight={400}
        fill="#212529"
      >
        {formatValue(payload.value)}
        {unit}
      </text>
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={color}
        stroke="#ffffff"
        strokeWidth={2}
      />
    </g>
  );
};

const CustomActiveDot = ({ cx, cy, payload, color }) => {
  if (payload.value === null || payload.value === undefined) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill={color}
      stroke="#ffffff"
      strokeWidth={2}
    />
  );
};

const CustomTooltip = ({ active, payload, unit }) => {
  if (!active || !payload || !payload.length) return null;
  const point = payload[0].payload;

  if (point.value === null || point.value === undefined) {
    return <S.TooltipBox>기록 없음</S.TooltipBox>;
  }

  return (
    <S.TooltipBox>
      <S.TooltipDay>{point.day}요일</S.TooltipDay>
      <S.TooltipValue>
        {point.value}
        {unit}
      </S.TooltipValue>
    </S.TooltipBox>
  );
};

/**
 * 주간 리포트용 단일 지표 꺾은선그래프.
 * unit은 세로축 칸마다 표시하지 않고 좌상단에 한 번만 표시한다.
 */
const MetricLineChart = ({
  data,
  unit,
  domain,
  ticks,
  color = '#89d7bc',
  height = 220,
  normalRange,
}) => {
  const chartData = formatChartData(data);
  const firstDate = chartData[0]?.date;
  const lastDate = chartData[chartData.length - 1]?.date;
  const renderDot = (dotProps) => (
    <CustomDot
      {...dotProps}
      color={color}
      unit={unit}
      isFirst={dotProps.payload.date === firstDate}
      isLast={dotProps.payload.date === lastDate}
    />
  );

  return (
    <S.ChartWrapper>
      <S.UnitLabel>{unit}</S.UnitLabel>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={chartData}
          margin={{ top: PLOT_TOP, right: 28, bottom: 0, left: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#e1e0d9" />
          {normalRange && (
            <ReferenceArea
              y1={normalRange[0]}
              y2={normalRange[1]}
              fill="#63bf8e"
              fillOpacity={0.2}
              stroke="none"
            />
          )}
          <XAxis
            dataKey="day"
            axisLine={{ stroke: '#c3c2b7' }}
            tickLine={false}
            tick={{ fill: '#898781', fontSize: 12 }}
          />
          <YAxis
            domain={domain}
            ticks={ticks}
            allowDataOverflow
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#898781', fontSize: 11 }}
            width={32}
          />
          <Tooltip
            content={<CustomTooltip unit={unit} />}
            cursor={{ stroke: '#c3c2b7', strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            connectNulls
            dot={renderDot}
            activeDot={<CustomActiveDot color={color} />}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </S.ChartWrapper>
  );
};

export default MetricLineChart;

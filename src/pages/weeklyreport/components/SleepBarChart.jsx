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
import * as LS from './SleepBarChart.styles';
import { DAY_LABELS, PLOT_TOP } from './chartUtils';

const SLEEP_SEGMENTS = [
  { key: 'rem', label: 'REM', color: '#dec4ee' },
  { key: 'deep', label: 'DEEP', color: '#a1aee5' },
  { key: 'light', label: 'LIGHT', color: '#cee1fa' },
  { key: 'awake', label: 'AWAKE', color: '#ffe8d3' },
];

const formatSleepData = (rawData = []) =>
  rawData.map((item) => {
    const day = DAY_LABELS[new Date(item.date).getDay()];
    if (!item.sleep) {
      return {
        date: item.date,
        day,
        rem: null,
        deep: null,
        light: null,
        awake: null,
        total: null,
      };
    }
    return {
      date: item.date,
      day,
      rem: item.sleep.remSleep,
      deep: item.sleep.deepSleep,
      light: item.sleep.lightSleep,
      awake: item.sleep.awake,
      total: item.sleep.totalSleep,
    };
  });

const formatSegmentTime = (min) => `${min}m`;

const formatTotalTime = (min) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m}min`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
};

const SleepBarChart = ({ data, height = 240 }) => {
  const chartData = formatSleepData(data);
  const nonNullEntries = chartData.filter((entry) => entry.rem !== null);

  const renderSegmentLabel = (segmentKey, isTopSegment) => (props) => {
    const { x, y, width, height: barHeight, index } = props;
    const entry = nonNullEntries[index];
    if (!entry) return null;

    const segmentValue = entry[segmentKey];
    const elements = [];
    if (segmentValue && barHeight >= 14) {
      elements.push(
        <text
          key="seg"
          x={x + width / 2}
          y={y + barHeight / 2 + 4}
          textAnchor="middle"
          fontSize={10}
          fontWeight={400}
          fill="#707880"
        >
          {formatSegmentTime(segmentValue)}
        </text>,
      );
    }
    if (isTopSegment && entry.total) {
      const hasRoomAbove = y - PLOT_TOP > 20;
      const totalY = hasRoomAbove ? y - 10 : y + 14;
      elements.push(
        <text
          key="total"
          x={x + width / 2}
          y={totalY}
          textAnchor="middle"
          fontSize={11}
          fontWeight={500}
          fill="#212529"
        >
          {formatTotalTime(entry.total)}
        </text>,
      );
    }
    return elements.length ? <g>{elements}</g> : null;
  };

  return (
    <S.ChartWrapper>
      <S.UnitLabel>h</S.UnitLabel>
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
            domain={[0, 720]}
            ticks={[0, 240, 480, 720]}
            tickFormatter={(value) => value / 60}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#898781', fontSize: 11 }}
            width={32}
          />
          {SLEEP_SEGMENTS.map((segment, idx) => {
            const isBottom = idx === 0;
            const isTop = idx === SLEEP_SEGMENTS.length - 1;
            const radius = isTop ? [8, 8, 0, 0] : isBottom ? [0, 0, 8, 8] : 0;
            return (
              <Bar
                key={segment.key}
                dataKey={segment.key}
                stackId="sleep"
                fill={segment.color}
                radius={radius}
                label={renderSegmentLabel(segment.key, isTop)}
                isAnimationActive={false}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
      <LS.LegendRow>
        {SLEEP_SEGMENTS.map((segment) => (
          <LS.LegendItem key={segment.key}>
            <LS.LegendChip $color={segment.color} />
            {segment.label}
          </LS.LegendItem>
        ))}
      </LS.LegendRow>
    </S.ChartWrapper>
  );
};

export default SleepBarChart;

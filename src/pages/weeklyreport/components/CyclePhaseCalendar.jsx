import React from 'react';
import * as S from './CyclePhaseCalendar.styles';
import { DAY_LABELS } from './chartUtils';

const PHASE_CONFIG = {
  menstrual: { label: '생리기', color: '#a95eff' },
  follicular: { label: '난포기', color: '#ffe9e9' },
  ovulation: { label: '배란기', color: '#ffc075' },
  luteal: { label: '황체기', color: '#5eb7ff' },
};

const getPhase = (cycleDay) => {
  if (cycleDay >= 1 && cycleDay <= 5) return 'menstrual';
  if (cycleDay >= 6 && cycleDay <= 13) return 'follicular';
  if (cycleDay >= 14 && cycleDay <= 16) return 'ovulation';
  return 'luteal';
};

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const formatCycleData = (rawData = []) =>
  rawData.map((item) => {
    const dateObj = new Date(item.date);
    const raw = item.menstrualCycleDay;
    const cycleDay =
      raw === null || raw === undefined || raw === '' ? null : Number(raw);
    const phase =
      cycleDay === null || Number.isNaN(cycleDay) ? null : getPhase(cycleDay);
    return {
      date: item.date,
      day: DAY_LABELS[dateObj.getDay()],
      dateNum: dateObj.getDate(),
      phase,
    };
  });

const CyclePhaseCalendar = ({ data }) => {
  const days = formatCycleData(data);

  return (
    <S.NoteCard>
      <S.PinsLeft>
        <S.Pin>
          <S.PinBar />
          <S.PinHole />
        </S.Pin>
        <S.Pin>
          <S.PinBar />
          <S.PinHole />
        </S.Pin>
        <S.Pin>
          <S.PinBar />
          <S.PinHole />
        </S.Pin>
      </S.PinsLeft>
      <S.PinsRight>
        <S.Pin>
          <S.PinBar />
          <S.PinHole />
        </S.Pin>
        <S.Pin>
          <S.PinBar />
          <S.PinHole />
        </S.Pin>
        <S.Pin>
          <S.PinBar />
          <S.PinHole />
        </S.Pin>
      </S.PinsRight>

      <S.WeekGrid>
        {days.map((d) => (
          <S.DayLabel key={d.date}>{d.day}</S.DayLabel>
        ))}
      </S.WeekGrid>

      <S.Divider />

      <S.WeekGrid>
        {days.map((d, i) => {
          const isGroupStart = i === 0 || days[i - 1].phase !== d.phase;
          const isGroupEnd =
            i === days.length - 1 || days[i + 1].phase !== d.phase;
          return (
            <S.DateCell
              key={d.date}
              $bg={
                d.phase
                  ? hexToRgba(PHASE_CONFIG[d.phase].color, 0.33)
                  : undefined
              }
              $roundLeft={isGroupStart}
              $roundRight={isGroupEnd}
            >
              {d.dateNum}
            </S.DateCell>
          );
        })}
      </S.WeekGrid>

      <S.PhaseLabelRow>
        {days.map((d, i) => {
          const isGroupStart = i === 0 || days[i - 1].phase !== d.phase;
          if (!isGroupStart || !d.phase) return null;
          let end = i + 1;
          while (end < days.length && days[end].phase === d.phase) end += 1;
          return (
            <S.PhaseLabel key={d.date} $start={i + 1} $end={end + 1}>
              {PHASE_CONFIG[d.phase].label}
            </S.PhaseLabel>
          );
        })}
      </S.PhaseLabelRow>
    </S.NoteCard>
  );
};

export default CyclePhaseCalendar;

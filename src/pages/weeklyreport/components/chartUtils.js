export const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

// 차트 상단과 가까운 값은 라벨이 잘리므로 이 여백을 기준으로 라벨 위치를 뒤집는다
export const PLOT_TOP = 28;

// null 값은 그래프상 표시하지 않고(선 그래프는 좌우끼리 이어주고, 막대는 비워둔다) value를 null로 유지
export const formatChartData = (rawData = []) =>
  rawData.map((item) => {
    const parsed = item.value === null || item.value === undefined || item.value === ''
      ? null
      : Number(item.value);
    return {
      date: item.date,
      day: DAY_LABELS[new Date(item.date).getDay()],
      value: Number.isNaN(parsed) ? null : parsed,
    };
  });

// 소수 첫째 자리까지만 남기고, 정수면 소수점 없이 표시
export const formatValue = (value) => {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
};

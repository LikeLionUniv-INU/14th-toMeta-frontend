export const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export const PLOT_TOP = 28;

export const formatChartData = (rawData = []) =>
  rawData.map((item) => {
    const parsed =
      item.value === null || item.value === undefined || item.value === ''
        ? null
        : Number(item.value);
    return {
      date: item.date,
      day: DAY_LABELS[new Date(item.date).getDay()],
      value: Number.isNaN(parsed) ? null : parsed,
    };
  });

export const formatValue = (value) => {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
};

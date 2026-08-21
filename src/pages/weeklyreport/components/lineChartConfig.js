
export const LINE_CHART_CONFIG = {
  '평균 피부온도': {
    dataKey: 'skinTemperature',
    unit: '°C',
    domain: [28, 36],
    ticks: [28, 30, 32, 34, 36],
    normalRange: [31, 32.5],
  },
  '운동 소모 칼로리': {
    dataKey: 'totalCaloriesBurned',
    unit: 'kcal',
    domain: [0, 1000],
    ticks: [0, 200, 400, 600, 800, 1000],
  },
  '평균 산소포화도': {
    dataKey: 'avgSpo2',
    unit: '%',
    domain: [88, 100],
    ticks: [88, 90, 92, 94, 96, 98, 100],
    normalRange: [95, 100],
  },
};

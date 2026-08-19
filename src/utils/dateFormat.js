const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// "2026-08-19" 같은 ISO 날짜 문자열에서 "August 2026" 형태를 만든다.
export const formatEnglishMonthYear = (dateStr) => {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const monthName = MONTH_NAMES_EN[Number(month) - 1];
  return monthName ? `${monthName} ${year}` : '';
};

// 로컬 타임존 기준 "YYYY-MM-DD" (Date.toISOString은 UTC라 자정 근처에 하루씩 밀릴 수 있어 사용하지 않는다)
export const formatLocalDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

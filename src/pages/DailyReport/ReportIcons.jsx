
export const SleepIcon = ({ size = 20, color = '#1c1b1f' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const TempIcon = ({ size = 24, color = '#1c1b1f' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  </svg>
);

export const ExerciseIcon = ({ size = 20, color = '#1c1b1f' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 16.5L9.5 6.5C10.2 5.2 11.8 4.8 13 5.5L15 6.7C15.8 7.2 16.2 8.2 15.8 9.1L14.5 12L20.5 14.5C21.6 15 22 16.3 21.5 17.3L20.5 19H3.5L4 16.5Z" />
    <path d="M3.5 18.5H20.5" />
    <path d="M10 10.5L13.5 12" />
    <path d="M11.5 8L15 9.5" />
  </svg>
);

export const CalorieIcon = ({ size = 20, color = '#1c1b1f' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5c0-2-1.5-3-2-4.5-.5 1.5-2 1.5-2 3-.5-.5-.8-1.2-.8-2-2 1.5-2.2 3.5-2.2 3.5z" />
    <path d="M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-4 3.5-6.5 4.5-9 1 1.5 2.5 2 3.5 0z" />
  </svg>
);

export const CycleIcon = ({ size = 20, color = '#1c1b1f' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const OxygenIcon = ({ size = 24, color = '#1c1b1f' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* 기관지 */}
    <path d="M12 4v6M12 10l-3 3M12 10l3 3" />
    {/* 좌측 폐 */}
    <path d="M9 13c-2.5 0-4.5 2-4.5 5.5s1.8 3.5 3.5 3.5 3-1.5 3-4.5v-4.5z" />
    {/* 우측 폐 */}
    <path d="M15 13c2.5 0 4.5 2 4.5 5.5s-1.8 3.5-3.5 3.5-3-1.5-3-4.5v-4.5z" />
  </svg>
);

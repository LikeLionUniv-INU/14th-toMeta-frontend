const FACES = {
  very_bad: {
    mouth: 'M6.5 18.5 Q12 12 17.5 18.5',
    browLeft: 'M5.5 7.5 L10.5 10.8',
    browRight: 'M18.5 7.5 L13.5 10.8',
    eyes: 'dot',
  },
  bad: {
    mouth: 'M8 16.2 Q12 15 16 16.2',
    browLeft: 'M7.5 10.2 L10 10.7',
    browRight: 'M16.5 10.2 L14 10.7',
    eyes: 'dot',
  },
  normal: {
    mouth: 'M8 16 L16 16',
    eyes: 'dot',
  },
  good: {
    mouth: 'M7.5 14.8 Q12 18 16.5 14.8',
    eyes: 'dot',
  },
  very_good: {
    mouth: 'M6.5 14 Q12 20.5 17.5 14',
    eyes: 'happy',
  },
};

export default function StatusFace({ level, size = 30, color = '#4a3222' }) {
  const face = FACES[level];
  if (!face) return null;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {face.browLeft && (
        <path
          d={face.browLeft}
          stroke={color}
          strokeWidth={1.9}
          strokeLinecap="round"
        />
      )}
      {face.browRight && (
        <path
          d={face.browRight}
          stroke={color}
          strokeWidth={1.9}
          strokeLinecap="round"
        />
      )}
      {face.eyes === 'happy' ? (
        <>
          <path
            d="M6.5 11.5 Q8.5 9.3 10.5 11.5"
            stroke={color}
            strokeWidth={1.9}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M13.5 11.5 Q15.5 9.3 17.5 11.5"
            stroke={color}
            strokeWidth={1.9}
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        <>
          <circle cx="8.5" cy="11.5" r="1.4" fill={color} />
          <circle cx="15.5" cy="11.5" r="1.4" fill={color} />
        </>
      )}
      <path
        d={face.mouth}
        stroke={color}
        strokeWidth={2.1}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

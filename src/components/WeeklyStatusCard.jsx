// 일주일치 상태를 요일별 원으로 보여주는 카드.
// 원 안의 내용(color / children)만 바꿔서 다른 화면(홈 화면 등)에서도 재사용한다.
// 사용 예시:
// <WeeklyStatusCard
//   title="8월 첫째 주"
//   subtitle="이번 주 피부 상태를 확인해 보세요."
//   days={[{ date: '2026-07-27', day: '월', color: '#ffd3ad' }, ...]}
// />

import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/GlobalStyle';

// hex 색을 흰색/검은색 쪽으로 amount(0~1)만큼 섞는다 (비네트 그라디언트용)
const mixColor = (hex, target, amount) => {
  const c = hex.replace('#', '');
  const t = target.replace('#', '');
  const r1 = parseInt(c.slice(0, 2), 16);
  const g1 = parseInt(c.slice(2, 4), 16);
  const b1 = parseInt(c.slice(4, 6), 16);
  const r2 = parseInt(t.slice(0, 2), 16);
  const g2 = parseInt(t.slice(2, 4), 16);
  const b2 = parseInt(t.slice(4, 6), 16);
  const mix = (a, b) => Math.round(a + (b - a) * amount);
  return `rgb(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)})`;
};

// 표정이 도드라져 보이도록 중앙은 밝게, 가장자리는 살짝 어둡게 (비네트)
const getCircleBackground = (hex) => {
  if (!hex || hex === '#ffffff') return '#ffffff';
  const light = mixColor(hex, '#ffffff', 0.4);
  const dark = mixColor(hex, '#000000', 0.14);
  return `radial-gradient(circle at 50% 42%, ${light} 0%, ${hex} 58%, ${dark} 100%)`;
};

export default function WeeklyStatusCard({ title, subtitle, days = [] }) {
  return (
    <Card>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {(title || subtitle) && <Divider />}

      <Pill>
        <Row>
          {days.map((d) => (
            <DayLabel key={d.date} $isToday={d.isToday}>
              {d.day}
            </DayLabel>
          ))}
        </Row>
        <Row>
          {days.map((d) => (
            <CircleWrapper key={d.date}>
              <Circle $bg={getCircleBackground(d.color)}>{d.children}</Circle>
            </CircleWrapper>
          ))}
        </Row>
      </Pill>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: #f4fffa;
  border: 1px solid #a2a2a2;
  border-radius: 12px;
  padding: 12px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #04895c;
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: #083727;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #b3d6ca;
  margin: 6px;
`;

const Pill = styled.div`
  background-color: #a9eec7;
  border: 1px solid #a2d1c1;
  border-radius: 20px;
  padding: 16px 8px 8px 8px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 4px;

  & + & {
    margin-top: 10px;
  }

  @media ${media.mobileM} {
    grid-template-columns: repeat(7, 1fr);
  }
`;

const DayLabel = styled.div`
  height: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: ${(props) => (props.$isToday ? '14px' : '11px')};
  font-weight: ${(props) => (props.$isToday ? '800' : '700')};
  line-height: 1;
  color: #141212;
`;

const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Circle = styled.div`
  width: 100%;
  max-width: 32px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 1px solid #bcbcbc;
  border-radius: 50%;
  background: ${(props) => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  @media ${media.mobileM} {
    max-width: 40px;
  }
`;

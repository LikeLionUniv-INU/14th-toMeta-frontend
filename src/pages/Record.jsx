import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";

export default function Record() {
  const [activeTab, setActiveTab] = useState("morning");

  // 2. 백엔드 연동 전 임시 데이터 (상태로 관리)
  const [recordData, setRecordData] = useState({
    dateText: "8월 5일 수요일",
    weatherText: "날씨 흐림 | 온도 25-34 | 습도 94%",
    skinStatus: "보통",
    morningRoutine: [
      { id: 1, name: "아누아 어성초 77% 진정 토너", tags: ["#토너", "#어성초", "#진정", "#피지조절"] },
      { id: 2, name: "브링그린 티트리 시카 크림", tags: ["#크림", "#속건조", "#수분", "#시카"] },
      { id: 3, name: "에스트라 아토베리어 365크림", tags: ["#크림", "#속건조", "#수분", "#진정"] },
      { id: 4, name: "듀이트리 핏 앤 퀵 더블패드", tags: ["#패드", "#유수분", "#수분", "#진정"] },
    ],
    nightRoutine: [
      { id: 101, name: "아누아 어성초 77% 진정 토너", tags: ["#토너", "#진정"] },
      { id: 102, name: "에스트라 아토베리어 365크림", tags: ["#크림", "#보습"] },
    ],
    // null이나 빈 값을 넣어두면 첫 번째 화면처럼 필수 입력란만 노출됩니다.
    food: "아침에 감자탕을 먹었다.",
    skinPhotos: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
  });

  const currentRoutine =
    activeTab === "morning"
      ? recordData.morningRoutine
      : recordData.nightRoutine;

  return (
    <Container>
      <ContentWrapper>
        {/* 상단 공통 헤더 */}
        <Header />

        {/* 날짜 & 날씨 정보 */}
        <DateTitle>{recordData.dateText}</DateTitle>
        <SubHeader>
          <WeatherInfo>{recordData.weatherText}</WeatherInfo>
          <ReportBadge>데일리 리포트</ReportBadge>
        </SubHeader>

        {/* 피부 상태 요약 */}
        <StatusSection>
          <ProfileCircle />
          <StatusTextWrapper>
            <StatusLabel>오늘 내 피부 상태는...</StatusLabel>
            <StatusValue>{recordData.skinStatus}</StatusValue>
          </StatusTextWrapper>
        </StatusSection>

        {/* 모닝 / 나이트 탭 */}
        <TabGroup>
          <TabButton
            $active={activeTab === "morning"}
            onClick={() => setActiveTab("morning")}
          >
            ⚙️ 모닝 스킨케어
          </TabButton>
          <TabButton
            $active={activeTab === "night"}
            onClick={() => setActiveTab("night")}
          >
            🌙 나이트 스킨케어
          </TabButton>
        </TabGroup>

        {/* 스킨케어 제품 카드 리스트 */}
        <CardList>
          {currentRoutine.map((item) => (
            <Card key={item.id}>
              <CardTitle>{item.name}</CardTitle>
              <TagGroup>
                {item.tags.map((tag, idx) => (
                  <Tag key={idx}>{tag}</Tag>
                ))}
              </TagGroup>
            </Card>
          ))}
        </CardList>

        {/* 선택 입력 영역 (조건부 렌더링) */}
        {(recordData.food || (recordData.skinPhotos && recordData.skinPhotos.length > 0)) && (
          <OptionalSection>
            {recordData.food && (
              <OptionalGroup>
                <SectionTitle>오늘 먹은 음식</SectionTitle>
                <FoodCard>{recordData.food}</FoodCard>
              </OptionalGroup>
            )}

            {recordData.skinPhotos && recordData.skinPhotos.length > 0 && (
              <OptionalGroup>
                <SectionTitle>오늘 나의 피부 사진</SectionTitle>
                <SubDescription>
                  사진을 남겨두면 주간 리포트에서 한 주간의 변화 추이를 볼 수 있어요!
                </SubDescription>
                <PhotoGrid>
                  {recordData.skinPhotos.map((photo, index) => (
                    <PhotoBox key={index} src={photo} alt={`skin-${index}`} />
                  ))}
                </PhotoGrid>
              </OptionalGroup>
            )}
          </OptionalSection>
        )}
      </ContentWrapper>

      {/* 하단 버튼 */}
      <SubmitButton>수정하기</SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  height: 100dvh;
  margin: 0 auto;
  padding: 16px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const DateTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-top: 12px;
  color: #111;
`;

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
  margin-top: 4px;
`;

const WeatherInfo = styled.span`
  font-size: 12px;
  color: #777;
`;

const ReportBadge = styled.span`
  font-size: 10px;
  background-color: #5b8e6b;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0 16px 0;
`;

const ProfileCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #e0e0e0;
  flex-shrink: 0;
`;

const StatusTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusLabel = styled.span`
  font-size: 12px;
  color: #888;
`;

const StatusValue = styled.span`
  font-size: 22px;
  font-weight: 800;
  color: #111;
  margin-top: 2px;
`;

const TabGroup = styled.div`
  display: flex;
  border-bottom: 2px solid #eee;
  margin-top: 8px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  color: ${(props) => (props.$active ? "#497356" : "#aaa")};
  border-bottom: ${(props) => (props.$active ? "2px solid #497356" : "none")};
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  margin-bottom: -2px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
`;

const Card = styled.div`
  padding: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: #fff;
`;

const CardTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 8px 0;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  font-size: 10px;
  background-color: #e6f4ea;
  color: #34a853;
  padding: 3px 8px;
  border-radius: 12px;
`;

const OptionalSection = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 8px solid #f7f9fa;
`;

const OptionalGroup = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #111;
  margin: 0 0 8px 0;
`;

const SubDescription = styled.p`
  font-size: 11px;
  color: #999;
  margin: 0 0 10px 0;
`;

const FoodCard = styled.div`
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 12px;
  color: #4a5568;
`;

const PhotoGrid = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

const PhotoBox = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #eee;
  flex-shrink: 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px 0;
  background-color: #5b8e6b;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 24px;

  &:hover {
    background-color: #497356;
  }
`;
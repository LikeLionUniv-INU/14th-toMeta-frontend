import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import CosmeticCard from "../components/CosmeticCard";
import SunIcon from "../assets/images/record/sun.svg";
import MoonIcon from "../assets/images/record/Moon.svg";
import { getCosmeticOptions } from "../api/cosmetics";

export default function Record() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("morning");

  const [recordData, setRecordData] = useState({
    dateText: "8월 5일 수요일",
    skinStatus: "보통",
    food: "아침에 감자탕을 먹었다.",
    skinPhotos: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
  });

  const [optionsData, setOptionsData] = useState({
    sets: [],
    cosmetics: [],
  });

  useEffect(() => {
    const fetchCosmeticOptions = async () => {
      try {
        const response = await getCosmeticOptions();
        if (response.data && response.data.isSuccess) {
          const result = response.data.result;
          if (result) {
            setOptionsData({
              sets: result.sets || [],
              cosmetics: result.cosmetics || (Array.isArray(result) ? result : []),
            });
          }
        }
      } catch (error) {
        console.error("화장품 옵션 조회 중 오류 발생:", error);
      }
    };

    fetchCosmeticOptions();
  }, []);

  const filteredSets = optionsData.sets.filter((item) => {
    if (!item.usageTime || item.usageTime === "both") return true;
    return item.usageTime === activeTab;
  });

  const cosmeticList = optionsData.cosmetics;

  const handleEditClick = () => {
    navigate("/todaynote");
  };

  const hasFood = Boolean(recordData.food && recordData.food.trim());
  const hasPhotos = Boolean(recordData.skinPhotos && recordData.skinPhotos.length > 0);

  return (
    <Container>
      <Header title={"기록"} variant="back" />
      <ContentWrapper>
        <HeaderRow>
          <DateTitle>{recordData.dateText}</DateTitle>
        </HeaderRow>

        <StatusSection>
          <ProfileCircle />
          <StatusTextWrapper>
            <StatusLabel>오늘 내 피부 상태는...</StatusLabel>
            <StatusValue>{recordData.skinStatus}</StatusValue>
          </StatusTextWrapper>
        </StatusSection>

        <TabGroup>
          <TabButton
            $active={activeTab === "morning"}
            onClick={() => setActiveTab("morning")}
          >
            <img src={SunIcon} alt="morning" /> 모닝 스킨케어
          </TabButton>
          <TabButton
            $active={activeTab === "night"}
            onClick={() => setActiveTab("night")}
          >
            <img src={MoonIcon} alt="night" /> 나이트 스킨케어
          </TabButton>
        </TabGroup>

        <CardListSection>
          <CardList>
            {filteredSets.map((set) => (
              <SetCard key={set.setId}>
                <SetTitle>{set.name}</SetTitle>
                <SetTagGroup>
                  {(set.mainIngredients || []).map((tag, idx) => (
                    <SetTag key={idx}>
                      {tag.startsWith("#") ? tag : `#${tag}`}
                    </SetTag>
                  ))}
                </SetTagGroup>
              </SetCard>
            ))}

            {cosmeticList.map((item) => (
              <CosmeticCard
                key={item.userCosmeticId}
                name={item.productName || item.name}
                tags={(item.mainIngredients || []).map((tag) =>
                  tag.startsWith("#") ? tag : `#${tag}`
                )}
              />
            ))}
          </CardList>
        </CardListSection>

        {(hasFood || hasPhotos) && (
          <OptionalSection>
            {hasFood && (
              <OptionalGroup>
                <SectionTitle>오늘 먹은 음식</SectionTitle>
                <FoodCard>{recordData.food}</FoodCard>
              </OptionalGroup>
            )}

            {hasPhotos && (
              <OptionalGroup>
                <SectionTitle>오늘 나의 피부 사진</SectionTitle>
                <SubDescription>
                  사진을 남겨두면 주간 리포트에서 한 주간의 변화 추이를 볼 수 있어요!
                </SubDescription>

                <PhotoGrid>
                  {recordData.skinPhotos.map((photo, index) => (
                    <PhotoItem key={index}>
                      <PhotoBox src={photo} alt={`skin-${index}`} />
                    </PhotoItem>
                  ))}
                </PhotoGrid>
              </OptionalGroup>
            )}
          </OptionalSection>
        )}
      </ContentWrapper>

      <ButtonWrapper>
        <Button onClick={handleEditClick}>수정하기</Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100dvh;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 20px 0 20px;
`;

const DateTitle = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  color: #000000;
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 20px;
`;

const ProfileCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e0e0e0;
  flex-shrink: 0;
`;

const StatusTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #141212;
  margin-left: 10px;
`;

const StatusValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #141212;
  margin-left: 10px;
  margin-top: 6px;
`;

const TabGroup = styled.div`
  display: flex;
  border-bottom: 2px solid #eee;
  margin-top: 8px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  font-size: 14px;
  font-weight: 700;
  color: ${(props) => (props.$active ? "#266210" : "gray")};
  border-bottom: ${(props) => (props.$active ? "2px solid #266210" : "none")};
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  margin-bottom: -2px;

  img {
    width: 18px;
    height: 18px;
    transition: filter 0.2s ease;

    filter: ${(props) =>
    props.$active
      ? "brightness(0) saturate(100%) invert(29%) sepia(85%) saturate(750%) hue-rotate(72deg) brightness(88%) contrast(96%)"
      : "brightness(0) saturate(100%) invert(50%) opacity(0.7)"};
  }
`;

const CardListSection = styled.div`
  margin: 16px 20px 0 20px;
  display: flex;
  flex-direction: column;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 4px;
  }
`;

const SetCard = styled.div`
  background-color: #fff8f2;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #96be9c;
`;

const SetTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #141212;
`;

const SetTagGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const SetTag = styled.span`
  background-color: #96be9c;
  color: #ffffff;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

const OptionalSection = styled.div`
  margin: 24px 20px 0 20px;
  padding-top: 16px;
  border-top: 8px solid #f7f9fa;
`;

const OptionalGroup = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 8px 0;
`;

const SubDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #b4b4b4;
  margin: 0 0 10px 0;
`;

const FoodCard = styled.div`
  padding: 12px;
  border: 1px solid #89d7bc;
  background-color: #f3fffb;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  color: #141212;
`;

const PhotoGrid = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-top: 6px;
`;

const PhotoItem = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const PhotoBox = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #eee;
  display: block;
`;

const ButtonWrapper = styled.div`
  margin: 0 20px 30px 20px;
`;
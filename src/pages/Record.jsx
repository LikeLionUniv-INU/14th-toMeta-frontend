import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import CosmeticCard from "../components/CosmeticCard";
import SunIcon from "../assets/images/record/sun.svg";
import MoonIcon from "../assets/images/record/Moon.svg";

export default function Record() {
  const [activeTab, setActiveTab] = useState("morning");
  const [isEditing, setIsEditing] = useState(false);

  const [recordData, setRecordData] = useState({
    dateText: "8월 5일 수요일",
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

  const handleFoodChange = (e) => {
    setRecordData((prev) => ({
      ...prev,
      food: e.target.value,
    }));
  };

  const handleRemovePhoto = (index) => {
    setRecordData((prev) => ({
      ...prev,
      skinPhotos: prev.skinPhotos.filter((_, i) => i !== index),
    }));
  };

  const handleToggleEdit = async () => {
    if (isEditing) {
      try {
        console.log("백엔드로 전송할 수정 데이터:", recordData);
        // await axios.put('/api/records', recordData);
        alert("수정사항이 저장되었습니다.");
        setIsEditing(false);
      } catch (error) {
        console.error("저장 중 오류 발생:", error);
      }
    } else {
      setIsEditing(true);
    }
  };

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
            <img src={SunIcon} /> 모닝 스킨케어
          </TabButton>
          <TabButton
            $active={activeTab === "night"}
            onClick={() => setActiveTab("night")}
          >
            <img src={MoonIcon} /> 나이트 스킨케어
          </TabButton>
        </TabGroup>

        <CardListSection>
          <CardList>
            {currentRoutine.map((item) => (
              <CosmeticCard
                key={item.id}
                name={item.name}
                tags={item.tags}
              />
            ))}
          </CardList>
          {isEditing && <EditText>edit</EditText>}
        </CardListSection>

        {(recordData.food || (recordData.skinPhotos && recordData.skinPhotos.length > 0) || isEditing) && (
          <OptionalSection>
            <OptionalGroup>
              <SectionTitle>오늘 먹은 음식</SectionTitle>
              {isEditing ? (
                <FoodInput
                  value={recordData.food}
                  onChange={handleFoodChange}
                  placeholder="오늘 드신 음식을 작성해주세요."
                />
              ) : (
                <FoodCard>{recordData.food || "기록된 음식이 없습니다."}</FoodCard>
              )}
              {isEditing && <EditText>edit</EditText>}
            </OptionalGroup>

            {recordData.skinPhotos && recordData.skinPhotos.length > 0 && (
              <OptionalGroup>
                <SectionTitle>오늘 나의 피부 사진</SectionTitle>
                <SubDescription>
                  사진을 남겨두면 주간 리포트에서 한 주간의 변화 추이를 볼 수 있어요!
                </SubDescription>

                <PhotoGrid>
                  {recordData.skinPhotos.map((photo, index) => (
                    <PhotoItem key={index}>
                      <PhotoBox src={photo} alt={`skin-${index}`} />
                      {isEditing && (
                        <DeleteBadge type="button" onClick={() => handleRemovePhoto(index)}>
                          −
                        </DeleteBadge>
                      )}
                    </PhotoItem>
                  ))}
                </PhotoGrid>
              </OptionalGroup>
            )}
          </OptionalSection>
        )}
      </ContentWrapper>

      <ButtonWrapper>
        <Button onClick={handleToggleEdit}>
          {isEditing ? "저장하기" : "수정하기"}
        </Button>
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
`;

const EditText = styled.span`
  font-size: 12px;
  color: #777;
  text-decoration: underline;
  text-align: right;
  margin-top: 6px;
  display: block;
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
  color: #B4B4B4;
  margin: 0 0 10px 0;
`;

const FoodCard = styled.div`
  padding: 12px;
  border: 1px solid #89d7bc;
  background-color: #F3FFFB;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  color: #141212;
`;

const FoodInput = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #96be9c;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  color: #141212;
  box-sizing: border-box;
  resize: none;
  height: 60px;
  outline: none;
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

const DeleteBadge = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #e53e3e;
  color: #ffffff;
  border: none;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 1;
`;

const ButtonWrapper = styled.div`
  margin: 0 20px 30px 20px;
`;
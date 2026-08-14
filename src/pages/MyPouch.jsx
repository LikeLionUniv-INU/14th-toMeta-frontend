import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import CosmeticCard from "../components/CosmeticCard";
import SunIcon from "../assets/images/record/sun.svg";
import MoonIcon from "../assets/images/record/Moon.svg";
import Trash from "../assets/images/trash.png";

export default function MyPouch() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("morning");
  const [pouchData, setPouchData] = useState({
    morning: { sets: [], cosmetics: [] },
    night: { sets: [], cosmetics: [] },
  });
  const [loading, setLoading] = useState(true);

  // API 호출 대신 더미 데이터 직접 주입 (백엔드 개발 완료 전 임시용)
  useEffect(() => {
    // 백엔드 명세서 성공 Response 데이터 그대로 활용
    const mockResponse = {
      isSuccess: true,
      code: "COMMON_200",
      message: "요청에 성공했습니다.",
      result: {
        morning: {
          sets: [
            {
              setId: 1,
              name: "진정템",
              cosmetics: [
                {
                  userCosmeticId: 11,
                  productName: "아누아 어성초 77% 진정 토너",
                  customName: null,
                  productType: "skin_toner",
                  usageTime: "both",
                  mainIngredients: ["어성초"],
                },
                {
                  userCosmeticId: 12,
                  productName: "토리든 다이브인 저분자 히알루론산 세럼",
                  customName: null,
                  productType: "serum",
                  usageTime: "morning",
                  mainIngredients: ["히알루론산"],
                },
              ],
            },
            {
              setId: 2,
              name: "사용자 지정 이름",
              cosmetics: [
                {
                  userCosmeticId: 13,
                  productName: "진정 크림",
                  customName: "데일리 진정 크림",
                  productType: "soothing_cream",
                  usageTime: "both",
                  mainIngredients: ["티트리"],
                },
              ],
            },
          ],
          cosmetics: [
            {
              userCosmeticId: 11,
              productName: "아누아 어성초 77% 진정 토너",
              customName: null,
              productType: "skin_toner",
              usageTime: "both",
              mainIngredients: ["어성초"],
            },
            {
              userCosmeticId: 12,
              productName: "토리든 다이브인 저분자 히알루론산 세럼",
              customName: null,
              productType: "serum",
              usageTime: "morning",
              mainIngredients: ["히알루론산"],
            },
            {
              userCosmeticId: 13,
              productName: "진정 크림",
              customName: "데일리 진정 크림",
              productType: "soothing_cream",
              usageTime: "both",
              mainIngredients: ["티트리"],
            },
          ],
        },
        night: {
          sets: [
            {
              setId: 3,
              name: "나이트 진정 세트",
              cosmetics: [
                {
                  userCosmeticId: 11,
                  productName: "아누아 어성초 77% 진정 토너",
                  customName: null,
                  productType: "skin_toner",
                  usageTime: "both",
                  mainIngredients: ["어성초"],
                },
                {
                  userCosmeticId: 14,
                  productName: "브링그린 티트리 시카 크림",
                  customName: null,
                  productType: "soothing_cream",
                  usageTime: "night",
                  mainIngredients: ["티트리", "시카"],
                },
              ],
            },
          ],
          cosmetics: [
            {
              userCosmeticId: 11,
              productName: "아누아 어성초 77% 진정 토너",
              customName: null,
              productType: "skin_toner",
              usageTime: "both",
              mainIngredients: ["어성초"],
            },
            {
              userCosmeticId: 14,
              productName: "브링그린 티트리 시카 크림",
              customName: null,
              productType: "soothing_cream",
              usageTime: "night",
              mainIngredients: ["티트리", "시카"],
            },
          ],
        },
      },
    };

    // 더미 데이터 세팅
    setPouchData(mockResponse.result);
    setLoading(false);
  }, []);

  const currentTabContent = pouchData[activeTab] || { sets: [], cosmetics: [] };

  const handleDeleteItem = (id) => {
    setPouchData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        cosmetics: prev[activeTab].cosmetics.filter(
          (item) => item.userCosmeticId !== id
        ),
      },
    }));
  };

  const handleSetClick = (setId) => {
    navigate(`/set/${setId}`, {
      state: { activeTab },
    });
  };

  return (
    <Container>
      <Header title="화장품" />

      <ContentWrapper>
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

        <MainContent>
          {loading ? (
            <div>로딩 중...</div>
          ) : (
            <>
              {currentTabContent.sets && currentTabContent.sets.length > 0 && (
                <>
                  <SetListSection>
                    {currentTabContent.sets.map((set) => (
                      <SetCard key={set.setId}>
                        <SetHeaderRow>
                          <SetTitle>{set.name}</SetTitle>
                        </SetHeaderRow>
                        <SetTagGroup>
                          {set.cosmetics
                            ?.flatMap((c) => c.mainIngredients || [])
                            .map((tag, idx) => (
                              <SetTag key={idx}>#{tag}</SetTag>
                            ))}
                        </SetTagGroup>
                        <ChevronRightIcon onClick={() => handleSetClick(set.setId)}>
                          ›
                        </ChevronRightIcon>
                      </SetCard>
                    ))}
                  </SetListSection>
                  <Divider />
                </>
              )}

              <CardListSection>
                {currentTabContent.cosmetics &&
                  currentTabContent.cosmetics.map((item) => (
                    <CardWrapper key={item.userCosmeticId}>
                      <CosmeticCard
                        name={item.customName || item.productName}
                        tags={(item.mainIngredients || []).map(
                          (tag) => `#${tag}`
                        )}
                      />
                      <DeleteButton
                        onClick={() => handleDeleteItem(item.userCosmeticId)}
                      >
                        <TrashIcon src={Trash} alt="delete" />
                      </DeleteButton>
                    </CardWrapper>
                  ))}
              </CardListSection>
            </>
          )}

          <ButtonGroup>
            <ActionButton onClick={() => navigate("/register/search-cosmetic")}>
              추가하기
            </ActionButton>
            <ActionButton>세트로 묶기</ActionButton>
          </ButtonGroup>
        </MainContent>
      </ContentWrapper>

      <NavigationBar />
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
  padding-bottom: 70px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
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

const MainContent = styled.div`
  padding: 16px 20px;
`;

const SetListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const SetCard = styled.div`
  position: relative;
  background-color: #fff8f2;
  border-radius: 12px;
  padding: 14px 16px;
  color: #141212;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SetHeaderRow = styled.div`
  display: flex;
  align-items: center;
`;

const SetTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ChevronRightIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #141212;
  cursor: pointer;
  padding: 4px;
`;

const SetTagGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const SetTag = styled.span`
  background-color: #96be9c;
  color: #fff8f2;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

const Divider = styled.div`
  height: 10px;
  background-color: #f2f2f2;
  margin: 0 -20px 20px -20px;
`;

const CardListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 12px;
  bottom: 12px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TrashIcon = styled.img`
  width: 14px;
  height: 14px;
  display: block;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background-color: #ffffff;
  border: 1px solid #266210;
  color: #266210;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background-color: #f2f7f1;
  }
`;
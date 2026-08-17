import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import CosmeticCard from "../components/CosmeticCard";
import SunIcon from "../assets/images/record/sun.svg";
import MoonIcon from "../assets/images/record/Moon.svg";
import Trash from "../assets/images/trash.png";

export default function MyPouch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "morning");
  const [pouchData, setPouchData] = useState({
    morning: { sets: [], cosmetics: [] },
    night: { sets: [], cosmetics: [] },
  });
  const [loading, setLoading] = useState(true);

  const [selectedCosmetics, setSelectedCosmetics] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setName, setSetName] = useState("");

  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [selectedRoutines, setSelectedRoutines] = useState({
    day: false,
    night: false,
  });

  useEffect(() => {
    setSelectedCosmetics([]);
  }, [activeTab]);

  useEffect(() => {
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

    setPouchData(mockResponse.result);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (location.state?.deletedSetId) {
      const deletedId = location.state.deletedSetId;
      const targetTab = location.state.activeTab || activeTab;

      setPouchData((prev) => ({
        ...prev,
        [targetTab]: {
          ...prev[targetTab],
          sets: prev[targetTab].sets.filter((s) => s.setId !== deletedId),
        },
      }));

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const currentTabContent = pouchData[activeTab] || { sets: [], cosmetics: [] };

  const handleDeleteItem = (e, id) => {
    e.stopPropagation();
    setPouchData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        cosmetics: prev[activeTab].cosmetics.filter(
          (item) => item.userCosmeticId !== id
        ),
      },
    }));
    setSelectedCosmetics((prev) => prev.filter((item) => item.userCosmeticId !== id));
  };

  const handleSetClick = (setId) => {
    navigate(`/set/${setId}`, {
      state: { activeTab },
    });
  };

  const handleToggleSelect = (item) => {
    if (selectedCosmetics.some((selected) => selected.userCosmeticId === item.userCosmeticId)) {
      setSelectedCosmetics((prev) => prev.filter((selected) => selected.userCosmeticId !== item.userCosmeticId));
    } else {
      setSelectedCosmetics((prev) => [...prev, item]);
    }
  };

  const handleFirstModalNext = () => {
    setIsModalOpen(false);
    setSelectedRoutines({ day: false, night: false });
    setIsRoutineModalOpen(true);
  };

  const toggleRoutine = (type) => {
    setSelectedRoutines((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleCreateSet = () => {
    if (!selectedRoutines.day && !selectedRoutines.night) {
      alert("낮 또는 밤을 최소 하나 이상 선택해 주세요.");
      return;
    }

    const newSet = {
      setId: Date.now(),
      name: setName.trim() || "사용자 지정 이름",
      cosmetics: selectedCosmetics,
    };

    setPouchData((prev) => {
      const updated = { ...prev };
      if (selectedRoutines.day) {
        updated.morning = {
          ...updated.morning,
          sets: [...updated.morning.sets, newSet],
        };
      }
      if (selectedRoutines.night) {
        updated.night = {
          ...updated.night,
          sets: [...updated.night.sets, newSet],
        };
      }
      return updated;
    });

    setIsRoutineModalOpen(false);
    setSelectedCosmetics([]);
    setSetName("");
    setSelectedRoutines({ day: false, night: false });
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
                  currentTabContent.cosmetics.map((item) => {
                    const isSelected = selectedCosmetics.some(
                      (selected) => selected.userCosmeticId === item.userCosmeticId
                    );
                    return (
                      <CardWrapper
                        key={item.userCosmeticId}
                        $isSelected={isSelected}
                        onClick={() => handleToggleSelect(item)}
                      >
                        <CosmeticCard
                          name={item.customName || item.productName}
                          tags={(item.mainIngredients || []).map(
                            (tag) => `#${tag}`
                          )}
                        />
                        <DeleteButton
                          onClick={(e) => handleDeleteItem(e, item.userCosmeticId)}
                        >
                          <TrashIcon src={Trash} alt="delete" />
                        </DeleteButton>
                      </CardWrapper>
                    );
                  })}
              </CardListSection>
            </>
          )}

          <ButtonGroup>
            <ActionButton onClick={() => navigate("/register/search-cosmetic")}>
              추가하기
            </ActionButton>
            <ActionButton
              $isSetButtonActive={selectedCosmetics.length >= 2}
              onClick={() => {
                if (selectedCosmetics.length >= 2) {
                  setIsModalOpen(true);
                }
              }}
            >
              세트로 묶기
            </ActionButton>
          </ButtonGroup>
          <GuideText>자주 쓰는 화장품을 묶어 나만의 루틴 세트를 만들어보세요!</GuideText>
        </MainContent>
      </ContentWrapper>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>선택한 제품을 세트로 묶을까요?</ModalTitle>
            <ModalDesc>
              {selectedCosmetics[0]?.customName || selectedCosmetics[0]?.productName}
              {selectedCosmetics.length > 1
                ? ` 외 ${selectedCosmetics.length - 1}개 제품이 한 세트로 저장돼요`
                : "이 한 세트로 저장돼요"}
            </ModalDesc>
            <ModalInput
              placeholder="세트 이름을 입력해 주세요 (ex. 진정 꿀조합)"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
            <ModalButtonGroup>
              <ModalCancelBtn onClick={() => setIsModalOpen(false)}>
                취소
              </ModalCancelBtn>
              <ModalSubmitBtn onClick={handleFirstModalNext}>
                다음
              </ModalSubmitBtn>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}

      {isRoutineModalOpen && (
        <ModalOverlay onClick={() => setIsRoutineModalOpen(false)}>
          <RoutineModalContainer onClick={(e) => e.stopPropagation()}>
            <RoutineModalTitle>
              언제 사용하는 제품인가요?
            </RoutineModalTitle>

            <RoutineOptions>
              <RoutineCard
                $isSelected={selectedRoutines.day}
                onClick={() => toggleRoutine("day")}
              >
                <ModalSunSvg />
                <span>낮</span>
              </RoutineCard>

              <RoutineCard
                $isSelected={selectedRoutines.night}
                onClick={() => toggleRoutine("night")}
              >
                <ModalMoonSvg />
                <span>밤</span>
              </RoutineCard>
            </RoutineOptions>

            <RoutineModalSubTitle>
              아침, 밤 둘 다 사용한다면 두 개 모두 선택해 주세요!
            </RoutineModalSubTitle>

            <RoutineSubmitBtn onClick={handleCreateSet}>
              세트 만들기
            </RoutineSubmitBtn>
          </RoutineModalContainer>
        </ModalOverlay>
      )}

      <NavigationBar />
    </Container>
  );
}

// 2차 모달 
const ModalSunSvg = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#F3B37B"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const ModalMoonSvg = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#F3B37B"
    strokeWidth="1.5"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

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
  border: 1px solid #96BE9C;
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
  cursor: pointer;
  border-radius: 12px;

  ${(props) =>
    props.$isSelected &&
    `
    && > div {
      background-color: #82BF8B;
      border: 1px solid #96BE9C;
      color: #000000;
      
      * {
        color: #000000;
      }

      span, div > span {
        background-color: #FFF8F2;
        color: #003B00;
      }
    }
  `}
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
  background-color: ${(props) => (props.$isSetButtonActive ? "#63BF8E" : "#ffffff")};
  border: 1px solid ${(props) => (props.$isSetButtonActive ? "#609668" : "#609668")};
  color: ${(props) => (props.$isSetButtonActive ? "#ffffff" : "#609668")};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background-color: ${(props) => (props.$isSetButtonActive ? "#7ca886" : "#f2f7f1")};
  }
`;

const GuideText = styled.p`
  font-weight: 500;
  font-size: 10px;
  color: #7C7C7C;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 0 20px;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  background: #e6F5E8;
  width: 100%;
  max-width: 357px;
  min-height: 207px;
  border-radius: 20px;
  padding: 24px 20px;
  text-align: center;
  box-sizing: border-box;
`;

const ModalTitle = styled.h3`
  font-size: 17px;
  font-weight: 800;
  color: #141212;
  margin: 0 0 8px 0;
`;

const ModalDesc = styled.p`
  font-size: 12px;
  color: #777777;
  margin: 0 0 16px 0;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  font-size: 12px;
  box-sizing: border-box;
  margin-bottom: 20px;
  outline: none;

  &::placeholder {
    color: #b5b5b5;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ModalCancelBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  border-radius: 20px;
  border: 1px solid #8cb896;
  background: #ffffff;
  color: #333333;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

const ModalSubmitBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  border-radius: 20px;
  border: none;
  background: #8cb896;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

/* 2차 모달 스타일 */
const RoutineModalContainer = styled.div`
  width: 100%;
  background-color: #e6f5e8;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const RoutineModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
  text-align: center;
  margin: 20px 0 30px 0;
`;

const RoutineModalSubTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #828282;
  text-align: center;
  margin: 0 0 50px 0;
  word-break: keep-all;
`;

const RoutineOptions = styled.div`
  display: flex;
  gap: 14px;
  width: 100%;
  margin-bottom: 20px;
`;

const RoutineCard = styled.button`
  flex: 1;
  height: 140px;
  background-color: ${(props) => (props.$isSelected ? "#82BF8B" : "#ffffff")};
  border: ${(props) => (props.$isSelected ? "1px solid #236F57" : "1px solid #85BBA8")};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? "#FFFCFC" : "#000000")};
  font-size: 24px;
  font-weight: 700;
  transition: all 0.2s ease;
`;

const RoutineSubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  background-color: #63BF8E;
  color: #ffffff;
  border: 1px solid #609668;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
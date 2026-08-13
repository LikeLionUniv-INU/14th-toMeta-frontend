import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
    morning: {
      sets: [
        {
          id: 1,
          title: "진정템",
          tags: ["#어성초", "#진정", "#피지조절"],
        },
        {
          id: 2,
          title: "(사용자 지정 이름)",
          tags: ["#티트리", "#진정", "#수분보충"],
        },
      ],
      items: [
        {
          id: 101,
          name: "아누아 어성초 77% 진정 토너",
          tags: ["#토너", "#어성초", "#진정", "#피지조절"],
        },
        {
          id: 102,
          name: "브링그린 티트리 시카 크림",
          tags: ["#크림", "#속건조", "#수분", "#시카"],
        },
        {
          id: 103,
          name: "에스트라 아토베리어 365크림",
          tags: ["#크림", "#속건조", "#수분", "#진정"],
        },
        {
          id: 104,
          name: "듀이트리 핏 앤 퀵 더블패드",
          tags: ["#패드", "#유수분", "#수분", "#진정"],
        },
      ],
    },
    night: {
      sets: [],
      items: [
        {
          id: 201,
          name: "아누아 어성초 77% 진정 토너",
          tags: ["#토너", "#진정"],
        },
        {
          id: 202,
          name: "에스트라 아토베리어 365크림",
          tags: ["#크림", "#보습"],
        },
      ],
    },
  });

  const currentTabContent = pouchData[activeTab];

  const handleDeleteItem = (id) => {
    setPouchData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        items: prev[activeTab].items.filter((item) => item.id !== id),
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
          {currentTabContent.sets.length > 0 && (
            <>
              <SetListSection>
                {currentTabContent.sets.map((set) => (
                  <SetCard key={set.id}>
                    <SetHeaderRow>
                      <SetTitle>
                        {set.title} <ChevronDownIcon>⌵</ChevronDownIcon>
                      </SetTitle>
                    </SetHeaderRow>
                    <SetTagGroup>
                      {set.tags.map((tag, idx) => (
                        <SetTag key={idx}>{tag}</SetTag>
                      ))}
                    </SetTagGroup>
                    <ChevronRightIcon onClick={() => handleSetClick(set.id)}>
                      ›
                    </ChevronRightIcon>
                  </SetCard>
                ))}
              </SetListSection>
              <Divider />
            </>
          )}

          <CardListSection>
            {currentTabContent.items.map((item) => (
              <CardWrapper key={item.id}>
                <CosmeticCard name={item.name} tags={item.tags} />
                <DeleteButton onClick={() => handleDeleteItem(item.id)}>
                  <TrashIcon src={Trash} alt="delete" />
                </DeleteButton>
              </CardWrapper>
            ))}
          </CardListSection>

          <ButtonGroup>
            <ActionButton>추가하기</ActionButton>
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
  background-color: #a3c29e;
  border-radius: 12px;
  padding: 14px 16px;
  color: #ffffff;
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

const ChevronDownIcon = styled.span`
  font-size: 12px;
`;

const ChevronRightIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
  padding: 4px;
`;

const SetTagGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const SetTag = styled.span`
  background-color: rgba(255, 255, 255, 0.6);
  color: #2e4d25;
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
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background-color: #f2f7f1;
  }
`;
import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import CosmeticCard from "../components/CosmeticCard";
import SunIcon from "../assets/images/record/sun.svg";
import MoonIcon from "../assets/images/record/Moon.svg";
import Trash from "../assets/images/trash.png";

const dummySetData = {
  1: {
    title: "진정템",
    items: [
      { id: 101, name: "아누아 어성초 77% 진정 토너", tags: ["#토너", "#어성초", "#진정", "#피지조절"] },
      { id: 102, name: "브링그린 티트리 시카 크림", tags: ["#크림", "#속건조", "#수분", "#시카"] },
    ],
  },
  2: {
    title: "(사용자 지정 이름)",
    items: [
      { id: 101, name: "아누아 어성초 77% 진정 토너", tags: ["#토너", "#어성초", "#진정", "#피지조절"] },
      { id: 102, name: "브링그린 티트리 시카 크림", tags: ["#크림", "#속건조", "#수분", "#시카"] },
      { id: 103, name: "에스트라 아토베리어 365크림", tags: ["#크림", "#속건조", "#수분", "#진정"] },
      { id: 104, name: "듀이트리 핏 앤 퀵 더블패드", tags: ["#패드", "#유수분", "#수분", "#진정"] },
    ],
  },
};

export default function Set() {
  const { setId } = useParams();
  const location = useLocation();

  const activeTab = location.state?.activeTab || "morning";

  const currentSet = dummySetData[setId] || {
    title: "사용자 지정 이름",
    items: [],
  };

  const [items, setItems] = useState(currentSet.items);

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <Header title={currentSet.title} variant="back" />

      <ContentWrapper>
        <TabGroup>
          <DisabledTabButton $active={activeTab === "morning"}>
            <img src={SunIcon} alt="morning" /> 모닝 스킨케어
          </DisabledTabButton>
          <DisabledTabButton $active={activeTab === "night"}>
            <img src={MoonIcon} alt="night" /> 나이트 스킨케어
          </DisabledTabButton>
        </TabGroup>

        <MainContent>
          <CardListSection>
            {items.map((item) => (
              <CardWrapper key={item.id}>
                <CosmeticCard name={item.name} tags={item.tags} />
                <DeleteButton onClick={() => handleDeleteItem(item.id)}>
                  <TrashIcon src={Trash} alt="delete" />
                </DeleteButton>
              </CardWrapper>
            ))}
          </CardListSection>

          <AddCosmeticButton>
            <span>+</span> 내 화장품 등록하기
          </AddCosmeticButton>
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

const DisabledTabButton = styled.div`
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
  margin-bottom: -2px;

  cursor: default;
  pointer-events: none;

  img {
    width: 18px;
    height: 18px;

    filter: ${(props) =>
    props.$active
      ? "brightness(0) saturate(100%) invert(29%) sepia(85%) saturate(750%) hue-rotate(72deg) brightness(88%) contrast(96%)"
      : "brightness(0) saturate(100%) invert(50%) opacity(0.7)"};
  }
`;

const MainContent = styled.div`
  padding: 20px;
`;

const CardListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
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

const AddCosmeticButton = styled.button`
  width: 100%;
  padding: 16px 0;
  background-color: #ffffff;
  border: 1.5px dashed #266210;
  border-radius: 8px;
  color: #266210;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;

  span {
    font-size: 20px;
    font-weight: 400;
  }

  &:active {
    background-color: #f2f7f1;
  }
`;
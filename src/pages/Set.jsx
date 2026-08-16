import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
    title: "사용자 지정 이름",
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
  const navigate = useNavigate();

  const activeTab = location.state?.activeTab || "morning";

  const currentSet = dummySetData[setId] || {
    title: "사용자 지정 이름",
    items: [],
  };

  const [title, setTitle] = useState(currentSet.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [items, setItems] = useState(currentSet.items);

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 세트 삭제 핸들러 (삭제할 세트 ID와 탭 정보를 state로 넘기며 뒤로 이동)
  const handleDeleteSet = () => {
    navigate("/my-pouch", {
      state: {
        activeTab,
        deletedSetId: Number(setId),
      },
    });
  };

  return (
    <Container>
      <CustomHeader>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </BackIcon>
        </BackButton>

        {isEditingTitle ? (
          <TitleInput
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditingTitle(false);
            }}
          />
        ) : (
          <TitleText onClick={() => setIsEditingTitle(true)}>{title}</TitleText>
        )}
      </CustomHeader>

      <SubHeaderMessage>
        상단 이름을 터치하면 언제든 변경할 수 있어요!
      </SubHeaderMessage>

      <ContentWrapper>
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

          <ButtonGroup>
            <AddSetButton onClick={() => { }}>세트에 추가</AddSetButton>
            <DeleteSetButton onClick={handleDeleteSet}>세트 삭제</DeleteSetButton>
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

const CustomHeader = styled.header`
  position: relative;
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackIcon = styled.svg`
  width: 24px;
  height: 24px;
`;

const TitleText = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
  margin: 0;
  cursor: pointer;
  text-align: center;
`;

const TitleInput = styled.input`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
  text-align: center;
  border: none;
  border-bottom: 1.5px solid #266210;
  outline: none;
  background: transparent;
  padding: 2px 4px;
`;

const SubHeaderMessage = styled.p`
  text-align: center;
  font-size: 8px;
  color: #888888;
  margin: 8px 0 8px 0;
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
  padding: 0 20px 20px 20px;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 8px;
`;

const AddSetButton = styled.button`
  flex: 1;
  height: 48px;
  background-color: #ffffff;
  border: 1.5px solid #6b8e67;
  border-radius: 24px;
  color: #43633f;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background-color: #f2f7f1;
  }
`;

const DeleteSetButton = styled.button`
  flex: 1;
  height: 48px;
  background-color: #6b8e67;
  border: none;
  border-radius: 24px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background-color: #5d7e59;
  }
`;
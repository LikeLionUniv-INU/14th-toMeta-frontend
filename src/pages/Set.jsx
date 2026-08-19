import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import CosmeticCard from "../components/CosmeticCard";
import Trash from "../assets/images/trash.png";
import { media } from '../styles/GlobalStyle';
import { getCosmeticOptions, getCosmeticSetDetail, updateCosmeticSet, deleteCosmeticSet } from "../api/cosmetics";

export default function Set() {
  const { setId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.state?.activeTab || "morning";

  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [allCosmetics, setAllCosmetics] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedToAdd, setSelectedToAdd] = useState([]);

  useEffect(() => {
    const fetchSetDetail = async () => {
      try {
        setLoading(true);
        const response = await getCosmeticSetDetail(setId);
        const { name, cosmetics } = response.data.result;
        setTitle(name);
        setOriginalTitle(name);
        setItems(cosmetics || []);
      } catch (error) {
        console.error("[Set] 세트 상세 조회 실패:", error);
        alert(error.message || "세트 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSetDetail();
  }, [setId]);

  useEffect(() => {
    const fetchAllCosmetics = async () => {
      try {
        const response = await getCosmeticOptions();
        setAllCosmetics(response.data.result.cosmetics || []);
      } catch (error) {
        console.error("[Set] 전체 화장품 목록 조회 실패:", error);
      }
    };

    fetchAllCosmetics();
  }, []);

  const handleTitleSave = async () => {
    setIsEditingTitle(false);

    const trimmedTitle = title.trim();

    if (!trimmedTitle || trimmedTitle === originalTitle) {
      setTitle(originalTitle);
      return;
    }

    try {
      await updateCosmeticSet(setId, { name: trimmedTitle });
      setTitle(trimmedTitle);
      setOriginalTitle(trimmedTitle);
    } catch (error) {
      console.error("[Set] 세트 이름 변경 실패:", error);
      alert(error.message || "세트 이름 변경에 실패했습니다.");
      setTitle(originalTitle);
    }
  };

  const handleDeleteItem = async (userCosmeticId) => {
    const remainingIds = items
      .filter((item) => item.userCosmeticId !== userCosmeticId)
      .map((item) => item.userCosmeticId);

    try {
      await updateCosmeticSet(setId, { userCosmeticIds: remainingIds });
      setItems((prev) => prev.filter((item) => item.userCosmeticId !== userCosmeticId));
    } catch (error) {
      console.error("[Set] 세트 구성품 삭제 실패:", error);
      alert(error.message || "세트 구성품 삭제에 실패했습니다.");
    }
  };

  const handleDeleteSet = async () => {
    try {
      await deleteCosmeticSet(setId);
      navigate("/my-pouch", {
        state: {
          activeTab,
          deletedSetId: Number(setId),
        },
      });
    } catch (error) {
      console.error("[Set] 세트 삭제 실패:", error);
      alert(error.message || "세트 삭제에 실패했습니다.");
      setIsDeleteModalOpen(false);
    }
  };

  const availableCosmetics = allCosmetics.filter(
    (cosmetic) =>
      !items.some((item) => item.userCosmeticId === cosmetic.userCosmeticId)
  );

  const handleOpenAddModal = () => {
    setSelectedToAdd([]);
    setIsAddModalOpen(true);
  };

  const toggleSelectToAdd = (cosmetic) => {
    setSelectedToAdd((prev) =>
      prev.some((c) => c.userCosmeticId === cosmetic.userCosmeticId)
        ? prev.filter((c) => c.userCosmeticId !== cosmetic.userCosmeticId)
        : [...prev, cosmetic]
    );
  };

  const handleAddToSet = async () => {
    if (selectedToAdd.length === 0) return;

    const updatedIds = [
      ...items.map((item) => item.userCosmeticId),
      ...selectedToAdd.map((c) => c.userCosmeticId),
    ];

    try {
      await updateCosmeticSet(setId, { userCosmeticIds: updatedIds });
      setItems((prev) => [
        ...prev,
        ...selectedToAdd.map((c) => ({
          userCosmeticId: c.userCosmeticId,
          productName: c.productName,
          customName: null,
          productType: c.productType,
          mainIngredients: c.tags,
        })),
      ]);
      setIsAddModalOpen(false);
      setSelectedToAdd([]);
    } catch (error) {
      console.error("[Set] 세트에 화장품 추가 실패:", error);
      alert(error.message || "세트에 화장품 추가에 실패했습니다.");
    }
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
            onBlur={handleTitleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.target.blur();
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
            {loading ? (
              <div>로딩 중...</div>
            ) : (
              items.map((item) => (
                <CardWrapper key={item.userCosmeticId}>
                  <CosmeticCard
                    name={item.customName || item.productName}
                    tags={(item.mainIngredients || [])
                      .slice(0, 5)
                      .map((tag) => `#${tag}`)}
                  />
                  <DeleteButton onClick={() => handleDeleteItem(item.userCosmeticId)}>
                    <TrashIcon src={Trash} alt="delete" />
                  </DeleteButton>
                </CardWrapper>
              ))
            )}
          </CardListSection>

          <ButtonGroup>
            <AddSetButton onClick={handleOpenAddModal}>세트에 추가</AddSetButton>
            <DeleteSetButton onClick={() => setIsDeleteModalOpen(true)}>세트 삭제</DeleteSetButton>
          </ButtonGroup>
        </MainContent>
      </ContentWrapper>

      {isDeleteModalOpen && (
        <ModalOverlay onClick={() => setIsDeleteModalOpen(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>이 세트를 삭제할까요?</ModalTitle>
            <ModalDescription>
              세트를 삭제해도 등록된 단품 화장품은 그대로 남아있어요!
            </ModalDescription>
            <ModalButtonGroup>
              <ModalCancelButton onClick={() => setIsDeleteModalOpen(false)}>
                취소
              </ModalCancelButton>
              <ModalConfirmButton onClick={handleDeleteSet}>
                확인
              </ModalConfirmButton>
            </ModalButtonGroup>
          </ModalContainer>
        </ModalOverlay>
      )}

      {isAddModalOpen && (
        <ModalOverlay onClick={() => setIsAddModalOpen(false)}>
          <AddModalContainer onClick={(e) => e.stopPropagation()}>
            <AddModalHeader>
              <AddModalTitle>{title}</AddModalTitle>
              <AddModalCloseButton onClick={() => setIsAddModalOpen(false)}>
                ×
              </AddModalCloseButton>
            </AddModalHeader>

            <AddModalList>
              {availableCosmetics.length === 0 ? (
                <AddModalEmptyText>
                  추가할 수 있는 화장품이 없어요.
                </AddModalEmptyText>
              ) : (
                availableCosmetics.map((cosmetic) => {
                  const isSelected = selectedToAdd.some(
                    (c) => c.userCosmeticId === cosmetic.userCosmeticId
                  );
                  return (
                    <AddModalItemWrapper
                      key={cosmetic.userCosmeticId}
                      $isSelected={isSelected}
                      onClick={() => toggleSelectToAdd(cosmetic)}
                    >
                      <CosmeticCard
                        name={cosmetic.productName}
                        tags={(cosmetic.tags || [])
                          .slice(0, 5)
                          .map((tag) => `#${tag}`)}
                      />
                    </AddModalItemWrapper>
                  );
                })
              )}
            </AddModalList>

            <AddModalSubmitButton
              $isActive={selectedToAdd.length > 0}
              disabled={selectedToAdd.length === 0}
              onClick={handleAddToSet}
            >
              추가
            </AddModalSubmitButton>
          </AddModalContainer>
        </ModalOverlay>
      )}

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
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  box-sizing: border-box;

  @media ${media.mobileM} {
    height: 52px;
    padding: 0 16px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 14px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${media.mobileM} {
    left: 16px;
  }
`;

const BackIcon = styled.svg`
  width: 20px;
  height: 20px;

  @media ${media.mobileM} {
    width: 24px;
    height: 24px;
  }
`;

const TitleText = styled.h1`
  font-size: 15px;
  font-weight: 700;
  color: #111111;
  margin: 0;
  cursor: pointer;
  text-align: center;

  @media ${media.mobileM} {
    font-size: 18px;
  }
`;

const TitleInput = styled.input`
  font-size: 15px;
  font-weight: 700;
  color: #111111;
  text-align: center;
  border: none;
  border-bottom: 1.5px solid #266210;
  outline: none;
  background: transparent;
  padding: 2px 3px;

  @media ${media.mobileM} {
    font-size: 18px;
    padding: 2px 4px;
  }
`;

const SubHeaderMessage = styled.p`
  text-align: center;
  font-size: 10px;
  color: #888888;
  margin: 7px 0 7px 0;

  @media ${media.mobileM} {
    font-size: 12px;
    margin: 8px 0 8px 0;
  }
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
  padding: 0 17px 17px 17px;

  @media ${media.mobileM} {
    padding: 0 20px 20px 20px;
  }
`;

const CardListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 17px;

  @media ${media.mobileM} {
    gap: 12px;
    margin-bottom: 20px;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${media.mobileM} {
    right: 12px;
    bottom: 12px;
  }
`;

const TrashIcon = styled.img`
  width: 12px;
  height: 12px;
  display: block;

  @media ${media.mobileM} {
    width: 14px;
    height: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 30px;

  @media ${media.mobileM} {
    gap: 12px;
    margin-top: 35px;
  }
`;

const AddSetButton = styled.button`
  flex: 1;
  height: 35px;
  background-color: #ffffff;
  border: 1px solid #609668;
  border-radius: 20px;
  color: #609668;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background-color: #f2f7f1;
  }

  @media ${media.mobileM} {
    height: 40px;
    font-size: 15px;
  }
`;

const DeleteSetButton = styled.button`
  flex: 1;
  height: 35px;
  background-color: #63BF8E;
  border: 1px solid #609668;
  border-radius: 20px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background-color: #5d7e59;
  }

  @media ${media.mobileM} {
    height: 40px;
    font-size: 15px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(98, 98, 98, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 0 20px;

  @media ${media.mobileM} {
    padding: 0 24px;
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  background-color: #e6f5e8;
  border-radius: 20px;
  padding: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media ${media.mobileM} {
    padding: 20px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
    color: #003b00;
    margin: 0 0 11px 0;
  
    @media ${media.mobileM} {
      font-size: 24px;
    }
`;

const ModalDescription = styled.p`
  font-size: 10px;
  line-height: 1.5;
  color: #828282;
  margin: 0 0 34px 0;
  word-break: keep-all;

  @media ${media.mobileM} {
    font-size: 12px;
    margin: 0 0 40px 0;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 14px;
  width: 100%;

  @media ${media.mobileM} {
    gap: 16px;
  }
`;

const ModalCancelButton = styled.button`
  flex: 1;
  height: 31px;
  background-color: #fdfdfd;
  border: 1px solid #82bf8b;
  border-radius: 20px;
  color: #000000;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;

  @media ${media.mobileM} {
    height: 37px;
    font-size: 14px;
  }
`;

const ModalConfirmButton = styled.button`
  flex: 1;
  height: 31px;
  background-color: #63bf8e;
  border: 1px solid #63bf8e;
  border-radius: 20px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;

  @media ${media.mobileM} {
    height: 37px;
    font-size: 14px;
  }
`

const AddModalContainer = styled.div`
  width: 100%;
  max-height: 80vh;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 17px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media ${media.mobileM} {
    padding: 20px;
  }
`;

const AddModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;

  @media ${media.mobileM} {
    margin-bottom: 16px;
  }
`;

const AddModalTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #111111;
  margin: 0;
  text-align: center;

  @media ${media.mobileM} {
    font-size: 18px;
  }
`;

const AddModalCloseButton = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  padding: 0;
  font-size: 19px;
  line-height: 1;
  color: #828282;
  cursor: pointer;

  @media ${media.mobileM} {
    font-size: 22px;
  }
`;

const AddModalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  margin-bottom: 17px;

  @media ${media.mobileM} {
    gap: 12px;
    margin-bottom: 20px;
  }
`;

const AddModalEmptyText = styled.p`
  font-size: 10px;
  color: #828282;
  text-align: center;
  padding: 17px 0;

  @media ${media.mobileM} {
    font-size: 12px;
    padding: 20px 0;
  }
`;

const AddModalItemWrapper = styled.div`
  cursor: pointer;
  border-radius: 12px;

  ${(props) =>
    props.$isSelected &&
    `
    && > div {
      background-color: #82BF8B;
      border: 1px solid #96BE9C;

      * {
        color: #003B00;
      }

      span, div > span {
        background-color: #FFF8F2;
        color: #003B00;
      }
    }
  `}
`;

const AddModalSubmitButton = styled.button`
  width: 100%;
  height: 41px;
  background-color: ${(props) => (props.$isActive ? "#63BF8E" : "#D9D9D9")};
  border: none;
  border-radius: 24px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: ${(props) => (props.$isActive ? "pointer" : "default")};

  &:active {
    background-color: ${(props) => (props.$isActive ? "#5d7e59" : "#D9D9D9")};
  }

  @media ${media.mobileM} {
    height: 48px;
    font-size: 15px;
  }
`;
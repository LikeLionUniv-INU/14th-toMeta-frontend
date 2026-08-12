import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();

  // 백엔드에서 전달받은 검색 결과 데이터 예시 (Array 형태)
  // 데이터 개수가 1개이면 카드형, 2개 이상이면 라디오 리스트형으로 자동 분기됩니다.
  const searchResults = location.state?.searchResults || [
    { id: 1, name: '브링그린 티트리 시카 크림', imageUrl: '' },
    { id: 2, name: '브링그린 티트리 시카 수딩 토너', imageUrl: '' },
    { id: 3, name: '메디힐 티트리 진정 수딩 크림', imageUrl: '' },
  ];

  // 상태 관리
  const [selectedListId, setSelectedListId] = useState(
    searchResults.length === 1 ? searchResults[0].id : null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 내부: 낮/밤 중복 선택을 위한 객체 상태
  const [selectedRoutines, setSelectedRoutines] = useState({
    day: false,
    night: false,
  });

  // 낮/밤 토글 핸들러 (중복 선택 지원)
  const toggleRoutine = (type) => {
    setSelectedRoutines((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // [확인] 버튼 클릭
  const handleConfirmClick = () => {
    // 다건 목록에서 선택하지 않은 경우
    if (searchResults.length > 1 && !selectedListId) {
      alert('사용 중인 제품을 선택해 주세요.');
      return;
    }
    setIsModalOpen(true);
  };

  // [다시 검색] 버튼 클릭
  const handleRetrySearch = () => {
    navigate('/register/search');
  };

  // [직접 입력하기] 버튼 클릭
  const handleGoToCustom = () => {
    navigate('/register/custom/routine');
  };

  // 모달 내부 [확인] 클릭 (최종 등록)
  const handleFinalRegister = () => {
    if (!selectedRoutines.day && !selectedRoutines.night) {
      alert('사용 시점(낮 또는 밤)을 최소 하나 이상 선택해 주세요.');
      return;
    }

    const selectedProduct = searchResults.find(
      (item) =>
        item.id ===
        (searchResults.length === 1 ? searchResults[0].id : selectedListId),
    );

    console.log('최종 등록 데이터:', {
      product: selectedProduct,
      routines: selectedRoutines, // { day: true, night: false } 등
    });

    // TODO: 백엔드 등록 API 호출 후 페이지 이동
    // navigate('/main');
  };

  return (
    <Container>
      <Header title="검색 결과" variant="back" />
      <Content>
        {/* 1. 백엔드 데이터 개수에 따른 삼항연산자 타이틀 및 메인 뷰 전환 */}
        {searchResults.length === 1 ? (
          /* 단건일 경우 */
          <>
            <MainTitle>이 제품이 맞으신가요?</MainTitle>
            <SingleProductCard>
              <ImagePlaceholder>
                {searchResults[0].imageUrl ? (
                  <ProductImage
                    src={searchResults[0].imageUrl}
                    alt={searchResults[0].name}
                  />
                ) : (
                  <span>
                    제품
                    <br />
                    사진
                  </span>
                )}
              </ImagePlaceholder>
              <ProductName>{searchResults[0].name}</ProductName>
            </SingleProductCard>
          </>
        ) : (
          /* 다건일 경우 */
          <>
            <MainTitle>
              이 중 어떤 제품을
              <br />
              사용하고 계신가요?
            </MainTitle>
            <ProductList>
              {searchResults.map((item) => {
                const isChecked = selectedListId === item.id;
                return (
                  <ListItem
                    key={item.id}
                    $isSelected={isChecked}
                    onClick={() => setSelectedListId(item.id)}
                  >
                    <RadioButton $isChecked={isChecked}>
                      {isChecked && <RadioInnerCircle />}
                    </RadioButton>
                    <SmallImagePlaceholder>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} />
                      ) : (
                        <span>
                          제품
                          <br />
                          사진
                        </span>
                      )}
                    </SmallImagePlaceholder>
                    <ListItemName>{item.name}</ListItemName>
                  </ListItem>
                );
              })}
            </ProductList>
          </>
        )}

        {/* 공통 하단 버튼 3개 */}
        <ButtonGroup>
          <Button
            onClick={handleConfirmClick}
            disabled={searchResults.length > 1 && !selectedListId}
          >
            확인
          </Button>
          <Button onClick={handleRetrySearch}>다시 검색</Button>
          <Button onClick={handleGoToCustom}>직접 입력하기</Button>
        </ButtonGroup>
      </Content>

      {/* "언제 사용하는 제품인가요?" 모달 */}

      {isModalOpen && (
        <Overlay onClick={() => setIsModalOpen(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              언제 사용하는
              <br />
              제품인가요?
            </ModalTitle>

            <ModalSubTitle>
              아침, 밤 둘 다 사용한다면 두 개 모두 선택해 주세요!
            </ModalSubTitle>

            <RoutineOptions>
              <RoutineCard
                $isSelected={selectedRoutines.day}
                onClick={() => toggleRoutine('day')}
              >
                <SunIcon />
                <span>낮</span>
              </RoutineCard>

              <RoutineCard
                $isSelected={selectedRoutines.night}
                onClick={() => toggleRoutine('night')}
              >
                <MoonIcon />
                <span>밤</span>
              </RoutineCard>
            </RoutineOptions>

            <ModalConfirmButton onClick={handleFinalRegister}>
              확인
            </ModalConfirmButton>
          </ModalContainer>
        </Overlay>
      )}
    </Container>
  );
}

/* ==================== SVG Icons ==================== */

const SunIcon = () => (
  <svg
    width="55"
    height="55"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="55"
    height="55"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/* ==================== Style Components ==================== */

const Container = styled.div`
  width: 100%;
  max-width: 430px;
  min-height: 100dvh;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
  margin-bottom: 32px;

  @media ${media.mobileM} {
    font-size: 32px;
  }
`;

/* --- 단건 (1개) 시안 스타일 --- */

const SingleProductCard = styled.div`
  width: 100%;
  height: 304px;
  background-color: #ededed;
  border-radius: 5px;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: auto;
`;

const ImagePlaceholder = styled.div`
  width: 110px;
  height: 300px;
  border: 1.5px solid #111111;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductName = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  text-align: center;
`;

/* --- 다건 (여러개) 시안 스타일 --- */

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: auto;
`;

const ListItem = styled.div`
  width: 100%;
  height: 69px;
  background-color: #ededed;
  border-radius: 5px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border: ${(props) => (props.$isSelected ? '1px solid #000000' : 'none')};
`;

const RadioButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.$isChecked ? '#000000' : '#888888')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const RadioInnerCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #303030;
`;

const SmallImagePlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #111111;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 9px;
  font-weight: 700;
  color: #333333;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ListItemName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #111111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* --- 공통 버튼 그룹 --- */

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
`;

/* ==================== Modal Styles ==================== */

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0 20px;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 370px;
  background-color: #d9d9d9; /* 시안 기준 회색 모달 배경 */
  border-radius: 15px;
  padding: 36px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;
  color: #000000;
  text-align: center;
  margin: 0 0 24px 0;

  @media ${media.mobileM} {
    font-size: 32px;
  }
`;

const ModalSubTitle = styled.p`
  font-size: 10px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  margin: 0 0 24px 0;
  word-break: keep-all;
`;

const RoutineOptions = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  margin-bottom: 24px;
`;

const RoutineCard = styled.button`
  flex: 1;
  height: 150px;
  background-color: #e8e8e8;
  border: ${(props) => (props.$isSelected ? '1px solid #000000' : '1px solid #c8c8c8')};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  color: #111111;
  font-size: 24px;
  font-weight: 500;
  position: relative;
  transition: all 0.2s;
`;

const ModalConfirmButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

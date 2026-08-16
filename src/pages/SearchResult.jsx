import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';
import { registerCosmeticFromSearch } from '../api';

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();

  // SearchCosmetic에서 넘겨받은 실제 검색 결과 배열
  const searchResults = location.state?.searchResults || [];

  const [selectedListId, setSelectedListId] = useState(
    searchResults.length === 1 ? searchResults[0].id : null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // [확인] 버튼 클릭 시 모달 없이 즉시 백엔드 등록 API 호출
  const handleConfirmClick = async () => {
    if (isSubmitting) return;

    // 결과가 여러 개인데 아무것도 선택 안 한 경우 방어
    const targetId =
      searchResults.length === 1 ? searchResults[0].id : selectedListId;

    if (!targetId) {
      alert('사용 중인 제품을 선택해 주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      // POST /api/user-cosmetics/from-search
      // Request Body: { "id": targetId }
      const res = await registerCosmeticFromSearch({ id: targetId });

      if (res.data.isSuccess) {
        navigate('/pouch-redirect');
      } else {
        alert(res.data.message || '화장품 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('검색 화장품 등록 실패:', error);
      alert(
        error.message || '등록 중 오류가 발생했습니다. 다시 시도해 주세요.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetrySearch = () => {
    navigate('/register/search');
  };

  const handleGoToCustom = () => {
    navigate('/register/custom-name');
  };

  // 검색 결과 없이 직접 URL로 들어온 경우
  if (!searchResults || searchResults.length === 0) {
    return (
      <Container>
        <Header title="검색 결과" variant="back" />
        <Content>
          <MainTitle>검색 결과가 없습니다.</MainTitle>
          <ButtonWrapper>
            <Button onClick={handleRetrySearch}>다시 검색하기</Button>
            <Button onClick={handleGoToCustom}>직접 입력하기</Button>
          </ButtonWrapper>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="검색 결과" variant="back" />
      <Content>
        {searchResults.length === 1 ? (
          /* 검색 결과가 하나일 경우 */
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
          /* 검색 결과가 여러 건일 경우 */
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

        {/* 하단 버튼 영역 */}
        <ButtonWrapper>
          <Button
            onClick={handleConfirmClick}
            disabled={
              (searchResults.length > 1 && !selectedListId) || isSubmitting
            }
          >
            {isSubmitting ? '등록 중...' : '확인'}
          </Button>
          <ButtonGroup>
            <Button onClick={handleRetrySearch} disabled={isSubmitting}>
              다시 검색
            </Button>
            <Button onClick={handleGoToCustom} disabled={isSubmitting}>
              직접 입력하기
            </Button>
          </ButtonGroup>
        </ButtonWrapper>
      </Content>
    </Container>
  );
}

/* Style Components */
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
  padding: 10px 20px 30px 20px;
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.35;
  color: #000000;
  margin-top: 65px;
  margin-bottom: 30px;

  @media ${media.mobileM} {
    font-size: 24px;
    margin-top: 100px;
    margin-bottom: 50px;
  }
`;

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

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: auto;
`;

const ListItem = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ededed;
  border-radius: 5px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border: ${(props) => (props.$isSelected ? '1px solid #000000' : 'none')};

  @media ${media.mobileM} {
    height: 69px;
  }
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

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;

  button {
    flex: 1;
  }

  button:last-child,
  button:first-child {
    background-color: white;
    color: #609668;
    border: 1px solid #609668;
  }
`;

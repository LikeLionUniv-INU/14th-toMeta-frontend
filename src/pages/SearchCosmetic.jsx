import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { media } from '../styles/GlobalStyle';
import { searchCosmetics } from '../api';

export default function SearchCosmetic() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed || isLoading) return;

    try {
      setIsLoading(true);

      const res = await searchCosmetics({ keyword: trimmed });

      if (res.data.isSuccess) {
        const results = res.data.result || [];

        if (res?.data?.isSuccess && results.length > 0) {
          navigate('/register/search-result', {
            state: {
              searchResults: results,
              searchTerm: trimmed,
            },
          });
        } else {
          setIsModalOpen(true);
        }
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrySearch = () => {
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const handleGoToCustom = () => {
    setIsModalOpen(false);
    navigate('/register/custom-name');
  };

  return (
    <Container>
      <Header title="화장품 등록" variant="back" />

      <Content>
        <MainTitle>
          등록할 화장품을
          <br />
          검색해 주세요
        </MainTitle>

        <SearchForm onSubmit={handleSearch}>
          <SearchInputWrapper>
            <Input
              type="text"
              placeholder="제품명을 입력해 주세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
            <SearchButton type="submit" aria-label="검색" disabled={isLoading}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </SearchButton>
          </SearchInputWrapper>
        </SearchForm>

        <NoticeWrapper>
          <NoticeBox>
            <h4>💡 검색 Tip</h4>
            <p>
              브랜드 명과 제품 명을 함께 입력하면 훨씬 더 정확하게 찾을 수
              있어요! <br /> (ex. 피쓰 코어 리빌드 크림)
            </p>
          </NoticeBox>
        </NoticeWrapper>
      </Content>

      {/* 검색 결과 없음 모달 */}
      {isModalOpen && (
        <Overlay onClick={() => setIsModalOpen(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              검색 결과를
              <br />
              찾을 수 없어요
            </ModalTitle>

            <ModalDescription>
              제품 전체 이름으로 다시 검색하거나,
              <br />
              원하는 제품이 없다면 직접 등록해 보세요!
            </ModalDescription>

            <ButtonGroup>
              <ModalButton $primary onClick={handleGoToCustom}>
                직접 입력하기
              </ModalButton>
              <ModalButton onClick={handleRetrySearch}>다시 검색</ModalButton>
            </ButtonGroup>
          </ModalContainer>
        </Overlay>
      )}
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
`;

const MainTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
  color: #000000;
  margin-top: 130px;
  margin-bottom: 50px;

  @media ${media.mobileM} {
    font-size: 28px;
    margin-top: 170px;
  }
`;

const SearchForm = styled.form`
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 4px solid #cbcbcb;
  padding-bottom: 8px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin-left: 5px;

  &::placeholder {
    color: #c2c2c2;
  }
`;

const NoticeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const NoticeBox = styled.div`
  width: 100%;
  padding: 14px;
  background-color: #e6f5e8;
  border-radius: 20px;

  h4 {
    font-size: 14px;
    margin: 0 0 12px 0;
  }

  p {
    font-size: 12px;
    font-weight: 400;
    color: #767676;
    line-height: 1.3;
    margin: 0;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
    color: #c2c2c2;
  }
`;

const Overlay = styled.div`
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
  z-index: 1000;
  padding: 0 24px;
`;

const ModalContainer = styled.div`
  width: 100%;
  background-color: #e6f5e8;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ModalTitle = styled.h3`
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
  font-size: 12px;
  line-height: 1.5;
  color: #828282;
  margin: 0 0 40px 0;
  word-break: keep-all;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const ModalButton = styled.button`
  flex: 1;
  height: 37px;
  background-color: ${({ $primary }) => ($primary ? '#fdfdfd' : '#63bf8e')};
  color: ${({ $primary }) => ($primary ? '#141212' : '#fdfffd')};
  border: ${({ $primary }) => ($primary ? '1px solid #82bf8b' : '1px solid #63bf8e')};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';

export default function CustomIngredient() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 단계들에서 전달받은 데이터
  const prevData = location.state || {};

  const [inputIngredient, setInputIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 완료 버튼 활성화 로직
  const isValid = ingredients.length > 0;

  // 성분 추가 로직
  const handleAddIngredient = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = inputIngredient.trim().replace(/,/g, '');

      if (trimmed && !ingredients.includes(trimmed)) {
        setIngredients([...ingredients, trimmed]);
        setInputIngredient('');
      }
    }
  };

  // 성분 삭제 로직
  const handleRemoveIngredient = (target) => {
    setIngredients(ingredients.filter((item) => item !== target));
  };

  const handlePrev = () => {
    navigate('/register/custom-category');
  };

  // [완료/다음] 버튼 클릭 -> 백엔드 API 명세서 포맷 생성 후 전송
  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;

    const payload = {
      usageTime: prevData.routine || '',
      productName: prevData.productName || '',
      productType: prevData.category || '',
      mainIngredients: ingredients,
    };

    console.log('백엔드로 전송할 최종 Payload:', payload);

    try {
      setIsSubmitting(true);

      // TODO: 백엔드 API 호출 주석 해제
      /*
      const response = await fetch('/api/cosmetics/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('등록이 완료되었습니다!');
        navigate('/main');
      }
      */

      alert('화장품 등록이 완료되었습니다.');
      // navigate('/main');
    } catch (error) {
      console.error('등록 중 에러 발생:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Content>
        <ProgressBarWrapper>
          <ProgressStep $active={false} />
          <ProgressStep $active={false} />
          <ProgressStep $active={false} />
          <ProgressStep $active={true} />
        </ProgressBarWrapper>

        <MainTitle>
          주요 성분을
          <br />
          입력해 주세요.
        </MainTitle>

        <SubDescription>
          가장 앞에 있는 성분 5개를 입력해 주세요!
        </SubDescription>

        <InputWrapper>
          <StyledInput
            type="text"
            placeholder="성분명을 입력 후 엔터를 눌러주세요"
            value={inputIngredient}
            onChange={(e) => setInputIngredient(e.target.value)}
            onKeyDown={handleAddIngredient}
          />
        </InputWrapper>

        <TagList>
          {ingredients.map((item) => (
            <TagChip key={item}>
              <span>{item}</span>
              <DeleteButton
                type="button"
                onClick={() => handleRemoveIngredient(item)}
              >
                ✕
              </DeleteButton>
            </TagChip>
          ))}
        </TagList>

        {/* 하단 가로 정렬 버튼 (이전 | 다음) */}
        <BottomButtonGroup>
          <PrevButton
            type="button"
            onClick={handlePrev}
            disabled={isSubmitting}
          >
            이전
          </PrevButton>
          <Button onClick={handleSubmit} disabled={!isValid || isSubmitting}>
            {isSubmitting ? '등록 중...' : '다음'}
          </Button>
        </BottomButtonGroup>
      </Content>
    </Container>
  );
}

/*  Style Components  */

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
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 50px;
`;

const ProgressStep = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 10px;
  background-color: ${({ $active }) => ($active ? '#003b00' : '#bddec1')};
  transition: background-color 0.3s ease;
`;

const MainTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.35;
  color: #000000;
  margin-bottom: 8px;

  @media ${media.mobileM} {
    font-size: 32px;
  }
`;

const SubDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #938888;
  margin-bottom: 50px;
`;

const InputWrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid #cbcbcb;
  padding-bottom: 8px;
  margin-bottom: 24px;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-bottom-color: #609668;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  color: #111111;
  background: transparent;

  &::placeholder {
    color: #b5b5b5;
    font-weight: 400;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: auto;
`;

const TagChip = styled.div`
  height: 34px;
  padding: 4px 8px;
  border-radius: 6px;
  background-color: #eaf5ea;
  border: 1px solid #609668;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    opacity: 0.7;
  }
`;

const BottomButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  margin-top: 32px;

  button {
    flex: 1;
  }
`;

const PrevButton = styled.button`
  height: 50px;
  background-color: #e5e5e5;
  color: #333333;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:active {
    background-color: #d8d8d8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

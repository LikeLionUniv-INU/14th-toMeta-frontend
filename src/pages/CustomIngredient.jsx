import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';
import { registerCosmeticManual } from '../api';

export default function CustomIngredient() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 단계들에서 전달받은 데이터
  const prevData = location.state || {};

  const [inputIngredient, setInputIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 완료 버튼 활성화 로직
  const isValid = ingredients.length >= 1 && ingredients.length <= 5;

  // 성분 추가 로직
  const handleAddIngredient = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = inputIngredient.trim().replace(/,/g, '');

      if (!trimmed) return;

      // 1. 이미 5개가 다 찬 상태에서 또 엔터를 누른 경우
      if (ingredients.length >= 5) {
        alert('주요 성분은 최대 5개까지 입력할 수 있습니다.');
        setInputIngredient('');
        return;
      }

      // 2. 중복이 아닌 경우 추가
      if (!ingredients.includes(trimmed)) {
        const nextList = [...ingredients, trimmed];
        setIngredients(nextList);
        setInputIngredient('');
      } else {
        alert('이미 추가된 성분입니다.');
      }
    }
  };

  // 성분 삭제 로직
  const handleRemoveIngredient = (target) => {
    setIngredients(ingredients.filter((item) => item !== target));
  };

  const handlePrev = () => {
    navigate('/register/custom-category', { state: prevData });
  };

  // [완료/다음] 버튼 클릭 -> 백엔드 API 전송
  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;

    const payload = {
      productName: prevData.productName || '',
      productType: prevData.category || prevData.productType || '',
      mainIngredients: ingredients,
    };

    try {
      setIsSubmitting(true);

      const res = await registerCosmeticManual(payload);

      if (res.data.isSuccess) {
        navigate('/pouch-redirect');
      } else {
        alert(res.data.message || '화장품 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('화장품 직접 등록 실패:', error);
      alert(
        error.message || '등록 중 오류가 발생했습니다. 다시 시도해 주세요.',
      );
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
          <ProgressStep $active={true} />
        </ProgressBarWrapper>

        <MainTitle>
          주요 성분을
          <br />
          입력해 주세요.
        </MainTitle>

        <SubDescription>
          주요 성분을 최소 1개, 최대 5개까지 입력해 주세요!
        </SubDescription>

        <InputWrapper>
          <StyledInput
            type="text"
            placeholder={
              ingredients.length >= 5
                ? '5개가 전부 입력되었어요.'
                : '성분명을 입력 후 엔터를 눌러주세요.'
            }
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

        <BottomButtonGroup>
          <PrevButton
            type="button"
            onClick={handlePrev}
            disabled={isSubmitting}
          >
            이전
          </PrevButton>
          <NextButton
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? '등록 중...' : '등록'}
          </NextButton>
        </BottomButtonGroup>
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
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 41px;
`;

const ProgressStep = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 10px;
  background-color: ${({ $active }) => ($active ? '#003b00' : '#bddec1')};
  transition: background-color 0.3s ease;
`;

const MainTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.35;
  color: #000000;
  margin-top: 130px;
  margin-bottom: 0;

  @media ${media.mobileM} {
    font-size: 24px;
    margin-top: 170px;
  }
`;

const SubDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #938888;
  margin-bottom: 40px;
`;

const InputWrapper = styled.div`
  width: 100%;
  border-bottom: 4px solid #cbcbcb;
  padding-bottom: 8px;
  margin-bottom: 16px;
  transition: border-color 0.2s ease;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #000000;

  &::placeholder {
    color: #c2c2c2;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: auto;
`;

const TagChip = styled.div`
  height: 34px;
  padding: 10px 14px;
  border-radius: 20px;
  background-color: #e7fdf7;
  border: 1px solid #89d7bc;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #363636;
`;

const DeleteButton = styled.button`
  height: 7px;
  width: 7px;
  background: none;
  border: none;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: 52px;
  background-color: #ffffff;
  color: #609668;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid #609668;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

const NextButton = styled(PrevButton)`
  background-color: ${(props) => (props.disabled ? '#b3b3b3' : '#63bf8e')};
  color: ${(props) => (props.disabled ? '#fdfffd' : '#ffffff')};
  border: none;
`;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api/axios';

export default function PouchRedirect() {
  const navigate = useNavigate();

  useEffect(() => {


    const checkPouchStatus = async () => {
      // [테스트 1] 등록 데이터가 있을 때 확인
      const mockResponse = {
        isSuccess: true,
        result: {
          sets: [{ setId: 1, name: "진정템" }],
          cosmetics: [{ userCosmeticId: 11, productName: "토너" }]
        }
      };

      // [테스트 2] 등록 데이터가 없을 때 확인 (주석 해제해서 테스트)
      // const mockResponse = {
      //   isSuccess: true,
      //   result: { sets: [], cosmetics: [] }
      // };

      if (mockResponse.result.sets.length > 0 || mockResponse.result.cosmetics.length > 0) {
        navigate('/my-pouch', { replace: true });
      } else {
        navigate('/empty-pouch', { replace: true });
      }
    };

    checkPouchStatus();
  }, [navigate]);

  /* 실제 백연동 코드
useEffect(() => {
    const checkPouchStatus = async () => {
      try {
        const response = await api.get('/api/cosmetic-options');
        const data = response.data;

        if (data.isSuccess && data.result) {
          const { sets = [], cosmetics = [] } = data.result;

          if (sets.length > 0 || cosmetics.length > 0) {
            navigate('/my-pouch', { replace: true });
          } else {
            navigate('/empty-pouch', { replace: true });
          }
        } else {
          navigate('/empty-pouch', { replace: true });
        }
      } catch (error) {
        console.error('화장품 파우치 상태 조회 실패:', error.message);
      }
    };

    checkPouchStatus();
  }, [navigate]);
  */

  return (
    <LoadingContainer>
      <LoadingText>로딩 중...</LoadingText>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #266210;
`;
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function PouchRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkPouchStatus = async () => {
      const mockResponse = {
        isSuccess: true,
        result: {
          sets: [{ setId: 1, name: "진정템" }],
          cosmetics: [{ userCosmeticId: 11, productName: "토너" }]
        }
      };

      if (mockResponse.result.sets.length > 0 || mockResponse.result.cosmetics.length > 0) {
        navigate('/my-pouch', { replace: true });
      } else {
        navigate('/empty-pouch', { replace: true });
      }
    };

    checkPouchStatus();
  }, [navigate]);

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
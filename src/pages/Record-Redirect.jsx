import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getDailyRecord } from '../api/records';

export default function RecordRedirect() {
  const navigate = useNavigate();

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const checkTodayRecord = async () => {
      const today = getTodayString();

      try {
        const response = await getDailyRecord(today);

        if (response.data && response.data.isSuccess && response.data.result) {
          navigate(`/record/${today}`, { replace: true });
        } else {
          navigate('/todaynote', { replace: true });
        }
      } catch {
        navigate('/todaynote', { replace: true });
      }
    };

    checkTodayRecord();
  }, [navigate]);

  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>기록을 확인하고 있어요...</LoadingText>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #266210;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  margin: 0;
`;
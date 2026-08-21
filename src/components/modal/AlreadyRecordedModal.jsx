import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Portal from '../Portal';
import { media } from '../../styles/GlobalStyle';

const AlreadyRecordedModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <Portal>
    <AlertModalOverlay onClick={onClose}>
      <AlertModalCard onClick={(e) => e.stopPropagation()}>
        <AlertModalTitle>
          이미 작성된<br />피부 기록이 있어요
        </AlertModalTitle>
        <AlertModalDesc>
          기존 기록을 확인하거나 수정하시겠어요?
        </AlertModalDesc>
        <AlertModalButton
          type="button"
          onClick={() => navigate('/record', { replace: true })}
        >
          기록 확인하기
        </AlertModalButton>
      </AlertModalCard>
    </AlertModalOverlay>
    </Portal>
  );
};

export default AlreadyRecordedModal;

const AlertModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 430px;
  margin: 0 auto;
  background-color: rgba(98, 98, 98, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 0 24px;
`;

const AlertModalCard = styled.div`
  width: 100%;
  background-color: #e6f5e8;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const AlertModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  color: #003b00;
  margin: 0 0 11px 0;

  @media ${media.mobileM} {
    font-size: 24px;
  }
`;

const AlertModalDesc = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: #828282;
  margin: 0 0 16px 0;
  word-break: keep-all;
`;

const AlertModalButton = styled.button`
  background-color: #FDFDFD;
  border: 1px solid #82BF8B;
  border-radius: 20px;
  padding: 10px 24px;
  font-size: 12px;
  font-weight: 500;
  color: #141212;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;

  &:active {
    background-color: #e5f2e8;
    transform: scale(0.98);
  }
`;
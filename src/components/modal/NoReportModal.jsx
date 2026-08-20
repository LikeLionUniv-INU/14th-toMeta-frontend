import styled from 'styled-components';
import { media } from '../../styles/GlobalStyle';

const CONTENT = {
  today: {
    title: '리포트를 준비하고 있어요.',
    desc: '리포트는 하루 동안의 데이터가 모두 모인 후 발행돼요.\n 오늘 하루를 마무리하며 다시 확인해 주세요!',
  },
  past: {
    title: '발행된 리포트가 없어요.',
    desc: '헬스커넥트로부터 측정된 데이터가 없어요.\n 스마트워치를 착용해 일상 데이터를 기록해 보세요!',
  },
};

const NoReportModal = ({ isOpen, onClose, variant = 'past' }) => {
  if (!isOpen) return null;

  const { title, desc } = CONTENT[variant];

  return (
    <AlertModalOverlay onClick={onClose}>
      <AlertModalCard onClick={(e) => e.stopPropagation()}>
        <AlertModalTitle>{title}</AlertModalTitle>
        <AlertModalDesc>{desc}</AlertModalDesc>
        <AlertModalButton type="button" onClick={onClose}>
          닫기
        </AlertModalButton>
      </AlertModalCard>
    </AlertModalOverlay>
  );
};

export default NoReportModal;

const AlertModalOverlay = styled.div`
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
  line-height: 1.3;
  color: #828282;
  margin: 0 0 16px 0;
  word-break: keep-all;
  white-space: pre-line;
`;

const AlertModalButton = styled.button`
  background-color: #fdfdfd;
  border: 1px solid #82bf8b;
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

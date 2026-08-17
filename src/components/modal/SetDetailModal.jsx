import styled from 'styled-components';
import Button from '../Button';
import CosmeticCard from '../CosmeticCard';

const SetDetailModal = ({ setItem, onClose }) => {
  if (!setItem) return null;

  return (
    <DetailModalOverlay onClick={onClose}>
      <DetailModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{setItem.name}</ModalTitle>
          <CloseButton type="button" onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ModalContent>
          <IndividualSection>
            {setItem.items?.map((item) => (
              <DetailCardItem key={item.id}>
                <CosmeticCard name={item.name} tags={item.tags} />
              </DetailCardItem>
            ))}
          </IndividualSection>
        </ModalContent>

        <ModalFooter>
          <Button onClick={onClose}>완료</Button>
        </ModalFooter>
      </DetailModalContainer>
    </DetailModalOverlay>
  );
};

export default SetDetailModal;

const DetailModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1100;
`;

const DetailModalContainer = styled.div`
  width: 100%;
  max-height: 85dvh;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
  padding: 30px 0 20px 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 20px;
  position: relative;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin: 0;
  width: 100%;
  text-align: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  position: absolute;
  right: 20px;
`;

const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const IndividualSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
`;

const DetailCardItem = styled.div`
  border-radius: 12px;
  & > div {
    background-color: #ffffff;
    color: #000000;
    span {
      background-color: #96be9c;
      color: #fff1e5;
    }
  }
`;

const ModalFooter = styled.div`
  margin-top: 16px;
  padding: 0 20px;
`;
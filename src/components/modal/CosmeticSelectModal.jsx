import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import CosmeticCard from '../CosmeticCard';
import { media } from '../../styles/GlobalStyle';

const CosmeticSelectModal = ({
  isOpen,
  onClose,
  setProducts,
  individualProducts,
  selectedProducts,
  onToggleProduct,
  onSubmit,
  onOpenDetail,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>내 화장품</ModalTitle>
          <CloseButton type="button" onClick={onClose}>
            ✕
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <SetSection>
            {setProducts.map((setItem) => {
              const isSelected = selectedProducts.includes(setItem.name);
              return (
                <SetCard
                  key={setItem.id}
                  $isSelected={isSelected}
                  onClick={() => onToggleProduct(setItem.name)}
                >
                  <SetCardLeft>
                    <SetTitle>{setItem.name}</SetTitle>
                    <TagList>
                      {setItem.tags.map((tag, i) => (
                        <SetTag key={i} $parentIsSelected={isSelected}>
                          #{tag}
                        </SetTag>
                      ))}
                    </TagList>
                  </SetCardLeft>
                  <ArrowButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetail(setItem);
                    }}
                  >
                    ＞
                  </ArrowButton>
                </SetCard>
              );
            })}
          </SetSection>

          <ModalDivider />

          <IndividualSection>
            {individualProducts.map((item) => {
              const isSelected = selectedProducts.includes(item.name);
              return (
                <CardWrapper
                  key={item.id}
                  $isSelected={isSelected}
                  onClick={() => onToggleProduct(item.name)}
                >
                  <CosmeticCard
                    name={item.name}
                    tags={(item.tags || []).map((tag) =>
                      tag.startsWith('#') ? tag : `#${tag}`,
                    )}
                  />
                </CardWrapper>
              );
            })}
            <ModalAddCosmeticButton
              type="button"
              onClick={() => navigate('/register/search-cosmetic')}
            >
              추가하기
            </ModalAddCosmeticButton>
          </IndividualSection>
        </ModalContent>

        <ModalFooter>
          <Button onClick={onSubmit}>완료</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CosmeticSelectModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1200;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-height: 85dvh;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
  padding: 30px 0 calc(20px + env(safe-area-inset-bottom)) 0;
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

const SetSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
`;

const SetCard = styled.div`
  height: 65px;
  box-sizing: border-box;
  background-color: ${(props) => (props.$isSelected ? '#82bf8b' : '#fff8f2')};
  border: 1px solid #96be9c;
  border-radius: 20px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #141212;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:active {
    transform: scale(0.98);
  }

  @media ${media.mobileM} {
    height: 74px;
  }
`;

const SetCardLeft = styled.div`
  flex: 1;
`;

const SetTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font-size: 10px;
  }

  @media ${media.mobileM} {
    font-size: 15px;
    margin-bottom: 8px;
  }
`;

const TagList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const SetTag = styled.span`
  height: 20px;
  box-sizing: border-box;
  padding: 4px 6px;
  display: inline-flex;
  align-items: center;
  font-size: 9px;
  border-radius: 12px;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.$parentIsSelected ? '#FFF8F2' : '#96BE9C'};
  color: ${(props) => (props.$parentIsSelected ? '#003B00' : '#FFF8F2')};

  @media ${media.mobileM} {
    font-size: 10px;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
  padding: 0 4px;
`;

const ModalDivider = styled.div`
  height: 8px;
  background-color: #f2f2f2;
  width: 100%;
  margin: 6px 0;
  flex-shrink: 0;
`;

const IndividualSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
`;

const CardWrapper = styled.div`
  height: 65px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  @media ${media.mobileM} {
    height: 74px;
  }

  &:active {
    transform: scale(0.98);
  }

  & > div {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    color: #141212;

    span {
      height: 20px;
      box-sizing: border-box;
      padding: 4px 6px;
      display: inline-flex;
      align-items: center;
      background-color: #96be9c;
      color: #fff1e5;
    }
  }

  ${(props) =>
    props.$isSelected &&
    `
    & > div {
      background-color: #82bf8b;

      span {
        background-color: #fff8f2;
        color: #003b00;
      }
    }
  `}
`;

const ModalAddCosmeticButton = styled.button`
  width: 100%;
  padding: 16px 0;
  border: 1.5px dashed #828282;
  border-radius: 8px;
  background-color: #ffffff;
  color: #828282;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transition: background-color 0.2s ease;

  &:active {
    background-color: #f8f9fa;
  }
`;

const ModalFooter = styled.div`
  margin-top: 16px;
  padding: 0 20px;
`;

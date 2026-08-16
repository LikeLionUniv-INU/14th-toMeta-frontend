import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px;

  button {
    font-size: 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
  }

  h1 {
    font-size: 1.125rem;
    font-weight: 700;
  }
`;

export const Content = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }
`;

export const SectionDivider = styled.div`
  height: 12px;
  background-color: #f3f4f6;
  margin: 0 -20px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #b0b0b0;
  margin: 1px;
`;

export const Section = styled.section`

`;

export const Label = styled.div`
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 14px;

  .required {
    color: red;
    margin-left: 2px;
  }

  .optional {
    color: #0C10FF;
    font-size: 12px;
    font-weight: 400;
    margin-left: 4px;
  }
`;

export const SubDescription = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #828282;
  margin-bottom: 0.5rem;
`;

export const SkinStatusGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SkinStatusButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background: ${({ selected }) => (selected ? '#dcfce7' : 'transparent')};
  box-shadow: ${({ selected }) => (selected ? '0 0 0 2px #22c55e' : 'none')};
  cursor: pointer;
  transition: all 0.2s ease;

  .emoji {
    font-size: 40px;
    margin-bottom: 0.25rem;
  }

  .text {
    font-size: 12px;
    font-weight: 400;
    color: #000000;
  }
`;

export const AddButton = styled.button`
  width: 100%;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  color: #828282;
  font-weight: 600;
  font-size: 12px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const TextareaWrapper = styled.div`
  position: relative;

  textarea {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.75rem;
    font-weight: 400;
    font-size: 10px;
    color: #828282;
    height: 7rem;
    resize: none;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #22c55e;
    }
  }

  .char-count {
    position: absolute;
    bottom: 0.5rem;
    right: 0.75rem;
    font-size: 0.75rem;
    color: #9ca3af;
  }
`;

export const ImageListContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

export const CameraButton = styled.button`
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  background-color: #ededed;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #828282;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }

  .camera-icon {
    width: 25px;
    height: 18px;
    object-fit: contain;
  }
`;

export const ImageItem = styled.div`
  position: relative;
  width: 5.5rem;
  height: 5.5rem;
  flex-shrink: 0;

  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 0.75rem;
  }

  .delete-btn {
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    background-color: #374151;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export const SubmitWrapper = styled.div`
  padding-top: 1rem;
`;
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
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DateSection = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.3rem 0;
  }

  p {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0.1rem;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #b0b0b0;
  margin: 1px;
`;

export const Section = styled.section`

`;

export const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 17px;

  .required {
    color: #ef4444;
    margin-left: 2px;
  }

  .optional {
    color: #3b82f6;
    font-size: 0.85rem;
    font-weight: 400;
    margin-left: 4px;
  }
`;

export const SubDescription = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
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
    font-size: 1.875rem;
    margin-bottom: 0.25rem;
  }

  .text {
    font-size: 0.75rem;
    color: #4b5563;
  }
`;

export const AddButton = styled.button`
  width: 100%;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  color: #9ca3af;
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
    font-size: 11px;
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

export const CameraButton = styled.button`
  width: 100%;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }

  img {
    height: 6rem;
    object-fit: cover;
    border-radius: 0.25rem;
  }

  .camera-icon {
    font-size: 1.5rem;
  }
`;

export const SubmitWrapper = styled.div`
  padding-top: 1rem;
`;
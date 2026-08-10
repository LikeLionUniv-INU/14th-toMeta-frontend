import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100dvh;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 12dvh 0 4dvh 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 90%;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.35;
  color: #000000;
  margin: 0;
  word-break: keep-all;
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #918d8d;
  margin: 0;
  word-break: keep-all;
`;

import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/GlobalStyle';

export default function CosmeticCard({ name, tags = [] }) {
  return (
    <CardContainer>
      <CardTitle>{name}</CardTitle>
      {tags.length > 0 && (
        <TagGroup>
          {tags.map((tag, idx) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
        </TagGroup>
      )}
    </CardContainer>
  );
}

const CardContainer = styled.div`
  padding: 14px;
  border: 1px solid #96be9c;
  border-radius: 20px;
  background-color: #fff;
`;

const CardTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #141212;
  margin: 0 0 6px 0;

  @media ${media.mobileM} {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 9px;
  font-weight: 400;
  background-color: #96be9c;
  color: #fff8f2;
  padding: 4px 6px;
  border-radius: 12px;

  @media ${media.mobileM} {
    font-size: 10px;
  }
`;

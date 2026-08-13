import React from "react";
import styled from "styled-components";

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
  border-radius: 12px;
  background-color: #fff;
`;

const CardTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #141212;
  margin: 0 0 8px 0;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 8px;
  font-weight: 400;
  background-color: #96be9c;
  color: #FFF1E5;
  padding: 3px 8px;
  border-radius: 12px;
`;
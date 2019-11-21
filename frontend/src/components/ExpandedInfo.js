import React, { useState } from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  margin: 20px 0;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    padding: 3px 8px;
    background-color: lightgray;
    border-radius: 5px;
    margin: 0 8px;
    width: fit-content;
  }
`;

const Tags = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

function ExpandedInfo({ grades, addTag, tags, studentId }) {
  const [tagValue, setTagValue] = useState('');

  const handleChange = (e) => {
    setTagValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTag(tagValue);
    setTagValue('');
  };
  return (
    <Container>
      {grades.map((grade, i) => {
        return (
          <p key={`${studentId}-grade-${i}`}>
            Test {i + 1}: <span>{grade}%</span>
          </p>
        );
      })}
      <TagContainer>
        <Tags>
          {tags.map((tag) => {
            return <span>{tag}</span>;
          })}
        </Tags>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="add-tag-input"
            name="addTag"
            onChange={handleChange}
            value={tagValue}
            placeholder="Add tag"
          />
        </form>
      </TagContainer>
    </Container>
  );
}

export default ExpandedInfo;
